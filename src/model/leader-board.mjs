import {Schema, model, mongo} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import {normalize as userNormalize} from './user.mjs';

export const LeaderBoard = model(
    'leader-board',
    new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            rank: {
                type: Schema.Types.Number,
                required: true,
            },
            value: {
                type: Schema.Types.Number,
                required: true,
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
    return [v]
        .flat()
        .filter((w) => w)
        .map((w) => {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
                return {
                    ...Object.fromEntries(
                        ['id', 'rank', 'value'].map((x) => [x, w[x]]),
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
