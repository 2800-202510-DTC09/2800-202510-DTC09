import { status } from 'http-status';
import { runEmissionsChat } from '../../chatbot/chain/emissionsPipeline.mjs';

export default async function handleChatbotPost(req, res) {
	const { message } = req.body; 

	if (!message) {
		return res.status(status.BAD_REQUEST).json({
			response: {
				result: "Error: Bad Request",
				reasoning: "No message was provided in the request. Please type a message.",
				sources: ["API System"],
				assumptions: ["A message input is required for the chatbot."]
			}
		});
	}

	try {
		const llmResponse = await runEmissionsChat(message);

		return res.status(status.OK).json({
			response: llmResponse
		});
	} catch (e) {
		console.error('FATAL ERROR in /api/chatbot/message handler:', e);
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			response: {
				result: "Error: Internal Server Error",
				reasoning: "A critical error occurred on the server while processing your request. The issue has been logged.",
				sources: ["API System Log"],
				assumptions: ["The server encountered an unexpected fatal condition during chat processing."]
			}
		});
	}
}
