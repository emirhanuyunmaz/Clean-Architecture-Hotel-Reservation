import { model, Schema } from 'mongoose';
import { BookModel } from '../models/BookModel';

const schema = new Schema<BookModel>({
  description: { type: String, required: true },
  images: { type: [], required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  totalRoom: { type: String, required: true },
  roomFacilities: {
    bathroom: {
      active: String,
      value: String,
    },
    diningRoom: {
      active: String,
      value: String,
    },
    livingRoom: {
      active: String,
      value: String,
    },
    bedroom: {
      active: String,
      value: String,
    },
    refrigerator: {
      active: String,
      value: String,
    },
    totalRoom: {
      active: String,
      value: String,
    },
    tv: {
      active: String,
      value: String,
    },
    unityReady: {
      active: String,
      value: String,
    },
    wifiSpeed: {
      active: String,
      value: String,
    },
  },
});

export const Book = model<BookModel>('Book', schema);
