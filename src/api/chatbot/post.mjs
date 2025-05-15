import {env} from 'process';
import {status} from 'http-status';
import {OpenAI} from 'openai';
import {chatbot} from './index.mjs';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a sustainability assistant for the SustainMe app. 
Your role is to help users reduce their environmental impact, understand their carbon footprint, 
and provide practical advice for sustainable living. Keep responses concise, practical, and focused 
on sustainability topics. Knowledge about environmental issues, carbon footprints, energy conservation, 
waste reduction, sustainable transportation, and eco-friendly lifestyle choices is your specialty.`;

const FALLBACK_RESPONSES = {
    'carbon footprint':
        'To reduce your carbon footprint, consider using public transportation, reducing meat consumption, and conserving energy at home.',
    'water conservation':
        'You can conserve water by taking shorter showers, fixing leaks, and turning off the tap while brushing teeth.',
    'sustainable energy':
        'Sustainable energy sources include solar, wind, hydro, and geothermal power.',
    recycling:
        'Set up separate bins for different materials and learn your local recycling guidelines.',
    default:
        'I apologize, but I am currently having trouble connecting to my knowledge base. Please try asking in a different way, or check back later.',
};

function getFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    for (const key in FALLBACK_RESPONSES) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return FALLBACK_RESPONSES[key];
        }
    }
    return FALLBACK_RESPONSES.default;
}

/**
 * @openapi
 * /chatbot/message:
 *   post:
 *     description: Send a message to the chatbot
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       description: User message
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: How can I reduce my carbon footprint?
 *     responses:
 *       200:
 *         description: Chatbot response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: To reduce your carbon footprint, consider using public transportation, reducing meat consumption, and conserving energy at home.
 *       400:
 *         description: Missing message
 *       500:
 *         description: Server internal error
 */
chatbot.post('/message', async (req, res) => {
    const {message} = req.body;

    if (!message) {
        return res.status(status.BAD_REQUEST).json({
            error: 'Missing message',
        });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: SYSTEM_PROMPT},
                {role: 'user', content: message},
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        return res.status(status.OK).json({
            response: completion.choices[0].message.content.trim(),
        });
    } catch (e) {
        console.error('ChatGPT API error:', e);
        return res.status(status.OK).json({
            response: getFallbackResponse(message),
        });
    }
});
