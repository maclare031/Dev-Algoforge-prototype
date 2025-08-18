import { dbConnect } from '@/lib/db';
import User from '@/models/User';

const seedUsers = async () => {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing users
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // Seed admin user
    const adminUser = new User({
      username: 'algoforge',
      email: 'admin@algoforgestudios.com',
      password: process.env.ADMIN_PASSWORD,
      firstName: 'AlgoForge',
      lastName: 'Admin',
      role: 'admin',
      emailVerified: true,
      isActive: true
    });
    await adminUser.save();
    console.log('Created admin user');

    // Seed student users
    const students = [
      {
        username: 'student1',
        email: 'student1@example.com',
        password: 'Student@123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        emailVerified: true,
        isActive: true
      },
      {
        username: 'student2',
        email: 'jane.smith@example.com',
        password: 'Student@456',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'student',
        emailVerified: true,
        isActive: true
      },
      {
        username: 'mike_wilson',
        email: 'mike.wilson@example.com',
        password: 'Mike@789',
        firstName: 'Mike',
        lastName: 'Wilson',
        role: 'student',
        emailVerified: true,
        isActive: true
      }
    ];

    for (const studentData of students) {
      const student = new User(studentData);
      await student.save();
      console.log(`Created student user: ${studentData.username}`);
    }

    console.log('Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: algoforge / Algoforge@1980');
    console.log('Student 1: student1 / Student@123');
    console.log('Student 2: student2 / Student@456');
    console.log('Student 3: mike_wilson / Mike@789');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedUsers();
