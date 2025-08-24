import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';
import Module from '@/models/Module';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { title, description, type, fileUrl, tags, moduleId } = await req.json();
    if (!title || !type || !fileUrl || !moduleId) {
      return NextResponse.json({ error: 'Title, type, fileUrl, and moduleId are required' }, { status: 400 });
    }
    const newContent = new Content({ title, description, type, fileUrl, tags, module: moduleId });
    await newContent.save();
    await Module.findByIdAndUpdate(moduleId, { $push: { content: newContent._id } });
    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}