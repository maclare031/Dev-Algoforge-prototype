// src/components/blog-card.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
        featured ? "border-blue-200" : ""
      } max-w-sm sm:max-w-xs mx-auto`}
    >
      {post.featured && (
        <div className="absolute top-1 left-1 z-10">
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-600 text-white rounded">
            Featured
          </span>
        </div>
      )}

      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-28 sm:h-32" : "h-24 sm:h-28"}`}>
        <Image
          src={post.image || ""}
          alt={post.title}
          fill
          className="object-fit"
          sizes="(max-width: 768px) 100vw, 25vw"
          onError={(e) => { e.currentTarget.src = "public/images/no-image-icon-23485.png"; }}
        />
        <div className="absolute bottom-1 left-1">
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-black/60 text-white rounded">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex flex-wrap gap-1 mb-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-blue-700 bg-blue-50 rounded border border-blue-100"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="px-1.5 py-0.5 text-[10px] text-gray-600 bg-gray-50 rounded border border-gray-100">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-700 transition-colors duration-200 leading-snug ${
              featured ? "text-sm sm:text-base" : "text-sm"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2 border-t border-gray-100 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[64px]">{post.author}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          {/* --- CORRECTED READ TIME DISPLAY --- */}
          <div className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          Read Article
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}