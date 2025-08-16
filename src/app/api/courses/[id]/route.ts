import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from '@/lib/courseService';
import mongoose from 'mongoose';

// Helper to validate and sanitize course data on update
const validateUpdateData = (data: any) => {
  // Validate and sanitize syllabus
  if (data.syllabus !== undefined) {
    if (!Array.isArray(data.syllabus)) {
      throw new Error('Syllabus must be an array');
    }

    // Validate each syllabus item
    data.syllabus = data.syllabus.map((item: any, index: number) => {
      if (!item || typeof item !== 'object') {
        throw new Error(`Syllabus item at index ${index} must be an object`);
      }
      
      if (!item.module || typeof item.module !== 'string' || item.module.trim() === '') {
        throw new Error(`Syllabus module at index ${index} is required and must be a non-empty string`);
      }

      // Ensure topics is an array
      if (!item.topics) {
        item.topics = [];
      } else if (!Array.isArray(item.topics)) {
        throw new Error(`Syllabus topics at index ${index} must be an array`);
      }

      // Filter out empty topics
      item.topics = item.topics.filter((topic: any) => 
        topic && typeof topic === 'string' && topic.trim() !== ''
      );

      return {
        module: item.module.trim(),
        topics: item.topics
      };
    });
  }
  
  // Remove fields that should not be updated directly
  delete data._id;
  delete data.createdAt;
  delete data.updatedAt;

  // Validate and normalize courseCategory if present during update
  // if (data.courseCategory !== undefined) {
  //   if (typeof data.courseCategory !== 'string') {
  //     throw new Error('Course category must be a string');
  //   }
  //   const validCourseCategories = [
  //     'Data Analytics & Business Intelligence',
  //     'Generative AI (Gen AI)',
  //     'MLOps',
  //     'Data Engineering & Cloud Technologies',
  //     'Analytics Specializations'
  //   ];
  //   if (!validCourseCategories.includes(data.courseCategory)) {
  //     throw new Error(`Invalid course category: ${data.courseCategory}`);
  //   }
  // }

  return data;
};

// GET /api/courses/[id] - Get single course by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }
    
    const course = await CourseService.getCourseById(id);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ course });
  } catch (error: any) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] - Update course by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await req.json();
    console.log('Update data received:', JSON.stringify(updateData, null, 2));
    
    const validatedData = validateUpdateData(updateData);
    console.log('Validated update data:', JSON.stringify(validatedData, null, 2));

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }

    const course = await CourseService.updateCourse(id, validatedData);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Course updated successfully',
      course 
    });
  } catch (error: any) {
    console.error('Error updating course:', error);
    
    // Handle validation errors
    if (error?.name === 'ValidationError') {
      console.error('Validation error details:', error.errors);
      return NextResponse.json(
        { error: error.message, details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

// PATCH /api/courses/[id] - Partially update course by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await req.json();
    console.log('Patch data received:', JSON.stringify(updateData, null, 2));
    
    const validatedData = validateUpdateData(updateData);
    console.log('Validated patch data:', JSON.stringify(validatedData, null, 2));

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }

    const course = await CourseService.patchCourse(id, validatedData);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Course updated successfully',
      course 
    });
  } catch (error: any) {
    console.error('Error patching course:', error);
    
    // Handle validation errors
    if (error?.name === 'ValidationError') {
      console.error('Validation error details:', error.errors);
      return NextResponse.json(
        { error: error.message, details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete course by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }
    
    const course = await CourseService.deleteCourse(id);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Course deleted successfully',
      course 
    });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
