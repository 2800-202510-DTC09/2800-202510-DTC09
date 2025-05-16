import {status} from 'http-status';
import {Record, normalize} from '../../model/record.mjs';
import {record} from './index.mjs';
/**
 * @openapi
 * /record/{id}:
 *   put:
 *     description: Update record
 *     tags:
 *       - Record
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Record ID
 *     requestBody:
 *       description: Record information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criteria:
 *                 type: string
 *                 example: date > 0
 *     responses:
 *       200:
 *         description: Record is updated
 *       404:
 *         description: Record not found
 */
record.put('/:id', async (req, res) => {
    try {
        const recordData = await Record.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (recordData) {
            const peopleInHouse = Number(req.body['people-in-house']);
            const peopleInHouseUnits = req.body['people-in-house-units'];
            const naturalGasAmount = Number(req.body['natural-gas-amount']);
            const naturalGasAmountUnits = req.body['natural-gas-amount-units'];
            const heatingOilAmount = Number(req.body['heating-oil-amount']);
            const heatingOilAmountUnits = req.body['heating-oil-amount-units'];
            const propaneAmount = Number(req.body['propane-amount']);
            const propaneAmountUnits = req.body['propane-amount-units'];
            const coalAmount = Number(req.body['coal-amount']);
            const coalAmountUnits = req.body['coal-amount-units'];
            const numberOfCars = Number(req.body['number-of-cars']);
            const electricityUsage = Number(req.body['electricity-usage']);
            const electricityUsageUnits = req.body['electricity-usage-units'];
            const waterUsage = Number(req.body['water-usage']);
            const waterUsageUnits = req.body['water-usage-units'];
            const beefEaten = Number(req.body['beef-eaten']);
            const beefEatenUnits = req.body['beef-eaten-units'];
            const porkEaten = Number(req.body['pork-eaten']);
            const porkEatenUnits = req.body['pork-eaten-units'];
            const chickenEaten = Number(req.body['chicken-eaten']);
            const chickenEatenUnits = req.body['chicken-eaten-units'];
            const cheeseEaten = Number(req.body['cheese-eaten']);
            const cheeseEatenUnits = req.body['cheese-eaten-units'];
            const milkDrunk = Number(req.body['milk-drunk']);
            const milkDrunkUnits = req.body['milk-drunk-units'];
            const domesticFlightDistance = Number(
                req.body['domestic-flight-distance'],
            );
            const domesticFlightDistanceUnits =
                req.body['domestic-flight-distance-units'];
            const internationalFlightDistance = Number(
                req.body['international-flight-distance'],
            );
            const internationalFlightDistanceUnits =
                req.body['international-flight-distance-units'];
            const flightClass = req.body['flight-class'];
            const clothingMass = Number(req.body['clothing-mass']);
            const clothingMassUnits = req.body['clothing-mass-units'];
            const amountShipped = Number(req.body['amount-shipped']);
            const amountShippedUnits = req.body['amount-shipped-units'];

            recordData.housing_people = peopleInHouse;
            recordData.housing_people_unit = peopleInHouseUnits;
            recordData.housing_natural_gas_amount = naturalGasAmount;
            recordData.housing_natural_gas_unit = naturalGasAmountUnits;
            recordData.housing_heating_oil_amount = heatingOilAmount;
            recordData.housing_heating_oil_unit = heatingOilAmountUnits;
            recordData.housing_propane_amount = propaneAmount;
            recordData.housing_propane_unit = propaneAmountUnits;
            recordData.housing_coal_amount = coalAmount;
            recordData.housing_coal_unit = coalAmountUnits;
            recordData.vehicle_amount = numberOfCars;
            recordData.electricity_amount = electricityUsage;
            recordData.electricity_amount_unit = electricityUsageUnits;
            recordData.water_amount = waterUsage;
            recordData.water_amount_unit = waterUsageUnits;
            recordData.diet_beef_amount = beefEaten;
            recordData.diet_beef_unit = beefEatenUnits;
            recordData.diet_pork_amount = porkEaten;
            recordData.diet_pork_unit = porkEatenUnits;
            recordData.diet_chicken_amount = chickenEaten;
            recordData.diet_chicken_unit = chickenEatenUnits;
            recordData.diet_cheese_amount = cheeseEaten;
            recordData.diet_cheese_unit = cheeseEatenUnits;
            recordData.diet_milk_amount = milkDrunk;
            recordData.diet_milk_unit = milkDrunkUnits;
            recordData.lifestyle_domestic_flights_distance =
                domesticFlightDistance;
            recordData.lifestyle_domestic_flights_distance_unit =
                domesticFlightDistanceUnits;
            recordData.lifestyle_international_flights_distance =
                internationalFlightDistance;
            recordData.lifestyle_international_flights_distance_unit =
                internationalFlightDistanceUnits;
            recordData.lifestyle_flights_class = flightClass;
            recordData.lifestyle_clothing_purchased_amount = clothingMass;
            recordData.lifestyle_clothing_purchased_amount_unit =
                clothingMassUnits;
            recordData.lifestyle_shipping_amount = amountShipped;
            recordData.lifestyle_shipping_amount_unit = amountShippedUnits;

            const vehicles = [];

            for (let i = 1; i <= numberOfCars; i++) {
                const vehicle = {
                    vehicle_type: req.body[`vehicle-${i}-type`],
                };

                if (req.body[`vehicle-${i}-efficiency`] !== undefined) {
                    vehicle.vehicle_fuel_efficiency = Number(
                        req.body[`vehicle-${i}-efficiency`],
                    );
                }
                if (req.body[`vehicle-${i}-distance`] !== undefined) {
                    vehicle.vehicle_distance = Number(
                        req.body[`vehicle-${i}-distance`],
                    );
                }
                if (req.body[`vehicle-${i}-charge-amount`] !== undefined) {
                    vehicle.vehicle_charging = Number(
                        req.body[`vehicle-${i}-charge-amount`],
                    );
                }

                vehicles.push(vehicle);
            }

            recordData.vehicles = vehicles;

            res.status(status.OK).json(
                normalize(await recordData.save()).pop(),
            );
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
