import multer from 'multer';
import cloudinary from '../config/cloudinary';

import AppError from './AppError';

import { HTTP_STATUS } from '../constants/http';
import { MESSAGE } from '../constants/message';

/* -------------------------------------------------------------------------- */
/*                              Multer Storage                                */
/* -------------------------------------------------------------------------- */

const storage = multer.memoryStorage();

/* -------------------------------------------------------------------------- */
/*                               File Filter                                  */
/* -------------------------------------------------------------------------- */

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(
      new AppError(HTTP_STATUS.BAD_REQUEST, 'Only image files are allowed.'),
    );
  }

  cb(null, true);
};

/* -------------------------------------------------------------------------- */
/*                               Upload Middleware                            */
/* -------------------------------------------------------------------------- */

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* -------------------------------------------------------------------------- */
/*                           Upload To Cloudinary                             */
/* -------------------------------------------------------------------------- */

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder = 'mini-erp',
): Promise<string> => {
  if (!file) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, MESSAGE.PRODUCT.IMAGE_REQUIRED);
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        folder: 'mini-erp',
        overwrite: true,
        unique_filename: true,
      },
    );

    console.log(result);

    return result.secure_url;
  } catch (error) {
    console.error('========== CLOUDINARY ERROR ==========');
    console.dir(error, { depth: null });

    throw new AppError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to upload image.',
    );
  }
};

/* -------------------------------------------------------------------------- */
/*                        Delete From Cloudinary                              */
/* -------------------------------------------------------------------------- */

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('========== DELETE CLOUDINARY ERROR ==========');
    console.dir(error, { depth: null });
  }
};
