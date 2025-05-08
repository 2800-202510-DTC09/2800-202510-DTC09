import {model, Schema} from 'mongoose';

export const Record = model(
   'record',
   new Schema(
      {
         userId: {
            type: Schema.Types.ObjectId,
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
            required: true,
         },
         deletedAt: {
            type: Schema.Types.Date,
         },
      },
      {timestamps: true},
   ).plugin(mongooseUniqueValidator, {
      message: 'Path `{PATH}` is not unique.',
   }),
);
