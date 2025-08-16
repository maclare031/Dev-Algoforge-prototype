import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts } from "@/lib/blog-server";
import { getAllCategories, getAllTags } from "@/lib/blog";
import { Tag, BookOpen, TrendingUp } from "lucide-react";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories(blogPosts);
  const tags = getAllTags(blogPosts);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-3 sm:pt-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        {/* Hero Section */}
        <div className="relative text-center mb-4 sm:mb-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-lg sm:rounded-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] rounded-lg sm:rounded-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent_50%)] rounded-lg sm:rounded-xl" />
          </div>

          <div className="relative py-4 sm:py-8 lg:py-10 px-2 sm:px-4">
            <div className="mb-2 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight sm:leading-relaxed py-1 sm:py-2">
                Knowledge Hub
              </h1>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-2 sm:mb-3" />
            </div>

            <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
              Discover cutting-edge insights, practical tutorials, and emerging trends in
              <span className="text-cyan-400 font-medium"> data science</span>,
              <span className="text-purple-400 font-medium"> machine learning</span>, and
              <span className="text-pink-400 font-medium"> technology innovation</span>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              <div className="group bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hover:border-cyan-400/40 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-400">
                  <div className="p-0.5 sm:p-1 bg-cyan-500/10 rounded">
                    <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{blogPosts.length}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400">Articles</div>
                  </div>
                </div>
              </div>

              <div className="group bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 text-purple-400">
                  <div className="p-0.5 sm:p-1 bg-purple-500/10 rounded">
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{featuredPosts.length}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400">Featured</div>
                  </div>
                </div>
              </div>

              <div className="group bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hover:border-pink-400/40 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 text-pink-400">
                  <div className="p-0.5 sm:p-1 bg-pink-500/10 rounded">
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{categories.length}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400">Topics</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400/30 rounded-full animate-pulse" />
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-3 left-4 sm:bottom-6 sm:left-8 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse delay-700" />
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1.5 sm:gap-2 px-1">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
              <span>Featured</span>
            </h2>
            {/* Updated grid classes: 1 on mobile, 3 on tablet (md), 4 on desktop (lg) */}
            <div className="mx-4 md:mx-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div className="mb-4 sm:mb-6 lg:mb-8">
            {featuredPosts.length > 0 && (
              <h2 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1.5 sm:gap-2 px-1">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span>All Articles</span>
              </h2>
            )}
            {/* Updated grid classes: 1 on mobile, 3 on tablet (md), 4 on desktop (lg) */}
            <div className="mx-4 md:mx-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
