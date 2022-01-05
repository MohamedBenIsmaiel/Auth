import { Schema, model } from 'mongoose';

import { IUser } from '../../type';
import { userEnums } from '../../entities';

const userSchema = new Schema<IUser>({
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
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
