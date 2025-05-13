import {Error, Schema, model, mongo} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import {normalize as userNormalize} from './user.mjs';

export const Goal = model(
    'goal',
    new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            name: {
                type: Schema.Types.String,
                required: true,
            },
            description: {
                type: Schema.Types.String,
                required: true,
                default: '',
            },
            icon: {
                type: Schema.Types.String,
                required: true,
                default: '/assets/leaf.png',
            },
            emission: {
                type: Schema.Types.Number,
            },
            emissionDiff: {
                type: Schema.Types.Number,
            },
            emissionDiffStart: {
                type: Schema.Types.Date,
            },
            emissionDiffEnd: {
                type: Schema.Types.Date,
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
        // eslint-disable-next-line max-lines-per-function
        .plugin((schema) => {
            // eslint-disable-next-line max-lines-per-function, max-statements
            schema.post('validate', (res, next) => {
                const e = new Error.ValidationError();

                const hasEmission = typeof res.emission === 'number';
                const hasEmissionDiff = typeof res.emissionDiff === 'number';
                const hasEmissionDiffStart =
                    res.emissionDiffStart instanceof Date;
                const hasEmissionDiffEnd = res.emissionDiffEnd instanceof Date;

                if (hasEmission && hasEmissionDiff) {
                    e.addError(
                        'emissionDiff',
                        new Error.ValidatorError({
                            message:
                                'Path `emissionDiff` is conflicted with `emission`.',
                            type: 'xor',
                            path: 'emissionDiff',
                            value: res.emissionDiff,
                            reason: '`emission` and `emissionDiff` both exist',
                        }),
                    );
                }

                if (hasEmission && hasEmissionDiffStart) {
                    e.addError(
                        'emissionDiffStart',
                        new Error.ValidatorError({
                            message:
                                'Path `emissionDiffStart` is conflicted with `emission`.',
                            type: 'xor',
                            path: 'emissionDiffStart',
                            value: res.emissionDiffStart,
                            reason: '`emission` and `emissionDiffStart` both exist',
                        }),
                    );
                }

                if (hasEmission && hasEmissionDiffEnd) {
                    e.addError(
                        'emissionDiffEnd',
                        new Error.ValidatorError({
                            message:
                                'Path `emissionDiffEnd` is conflicted with `emission`.',
                            type: 'xor',
                            path: 'emissionDiffEnd',
                            value: res.emissionDiffEnd,
                            reason: '`emission` and `emissionDiffEnd` both exist',
                        }),
                    );
                }

                if (!hasEmission && !hasEmissionDiff) {
                    e.addError(
                        'emission',
                        new Error.ValidatorError({
                            message: 'Path `emission` is empty.',
                            type: 'required',
                            path: 'emission',
                            value: res.emission,
                            reason: '`emission` and `emissionDiff` are both empty',
                        }),
                    );
                }

                if (!hasEmission && !hasEmissionDiffStart) {
                    e.addError(
                        'emissionDiffStart',
                        new Error.ValidatorError({
                            message: 'Path `emissionDiffStart` is empty.',
                            type: 'required',
                            path: 'emissionDiffStart',
                            value: res.emissionDiffStart,
                            reason: '`emissionDiff` exists but `emissionDiffStart` is empty',
                        }),
                    );
                }

                if (!hasEmission && !hasEmissionDiffEnd) {
                    e.addError(
                        'emissionDiffEnd',
                        new Error.ValidatorError({
                            message: 'Path `emissionDiffEnd` is empty.',
                            type: 'required',
                            path: 'emissionDiffEnd',
                            value: res.emissionDiffEnd,
                            reason: '`emissionDiff` exists but `emissionDiffEnd` is empty',
                        }),
                    );
                }

                if (Object.entries(e.errors).length) {
                    return next(e);
                }

                return next();
            });
        }),
);

export function normalize(v) {
    [v]
        .flat()
        .filter((w) => w)
        .map((w) => {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
                return {
                    ...Object.fromEntries(
                        [
                            'id',
                            'name',
                            'description',
                            'icon',
                            'emission',
                            'emissionDiff',
                            'emissionDiffStart',
                            'emissionDiffEnd',
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
