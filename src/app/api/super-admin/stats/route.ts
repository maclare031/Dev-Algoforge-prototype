// src/app/api/super-admin/stats/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Course from '@/models/Course';
import { getAllBlogPosts } from '@/lib/blog-server'; // CORRECTED: Use the real function name

export async function GET() {
  try {
    await dbConnect();

    // CORRECTED: Call the real function
    const allPosts = getAllBlogPosts();
    const publishedBlogsCount = allPosts.length;

    const [
      totalLeads,
      scheduleCalls,
      joinProjects,
      totalStudents,
      totalInstructors,
      activeCourses,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ formType: /^Schedule\s?Call$/i }),
      Lead.countDocuments({ formType: /^Join\s?Projects$/i }),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'admin' }),
      Course.countDocuments(),
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