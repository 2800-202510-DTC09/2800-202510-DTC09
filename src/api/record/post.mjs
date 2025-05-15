import {status} from 'http-status';
import {Error} from 'mongoose';
import {Record, normalize} from '../../model/record.mjs';
import {record} from './index.mjs';
import mongoose from 'mongoose';


/**
 * @openapi
 * /record:
 *   post:
 *     description: Create record
 *     tags:
 *       - Record
 *     requestBody:
 *       description: Record information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 681342414429d3a18ad3fb45
 *               emission:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: New car first drive
 *               type:
 *                 type: string
 *                 example: 681a3ef31674a09cc7fa43e3
 *     responses:
 *       200:
 *         description: An record is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
record.post('/', async (req, res) => {

    console.log(req.body);
    const user = new mongoose.Types.ObjectId(String(JSON.parse(req.body.userID).id));
    const peopleInHouse = Number(req.body["people-in-house"]);
    const peopleInHouseUnits = req.body["people-in-house-units"];
    const naturalGasAmount = Number(req.body["natural-gas-amount"]);
    const naturalGasAmountUnits = req.body["natural-gas-amount-units"];
    const heatingOilAmount = Number(req.body["heating-oil-amount"]);
    const heatingOilAmountUnits = req.body["heating-oil-amount-units"];
    const propaneAmount = Number(req.body["propane-amount"]);
    const propaneAmountUnits = req.body["propane-amount-units"];
    const coalAmount = Number(req.body["coal-amount"]);
    const coalAmountUnits = req.body["coal-amount-units"];
    const numberOfCars = Number(req.body["number-of-cars"]);
    const electricityUsage = Number(req.body["electricity-usage"]);
    const electricityUsageUnits = req.body["electricity-usage-units"];
    const waterUsage = Number(req.body["water-usage"]);
    const waterUsageUnits = req.body["water-usage-units"];
    const beefEaten = Number(req.body["beef-eaten"]);
    const beefEatenUnits = req.body["beef-eaten-units"];
    const porkEaten = Number(req.body["pork-eaten"]);
    const porkEatenUnits = req.body["pork-eaten-units"];
    const chickenEaten = Number(req.body["chicken-eaten"]);
    const chickenEatenUnits = req.body["chicken-eaten-units"];
    const cheeseEaten = Number(req.body["cheese-eaten"]);
    const cheeseEatenUnits = req.body["cheese-eaten-units"];
    const milkDrunk = Number(req.body["milk-drunk"]);
    const milkDrunkUnits = req.body["milk-drunk-units"];
    const domesticFlightDistance = Number(req.body["domestic-flight-distance"]);
    const domesticFlightDistanceUnits = req.body["domestic-flight-distance-units"];
    const internationalFlightDistance = Number(req.body["international-flight-distance"]);
    const internationalFlightDistanceUnits = req.body["international-flight-distance-units"];
    const flightClass = req.body["flight-class"];
    const clothingMass = Number(req.body["clothing-mass"]);
    const clothingMassUnits = req.body["clothing-mass-units"];
    const amountShipped = Number(req.body["amount-shipped"]);
    const amountShippedUnits = req.body["amount-shipped-units"];

    console.log("User ID:", user);
console.log("People in house:", peopleInHouse);
console.log("People in house (units):", peopleInHouseUnits);
console.log("Natural gas amount:", naturalGasAmount);
console.log("Natural gas amount (units):", naturalGasAmountUnits);
console.log("Heating oil amount:", heatingOilAmount);
console.log("Heating oil amount (units):", heatingOilAmountUnits);
console.log("Propane amount:", propaneAmount);
console.log("Propane amount (units):", propaneAmountUnits);
console.log("Coal amount:", coalAmount);
console.log("Coal amount (units):", coalAmountUnits);
console.log("Number of cars:", numberOfCars);
console.log("Electricity usage:", electricityUsage);
console.log("Electricity usage (units):", electricityUsageUnits);
console.log("Water usage:", waterUsage);
console.log("Water usage (units):", waterUsageUnits);
console.log("Beef eaten:", beefEaten);
console.log("Beef eaten (units):", beefEatenUnits);
console.log("Pork eaten:", porkEaten);
console.log("Pork eaten (units):", porkEatenUnits);
console.log("Chicken eaten:", chickenEaten);
console.log("Chicken eaten (units):", chickenEatenUnits);
console.log("Cheese eaten:", cheeseEaten);
console.log("Cheese eaten (units):", cheeseEatenUnits);
console.log("Milk drunk:", milkDrunk);
console.log("Milk drunk (units):", milkDrunkUnits);
console.log("Domestic flight distance:", domesticFlightDistance);
console.log("Domestic flight distance (units):", domesticFlightDistanceUnits);
console.log("International flight distance:", internationalFlightDistance);
console.log("International flight distance (units):", internationalFlightDistanceUnits);
console.log("Flight class:", flightClass);
console.log("Clothing mass:", clothingMass);
console.log("Clothing mass (units):", clothingMassUnits);
console.log("Amount shipped:", amountShipped);
console.log("Amount shipped (units):", amountShippedUnits);




    const vehicles = [];

    for (let i = 1; i <= numberOfCars; i++) {
        const vehicle = {
            vehicle_type: req.body[`vehicle-${i}-type`]
        };

        if (req.body[`vehicle-${i}-efficiency`] !== undefined) {
            vehicle.vehicle_fuel_efficiency = Number(req.body[`vehicle-${i}-efficiency`]);
        }
        if (req.body[`vehicle-${i}-distance`] !== undefined) {
            vehicle.vehicle_distance = Number(req.body[`vehicle-${i}-distance`]);
        }
        if (req.body[`vehicle-${i}-charge-amount`] !== undefined) {
            vehicle.vehicle_charging = Number(req.body[`vehicle-${i}-charge-amount`]);
        }

        vehicles.push(vehicle);
    };

    const emissions = 0;
    const description = "Form submitted";
    const deletedAt = new Date();

    try {
         res.status(status.OK).json(
            normalize(
                await new Record({
                    user,
                    housing_people: peopleInHouse, // ✅ Matches schema name
                    housing_people_unit: peopleInHouseUnits,
                    housing_natural_gas_amount: naturalGasAmount,
                    housing_natural_gas_unit: naturalGasAmountUnits,
                    housing_heating_oil_amount: heatingOilAmount,
                    housing_heating_oil_unit: heatingOilAmountUnits,
                    housing_propane_amount: propaneAmount,
                    housing_propane_unit: propaneAmountUnits,
                    housing_coal_amount: coalAmount,
                    housing_coal_unit: coalAmountUnits,
                    vehicle_amount: numberOfCars,
                    vehicles,
                    electricity_amount: electricityUsage,
                    electricity_amount_unit: electricityUsageUnits,
                    water_amount: waterUsage,
                    water_amount_unit: waterUsageUnits,
                    diet_beef_amount: beefEaten,
                    diet_beef_unit: beefEatenUnits,
                    diet_pork_amount: porkEaten,
                    diet_pork_unit: porkEatenUnits,
                    diet_chicken_amount: chickenEaten,
                    diet_chicken_unit: chickenEatenUnits,
                    diet_cheese_amount: cheeseEaten,
                    diet_cheese_unit: cheeseEatenUnits,
                    diet_milk_amount: milkDrunk,
                    diet_milk_unit: milkDrunkUnits,
                    lifestyle_domestic_flights_distance: domesticFlightDistance,
                    lifestyle_domestic_flights_distance_unit: domesticFlightDistanceUnits,
                    lifestyle_international_flights_distance: internationalFlightDistance,
                    lifestyle_international_flights_distance_unit: internationalFlightDistanceUnits,
                    lifestyle_flights_class: flightClass,
                    lifestyle_clothing_purchased_amount: clothingMass,
                    lifestyle_clothing_purchased_amount_unit: clothingMassUnits,
                    lifestyle_shipping_amount: amountShipped,
                    lifestyle_shipping_amount_unit: amountShippedUnits,
                    emission: emissions,
                    description,
                    deletedAt
                })
                .save(),
            ).pop(),
            console.log("form saved to db (hopefully)")
         )
    } catch (e) {
        if (e.name === Error.ValidationError.name) {
        res.status(status.BAD_REQUEST).json(e.errors);
    } else {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
    }

});
