import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import http from 'http';

import cloudinary from './config/cloudinary';
const server = http.createServer(app);

(async () => {
  try {
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    );

    console.log(result.secure_url);
  } catch (e) {
    console.dir(e, { depth: null });
  }
})();

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
