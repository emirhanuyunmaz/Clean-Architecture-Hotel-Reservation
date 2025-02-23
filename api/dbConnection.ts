import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const dbConnect = async () => {
  try {
    await mongoose
      .connect(`${process.env.DB_URL}`)
      .then(() => console.log(`DB_URL : ${process.env.DB_URL} `));
  } catch (err) {
    console.log('DB ERROR:', err);
  }
};
