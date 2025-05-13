// Diet
// Data from:
// https://ourworldindata.org/food-choice-vs-eating-local
const beef_co2e_per_kg = 60;
const lamb_c02e_per_kg = 24;
const chicken_co2e_per_kg = 6;
const pork_co2e_per_kg = 7;
const cheese_co2e_per_kg = 21;
const milk_co2e_per_L = 3;


// Amazon/Shipping
// Data from:
// https://sustainability.aboutamazon.com/2023-amazon-sustainability-report.pdf
const grams_of_co2e_emitted_per_dollar_on_amazon_shipping = 80.8;

// Electricity (BC average)
// Data from:
// https://www.cer-rec.gc.ca/en/data-analysis/energy-commodities/electricity/report/canadas-renewable-power/provinces/renewable-power-canada-british-columbia.html
const electricity_grams_of_co2e_per_kwh = 12.3;

// Flights
// Data from:
// https://assets.publishing.service.gov.uk/media/66a9fe4ca3c2a28abb50da4a/2024-greenhouse-gas-conversion-factors-methodology.pdf
//
const short_haul_flight = {
	average_length_km: 1537,
	economy_grams_of_co2e_per_pkm: 187.21,
	business_grams_of_co2e_per_pkm: 280.96,
}
const international_flight = {
	average_length_km: 4737,
	economy_grams_of_co2e_per_pkm: 137.93,
	business_grams_of_co2e_per_pkm: 399.78,
	first_grams_of_co2e_per_pkm: 551.54
}

const long_haul_flight = {
	average_length_km: 6213,
	economy_grams_of_co2e_per_pkm: 204.77,
	business_grams_of_co2e_per_pkm: 594.24,
	first_grams_of_co2e_per_pkm: 819.61
}

