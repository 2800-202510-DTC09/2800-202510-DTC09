import fetch from 'node-fetch';

export async function embedQuery(text) {
	const res = await fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			input: text,
			model: 'text-embedding-3-small'
		})
	});

	const json = await res.json();
	return json.data[0].embedding;
}

