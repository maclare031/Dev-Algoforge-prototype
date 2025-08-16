import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function middleware(request: NextRequest) {
  // Skip maintenance check for API routes, static files, and the maintenance API itself
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith('/api/system/status') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/public/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if maintenance mode is enabled
  try {
    const MAINTENANCE_FILE = path.join(process.cwd(), 'maintenance.flag');
    await fs.access(MAINTENANCE_FILE);
    
    // Maintenance mode is enabled - redirect to maintenance page
    const maintenancePageResponse = NextResponse.next();
    maintenancePageResponse.headers.set('x-maintenance-mode', 'true');
    
    return maintenancePageResponse;
  } catch {
    // Maintenance file doesn't exist, continue normally
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
