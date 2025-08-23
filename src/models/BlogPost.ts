// src/models/BlogPost.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  tags: string[];
  category: string;
  image: string;
  featured: boolean;
  readTime: string;
  content: string;
}

const BlogPostSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  date: { type: Date, default: Date.now },
  tags: [{ type: String }],
  category: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false },
  readTime: { type: String },
  content: { type: String, required: true },
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);