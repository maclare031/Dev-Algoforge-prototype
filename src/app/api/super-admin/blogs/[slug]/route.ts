// src/app/api/super-admin/blogs/[slug]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPostModel from '@/models/BlogPost';

interface Params {
  slug: string;
}

// GET a single blog post by slug
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { slug } = params; // No await needed here as Next.js resolves it

    const post = await BlogPostModel.findOne({ slug });

    if (!post) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(`Error fetching blog post ${params.slug}:`, error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// UPDATE a blog post by slug
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { slug } = params;
    const body = await request.json();

    const updatedPost = await BlogPostModel.findOneAndUpdate({ slug }, body, { new: true });

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post updated successfully', post: updatedPost });
  } catch (error) {
    console.error(`Error updating blog post ${params.slug}:`, error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a blog post by slug
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { slug } = params;

    const result = await BlogPostModel.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting blog post ${params.slug}:`, error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}