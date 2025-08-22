// src/app/api/super-admin/data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Course from '@/models/Course';
import { getAllBlogPosts } from '@/lib/blog-server';

// --- Data Transformation Functions ---

const transformLeadData = (lead: any) => ({
  _id: lead._id.toString(),
  name: lead.name,
  email: lead.email,
  phone: lead.phone || '',
  experience: lead.experienceLevel,
  type: lead.formType,
  preferredTime: lead.preferredTime || '',
  goal: lead.goal || '',
  notes: lead.notes || '',
  status: lead.status || 'New',
  date: lead.createdAt.toISOString(),
});

const transformStudentData = (student: any) => ({
  _id: student._id.toString(),
  name: student.username,
  email: student.email,
  status: student.status || 'Active',
  course: 'Not Enrolled', // This can be expanded later
  progress: '0%', // This can be expanded later
  joined: student.createdAt.toISOString(),
});

const transformInstructorData = (instructor: any) => ({
  _id: instructor._id.toString(),
  name: `${instructor.firstName} ${instructor.lastName}`,
  username: instructor.username,
  email: instructor.email,
  firstName: instructor.firstName,
  lastName: instructor.lastName,
  status: instructor.status || 'Active',
  courses: 0, // This can be calculated later
  rating: 'N/A', // This can be calculated later
});

const transformCourseData = (course: any) => ({
  _id: course._id.toString(),
  title: course.title,
  instructor: course.instructor, // Assuming instructor is a string or can be populated
  students: course.students, // Assuming students is a number or can be calculated
  status: 'Published', // Or derive from course properties
  createdAt: course.createdAt.toISOString(),
});

// --- API Route Handlers ---

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view');
    const body = await request.json();

    switch (view) {
      case 'instructors':
        const newInstructor = new User({
            ...body,
            role: 'admin',
        });
        await newInstructor.save();
        return NextResponse.json(newInstructor, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to create data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view');

  if (!view) {
    return NextResponse.json({ message: 'View parameter is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    let data = [];

    switch (view) {
      case 'leads':
        const generalLeads = await Lead.find({}).sort({ createdAt: -1 });
        data = generalLeads.map(transformLeadData);
        break;
      case 'scheduleCalls':
        const scheduleLeads = await Lead.find({ formType: /^Schedule\s?Call$/i }).sort({ createdAt: -1 });
        data = scheduleLeads.map(transformLeadData);
        break;
      case 'joinProjects':
        const projectLeads = await Lead.find({ formType: /^Join\s?Projects$/i }).sort({ createdAt: -1 });
        data = projectLeads.map(transformLeadData);
        break;
      case 'students':
        const studentsFromDB = await User.find({ role: 'student' }).sort({ createdAt: -1 });
        data = studentsFromDB.map(transformStudentData);
        break;
      case 'instructors':
        const instructorsFromDB = await User.find({ role: 'admin' }).sort({ createdAt: -1 });
        data = instructorsFromDB.map(transformInstructorData);
        break;
      case 'courses':
        const coursesFromDB = await Course.find({}).sort({ createdAt: -1 });
        data = coursesFromDB.map(transformCourseData);
        break;
      case 'blogs':
        data = getAllBlogPosts();
        break;
      default:
        return NextResponse.json({ message: 'Invalid view type' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching data for view: ${view}`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view');
    const id = searchParams.get('id');
    const body = await request.json();

    if (!view || !id) {
        return NextResponse.json({ message: 'View and ID parameters are required' }, { status: 400 });
    }

    try {
        await dbConnect();
        let result = null;

        if (view === 'instructors') {
            result = await User.findByIdAndUpdate(id, body, { new: true });
        } else {
            return NextResponse.json({ message: 'Invalid view type for updating' }, { status: 400 });
        }

        if (!result) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item updated successfully', data: result });
    } catch (error) {
        console.error(`Error updating item from view ${view} with id ${id}:`, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view');
  const id = searchParams.get('id');

  if (!view || !id) {
    return NextResponse.json({ message: 'View and ID parameters are required' }, { status: 400 });
  }

  try {
    await dbConnect();
    let result = null;

    switch (view) {
      case 'leads':
      case 'scheduleCalls':
      case 'joinProjects':
        result = await Lead.findByIdAndDelete(id);
        break;
      case 'students':
      case 'instructors':
        result = await User.findByIdAndDelete(id);
        break;
      case 'courses':
        result = await Course.findByIdAndDelete(id);
        break;
      default:
        return NextResponse.json({ message: 'Invalid view type for deletion' }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting item from view ${view} with id ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}