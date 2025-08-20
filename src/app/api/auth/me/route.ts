// src/app/api/auth/me/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-in-production';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Return the decoded user payload
    return NextResponse.json({ success: true, user: decoded });
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
}