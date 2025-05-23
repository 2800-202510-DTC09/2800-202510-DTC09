import { queryPineconeIndex } from './sharedRetriever.mjs';

export async function getSpendingFacts(query) {
  const matches = await queryPineconeIndex(process.env.SPENDING_INDEX_URL, query);
  return matches.map(r => ({
    summary: r.summary,
    metadata: r.metadata
  }));
}

