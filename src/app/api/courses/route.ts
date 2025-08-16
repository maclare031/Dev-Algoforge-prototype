import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from '@/lib/courseService';
import { CoursesResponse } from '@/types/course';

const validateCourseData = (data: any) => {
  const requiredFields = ['title', 'description', 'duration', 'category'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`);
    }
  }

  // Sanitize syllabus
  if (!Array.isArray(data.syllabus)) {
    data.syllabus = [];
  }

  data.syllabus = data.syllabus.map((item: any, index: number) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Syllabus item at index ${index} must be an object`);
    }

    if (typeof item.module !== 'string' || !item.module.trim()) {
      throw new Error(`Syllabus module at index ${index} must be a non-empty string`);
    }

    const topics = Array.isArray(item.topics)
      ? item.topics.filter((t: any) => typeof t === 'string' && t.trim())
      : [];

    return {
      module: item.module.trim(),
      topics,
    };
  });

  // Normalize optional fields
  data.skills = Array.isArray(data.skills) ? data.skills : [];
  data.tags = Array.isArray(data.tags) ? data.tags : [];
  data.curriculum = Array.isArray(data.curriculum) ? data.curriculum : [];

  // Validate and normalize courseCategory if present
  // if (data.courseCategory && typeof data.courseCategory === 'string') {
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
  // } else if (data.courseCategory) {
  //   throw new Error('Course category must be a string');
  // }

  return data;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters: any = {
      category: searchParams.get('category') !== 'all' ? searchParams.get('category') : undefined,
      courseCategory: searchParams.get('courseCategory') !== 'all' ? searchParams.get('courseCategory') : undefined,
      featured: searchParams.get('featured') === 'true',
      trending: searchParams.get('trending') === 'true',
      search: searchParams.get('search') || undefined,
      level: searchParams.get('level') || undefined,
      mode: searchParams.get('mode') || undefined,
      limit: parseInt(searchParams.get('limit') || '') || undefined,
      skip: parseInt(searchParams.get('skip') || '') || undefined,
    };

    const courses = await CourseService.getCourses(filters);
    return NextResponse.json({ courses, total: courses.length });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const courseData = await req.json();
    console.log('API POST: Received raw data:', JSON.stringify(courseData, null, 2));
    console.log('API POST: Raw syllabus received:', JSON.stringify(courseData.syllabus, null, 2));

    const validatedData = validateCourseData(courseData);
    console.log('API POST: Validated data:', JSON.stringify(validatedData, null, 2));

    const course = await CourseService.createCourse(validatedData);
    console.log('API POST: Created course:', JSON.stringify(course, null, 2));

    return NextResponse.json({ message: 'Course created successfully', course }, { status: 201 });
  } catch (error: any) {
    console.error('API POST: Error creating course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const courseData = await req.json();
    console.log(`API PUT: Received raw data for ID ${id}:`, JSON.stringify(courseData, null, 2));
    console.log(`API PUT: Raw syllabus received for ID ${id}:`, JSON.stringify(courseData.syllabus, null, 2));

    const validatedData = validateCourseData(courseData);
    console.log('API PUT: Validated data:', JSON.stringify(validatedData, null, 2));

    const course = await CourseService.updateCourse(id, validatedData);
    console.log('API PUT: Updated course:', JSON.stringify(course, null, 2));

    return NextResponse.json({ message: 'Course updated successfully', course }, { status: 200 });
  } catch (error: any) {
    console.error('API PUT: Error updating course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await CourseService.deleteCourse(id);
    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('API DELETE: Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
