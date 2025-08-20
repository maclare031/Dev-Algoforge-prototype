import { NextResponse } from "next/server";
import  dbConnect  from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { username, email, firstName, lastName, password, role } = await request.json();

    // Validate required fields
    if (!username || !email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Only allow student role for signup
    if (role !== 'student') {
      return NextResponse.json(
        { success: false, message: 'Only student accounts can be created through signup' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      const field = existingUser.username === username ? 'Username' : 'Email';
      return NextResponse.json(
        { success: false, message: `${field} already exists` },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: password,
      role: 'student',
      isActive: true,
      emailVerified: false // Set to false initially, can be verified later
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now sign in.',
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Signup error:', error);

    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: validationErrors[0] },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const fieldName = field === 'username' ? 'Username' : 'Email';
      return NextResponse.json(
        { success: false, message: `${fieldName} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
