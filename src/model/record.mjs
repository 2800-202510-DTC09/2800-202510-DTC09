import {env} from 'process';
import axios from 'axios';
import {status} from 'http-status';
import {Error, Schema, model, mongo, trusted} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import {normalize as typeNormalize} from './type.mjs';
import {normalize as userNormalize} from './user.mjs';



export const Record = model(
    'record',
    new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            housing_people: {
                type: Number,
                required: true,
                default: 0,
            },
            housing_people_unit: {
                type: String,
                required: true,
                default: "people",
            },
            housing_natural_gas_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            housing_natural_gas_unit: {
                type: String,
                required: true,
                default: "L",
            },
            housing_heating_oil_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            housing_heating_oil_unit: {
                type: String,
                required: true,
                default: "L",
            },
            housing_propane_amount: {
                type: Number,
                required: true,
                default: 0
            },
            housing_propane_unit: {
                type: String,
                required: true,
                default: "L",
            },
            housing_coal_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            housing_coal_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            vehicle_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            vehicles: [{
                vehicle_type: {
                    type: String,
                    required: true,
                    default: "Gas",
                },
                vehicle_fuel_efficiency: {
                    type: Number,
                    required: false,
                    default: "0",
                },
                vehicle_distance: {
                    type: Number,
                    required: false,
                    default: 0,
                },
                vehicle_charging: {
                    type: Number,
                    required: false,
                    default: 0,
                }
            }],
            electricity_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            electricity_amount_unit: {
                type: String,
                required: true,
                default: "kWh",
            },
            water_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            water_amount_unit: {
                type: String,
                required: true,
                default:"m³"
            },
            diet_beef_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            diet_beef_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            diet_pork_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            diet_pork_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            diet_chicken_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            diet_chicken_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            diet_cheese_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            diet_cheese_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            diet_milk_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            diet_milk_unit: {
                type: String,
                required: true,
                default: "L",
            },
            lifestyle_domestic_flights_distance: {
                type: Number,
                required: true,
                default: 0,
            },
            lifestyle_domestic_flights_distance_unit: {
                type: String,
                required: true,
                default: "km",
            },
            lifestyle_international_flights_distance: {
                type: Number,
                required: true,
                default: 0,
            },
            lifestyle_international_flights_distance_unit: {
                type: String,
                required: true,
                default: "km",
            },
            lifestyle_flights_class: {
                type: String,
                required: true,
                default: "Business",
            },
            lifestyle_clothing_purchased_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            lifestyle_clothing_purchased_amount_unit: {
                type: String,
                required: true,
                default: "kg",
            },
            lifestyle_shipping_amount: {
                type: Number,
                required: true,
                default: 0,
            },
            lifestyle_shipping_amount_unit: {
                type: String,
                required: true,
                default: "packages",
            },
            emission: {
                type: Schema.Types.Number,
                required: true,
                default: 0,
            },
            description: {
                type: Schema.Types.String,
                required: true,
                default: 'no description provided',
            },
            deletedAt: {
                type: Schema.Types.Date,
            },
        },
        {timestamps: true},
    )
        .plugin(mongooseUniqueValidator, {
            message: 'Path `{PATH}` is not unique.',
        })
        .plugin(mongooseAutoPopulate)
        .plugin((schema) => {
            schema.post('validate', async (res, next) => {
                const e = new Error.ValidationError();

                try {
                    await axios.get(
                        `http://127.0.0.1:${env.PORT}/api/user/id/${res.user}`,
                    );
                } catch (err) {
                    if (err.status === status.NOT_FOUND) {
                        e.addError(
                            'user',
                            new Error.ValidatorError({
                                message: 'Path `user` is invalid.',
                                type: 'required',
                                path: 'user',
                                value: res.user,
                                reason: '`user` not found in `users`',
                            }),
                        );
                    }
                }

                if (Object.entries(e.errors).length) {
                    return next(e);
                }

                return next();
            });
        }),
);

export function normalize(v) {
    return [v]
        .flat()
        .filter((w) => w)
        .map((w) => {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
                return {
                    ...Object.fromEntries(
                        [
                            "user",
                            "housing_people",
                            "housing_people_unit",
                            "housing_natural_gas_amount",
                            "housing_natural_gas_unit",
                            "housing_heating_oil_amount",
                            "housing_heating_oil_unit",
                            "housing_propane_amount",
                            "housing_propane_unit",
                            "housing_coal_amount",
                            "housing_coal_unit",
                            "vehicle_amount",
                            "vehicles",
                            "electricity_amount",
                            "electricity_amount_unit",
                            "water_amount",
                            "water_amount_unit",
                            "diet_beef_amount",
                            "diet_beef_unit",
                            "diet_pork_amount",
                            "diet_pork_unit",
                            "diet_chicken_amount",
                            "diet_chicken_unit",
                            "diet_cheese_amount",
                            "diet_cheese_unit",
                            "diet_milk_amount",
                            "diet_milk_unit",
                            "lifestyle_domestic_flights_distance",
                            "lifestyle_domestic_flights_distance_unit",
                            "lifestyle_international_flights_distance",
                            "lifestyle_international_flights_distance_unit",
                            "lifestyle_flights_class",
                            "lifestyle_clothing_purchased_amount",
                            "lifestyle_clothing_purchased_amount_unit",
                            "lifestyle_shipping_amount",
                            "lifestyle_shipping_amount_unit",
                            "emission",
                            "description",
                            "deletedAt"
                        ].map((x) => [x, w[x]]),
                    ),
                    user:
                        w.user instanceof mongo.ObjectId
                            ? w.user
                            : userNormalize(w.user),
                };
            }
            return null;
        })
        .filter((w) => w);
}
