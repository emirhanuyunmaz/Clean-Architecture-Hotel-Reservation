import { model, Schema } from 'mongoose';
import { UserModel } from '../models/UserModel';

const schema = new Schema<UserModel>({
  // id : {type:String},
  nameSurname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailIsValid: { type: Boolean, default: false, required: false },
  admin: { type: Boolean, default: false, required: false },
});

export const User = model<UserModel>('users', schema);
