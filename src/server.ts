import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { env } from './config/env';

dotenv.config();

const port = env.PORT || 5000;

async function main() {
  try {
    // MongoDB Connection
    await mongoose.connect(env.DATABASE_URL as string);
    console.log('📦 Database connected successfully!');

    app.listen(port, () => {
      console.log(`🚀 Server is listening on port http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database', err);
  }
}

main();
