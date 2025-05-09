import {model, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongooseAutoPopulate from 'mongoose-autopopulate';

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
   )
      .plugin(mongooseUniqueValidator, {
         message: 'Path `{PATH}` is not unique.',
      })
      .plugin(mongooseAutoPopulate),
);

export const normalize = (v) =>
   [
      v,
   ]
      .flat()
      .filter((w) => w)
      .map((w) => {
         {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
               return Object.fromEntries(
                  [
                     'id',
                     'name',
                     'description',
                  ].map((x) => [
                     x,
                     w[x],
                  ]),
               );
            } else {
               return null;
            }
         }
      })
      .filter((v) => v);
