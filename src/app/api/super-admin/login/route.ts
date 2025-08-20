// src/app/api/super-admin/login/route.ts

import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Fetch credentials from environment variables
const SUPER_ADMIN = {
  id: 'super-admin-1',
  // Use the email from your creation script
  email: 'superadmin@example.com',
  // Use the password from your .env.local file
  password: process.env.SUPER_ADMIN_PASSWORD || 'Algoforge@1980',
  role: 'super-admin',
  name: 'Super Admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  // ... rest of the file remains the same{
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