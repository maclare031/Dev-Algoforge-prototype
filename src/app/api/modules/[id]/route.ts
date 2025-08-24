import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Module from '@/models/Module';
import Course from '@/models/Course';
import Content from '@/models/Content'; // Import Content to delete associated items
import mongoose from 'mongoose';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Module ID' }, { status: 400 });
    }

    // Find the module to get its parent course and content IDs
    const moduleToDelete = await Module.findById(id);
    if (!moduleToDelete) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    const { course: courseId, content: contentIds } = moduleToDelete;

    // 1. Delete all content items within this module
    if (contentIds && contentIds.length > 0) {
      await Content.deleteMany({ _id: { $in: contentIds } });
    }

    // 2. Delete the module itself
    await Module.findByIdAndDelete(id);

    // 3. Remove the reference to the module from the parent course
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { modules: id },
      });
    }

    return NextResponse.json({ message: 'Module deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting module:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}