// src/app/api/super-admin/recent-leads/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET() {
  try {
    await dbConnect();
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
    return NextResponse.json(recentLeads);
  } catch (error) {
    console.error('Error fetching recent leads:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}