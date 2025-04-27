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
      active: Boolean,
      value: String,
    },
    diningRoom: {
      active: Boolean,
      value: String,
    },
    livingRoom: {
      active: Boolean,
      value: String,
    },
    bedroom: {
      active: Boolean,
      value: String,
    },
    refrigerator: {
      active: Boolean,
      value: String,
    },
    totalRoom: {
      active: Boolean,
      value: String,
    },
    tv: {
      active: Boolean,
      value: String,
    },
    unityReady: {
      active: Boolean,
      value: String,
    },
    wifiSpeed: {
      active: Boolean,
      value: String,
    },
  },
});

export const Book = model<BookModel>('Book', schema);
