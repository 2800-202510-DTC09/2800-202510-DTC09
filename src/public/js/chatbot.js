/**
 * Claude 3.7 was used to help with the code.
 */

/**
 * Carbon Emissions Chatbot
 */
const MIN_TYPING_DELAY = 500;
const MAX_TYPING_DELAY = 1500;
const SUGGESTION_DELAY = 500;

// Sample suggestions focused on carbon emissions
const suggestions = [
	'What\'s the carbon footprint of beef?',
	'How much CO2 does flying produce?',
	'Carbon impact of a new laptop?',
	'Is taking the train better than driving?',
	'Emissions from plastic water bottles?'
];

// Fallback responses if API connection fails
const responses = {
	hello: 'Hello! I can help estimate the carbon impact of products and activities.',
	hi: "Hi there! Ask me about the carbon footprint of specific items or actions.",
	hey: 'Hey! I can calculate emissions for various products and activities.',
	'beef': 'Beef typically produces 60-100 kg CO2e per kg. A quarter-pound burger creates roughly 3-4 kg CO2e.',
	'flight': 'A round-trip flight from NYC to LA (about 5,000 miles) generates approximately 1 metric ton of CO2 per passenger.',
	'car': 'Driving an average gasoline car produces about 400g CO2 per mile. Electric vehicles generate 100-200g CO2 per mile (including power generation).',
	'laptop': 'Manufacturing a new laptop typically creates 200-400 kg CO2e. Using it adds about 50-100 kg CO2e annually, depending on power source.',
	'plastic': 'A single-use plastic water bottle (500ml) has a carbon footprint of about 80-100g CO2e.'
};

// Track session for conversation history
let sessionId = null;

function scrollToBottom() {
	const chatMessages = document.getElementById('chatMessages');
	if (chatMessages) {
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}
}

function addSuggestions() {
	const chatMessages = document.getElementById('chatMessages');
	const messageInput = document.getElementById('messageInput');
	if (!chatMessages || !messageInput) {
		return;
	}

	const suggestionsDiv = document.createElement('div');
	suggestionsDiv.className = 'suggestions flex flex-wrap gap-2 mb-4';

	suggestions.forEach((suggestion) => {
		const btn = document.createElement('button');
		btn.className =
			'suggestion-btn bg-primary/10 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors';
		btn.textContent = suggestion;
		btn.addEventListener('click', () => {
			messageInput.value = suggestion;
			sendMessage();
		});
		suggestionsDiv.appendChild(btn);
	});

	chatMessages.appendChild(suggestionsDiv);
	scrollToBottom();
}

function createProfileImg() {
	const profileImg = document.createElement('img');
	profileImg.src = '/assets/botPFP.png';
	profileImg.alt = 'Bot';
	profileImg.className = 'w-10 h-10 rounded-full object-cover';
	return profileImg;
}

function createMessageDiv(message, isUser) {
	const messageDiv = document.createElement('div');
	messageDiv.className = isUser
		? 'user-message p-3 bg-primary text-white rounded-xl max-w-sm'
		: 'bot-message p-3 bg-gray-100 rounded-xl';

	if (isUser || typeof message !== 'object') {
		// Plain text message
		const messagePara = document.createElement('p');
		messagePara.textContent = typeof message === 'object' ? message.result : message;
		messageDiv.appendChild(messagePara);
	} else {
		// Bot message with structured data
		const resultPara = document.createElement('p');
		resultPara.textContent = message.result;
		messageDiv.appendChild(resultPara);

		// Create details button
		const detailsBtn = document.createElement('button');
		detailsBtn.textContent = "Show sources & reasoning";
		detailsBtn.className = "bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm hover:bg-secondary/20 transition-colors mt-2";

		// Create hidden details section
		const detailsDiv = document.createElement('div');
		detailsDiv.className = "hidden mt-3 text-sm";

		let detailsContent = '';

		if (message.reasoning) {
			detailsContent += `<h4 class="font-bold">Reasoning:</h4><p>${message.reasoning}</p>`;
		}

		if (message.sources && message.sources.length > 0) {
			detailsContent += `<h4 class="font-bold mt-2">Sources:</h4><p>${message.sources.join(', ')}</p>`;
		}
		if (message.assumptions && message.assumptions.length > 0) {
			detailsContent += `<h4 class="font-bold mt-2">Assumptions:</h4>`;
			const assumptionsList = message.assumptions.map(assumption => `<li>- ${assumption}</li>`).join('');
			detailsContent += `<ul>${assumptionsList}</ul>`;
		}

		detailsDiv.innerHTML = detailsContent;

		// Toggle details on button click
		detailsBtn.addEventListener('click', () => {
			if (detailsDiv.classList.contains('hidden')) {
				detailsDiv.classList.remove('hidden');
				detailsBtn.textContent = "Hide sources & reasoning";
			} else {
				detailsDiv.classList.add('hidden');
				detailsBtn.textContent = "Show sources & reasoning";
			}
		});

		messageDiv.appendChild(detailsBtn);
		messageDiv.appendChild(detailsDiv);
	}

	return messageDiv;
}

function removeSuggestionsIfUser(isUser) {
	if (isUser) {
		const suggestionsDiv = document.querySelector('.suggestions');
		if (suggestionsDiv) {
			suggestionsDiv.remove();
		}
	}
}

function addMessage(message, isUser = false) {
	const chatMessages = document.getElementById('chatMessages');
	if (!chatMessages) {
		return;
	}

	const messageWrapper = document.createElement('div');
	messageWrapper.className = `flex items-start gap-3 mb-4 ${
		isUser ? 'justify-end' : ''
	}`;

	if (!isUser) {
		messageWrapper.appendChild(createProfileImg());
	}

	messageWrapper.appendChild(createMessageDiv(message, isUser));
	chatMessages.appendChild(messageWrapper);

	removeSuggestionsIfUser(isUser);

	scrollToBottom();
}

function showTypingIndicator() {
	const typingIndicator = document.getElementById('typingIndicator');
	if (typingIndicator) {
		typingIndicator.classList.remove('hidden');
		scrollToBottom();
	}
}

function hideTypingIndicator() {
	const typingIndicator = document.getElementById('typingIndicator');
	if (typingIndicator) {
		typingIndicator.classList.add('hidden');
	}
}

async function getResponseFromAPI(message) {
	try {
		const response = await fetch('/api/chatbot/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message, sessionId }),
		});

		if (!response.ok) {
			throw new Error('API response was not ok');
		}

		const data = await response.json();
		// Save the session ID for future requests
		sessionId = data.sessionId;

		return data.response;
	} catch (error) {
		console.error('Error calling chatbot API:', error);
		return getFallbackResponse(message);
	}
}

function getFallbackResponse(message) {
	const lowerMessage = message.toLowerCase();

	if (responses[lowerMessage]) {
		return responses[lowerMessage];
	}

	for (const key in responses) {
		if (lowerMessage.includes(key)) {
			return responses[key];
		}
	}

	return {
		result: "I'm having trouble getting accurate carbon data right now. Based on general knowledge, this might produce between 2-4 kg CO2e, but I can't give you a detailed breakdown at the moment.",
		reasoning: "Using fallback data due to connection issues.",
		sources: ["Fallback database"],
		assumptions: ["Using conservative fallback values"]
	};
}

function sendMessage() {
	const messageInput = document.getElementById('messageInput');
	if (!messageInput) {
		return;
	}
	const message = messageInput.value.trim();
	if (message === '') {
		return;
	}

	addMessage(message, true);
	messageInput.value = '';

	showTypingIndicator();

	const typingDelay =
		Math.random() * (MAX_TYPING_DELAY - MIN_TYPING_DELAY) +
		MIN_TYPING_DELAY;

	setTimeout(async () => {
		const response = await getResponseFromAPI(message);
		hideTypingIndicator();
		addMessage(response);
	}, typingDelay);
}

function initChat() {
	const messageInput = document.getElementById('messageInput');
	const sendButton = document.getElementById('sendButton');
	const chatMessages = document.getElementById('chatMessages');
	const typingIndicator = document.getElementById('typingIndicator');

	if (!messageInput || !sendButton || !chatMessages || !typingIndicator) {
		console.error('Required DOM elements not found');
		return;
	}

	messageInput.focus();

	setTimeout(addSuggestions, SUGGESTION_DELAY);

	sendButton.addEventListener('click', sendMessage);
	messageInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initChat();
});
