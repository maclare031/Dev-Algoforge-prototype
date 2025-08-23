// src/app/api/super-admin/stats/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Course from '@/models/Course';
import BlogPost from '@/models/BlogPost'; // Import the BlogPost model

export async function GET() {
  try {
    await dbConnect();

    // Fetch all counts in parallel for better performance
    const [
      totalLeads,
      scheduleCalls,
      joinProjects,
      totalStudents,
      totalInstructors,
      activeCourses,
      publishedBlogsCount // This will now hold the number from the database
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ formType: /^Schedule\s?Call$/i }),
      Lead.countDocuments({ formType: /^Join\s?Projects$/i }),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'admin' }),
      Course.countDocuments(),
      BlogPost.countDocuments({}) // Efficiently count blog posts
    ]);

    const statsData = [
        { id: 'leads', title: "Total Leads", value: totalLeads.toLocaleString(), icon: 'Users', color: "cyan" },
        { id: 'scheduleCalls', title: "Schedule Calls", value: scheduleCalls.toLocaleString(), icon: 'Calendar', color: "emerald" },
        { id: 'joinProjects', title: "Join Projects", value: joinProjects.toLocaleString(), icon: 'Play', color: "purple" },
        { id: 'analytics', title: "This Month's Stats", value: "+12%", icon: 'TrendingUp', color: "orange", href: "/analytics" },
        { id: 'students', title: "Total Students", value: totalStudents.toLocaleString(), icon: 'Users', color: "teal" },
        { id: 'instructors', title: "Total Instructors", value: totalInstructors.toLocaleString(), icon: 'Briefcase', color: "violet" },
        { id: 'courses', title: "Active Courses", value: activeCourses.toLocaleString(), icon: 'BookOpen', color: "blue" },
        { id: 'blogs', title: "Published Blogs", value: publishedBlogsCount.toLocaleString(), icon: 'FileText', color: "pink" },
    ];

    return NextResponse.json(statsData);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}