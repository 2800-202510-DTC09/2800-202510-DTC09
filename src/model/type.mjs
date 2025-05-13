import {Schema, model} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export const Type = model(
    'type',
    new Schema(
        {
            name: {
                type: Schema.Types.String,
                unique: true,
                required: true,
            },
            description: {
                type: Schema.Types.String,
                required: true,
                default: '',
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
        .plugin(mongooseAutoPopulate),
);

export function normalize(v) {
    [v]
        .flat()
        .filter((w) => w)
        .map((w) => {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
                return Object.fromEntries(
                    ['id', 'name', 'description'].map((x) => [x, w[x]]),
                );
            }
            return null;
        })
        .filter((w) => w);
}
