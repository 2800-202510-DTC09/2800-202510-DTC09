import { queryPineconeIndex } from './sharedRetriever.mjs';

export async function getFoodFacts(query) {
	const matches = await queryPineconeIndex(process.env.FOOD_INDEX_URL, query);

	return matches.map(r => ({
		summary: r.summary,
		metadata: r.metadata
	}));
}


