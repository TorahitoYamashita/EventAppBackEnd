import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  id: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
  email: String,
  environment: String,
  component: String,
  message: String,
  data: Object,
});
