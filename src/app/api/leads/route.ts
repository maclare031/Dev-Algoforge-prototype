import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('Received form data:', body); // Debug log
    const {
      formType,
      name,
      email,
      phone,
      experienceLevel,
      interests,
      goal,
      availability,
      notes,
      preferredTime
    } = body;
    // Basic validation - adjust for enterprise forms
    if (!formType || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: formType, name, email' },
        { status: 400 }
      );
    }
    // Experience level is required for non-enterprise forms
    if (!['EnterpriseSolutions', 'EnterpriseDemo'].includes(formType) && !experienceLevel) {
      return NextResponse.json(
        { error: 'Experience level is required for this form type' },
        { status: 400 }
      );
    }
    // Validate formType
    if (!['ScheduleCall', 'JoinProjects', 'Recommendation', 'EnterpriseSolutions', 'EnterpriseDemo'].includes(formType)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }
    // Extract metadata safely
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      // request.ip ||
      'unknown';

    const referrer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    // Create lead with proper data structure
    const leadData = {
      formType,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      experienceLevel,
      interests: Array.isArray(interests) ? interests : (interests ? [interests] : []),
      goal: goal || '',
      availability: availability || '',
      notes: notes || '',
      preferredTime: preferredTime || '',
      metadata: {
        ip,
        referrer,
        userAgent,
        submittedAt: new Date().toISOString()
      }
    };
    console.log('Creating lead with data:', leadData); // Debug log
    const lead = new Lead(leadData);
    const savedLead = await lead.save();
    console.log(`New ${formType} lead created:`, savedLead._id); // Debug log
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully! We will contact you soon.',
      leadId: savedLead._id
    }, { status: 201 });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    console.error('Error stack:', error.stack); // More detailed error logging
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];
      return NextResponse.json(
        { error: `${duplicateField || 'Email'} already exists in our system` },
        { status: 409 }
      );
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }
    // Handle mongoose connection errors
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const formType = url.searchParams.get('formType');

    let query = {};
    if (formType && ['ScheduleCall', 'JoinProjects', 'Recommendation', 'EnterpriseSolutions', 'EnterpriseDemo'].includes(formType)) {
      query = { formType };
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .select('-metadata.ip'); // Hide IP for privacy

    const total = await Lead.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: leads,
      total: total
    });

  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}