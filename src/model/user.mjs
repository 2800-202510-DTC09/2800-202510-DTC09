import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export const User = model(
   'user',
   new Schema(
      {
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
               Schema.Types.ObjectId,
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
                  id: {
                     type: Schema.Types.ObjectId,
                  },
                  factor: {
                     type: Schema.Types.Number,
                  },
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
   ).plugin(mongooseUniqueValidator, {
      message: 'Path `{PATH}` is not unique.',
   }),
);
