import { Document } from 'mongoose';

export interface EventDbModel extends Document {
  id: string;
  createdAt: Date;
  email: string;
  environment: string;
  component: string;
  message: string;
  data: {};
}
