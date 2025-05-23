import { DynamicTool } from "@langchain/core/tools";
import { getElectronicsFacts } from "../retrievers/electronicsRetriever.mjs";

export const spendingTool = new DynamicTool({
  name: "spending-emissions",
  description: "Provides co2e per dollar with respect to products or services.",
  func: async (query) => {
    const facts = await getElectronicsFacts(query);
    return JSON.stringify({ source: "EXIOBASE", facts });
  }
});

