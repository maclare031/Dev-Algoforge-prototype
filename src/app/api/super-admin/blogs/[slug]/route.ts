/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/super-admin/blogs/[slug]/route.ts

// src/app/api/super-admin/blogs/[slug]/route.ts

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'contents', 'blogs');

// A helper function to securely resolve the file path
async function getSanitizedFilePath(slug: string) {
  // 1. Sanitize against path traversal attacks
  const sanitizedSlug = path.normalize(slug).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(postsDirectory, `${sanitizedSlug}.md`);

  // 2. Get the real, absolute path
  const resolvedPath = path.resolve(filePath);

  // 3. Ensure the path is within the allowed directory
  if (!resolvedPath.startsWith(postsDirectory)) {
    throw new Error('Unauthorized file access attempt');
  }
  
  // 4. Check if the file actually exists before proceeding
  try {
    await fs.access(filePath);
  } catch {
    throw new Error('Blog post not found');
  }

  return filePath;
}


// GET a single blog post's data
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = await getSanitizedFilePath(params.slug);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({ success: true, post: { ...data, content } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Blog post not found') {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    // For security reasons, treat path traversal attempts as "Forbidden"
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }
}
// UPDATE a blog post
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = await getSanitizedFilePath(params.slug);
    
    const { 
        title, 
        author, 
        content, 
        featuredImage, 
        category, 
        description, 
        tags, 
        readTime, 
        featured 
    } = await request.json();

    const existingFileContents = await fs.readFile(filePath, 'utf8');
    const { data: existingData } = matter(existingFileContents);

    const fileContent = matter.stringify(content, {
      ...existingData,
      title,
      author,
      image: featuredImage,
      category,
      description,
      tags,
      readTime,
      featured,
    });

    await fs.writeFile(filePath, fileContent);

    return NextResponse.json({ success: true, message: 'Blog post updated successfully' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Update Error:", error);
     if (error.message === 'Blog post not found') {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if(error.message === 'Unauthorized file access attempt') {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ success: false, message: 'Failed to update blog post' }, { status: 500 });
  }
}



export async function DELETE(
  request: Request,
  // This is the correct, standard signature for accessing route parameters.
  // We destructure 'params' from the second argument.
  { params }: { params: { slug: string } }
) {
  try {
    // Immediately extract the slug from the destructured params.
    const { slug } = params;

    // --- All subsequent logic remains the same ---

    // Log the incoming slug for debugging purposes.
    console.log("Attempting to delete post with slug:", slug);

    // Add a check for a missing or invalid slug.
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing slug provided' },
        { status: 400 } // 400 Bad Request
      );
    }

    // 1. Sanitize the slug to prevent directory traversal attacks.
    const sanitizedSlug = path.normalize(slug).replace(/^(\.\.(\/|\\|$))+/, '');
    
    // 2. Construct the intended file path.
    const filePath = path.join(postsDirectory, `${sanitizedSlug}.md`);

    // 3. Resolve the absolute path and verify it's within the posts directory.
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(postsDirectory)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized file access attempt' },
        { status: 403 } // 403 Forbidden
      );
    }
    
    // 4. Check if the file actually exists before attempting to delete.
    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 } // 404 Not Found
      );
    }

    // 5. Delete the file.
    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });

  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}