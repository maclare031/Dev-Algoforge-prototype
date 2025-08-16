import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

// JWT Secret - In a real app, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

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
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      message: `Successfully logged in as ${role}`
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
