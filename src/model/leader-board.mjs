import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export const LeaderBoard = model(
   'leader-board',
   new Schema(
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            autopopulate: true,
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
