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
            data: [
                {
                    label: {type: String, required: true},
                    value: {type: Number, required: true},
                    date: {type: Date, required: true},
                },
            ],
        },
        {timestamps: true},
    )
        // Check for unique values
        .plugin(mongooseAutoPopulate)
        // Automatically populate fields
        .plugin(mongooseUniqueValidator),
);
