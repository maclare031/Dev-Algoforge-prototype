// src/app/api/auth/logout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';
  const host = req.headers.get('host');
  // This logic MUST BE IDENTICAL to the login route
  const domain = isProduction ? host?.split(':')[0] : undefined;

  // Create a cookie with the exact same parameters, but with maxAge: -1 to expire it.
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
    domain: domain, // **CRUCIAL: This now matches the login cookie**
  });

  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.headers.set('Set-Cookie', cookie);
  return response;
}