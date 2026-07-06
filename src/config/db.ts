import mongoose from 'mongoose';
import { env } from './env';

mongoose.set('strictQuery', true);

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Failed to connect MongoDB.');
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};
