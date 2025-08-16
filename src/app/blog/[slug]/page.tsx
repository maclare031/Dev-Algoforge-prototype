import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import gfm from "remark-gfm";
import { getBlogPost } from "@/lib/blog-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, User, Tag } from "lucide-react";
import { formatDate } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogProps) {
  // Fetch blog post
  const post = getBlogPost((await params).slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/20">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2 text-cyan-400">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-400">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[gfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-cyan-300 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
