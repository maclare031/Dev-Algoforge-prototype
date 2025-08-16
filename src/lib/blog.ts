// Types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  image: string;
  featured: boolean;
  readTime: string;
  content: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  image: string;
  featured: boolean;
  readTime: string;
}

// Utility functions that can be used on both client and server
export function getAllCategories(posts: BlogPost[]): string[] {
  const categories = posts.map((post) => post.category);
  return [...new Set(categories)].filter(Boolean);
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = posts.flatMap((post) => post.tags);
  return [...new Set(tags)].filter(Boolean);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getFeaturedBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.featured);
}

export function getBlogPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter((post) => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getBlogPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) => 
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}
