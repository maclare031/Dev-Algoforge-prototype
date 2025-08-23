// src/scripts/migrateBlogs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import connectDB from '../lib/db';
import BlogPost from '../models/BlogPost';
import { getAllBlogPosts as getAllFileBlogPosts } from '../lib/blog-server'; // Using file-based retrieval

const migrateBlogs = async () => {
  await connectDB();

  const allPostsData = getAllFileBlogPosts();

  for (const post of allPostsData) {
    const existingPost = await BlogPost.findOne({ slug: post.slug });

    if (!existingPost) {
      const newPost = new BlogPost(post);
      await newPost.save();
      console.log(`Migrated post: ${post.title}`);
    } else {
      console.log(`Skipping existing post: ${post.title}`);
    }
  }

  console.log('Blog migration completed.');
  process.exit(0);
};

migrateBlogs().catch((err) => {
  console.error(err);
  process.exit(1);
});