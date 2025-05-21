import { queryPineconeIndex } from './sharedRetriever.mjs';

export async function getProductMassRatiosFacts(query) {
  const matches = await queryPineconeIndex(process.env.MASS_RATIO_INDEX_URL, query);
  return matches.map(r => ({
    summary: r.summary,
    metadata: r.metadata
  }));
}

