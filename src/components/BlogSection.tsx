import React, { useState } from 'react';
import { Search, BookOpen, ArrowUpRight, Heart, Sparkles, Filter } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/coffeeData.ts';

interface BlogSectionProps {
  onOpenPost: (post: BlogPost) => void;
  likedPostIds: string[];
  onLikePost: (postId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenPost,
  likedPostIds,
  onLikePost,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Coffee Origins', 'Brewing Methods', 'Barista Spotlights', 'Community News'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory !== 'All' && post.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSubtitle = post.subtitle.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchAuthor = post.author.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchExcerpt && !matchAuthor) {
        return false;
      }
    }
    return true;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <section id="blog" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#E8DFD5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
              The Vessel & Bean Chronicle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
              Atelier Blog & Field Notes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#7E7267] max-w-xl">
              Thoughtful long-form essays exploring coffee origins, extraction thermodynamics, barista craftsmanship, and neighborhood gatherings.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#7E7267] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search origins, brew tips, baristas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] placeholder:text-[#7E7267]/70 focus:outline-hidden focus:border-[#9C6644] transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#231C16] text-white shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#7E7267] hover:text-[#231C16] border border-[#E8DFD5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Spotlight (shown when browsing All or Coffee Origins and not actively searching) */}
        {activeCategory === 'All' && searchQuery.trim() === '' && featuredPost && (
          <div className="mb-14 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs hover:border-[#D8CCC0] transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image side */}
              <div
                className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-[#EFE9E2] cursor-pointer group"
                onClick={() => onOpenPost(featuredPost)}
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Content side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#7E7267]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9C6644]">
                      Featured Harvest Dispatch
                    </span>
                    <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3
                    onClick={() => onOpenPost(featuredPost)}
                    className="text-2xl sm:text-3xl font-serif text-[#231C16] hover:text-[#9C6644] transition-colors cursor-pointer leading-snug"
                  >
                    {featuredPost.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Highlights */}
                  {featuredPost.keyTakeaways && (
                    <div className="pt-2 border-t border-[#FAF7F2] space-y-1.5">
                      <div className="text-[11px] font-medium uppercase tracking-wider text-[#231C16]">
                        Field Takeaway:
                      </div>
                      <p className="text-xs text-[#7E7267] italic">
                        "{featuredPost.keyTakeaways[0]}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between">
                  <div className="text-xs text-[#7E7267]">
                    <span className="font-semibold text-[#231C16]">{featuredPost.author}</span>
                    <span className="mx-1 text-[#D8CCC0]">·</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <button
                    onClick={() => onOpenPost(featuredPost)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Regular Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-xl border border-[#E8DFD5] p-8">
            <BookOpen className="w-8 h-8 text-[#7E7267] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-serif text-[#231C16]">No blog dispatches found</h3>
            <p className="text-xs text-[#7E7267] mt-1">Try resetting your search query or choosing another category.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#231C16] bg-[#F4EFEA] hover:bg-[#E8DFD5] rounded-md"
            >
              Show All Dispatches
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const isLiked = likedPostIds.includes(post.id);
              return (
                <article
                  key={post.id}
                  className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-2xs hover:border-[#D8CCC0] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Post Image */}
                    {post.image && (
                      <div
                        className="aspect-[16/10] w-full overflow-hidden bg-[#FAF7F2] cursor-pointer"
                        onClick={() => onOpenPost(post)}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#7E7267] mb-2">
                        <span className="text-[#9C6644] font-semibold uppercase tracking-wider text-[11px]">
                          {post.category}
                        </span>
                        <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
                        <span>{post.readTime}</span>
                        <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
                        <span>{post.date}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onOpenPost(post)}
                        className="text-lg sm:text-xl font-serif font-medium text-[#231C16] group-hover:text-[#9C6644] transition-colors cursor-pointer leading-snug mb-2"
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-[#7E7267] leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="text-xs text-[#7E7267] pt-2 border-t border-[#FAF7F2]">
                        <span className="font-semibold text-[#231C16]">{post.author}</span>
                        <span className="mx-1 text-[#D8CCC0]">/</span>
                        <span>{post.authorRole}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E8DFD5] flex items-center justify-between">
                    <button
                      onClick={() => onOpenPost(post)}
                      className="text-xs font-semibold text-[#231C16] hover:text-[#9C6644] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikePost(post.id);
                      }}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        isLiked ? 'text-red-600' : 'text-[#7E7267] hover:text-[#231C16]'
                      }`}
                      title="Appreciate post"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                      <span className="font-mono tabular-nums">{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
