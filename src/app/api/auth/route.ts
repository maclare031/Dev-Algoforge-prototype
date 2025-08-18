import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { serialize } from 'cookie'; // Import serialize


const JWT_SECRET = process.env.JWT_SECRET;

// Add this check to ensure the secret is loaded
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { username, password, role } = await request.json();

    if (!username || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Username, password, and role are required' },
        { status: 400 }
      );
    }

    // Find user by credentials first
    let user;
    try {
      user = await User.findByCredentials(username, password);
    } catch (error) {
      console.error('User authentication error:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user role matches the requested role
    if (user.role !== role) {
      return NextResponse.json(
        { success: false, message: `Invalid credentials. This account is not authorized for ${role} access.` },
        { status: 401 }
      );
    }

    // Update last login
    try {
      user.lastLogin = new Date();
      await user.save();
    } catch (error) {
      console.error('Error updating last login:', error);
      // Continue with login even if last login update fails
    }

    // Create user object for response (password already excluded by model)
    const userResponse = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

  // Create JWT token
  const token = jwt.sign(
    { 
      id: user._id.toString(), 
      username: user.username, 
      role: user.role 
    },
    JWT_SECRET as string,
    { expiresIn: '24h' }
  );

  // Create a secure, HttpOnly cookie
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  const response = NextResponse.json({
    success: true,
    user: userResponse,
    message: `Successfully logged in as ${role}`
  });

  // Set the cookie on the response
  response.headers.set('Set-Cookie', cookie);

  return response;
} catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
