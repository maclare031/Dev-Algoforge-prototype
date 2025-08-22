// src/app/api/super-admin/blogs/[slug]/route.ts

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'contents', 'blogs');

// GET a single blog post's data
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(postsDirectory, `${params.slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({ success: true, post: { ...data, content } });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
  }
}

// UPDATE a blog post
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // --- UPDATED TO INCLUDE ALL NEW FIELDS ---
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

    const filePath = path.join(postsDirectory, `${params.slug}.md`);

    // Preserve the original date by reading the existing file first
    const existingFileContents = await fs.readFile(filePath, 'utf8');
    const { data: existingData } = matter(existingFileContents);

    const fileContent = matter.stringify(content, {
      ...existingData, // Spread existing data to preserve fields like original date
      title,
      author,
      image: featuredImage, // Ensure the key is 'image' to match the frontend
      category,
      description,
      tags,
      readTime,
      featured,
    });

    await fs.writeFile(filePath, fileContent);

    return NextResponse.json({ success: true, message: 'Blog post updated successfully' });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(postsDirectory, `${params.slug}.md`);
    await fs.unlink(filePath);

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete blog post' }, { status: 500 });
  }
}