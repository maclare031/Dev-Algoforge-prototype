import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './blog';

const blogsDirectory = path.join(process.cwd(), 'src/contents/blogs');

export function getAllBlogPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(blogsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          author: data.author || '',
          date: data.date || '',
          tags: data.tags || [],
          category: data.category || '',
          image: data.image || '/images/blog/default-blog.jpg',
          featured: data.featured || false,
          readTime: data.readTime || '',
          content,
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allPostsData;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || '',
      date: data.date || '',
      tags: data.tags || [],
      category: data.category || '',
      image: data.image || '/images/blog/default-blog.jpg',
      featured: data.featured || false,
      readTime: data.readTime || '',
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
