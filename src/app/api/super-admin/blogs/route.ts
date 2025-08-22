// src/app/api/super-admin/blogs/route.ts

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllBlogPosts } from '@/lib/blog-server'; // Ensure this function is correctly named and imported

// Helper function to create a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/-+/g, '-');         // Remove consecutive hyphens
};

// GET all blog posts
export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// CREATE a new blog post
export async function POST(request: Request) {
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
        featured, 
        date 
    } = await request.json();

    if (!title || !author || !content || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const slug = createSlug(title);

    // Format the content with frontmatter
    const fileContent = matter.stringify(content, {
      title,
      author,
      date: date || new Date().toISOString(), // Use provided date or create a new one
      category: category || 'General',
      description,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      readTime: readTime || 0,
      featured: featured || false,
      image: featuredImage || '/images/blog/default-blog.png',
    });

    const filePath = path.join(process.cwd(), 'src', 'contents', 'blogs', `${slug}.md`);

    // Write the new blog post file
    await fs.writeFile(filePath, fileContent);

    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}