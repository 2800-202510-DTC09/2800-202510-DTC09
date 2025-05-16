import {Schema, model} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export const MonthlyData = model(
    'monthly-data',
    new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
                autopopulate: true,
            },
            emissions: [
                {
                    label: {type: String, required: true},
                    value: {type: Number, required: true},
                },
            ],
            month: {type: Number, required: true},
            year: {type: Number, required: true},
        },
        {timestamps: true},
    )
        .plugin(mongooseAutoPopulate)
        .plugin(mongooseUniqueValidator),
);
