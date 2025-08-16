import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MAINTENANCE_FILE = path.join(process.cwd(), 'maintenance.flag');
const CONTROL_KEY = process.env.KEY;


export async function GET() {
  try {
    await fs.access(MAINTENANCE_FILE);
    return NextResponse.json({ maintenance: true });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, key } = body;

    
    if (!key || key !== CONTROL_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    if (action === 'enable') {
      await fs.writeFile(MAINTENANCE_FILE, new Date().toISOString());
      return NextResponse.json({ 
        success: true, 
        message: 'Maintenance mode enabled',
        maintenance: true 
      });
    } else if (action === 'disable') {
      try {
        await fs.unlink(MAINTENANCE_FILE);
      } catch {
        
      }
      return NextResponse.json({ 
        success: true, 
        message: 'Maintenance mode disabled',
        maintenance: false 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "enable" or "disable"' }, 
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Maintenance API error:', error);
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  }
}
