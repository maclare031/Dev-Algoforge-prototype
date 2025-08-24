import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';
import Module from '@/models/Module';
import mongoose from 'mongoose';

// --- NEW --- GET a single content item by its ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Content ID' }, { status: 400 });
    }

    const content = await Content.findById(id);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- NEW --- UPDATE a content item by its ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Content ID' }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, tags, thumbnailUrl } = body;

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { title, description, tags, thumbnailUrl },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ content: updatedContent }, { status: 200 });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// This is your existing DELETE function, which is correct
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Content ID' }, { status: 400 });
    }

    const contentToDelete = await Content.findById(id);
    if (!contentToDelete) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const { module: moduleId } = contentToDelete;

    await Content.findByIdAndDelete(id);

    if (moduleId) {
      await Module.findByIdAndUpdate(moduleId, {
        $pull: { content: id },
      });
    }

    return NextResponse.json({ message: 'Content deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}