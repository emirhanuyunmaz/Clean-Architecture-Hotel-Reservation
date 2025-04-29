import { model, Schema } from 'mongoose';
import { ResetPasswordCodeModel } from '../models/ResetPasswordCodeModel';

const schema = new Schema<ResetPasswordCodeModel>({
  email: String,
  code: String,
});

export const ResetPasswordCode = model<ResetPasswordCodeModel>(
  'ResetPasswordCode',
  schema
);
