// Diet
// Data from:
// https://ourworldindata.org/food-choice-vs-eating-local
beef-co2e-per-kg = 60;
lamb-c02e-per-kg = 24;
chicken-co2e-per-kg = 6;
pork-co2e-per-kg = 7;
cheese-co2e-per-kg = 21;
milk-co2e-per-L = 3;


// Amazon/Shipping
// Data from:
// https://sustainability.aboutamazon.com/2023-amazon-sustainability-report.pdf
grams-of-co2e-emitted-per-dollar-on-amazon-shipping = 80.8;

// Electricity (BC average)
// Data from:
// https://www.cer-rec.gc.ca/en/data-analysis/energy-commodities/electricity/report/canadas-renewable-power/provinces/renewable-power-canada-british-columbia.html
electricity-grams-of-co2e-per-kwh = 12.3;

// Flights
// Data from:
// https://assets.publishing.service.gov.uk/media/66a9fe4ca3c2a28abb50da4a/2024-greenhouse-gas-conversion-factors-methodology.pdf
//
const short-haul-flight = {
	average-length-km: 1537,
	economy-grams-of-co2e-per-pkm: 187.21,
	business-grams-of-co2e-per-pkm: 280.96,
}
const international-flight = {
	average-length-km: 4737,
	economy-grams-of-co2e-per-pkm: 137.93,
	business-grams-of-co2e-per-pkm: 399.78,
	first-grams-of-co2e-per-pkm: 551.54
}

const long-haul-flight = {
	average-length-km: 6213,
	economy-grams-of-co2e-per-pkm: 204.77,
	business-grams-of-co2e-per-pkm: 594.24,
	first-grams-of-co2e-per-pkm: 819.61
}

