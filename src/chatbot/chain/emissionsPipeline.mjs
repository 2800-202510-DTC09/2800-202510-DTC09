import { ChatOpenAI } from '@langchain/openai';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.mjs';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { foodTool } from '../tools/foodTool.mjs';
import { electronicsTool } from '../tools/electronicsTool.mjs';
import { spendingTool } from '../tools/spendingTool.mjs';
import { massRatioTool } from '../tools/massRatioTool.mjs';
import { calculatorTool } from '../tools/calculatorTool.mjs';

// Set up the chatbot
const llm = new ChatOpenAI({
	temperature: 0,
	modelName: 'gpt-4-turbo', 
	openAIApiKey: process.env.OPENAI_API_KEY
});

// Set up our tools
const baseTools = [foodTool, electronicsTool, calculatorTool, spendingTool, massRatioTool];

// For caching
let estimatorAgent; 

// Creates an agent for emission estimation
async function getEstimatorAgent() {
	if (!estimatorAgent) {
		try {
			estimatorAgent = await initializeAgentExecutorWithOptions(baseTools, llm, {
				agentType: 'openai-functions',
				// We're only verbose in dev
				verbose: process.env.NODE_ENV === 'dev', 
				agentArgs: { systemMessage: SYSTEM_PROMPT },
				handleParsingErrors: (error) => { 
					console.error("Langchain agent parsing error:", error);
					return "AgentAction: The LLM output was not parsable as an action. Will try to respond directly or indicate failure.";
				}
			});
		} catch (error) {
			console.error("FATAL: Agent initialization error:", error);
			throw error; 
		}
	}
	return estimatorAgent;
}
// Use a regex to pull the co2 value out of a string
function extractCO2Value(resultString) {
	if (!resultString || typeof resultString !== 'string') return 0;
	const match = resultString.match(/([\d\.-]+)\s*kg/i); // Allow negative numbers if ever needed, case-insensitive kg
	return match ? parseFloat(match[1]) : 0;
}

// Checks that the result represents a succesful computation (not an error)
function isSuccessfulComputation(llmResult) {
	return (
		llmResult &&
		typeof llmResult === 'object' &&
		typeof llmResult.result === 'string' &&
		!llmResult.result.toLowerCase().includes("error:") &&
		!llmResult.result.toLowerCase().includes("data insufficient") &&
		!llmResult.result.toLowerCase().includes("unable to parse") &&
		typeof llmResult.reasoning === 'string' &&
		!llmResult.reasoning.toLowerCase().includes("[fallback]") &&
		!llmResult.reasoning.toLowerCase().includes("[error]") &&
		Array.isArray(llmResult.sources) &&
		Array.isArray(llmResult.assumptions)
	);
}
// Implements a string -> JSON parser with error handling.
function robustJsonParse(jsonString) {
	if (typeof jsonString !== 'string') {
		if (typeof jsonString === 'object' && jsonString !== null) {
			try {
				jsonString = JSON.stringify(jsonString);
			} catch (e) {
				throw new Error("Invalid input to robustJsonParse: not a string or stringifiable object.");
			}
		} else {
			throw new Error("Invalid input to robustJsonParse: not a string.");
		}
	}
	let cleanString = jsonString.trim();
	// If the string is markdown, parse it and get the JSON inside.
	const markdownMatch = cleanString.match(/^```json\s*([\s\S]*?)\s*```$/m);
	if (markdownMatch && markdownMatch[1]) {
		cleanString = markdownMatch[1];
		cleanString = cleanString.trim();
	}
	cleanString = cleanString.replace(/,\s*([\}\]])/g, '$1');
	try {
		return JSON.parse(cleanString);
	} catch (e) {
		throw e; 
	}
}

// This is the engine of the LLM pipeline, 
// getting the agent to produce co2e estimates of the given query.
async function getSingleEstimate(query, agent) {
	try {
		const turnPrompt = `
Estimate the carbon emissions (CO2e) for the query: "${query}".
Adhere strictly to your primary System Prompt. For THIS specific query, ensure:
1.  **Component Identification**: Identify key components if "${query}" is a composite item (e.g., for a cheeseburger, consider patty, cheese, bun). Query tools for each.
2.  **Tool Usage**: Use RAG tools (food_retriever, etc.) for emissions factors. Use 'calculator' for ALL math.
3.  **Data Selection & Assumptions**:
    * If multiple tool results apply to one component, CHOOSE ONE representative option and state this as an [ASSUMPTION: Your choice and brief reason].
    * For ALL necessary weights/quantities not given by tools or user, state a common-sense [ASSUMPTION: Description and value, e.g., beef patty is 0.113kg]. List all such assumptions.
4.  **Detailed Reasoning**: In the 'reasoning' field:
    * Briefly state scope if query implies it (e.g., "buying" means ingredient production).
    * For each component: show its [ASSUMPTION: weight/qty], selected factor, and calculation (Weight * Factor = Emissions_Component).
    * If a key component's data is missing from tools, note it: "[ASSUMPTION: Bun emissions not included as no tool data found.]"
    * Conclude with the sum: Total = Sum of Emissions_Component.
5.  **JSON Adherence**: Your ENTIRE response must be a single, valid JSON object as per the System Prompt's specified structure. The 'assumptions' field must be an array of strings, each string being a distinct assumption made.

JSON Structure Reminder (Pay attention to 'assumptions' format):
{
  "result": "X.XX kg CO2e",
  "reasoning": "Scope: ... Component A: [ASSUMPTION: qty A] using factor F_A. Calc: ... = E_A. Component B: [ASSUMPTION: qty B] ... Total = E_A + E_B + ...",
  "sources": ["Tool source 1", "Tool source 2"],
  "assumptions": [
    "Assumption A1 (e.g., Quantity for component X is Y units).",
    "Assumption A2 (e.g., Selected data Z for component X because...).",
    "Assumption A3 (e.g., Component P emissions not included due to no tool data.)"
  ]
}

Proceed with estimation for Query: "${query}"
`;
		const agentResponse = await agent.invoke({ input: turnPrompt });

		try {
			return robustJsonParse(agentResponse.output);
		} catch (parseError) {
			console.error(`PARSING FAILED for query "${query}". Agent output:`, agentResponse.output, "Error:", parseError);
			return {
				result: "Error: Processing Response",
				reasoning: `The assistant's response for "${query}" was not in the expected format and could not be understood. Raw output: ${agentResponse.output}`,
				sources: ["System"],
				assumptions: ["Agent did not return valid JSON as instructed."]
			};
		}
	} catch (agentError) {
		console.error(`AGENT EXECUTION FAILED for query "${query}":`, agentError);
		return {
			result: "Error: Agent Execution",
			reasoning: `The assistant encountered an error while trying to process the query: "${query}". Technical details: ${agentError.message}`,
			sources: ["System"],
			assumptions: ["An internal error occurred during processing."]
		};
	}
}
// Breaks down a complex query into simpler components. 
async function breakdownQuery(originalQuery, agentLlm) {
	try {
		const breakdownSystemPrompt = "You are a query decomposition assistant. Your task is to break down a user's query about carbon emissions into specific, estimable components. Each component should be a physical object or distinct activity. If a query is already specific and singular, return it as a single-element array. Format your response ONLY as a JSON array of strings. Do not add any other text.";
		const breakdownUserPrompt = `Break down the following carbon emissions query into its key estimable components: "${originalQuery}"\n\nConsider common constituents. For example:\n- "cheeseburger" might break into ["beef patty", "cheese slice", "bread bun"].\n- "using a laptop for a year" might break into ["manufacturing 1 laptop", "electricity for 1 year laptop usage"].\n- "1kg of apples" is already specific, so return ["1kg of apples"].\n\nOutput ONLY the JSON array of strings:`;

		const llmResponse = await agentLlm.invoke([ 
			{ role: 'system', content: breakdownSystemPrompt },
			{ role: 'user', content: breakdownUserPrompt }
		]);

		let components;
		try {
			components = robustJsonParse(llmResponse.content || llmResponse.text || "[]");
		} catch(e) {
			console.warn(`Breakdown for "${originalQuery}" did not return valid JSON. Output: ${llmResponse.content || llmResponse.text}. Using original query.`);
			return [originalQuery];
		}

		if (!Array.isArray(components) || components.length === 0 || !components.every(c => typeof c === 'string')) {
			console.warn(`Breakdown for "${originalQuery}" did not return valid array of strings. Output: ${JSON.stringify(components)}. Using original query.`);
			return [originalQuery];
		}
		console.log(`Breakdown for "${originalQuery}": ${JSON.stringify(components)}`);
		return components;
	} catch (error) {
		console.error(`Error during query breakdown for "${originalQuery}":`, error);
		return [originalQuery];
	}
}

// Coorindates the carbon estimation.
async function estimateCarbon(userInput) {
	const agent = await getEstimatorAgent();

	// Attempt 1: Direct estimation of the entire query
	console.log(`Attempting direct estimation for: "${userInput}"`);
	let primaryEstimate = await getSingleEstimate(userInput, agent);

	if (isSuccessfulComputation(primaryEstimate)) {
		console.log(`Direct estimation successful for: "${userInput}"`);
		return primaryEstimate;
	} else {
		console.warn(`Direct estimation for "${userInput}" was not fully successful or was a fallback. Reasoning: ${primaryEstimate.reasoning}. Attempting decomposition.`);
	}

	// Attempt 2: Breakdown and estimate components
	const components = await breakdownQuery(userInput, llm);

	if (components.length === 1 && components[0].toLowerCase() === userInput.toLowerCase()) {
		console.log(`Breakdown resulted in the original query for "${userInput}". Returning result from the initial direct attempt.`);
		return primaryEstimate; 
	}

	console.log(`Query "${userInput}" broken down into components: ${JSON.stringify(components)}`);
	const componentEstimates = [];
	for (const component of components) {
		console.log(`Estimating component: "${component}"`);
		const est = await getSingleEstimate(component, agent);
		componentEstimates.push({ component, ...est });
	}

	// Aggregate results
	const validCalculations = componentEstimates.filter(isSuccessfulComputation);

	const totalEmissionsKgs = validCalculations
		.map(r => extractCO2Value(r.result))
		.reduce((sum, val) => sum + val, 0);

	let combinedReasoning = `# Estimate for "${userInput}"\n`;
	if (validCalculations.length === 0 && componentEstimates.length > 0) {
		combinedReasoning += "Could not successfully calculate emissions for any identified components.\n\n";
		combinedReasoning += componentEstimates.map(r => `## Component: ${r.component}\nAttempt Result: ${r.result}\nReasoning: ${r.reasoning}`).join('\n\n');
	} else if (validCalculations.length < componentEstimates.length) {
		combinedReasoning += "Note: Emissions for some components could not be reliably calculated and are excluded from the total.\n\n";
		combinedReasoning += componentEstimates.map(r => `## Component: ${r.component}\n${isSuccessfulComputation(r) ? 'Successfully estimated.' : 'Estimation problematic.'}\nResult: ${r.result}\nReasoning: ${r.reasoning}`).join('\n\n');
	} else {
		combinedReasoning += componentEstimates.map(r => `## Component: ${r.component}\nResult: ${r.result}\nReasoning: ${r.reasoning}`).join('\n\n');
	}


	const combinedSources = Array.from(new Set(componentEstimates.flatMap(r => r.sources || []).filter(s => s && !s.toLowerCase().includes("system"))));
	const combinedAssumptions = Array.from(new Set(componentEstimates.flatMap(r => r.assumptions || [])));

	return {
		result: validCalculations.length > 0 ? `${totalEmissionsKgs.toFixed(2)} kg CO2e` : "Data Insufficient",
		reasoning: combinedReasoning,
		sources: combinedSources.length > 0 ? combinedSources : ["Information processed by assistant"],
		assumptions: combinedAssumptions.length > 0 ? combinedAssumptions : ["General assumptions made as per assistant's training."]
	};
}

// The entry point for the emission estimation
export async function runEmissionsChat(input) {
	try {
		console.log(`runEmissionsChat received input: "${input}"`);
		const structuredResult = await estimateCarbon(input);
		console.log(`runEmissionsChat returning: ${JSON.stringify(structuredResult, null, 2)}`);
		return structuredResult;
	} catch (error) {
		console.error("CRITICAL ERROR in runEmissionsChat pipeline for input:", input, error);
		return {
			result: "Error: System Failure",
			reasoning: "A critical system error occurred preventing emissions estimation. The technical team has been notified.",
			sources: ["System Error Log"],
			assumptions: ["The estimation process encountered a fatal error."]
		};
	}
}
