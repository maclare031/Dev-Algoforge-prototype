// src/app/api/login/route.js

import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Mock users database
const USERS = {
  admin: {
    id: 'admin-1',
    username: 'algoforge',
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
    name: 'AlgoForge Admin'
  },
  students: [
    {
      id: 'student-1',
      username: 'student1',
      password: 'Student@123',
      role: 'student',
      name: 'John Doe'
    },
  ]
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { username, password, role } = await request.json();

    if (!username || !password || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let user = null;
    if (role === 'admin') {
      if (username === USERS.admin.username && password === USERS.admin.password) {
        user = { ...USERS.admin };
      }
    } else if (role === 'student') {
      const foundStudent = USERS.students.find(s => s.username === username && s.password === password);
      if (foundStudent) {
        user = { ...foundStudent };
      }
    }

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    // @ts-ignore
    delete user.password;

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}