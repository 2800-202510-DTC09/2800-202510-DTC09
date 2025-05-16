/**
 * Claude 3.7 was used to help with the code.
 */
const MIN_TYPING_DELAY = 500;
const MAX_TYPING_DELAY = 1500;
const SUGGESTION_DELAY = 500;

const suggestions = [
    'How can I reduce my carbon footprint?',
    'Tell me about water conservation',
    'What are sustainable energy sources?',
    'How to start recycling at home?',
    'Tips for reducing plastic waste',
];

const responses = {
    hello: 'Hello! How can I help you with sustainability today?',
    hi: "Hi there! I'm here to help with your sustainability questions.",
    hey: 'Hey! Ready to talk about sustainable living?',
    'carbon footprint':
        'To reduce your carbon footprint, consider using public transportation, reducing meat consumption, conserving energy at home, and supporting renewable energy sources.',
    'water conservation':
        'You can conserve water by taking shorter showers, fixing leaks, using water-efficient appliances, collecting rainwater for plants, and turning off the tap while brushing teeth.',
    'sustainable energy':
        'Sustainable energy sources include solar, wind, hydro, geothermal, and biomass. These renewable sources have less environmental impact than fossil fuels.',
    recycling:
        'Start recycling at home by setting up separate bins for different materials (paper, plastic, glass, metal), learning your local recycling guidelines, and reducing contamination in your recycling.',
    'plastic waste':
        'Reduce plastic waste by using reusable bags, bottles, and containers, avoiding single-use plastics, buying items with less packaging, and properly recycling the plastic you do use.',
};

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

    const messagePara = document.createElement('p');
    messagePara.textContent = message;
    messageDiv.appendChild(messagePara);

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
            body: JSON.stringify({message}),
        });

        if (!response.ok) {
            throw new Error('API response was not ok');
        }

        const data = await response.json();
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

    return "I'm still learning about sustainability. Could you try asking in a different way, or ask about carbon footprint, water conservation, recycling, or sustainable energy?";
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
