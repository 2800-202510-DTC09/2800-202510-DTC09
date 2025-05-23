import * as constants from './climate-emissions-factors.mjs';

function consoletest() {
    console.log('Beef CO₂ per kg:', constants.beef_co2e_per_kg);
    console.log('Lamb CO₂ per kg:', constants.lamb_co2e_per_kg);
    console.log('Chicken CO₂ per kg:', constants.chicken_co2e_per_kg);
    console.log('Pork CO₂ per kg:', constants.pork_co2e_per_kg);
    console.log('Cheese CO₂ per kg:', constants.cheese_co2e_per_kg);
    console.log('Milk CO₂ per L:', constants.milk_co2e_per_L);

    console.log(
        'Amazon shipping emissions per dollar:',
        constants.grams_of_co2e_emitted_per_dollar_on_amazon_shipping,
    );

    console.log(
        'Electricity CO₂ per kWh:',
        constants.electricity_grams_of_co2e_per_kwh,
    );

    console.log(
        'Domestic business class emissions per km:',
        constants.domestic_business_class_coefficient_per_km,
    );
    console.log(
        'Domestic first class emissions per km:',
        constants.domestic_first_class_coefficent_per_km,
    );
    console.log(
        'International business class emissions per km:',
        constants.international_business_class_coefficient_per_km,
    );
    console.log(
        'International first class emissions per km:',
        constants.international_first_class_coefficient_per_km,
    );

    console.log(
        'Clothing production emissions per kg:',
        constants.kg_of_co2e_produced_by_kg_of_clothing_production,
    );

    console.log(
        'Natural gas emissions per kWh:',
        constants.housing_natural_gas_coefficient_per_kWh,
    );
    console.log(
        'Heating oil emissions per kWh:',
        constants.housing_heating_oil_coefficient_per_kWh,
    );
    console.log(
        'Coal emissions per kWh:',
        constants.housing_coal_coefficient_per_kWh,
    );
    console.log(
        'Propane emissions per kWh:',
        constants.housing_propane_coefficient_per_kWh,
    );

    console.log(
        'Natural gas emissions per cubic meter:',
        constants.housing_natural_gas_coefficient_per_meter_cubed,
    );
    console.log(
        'Heating oil emissions per litre:',
        constants.housing_heating_oil_coefficient_per_litre,
    );
    console.log(
        'Coal emissions per kg:',
        constants.housing_coal_coefficient_per_kg,
    );
    console.log(
        'Propane emissions per litre:',
        constants.housing_propane_coefficient_per_litre,
    );

    console.log(
        'Gasoline emissions per litre:',
        constants.vehicle_gasoline_coefficient_per_litre,
    );
    console.log(
        'Diesel emissions per litre:',
        constants.vehicle_diesel_coefficient_per_litre,
    );
}

export function getHousingEmissions(record) {
    let housingEmissions = 0;

    if (record.housing_natural_gas_unit === 'm³') {
        housingEmissions +=
            record.housing_natural_gas_amount *
            constants.housing_natural_gas_coefficient_per_meter_cubed;
    } else if (record.housing_natural_gas_unit === 'kWh') {
        housingEmissions +=
            record.housing_natural_gas_amount *
            constants.housing_natural_gas_coefficient_per_kWh;
    }

    if (record.housing_heating_oil_unit === 'L') {
        housingEmissions +=
            record.housing_heating_oil_amount *
            constants.housing_heating_oil_coefficient_per_litre;
    } else if (record.housing_natural_gas_unit === 'kWh') {
        housingEmissions +=
            record.housing_heating_oil_amount *
            constants.housing_heating_oil_coefficient_per_kWh;
    }

    if (record.housing_coal_unit === 'kg') {
        housingEmissions +=
            record.housing_coal_amount *
            constants.housing_coal_coefficient_per_kg;
    } else if (record.housing_coal_unit === 'kWh') {
        housingEmissions +=
            record.housing_coal_amount *
            constants.housing_coal_coefficient_per_kWh;
    }

    if (record.housing_propane_unit === 'L') {
        housingEmissions +=
            record.housing_propane_amount *
            constants.housing_propane_coefficient_per_litre;
    } else if (record.housing_propane_unit === 'kWh') {
        housingEmissions +=
            record.housing_propane_amount *
            constants.housing_propane_coefficient_per_kWh;
    }

    if (record.housing_people > 0) {
        housingEmissions /= record.housing_people;
    }
    console.log('Housing emissions', housingEmissions);

    return housingEmissions;
}

export function getVehicleEmissions(record) {
    let vehicleEmissions = 0;

    for (let i = 0; i < record.vehicle_amount; i++) {
        const vehicle = record.vehicles[i];
        if (vehicle.vehicle_type === 'Gas') {
            vehicleEmissions +=
                (vehicle.vehicle_distance *
                    vehicle.vehicle_fuel_efficiency *
                    constants.vehicle_gasoline_coefficient_per_litre) /
                100;
        } else if (vehicle.vehicle_type === 'Diesel') {
            vehicleEmissions +=
                (vehicle.vehicle_distance *
                    vehicle.vehicle_fuel_efficiency *
                    constants.vehicle_diesel_coefficient_per_litre) /
                100;
        } else if (vehicle.vehicles_type === 'Electric') {
            vehicleEmissions +=
                (vehicle_charging *
                    constants.vehicle_charging_coefficent_per_dollar) /
                100;
        }
    }

    return vehicleEmissions;
}

export function getWaterEmissions(record) {
    let waterEmissions = 0;

    if (record.water_amount_unit === 'm³') {
        waterEmissions +=
            record.water_amount * constants.water_coefficient_per_mcubed;
    }

    return waterEmissions;
}

export function getElectricityEmissions(record) {
    let electricityEmissions = 0;

    if (record.electricity_amount_unit === 'kWh') {
        electricityEmissions +=
            (record.electricity_amount *
                constants.electricity_grams_of_co2e_per_kwh) /
            1000;
    }

    return electricityEmissions;
}

export function getDietEmissions(record) {
    let dietEmissions = 0;
    console.log(record.diet_beef_unit === 'kg');
    if (record.diet_beef_unit === 'kg') {
        dietEmissions += record.diet_beef_amount * constants.beef_co2e_per_kg;
    }

    if (record.diet_pork_unit === 'kg') {
        dietEmissions += record.diet_pork_amount * constants.pork_co2e_per_kg;
    }

    if (record.diet_chicken_unit === 'kg') {
        dietEmissions +=
            record.diet_chicken_amount * constants.chicken_co2e_per_kg;
    }

    if (record.diet_cheese_unit === 'kg') {
        dietEmissions +=
            record.diet_cheese_amount * constants.cheese_co2e_per_kg;
    }

    if (record.diet_milk_unit === 'L') {
        dietEmissions += record.diet_milk_amount * constants.milk_co2e_per_L;
    }

    return dietEmissions;
}
export function getLifestyleEmissions(record) {
    let lifestyleEmissions = 0;

    if (record.lifestyle_flights_class === 'Business') {
        if (record.lifestyle_domestic_flights_distance_unit === 'km') {
            lifestyleEmissions +=
                record.lifestyle_domestic_flights_distance *
                constants.domestic_business_class_coefficient_per_km;
        }

        if (record.lifestyle_international_flights_distance_unit === 'km') {
            lifestyleEmissions +=
                record.lifestyle_international_flights_distance *
                constants.international_business_class_coefficient_per_km;
        }
    } else if (record.lifestyle_flights_class === 'First Class') {
        if (record.lifestyle_domestic_flights_distance_unit === 'km') {
            lifestyleEmissions +=
                record.lifestyle_domestic_flights_distance *
                constants.domestic_first_class_coefficient_per_km;
        }

        if (record.lifestyle_international_flights_distance_unit === 'km') {
            lifestyleEmissions +=
                record.lifestyle_international_flights_distance *
                constants.international_first_class_coefficient_per_km;
        }
    }

    if (record.lifestyle_clothing_purchased_amount_unit === 'kg') {
        lifestyleEmissions +=
            record.lifestyle_clothing_purchased_amount *
            constants.kg_of_co2e_produced_by_kg_of_clothing_production;
    }

    if (record.lifestyle_shipping_amount_unit === '$') {
        lifestyleEmissions +=
            (record.lifestyle_shipping_amount *
                constants.grams_of_co2e_emitted_per_dollar_on_amazon_shipping) /
            1000;
    }
    console.log('lifestyle emissions', lifestyleEmissions);
    return lifestyleEmissions;
}

export function getAllEmissions(record) {
    let emissions = 0;
    emissions += getHousingEmissions(record);
    emissions += getVehicleEmissions(record);
    emissions += getWaterEmissions(record);
    emissions += getElectricityEmissions(record);
    emissions += getDietEmissions(record);
    emissions += getLifestyleEmissions(record);
    return emissions;
}

consoletest();
