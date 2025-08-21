// src/app/api/super-admin/recent-users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    return NextResponse.json(recentUsers);
  } catch (error) {
    console.error('Error fetching recent users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}