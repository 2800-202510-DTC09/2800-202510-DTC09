import { embedQuery } from '../utils/embedQuery.mjs';

export async function queryPineconeIndex(indexUrl, query, topK = 3) {
  const vector = await embedQuery(query);

  try {
    const res = await fetch(`${indexUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.PINECONE_API_KEY
      },
      body: JSON.stringify({ vector, topK, includeMetadata: true })
    });

    if (!res.ok) {
      throw new Error(`[${res.status}] ${await res.text()}`);
    }

    const json = await res.json();
    return json.matches || [];
  } catch (err) {
    return [];
  }
}

