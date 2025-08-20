// src/app/api/super-admin/login/route.ts

import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SUPER_ADMIN = {
  id: 'super-admin-1',
  email: 'superadmin@algoforge.com',
  password: 'SuperAdmin@1980', // In a real app, use a hashed password
  role: 'super-admin',
  name: 'Super Admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      const superAdminData = { ...SUPER_ADMIN };
      // @ts-ignore
      delete superAdminData.password;

      const token = jwt.sign(
        { id: superAdminData.id, email: superAdminData.email, role: superAdminData.role, name: superAdminData.name },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      });

      return NextResponse.json({ success: true, user: superAdminData });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}