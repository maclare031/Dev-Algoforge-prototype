// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import User from '@/models/User';
import { dbConnect } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as unknown as { id: string };

    await dbConnect();
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
}