import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongooseAutoPopulate from 'mongoose-autopopulate';

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
                  id: {
                     type: Schema.Types.ObjectId,
                     ref: 'type',
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
