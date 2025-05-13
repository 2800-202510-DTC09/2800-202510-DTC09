import {Schema, model} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import {normalize as badgeNormalize} from './badge.mjs';
import {normalize as goalNormalize} from './goal.mjs';
import {normalize as recordNormalize} from './record.mjs';
import {normalize as typeNormalize} from './type.mjs';

export const User = model(
    'user',
    new Schema(
        {
            email: {
                type: Schema.Types.String,
                required: true,
                unique: true,
            },
            username: {
                type: Schema.Types.String,
                required: true,
                unique: true,
            },
            password: {
                type: Schema.Types.String,
                required: true,
            },
            badges: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'badge',
                        required: true,
                        autopopulate: true,
                    },
                ],
                required: true,
                default: [],
            },
            goals: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'goal',
                        required: true,
                        autopopulate: true,
                    },
                ],
                required: true,
                default: [],
            },
            score: {
                type: Schema.Types.Number,
                required: true,
                default: 0,
            },
            types: {
                type: [
                    {
                        type: {
                            type: Schema.Types.ObjectId,
                            ref: 'type',
                            required: true,
                            autopopulate: true,
                        },
                        factor: {
                            type: Schema.Types.Number,
                            required: true,
                        },
                    },
                ],
                required: true,
                default: [],
            },
            records: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'record',
                        required: true,
                        autopopulate: true,
                    },
                ],
                required: true,
                default: [],
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
                return {
                    ...Object.fromEntries(
                        ['id', 'email', 'username', 'score'].map((x) => [
                            x,
                            w[x],
                        ]),
                    ),
                    badges: w.badges.map((x) => badgeNormalize(x)),
                    goals: w.goals.map((x) => goalNormalize(x)),
                    types: w.types.map((x) => ({
                        type: typeNormalize(x.type),
                        factor: x.factor,
                    })),
                    records: w.records.map((x) => recordNormalize(x)),
                };
            }
            return null;
        })
        .filter((w) => w);
}
