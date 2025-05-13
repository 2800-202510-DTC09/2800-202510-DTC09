import {env} from 'process';
import axios from 'axios';
import {status} from 'http-status';
import {Error, Schema, model, mongo} from 'mongoose';
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
            emission: {
                type: Schema.Types.Number,
                required: true,
            },
            description: {
                type: Schema.Types.String,
                required: true,
                default: '',
            },
            type: {
                type: Schema.Types.ObjectId,
                ref: 'type',
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

                try {
                    await axios.get(
                        `http://127.0.0.1:${env.PORT}/api/type/${res.type}`,
                    );
                } catch (err) {
                    if (err.status === status.NOT_FOUND) {
                        e.addError(
                            'type',
                            new Error.ValidatorError({
                                message: 'Path `type` is invalid.',
                                type: 'required',
                                path: 'type',
                                value: res.type,
                                reason: '`type` not found in `types`',
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
                        ['id', 'emission', 'description'].map((x) => [x, w[x]]),
                    ),
                    user:
                        w.user instanceof mongo.ObjectId
                            ? w.user
                            : userNormalize(w.user),
                    type:
                        w.type instanceof mongo.ObjectId
                            ? w.type
                            : typeNormalize(w.type),
                };
            }
            return null;
        })
        .filter((w) => w);
}
