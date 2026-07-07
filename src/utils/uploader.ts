import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';
import streamifier from 'streamifier';

import AppError from './AppError';
import { HTTP_STATUS } from '../constants/http';
import { MESSAGE } from '../constants/message';

/**
 * Multer Memory Storage
 */
const storage = multer.memoryStorage();

/**
 * Image File Filter
 */
const fileFilter: multer.Options['fileFilter'] = (_req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(
      new AppError(HTTP_STATUS.BAD_REQUEST, 'Only image files are allowed.'),
    );
  }
};

/**
 * Multer Upload Middleware
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

/**
 * Upload Image to Cloudinary
 */
export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder = 'mini-erp',
): Promise<string> => {
  if (!file) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGE.PRODUCT.IMAGE_REQUIRED);
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) {
          return reject(
            new AppError(
              HTTP_STATUS.INTERNAL_SERVER_ERROR,
              'Failed to upload image.',
            ),
          );
        }

        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

/**
 * Delete Image From Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};
