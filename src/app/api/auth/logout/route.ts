// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Determine the domain for the cookie.
  // In production, we get it from the request headers to ensure it's correct.
  // In development, it's localhost and doesn't need a domain attribute.
  const host = req.headers.get('host');
  const domain = isProduction ? host?.split(':')[0] : undefined;

  // Create a cookie that expires in the past to effectively clear it.
  // The key additions are the 'domain' and ensuring 'secure' is always true in production.
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: isProduction, // The cookie should only be sent over HTTPS in production
    sameSite: 'strict',
    maxAge: -1, // A value of -1 or 0 expires the cookie immediately
    path: '/',
    domain: domain, // **THIS IS THE CRUCIAL FIX**
  });

  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });

  // Set the cleared cookie in the response headers
  response.headers.set('Set-Cookie', cookie);

  return response;
}