/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable no-undefined */
/* eslint-disable dot-notation */
/* eslint-disable prettierPlugin/prettier */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {status} from 'http-status';
import {Error, Mongoose} from 'mongoose';
import {Record, normalize} from '../../model/record.mjs';
import {record} from './index.mjs';
import mongoose from 'mongoose';
import { truncates } from 'bcryptjs';


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
    const user = req.body["user"];

    const housing_people = Number(req.body["housing_people"]);
    const housing_natural_gas_amount = Number(req.body["housing_natural_gas_amount"]);
    const housing_heating_oil_amount = Number(req.body["housing_heating_oil_amount"]);
    const housing_propane_amount = Number(req.body["housing_propane_amount"]);
    const housing_coal_amount = Number(req.body["housing_coal_amount"]);
    const vehicle_amount = Number(req.body["vehicle_amount"]);
    const electricity_amount = Number(req.body["electricity_amount"]);
    const water_amount = Number(req.body["water_amount"]);
    const diet_beef_amount = Number(req.body["diet_beef_amount"]);
    const diet_pork_amount = Number(req.body["diet_pork_amount"]);
    const diet_chicken_amount = Number(req.body["diet_chicken_amount"]);
    const diet_cheese_amount = Number(req.body["diet_cheese_amount"]);
    const diet_milk_amount = Number(req.body["diet_milk_amount"]);
    const lifestyle_domestic_flights_distance = Number(req.body["lifestyle_domestic_flights_distance"]);
    const lifestyle_international_flights_distance = Number(req.body["lifestyle_international_flights_distance"]);
    const lifestyle_clothing_purchased_amount = Number(req.body["lifestyle_clothing_purchased_amount"]);
    const lifestyle_shipping_amount = Number(req.body["lifestyle_shipping_amount"]);

    const housing_people_unit = req.body["housing_people_unit"];
    const housing_natural_gas_unit = req.body["housing_natural_gas_amount_unit"];
    const housing_heating_oil_unit = req.body["housing_heating_oil_amount_unit"];
    const housing_propane_unit = req.body["housing_propane_amount_unit"];
    const housing_coal_unit = req.body["housing_coal_amount_unit"];
    const electricity_amount_unit = req.body["electricity_amount_unit"];
    const water_amount_unit = req.body["water_amount_unit"];
    const diet_beef_unit = req.body["diet_beef_unit"];
    const diet_pork_unit = req.body["diet_pork_unit"];
    const diet_chicken_unit = req.body["diet_chicken_unit"];
    const diet_cheese_unit = req.body["diet_cheese_unit"];
    const diet_milk_unit = req.body["diet_milk_unit"];
    const lifestyle_domestic_flights_distance_unit = req.body["lifestyle_domestic_flights_distance_unit"];
    const lifestyle_international_flights_distance_unit = req.body["lifestyle_international_flights_distance_unit"];
    const lifestyle_flights_class = req.body["lifestyle_flights_class"];
    const lifestyle_clothing_purchased_amount_unit = req.body["lifestyle_clothing_purchased_amount_unit"];
    const lifestyle_shipping_amount_unit = req.body["lifestyle_shipping_amount_unit"];
    
    const vehicles = [];

    for (let i = 1; i <= vehicle_amount; i++) {
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

    try {
            const newRecord = await Record.findOneAndUpdate(
                {user: user},
                {$set: {
                    housing_people: housing_people,
                    housing_people_unit: housing_people_unit,
                    housing_natural_gas_amount: housing_natural_gas_amount,
                    housing_natural_gas_unit: housing_natural_gas_unit,
                    housing_heating_oil_amount: housing_heating_oil_amount,
                    housing_heating_oil_unit: housing_heating_oil_unit,
                    housing_propane_amount: housing_propane_amount,
                    housing_propane_unit: housing_propane_unit,
                    housing_coal_amount: housing_coal_amount,
                    housing_coal_unit: housing_coal_unit,
                    vehicle_amount: vehicle_amount,
                    vehicles: vehicles,
                    electricity_amount: electricity_amount,
                    electricity_amount_unit: electricity_amount_unit,
                    water_amount: water_amount,
                    water_amount_unit: water_amount_unit,
                    diet_beef_amount: diet_beef_amount,
                    diet_beef_unit: diet_beef_unit,
                    diet_pork_amount: diet_pork_amount,
                    diet_pork_unit: diet_pork_unit,
                    diet_chicken_amount: diet_chicken_amount,
                    diet_chicken_unit: diet_chicken_unit,
                    diet_cheese_amount: diet_cheese_amount,
                    diet_cheese_unit: diet_cheese_unit,
                    diet_milk_amount: diet_milk_amount,
                    diet_milk_unit: diet_milk_unit,
                    lifestyle_domestic_flights_distance: lifestyle_domestic_flights_distance,
                    lifestyle_domestic_flights_distance_unit: lifestyle_domestic_flights_distance_unit,
                    lifestyle_international_flights_distance: lifestyle_international_flights_distance,
                    lifestyle_international_flights_distance_unit: lifestyle_international_flights_distance_unit,
                    lifestyle_flights_class: lifestyle_flights_class,
                    lifestyle_clothing_purchased_amount: lifestyle_clothing_purchased_amount,
                    lifestyle_clothing_purchased_amount_unit: lifestyle_clothing_purchased_amount_unit,
                    lifestyle_shipping_amount: lifestyle_shipping_amount,
                    lifestyle_shipping_amount_unit: lifestyle_shipping_amount_unit
                }},
                {new: true}
            )
    } catch (e) {
        if (e.name === Error.ValidationError.name) {
        res.status(status.BAD_REQUEST).json(e.errors);
    } else {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
    }

    res.redirect("/progress.html")
});
