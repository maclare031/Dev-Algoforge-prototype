// "use server";

// import { NextResponse } from "next/server";
// import jwt from 'jsonwebtoken';

// // Mock users database - In a real app, this would be in a database
// const USERS = {
//   admin: {
//     id: 'admin-1',
//     username: 'algoforge',
//     password: 'Algoforge@1980',
//     email: 'admin@algoforgestudios.com',
//     firstName: 'AlgoForge',
//     lastName: 'Admin',
//     role: 'admin',
//     createdAt: '2024-01-01T00:00:00.000Z',
//     updatedAt: '2024-01-01T00:00:00.000Z'
//   },
//   students: [
//     {
//       id: 'student-1',
//       username: 'student1',
//       password: 'Student@123',
//       email: 'student1@example.com',
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'student',
//       createdAt: '2024-01-01T00:00:00.000Z',
//       updatedAt: '2024-01-01T00:00:00.000Z'
//     },
//     {
//       id: 'student-2',
//       username: 'student2',
//       password: 'Student@456',
//       email: 'jane.smith@example.com',
//       firstName: 'Jane',
//       lastName: 'Smith',
//       role: 'student',
//       createdAt: '2024-01-01T00:00:00.000Z',
//       updatedAt: '2024-01-01T00:00:00.000Z'
//     },
//     {
//       id: 'student-3',
//       username: 'mike_wilson',
//       password: 'Mike@789',
//       email: 'mike.wilson@example.com',
//       firstName: 'Mike',
//       lastName: 'Wilson',
//       role: 'student',
//       createdAt: '2024-01-01T00:00:00.000Z',
//       updatedAt: '2024-01-01T00:00:00.000Z'
//     }
//   ]
// };

// // JWT Secret - In a real app, this should be in environment variables
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// export async function POST(request) {
//   try {
//     const { username, password, role } = await request.json();

//     if (!username || !password || !role) {
//       return NextResponse.json(
//         { success: false, message: 'Username, password, and role are required' },
//         { status: 400 }
//       );
//     }

//     let user = null;

//     // Check admin login
//     if (role === 'admin') {
//       if (username === USERS.admin.username && password === USERS.admin.password) {
//         user = { ...USERS.admin };
//         delete user.password; // Remove password from response
//       }
//     }
//     // Check student login
//     else if (role === 'student') {
//       const foundStudent = USERS.students.find(
//         s => s.username === username && s.password === password
//       );
//       if (foundStudent) {
//         user = { ...foundStudent };
//         delete user.password; // Remove password from response
//       }
//     }

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid credentials or role' },
//         { status: 401 }
//       );
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { 
//         id: user.id, 
//         username: user.username, 
//         role: user.role 
//       },
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     return NextResponse.json({
//       success: true,
//       user,
//       token,
//       message: `Successfully logged in as ${role}`
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
