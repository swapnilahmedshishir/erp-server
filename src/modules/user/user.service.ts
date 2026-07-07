import AppError from '../../utils/AppError';
import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import User from './user.model';
import { IUser } from './user.interface';

const createUser = async (payload: IUser) => {
  const existingUser = await User.findOne({
    email: payload.email,
    isDeleted: false,
  });

  if (existingUser) {
    throw new AppError(HTTP_STATUS.CONFLICT, 'Email already exists.');
  }

  const user = await User.create(payload);

  return user;
};

const getUserById = async (id: string) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found.');
  }

  return user;
};

const getUserByEmail = async (email: string) => {
  return User.findOne({
    email,
    isDeleted: false,
  }).select('+password');
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found.');
  }

  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found.');
  }

  return null;
};

export const UserService = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
