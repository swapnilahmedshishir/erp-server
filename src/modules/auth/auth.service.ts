import AppError from '../../utils/AppError';
import { generateToken } from '../../utils/jwt';

import { HTTP_STATUS } from '../../constants/http';
import { MESSAGE } from '../../constants/message';

import User from '../user/user.model';

import { ILoginResponse, ILoginUser } from './auth.interface';

const login = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { email, password } = payload;

  /**
   * Check user exists
   */
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGE.AUTH.INVALID_CREDENTIALS,
    );
  }

  /**
   * Compare password
   */
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGE.AUTH.INVALID_CREDENTIALS,
    );
  }

  /**
   * Generate Access Token
   */
  const accessToken = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
  };
};

const getProfile = async (userId: string) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  }).select('-password');

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found.');
  }

  return user;
};

export const AuthService = {
  login,
  getProfile,
};
