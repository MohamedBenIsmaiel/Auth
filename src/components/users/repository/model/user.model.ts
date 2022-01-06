import { Schema, model } from 'mongoose';

import { IUser } from '../../type';
import { userEnums } from '../../entities';

const user = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      country: { type: String },
      city: { type: String },
      street: { type: String }
    },
    mobileNumber: { type: String },
    role: { type: String, enum: userEnums.values() },
    hobbies: [{ type: String }]
  },
  { timestamps: true, minimize: false }
);

user.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  }
});

export default model<IUser>('User', user, 'users');
