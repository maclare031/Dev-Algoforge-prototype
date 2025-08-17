import { dbConnect } from '@/lib/db';
import User from '@/models/User';

const createSuperAdmin = async () => {
  try {
    // Tell the script to load your .env.local file
    const dotenv = require('dotenv');
    const path = require('path');
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

    await dbConnect();
    console.log('Connected to database.');

    // Check if a super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super-admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists.');
      return;
    }

    // Create the new super admin user
    const superAdminUser = new User({
        username: 'superadmin',
        email: 'superadmin@example.com',
        password: 'superadminpassword',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super-admin',
        emailVerified: true,
        isActive: true
    });
    await superAdminUser.save();
    console.log('✅ Successfully created super-admin user!');
    console.log('Credentials: superadmin@example.com / superadminpassword');

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    process.exit();
  }
};

createSuperAdmin();