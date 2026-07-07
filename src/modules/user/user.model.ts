import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

import { env } from '../../config/env';
import { USER_ROLE } from '../../constants/role';
import {
  IUser,
  IUserDocument,
  IUserMethods,
  IUserModel,
} from './user.interface';

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [100, 'Name cannot exceed 100 characters.'],
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters.'],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.EMPLOYEE,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Hash password before saving
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, env.BCRYPT_SALT_ROUNDS);

  next();
});

/**
 * Remove password after save
 */
userSchema.post('save', function (doc: IUserDocument, next) {
  doc.password = '';

  next();
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Find user by email
 */
userSchema.statics.isUserExistsByEmail = async function (
  email: string,
): Promise<IUserDocument | null> {
  return this.findOne({
    email,
    isDeleted: false,
  }).select('+password');
};

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
