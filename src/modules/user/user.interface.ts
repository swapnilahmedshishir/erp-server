import { HydratedDocument, Model } from 'mongoose';
import { UserRole } from '../../constants/role';

/**
 * User Entity
 */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isDeleted: boolean;
}

/**
 * User Instance Methods
 */
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * Hydrated User Document
 */
export type IUserDocument = HydratedDocument<IUser, IUserMethods>;

/**
 * User Model Static Methods
 */
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  isUserExistsByEmail(email: string): Promise<IUserDocument | null>;
}
