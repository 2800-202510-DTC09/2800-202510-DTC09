import { DynamicTool } from '@langchain/core/tools';
import { getFoodFacts } from '../retrievers/foodRetriever.mjs';

export const foodTool = new DynamicTool({
  name: 'food_retriever',
  description: 'Retrieves emissions data about food products. Source: Poore & Nemecek (2018).',
  func: async (query) => {
    const facts = await getFoodFacts(query);
    return JSON.stringify({
      source: 'Poore & Nemecek (2018)',
      facts
    });
  }
});

