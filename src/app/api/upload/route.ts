import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // This saves the file to the `public/uploads` directory. Make sure it exists.
  const path = join(process.cwd(), 'public/uploads', Date.now() + '-' + file.name);
  await writeFile(path, buffer);
  
  // The URL path to the file
  const fileUrl = `/uploads/${path.split('/').pop()}`;

  return NextResponse.json({ success: true, fileUrl });
}