import axios from 'axios';

export async function embedQuery(text) {
	const res = await axios.post(
		'https://api.openai.com/v1/embeddings',
		{
			input: text,
			model: 'text-embedding-3-small'
		},
		{
			headers: {
				'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}
	);

	return res.data.data[0].embedding;
}

