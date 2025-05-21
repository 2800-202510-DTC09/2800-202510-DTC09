import { DynamicTool } from "@langchain/core/tools";
import { getElectronicsFacts } from "../retrievers/electronicsRetriever.mjs";

export const electronicsTool = new DynamicTool({
  name: "electronics_retriever",
  description: "Queries electronics emissions. Source: Boavizta Datavizta",
  func: async (query) => {
    const facts = await getElectronicsFacts(query);
    return JSON.stringify({ source: "Boavizta Datavizta", facts });
  }
});

