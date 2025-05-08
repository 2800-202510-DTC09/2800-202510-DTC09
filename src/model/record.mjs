import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export const Record = model(
   'record',
   new Schema(
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            autopopulate: true,
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
            autopopulate: true,
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
