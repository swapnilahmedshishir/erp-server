import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';

cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
});

(async () => {
  try {
    const result = await cloudinary.api.ping();

    console.log('PING OK');
    console.log(result);
  } catch (err) {
    console.error('PING ERROR');
    console.error(err);
  }
})();

export default cloudinary;
