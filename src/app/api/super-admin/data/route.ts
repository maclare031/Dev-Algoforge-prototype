// src/app/api/super-admin/data/route.ts
import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Course from '@/models/Course';
import { getAllBlogPosts } from '@/lib/blog-server'; // CORRECTED: Use the real function name

// CORRECTED: Added a specific type for the Mongoose lead document
interface MongooseLead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  experienceLevel: string;
  formType: string;
  preferredTime?: string;
  goal?: string;
  notes?: string;
  status?: string;
  createdAt: string;
}

const transformLeadData = (lead: MongooseLead) => ({
  _id: lead._id, name: lead.name, email: lead.email, phone: lead.phone,
  experience: lead.experienceLevel, type: lead.formType, preferredTime: lead.preferredTime,
  goal: lead.goal, notes: lead.notes, status: lead.status, date: lead.createdAt,
});

export async function GET(request: Request) {
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
        const generalLeads = await Lead.find({ formType: { $nin: [/^Schedule\s?Call$/i, /^Join\s?Projects$/i] } }).sort({ createdAt: -1 });
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
        data = studentsFromDB.map(student => ({
          _id: student._id, name: student.username, email: student.email, status: student.status || 'Active',
          course: 'Not Enrolled', progress: '0%', joined: student.createdAt,
        }));
        break;

      case 'instructors':
        const instructorsFromDB = await User.find({ role: 'admin' }).sort({ createdAt: -1 });
        data = instructorsFromDB.map(instructor => ({
            _id: instructor._id, name: instructor.username, email: instructor.email,
            status: instructor.status || 'Active', courses: '0', rating: 'N/A',
        }));
        break;

      case 'courses':
        const coursesFromDB = await Course.find().sort({ createdAt: -1 });
        data = coursesFromDB.map(course => ({
            _id: course._id, title: course.title, instructor: course.instructor,
            students: course.students, status: 'Published', createdAt: course.createdAt,
        }));
        break;

      case 'blogs':
        data = getAllBlogPosts(); // CORRECTED: Call the real function
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