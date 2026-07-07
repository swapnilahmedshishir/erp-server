import mongoose from 'mongoose';

import { env } from '../config/env';
import User from '../modules/user/user.model';
import { USER_ROLE } from '../constants/role';

const seedUsers = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);

    // Delete existing demo users
    await User.deleteMany({
      email: {
        $in: ['admin@gmail.com', 'manager@gmail.com', 'employer@gmail.com'],
      },
    });

    // Create demo users
    await User.create([
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '123456',
        role: USER_ROLE.ADMIN,
      },
      {
        name: 'Manager',
        email: 'manager@gmail.com',
        password: '123456',
        role: USER_ROLE.MANAGER,
      },
      {
        name: 'Employee',
        email: 'employer@gmail.com',
        password: '123456',
        role: USER_ROLE.EMPLOYEE,
      },
    ]);

    console.log('✅ Demo users created successfully.');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
