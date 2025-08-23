// src/app/api/super-admin/blogs/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPostModel from '@/models/BlogPost';
import { getAllBlogPosts } from '@/lib/blog-server';

// Helper function to create a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-');        // Remove consecutive hyphens
};

// GET all blog posts (This function is already correct as it uses the updated blog-server)
export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// CREATE a new blog post in the database
export async function POST(request: Request) {
  try {
    await connectDB();

    const { 
        title, 
        author, 
        content, 
        image, 
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

    // Check if a post with this slug already exists to avoid duplicates
    const existingPost = await BlogPostModel.findOne({ slug });
    if (existingPost) {
        return NextResponse.json({ success: false, message: 'A post with this title already exists.' }, { status: 409 });
    }

    const newPost = new BlogPostModel({
        slug,
        title,
        author,
        content,
        description,
        date: date || new Date(),
        category: category || 'General',
        tags: Array.isArray(tags) ? tags : [],
        readTime: readTime || '5', // Assuming a default read time
        featured: featured || false,
        image: image || '/images/blog/default-blog.png',
    });

    await newPost.save();

    return NextResponse.json({ success: true, message: 'Blog post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}