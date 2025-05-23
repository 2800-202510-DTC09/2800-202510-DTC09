import { queryPineconeIndex } from './sharedRetriever.mjs';

export async function getElectronicsFacts(query) {
  const matches = await queryPineconeIndex(process.env.ELECTRONICS_INDEX_URL, query);
  return matches.map(r => ({
    summary: r.summary,
    metadata: r.metadata
  }));
}

