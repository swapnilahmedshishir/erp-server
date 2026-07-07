import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import http from 'http';

const server = http.createServer(app);

async function main() {
  try {
    // MongoDB Connection
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
