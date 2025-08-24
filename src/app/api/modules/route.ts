import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Module from '@/models/Module';
import Course from '@/models/Course';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { title, courseId } = await req.json();
    if (!title || !courseId) {
      return NextResponse.json({ error: 'Title and courseId are required' }, { status: 400 });
    }
    const newModule = new Module({ title, course: courseId, content: [] });
    await newModule.save();
    await Course.findByIdAndUpdate(courseId, { $push: { modules: newModule._id } });
    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}