import {model, Schema} from 'mongoose';
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
   ).plugin(mongooseUniqueValidator, {
      message: 'Path `{PATH}` is not unique.',
   }),
);
