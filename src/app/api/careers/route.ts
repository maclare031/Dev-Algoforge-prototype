import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import  dbConnect  from '@/lib/db';
import Career from '@/models/Career';

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const resume = formData.get('resume') as File;
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume file is required.' }, { status: 400 });
    }

    // Save the file
    const buffer = Buffer.from(await resume.arrayBuffer());
    const filename = `${Date.now()}-${resume.name}`;
    const filepath = path.join(uploadDir, filename);
    
    fs.writeFileSync(filepath, buffer);

    const career = new Career({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      experienceLevel: formData.get('experienceLevel') as string,
      portfolioUrl: formData.get('portfolioUrl') as string,
      coverLetter: formData.get('coverLetter') as string,
      resumeFilename: filename,
      resumePath: filepath,
      resumeOriginalName: resume.name,
      resumeSize: resume.size,
      resumeMimeType: resume.type,
      metadata: {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || '',
        referrer: request.headers.get('referer') || '',
      },
    });

    await career.save();

    return NextResponse.json({ message: 'Application submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'An error occurred while submitting the application.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const careers = await Career.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ data: careers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json({ error: 'Failed to fetch career applications.' }, { status: 500 });
  }
}
