import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export const Badge = model(
   'badge',
   new Schema(
      {
         name: {
            type: Schema.Types.String,
            required: true,
            unique: true,
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
         deletedAt: {
            type: Schema.Types.Date,
         },
      },
      {timestamps: true},
   ).plugin(mongooseUniqueValidator, {
      message: 'Path `{PATH}` is not unique.',
   }),
);
