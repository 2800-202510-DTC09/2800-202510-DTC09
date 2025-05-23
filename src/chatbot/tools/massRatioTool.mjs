import { DynamicTool } from "@langchain/core/tools";
import { getProductMassRatiosFacts } from "../retrievers/productMassRatioEmissionsRetriever.mjs";

export const massRatioTool = new DynamicTool({
  name: "product-mass-ratios",
  description: "Provides the ratio of the mass of a product and the mass of the co2e emitted to produce that object.",
  func: async (query) => {
    const facts = await getProductMassRatiosFacts((query));
    return JSON.stringify({ source: "Product Level Carbon Intensities (Sato, 2014)", facts });
  }
});

