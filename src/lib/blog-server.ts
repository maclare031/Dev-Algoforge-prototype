// src/lib/blog-server.ts
import connectDB from './db';
import BlogPostModel, { IBlogPost } from '../models/BlogPost'; // Import the IBlogPost interface
import { BlogPost } from './blog';

/**
 * Fetches all blog posts from the database, sorted by date.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await connectDB();
  
  // Explicitly type the result of the .lean() query with the IBlogPost interface
  const posts = await BlogPostModel.find({}).sort({ date: -1 }).lean<IBlogPost[]>();
  
  // Now TypeScript knows that post.date is a Date object
  return posts.map(post => ({
    ...post,
    // The _id field from MongoDB is an object, convert it to a string
    _id: post._id.toString(), 
    date: post.date.toISOString(),
  })) as unknown as BlogPost[];
}

/**
 * Fetches a single blog post from the database by its slug.
 * @param slug The slug of the blog post to retrieve.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await connectDB();

  // Also type the .lean() query here
  const post = await BlogPostModel.findOne({ slug }).lean<IBlogPost>();

  if (!post) {
    return null;
  }

  // Convert date and _id to strings to match the expected interface
  return {
    ...post,
    _id: post._id.toString(),
    date: post.date.toISOString(),
  } as unknown as BlogPost;
}