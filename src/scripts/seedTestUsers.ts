import { dbConnect } from '../lib/db';
import User from '../models/User';

const testUsers = [
  {
    username: 'admin',
    email: 'admin@algoforge.studios',
    firstName: 'Admin',
    lastName: 'User',
    password: 'Admin@123',
    role: 'admin',
    isActive: true,
    emailVerified: true
  },
  {
    username: 'student1',
    email: 'student1@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'Student@123',
    role: 'student',
    isActive: true,
    emailVerified: true
  },
  {
    username: 'student2',
    email: 'student2@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    password: 'Student@123',
    role: 'student',
    isActive: true,
    emailVerified: true
  }
];

async function seedTestUsers() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Check if users already exist
    for (const userData of testUsers) {
      const existingUser = await User.findOne({ 
        $or: [
          { username: userData.username },
          { email: userData.email }
        ]
      });

      if (existingUser) {
        console.log(`User ${userData.username} already exists, skipping...`);
        continue;
      }

      // Create new user
      const user = new User(userData);
      await user.save();
      console.log(`Created ${userData.role} user: ${userData.username}`);
    }

    console.log('Test users seeding completed!');
    
    // Print login credentials
    console.log('\n--- LOGIN CREDENTIALS ---');
    console.log('Admin:');
    console.log('  Username: admin');
    console.log('  Password: Admin@123');
    console.log('  Role: admin\n');
    
    console.log('Student 1:');
    console.log('  Username: student1');
    console.log('  Password: Student@123');
    console.log('  Role: student\n');
    
    console.log('Student 2:');
    console.log('  Username: student2');
    console.log('  Password: Student@123');
    console.log('  Role: student');
    
  } catch (error) {
    console.error('Error seeding test users:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedTestUsers();
}

export default seedTestUsers;
