// src/app/api/login/route.js

import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    await dbConnect();

    const { username, password, role } = await request.json(); // Keep the role

    if (!username || !password || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Use the findByCredentials method, but find the user first with the role
    const user = await User.findOne({ 
        $or: [{ username: username }, { email: username }], 
        role: role // Add role to the query
    }).select('+password');
    
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const userPayload = {
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.getFullName(),
    };

    const token = jwt.sign(
      userPayload,
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true, user: userPayload });

  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}