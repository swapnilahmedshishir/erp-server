import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVariables = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'BCRYPT_SALT_ROUNDS',
  'CLIENT_URL',

  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
] as const;

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: Number(process.env.PORT),

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),

  CLIENT_URL: process.env.CLIENT_URL!,

  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
} as const;
