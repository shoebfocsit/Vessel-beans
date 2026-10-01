import React, { useState } from 'react';
import { BookOpen, PenLine, Heart, ArrowUpRight } from 'lucide-react';
import { CoffeeStory } from '../data/coffeeData.ts';

interface StoriesSectionProps {
  stories: CoffeeStory[];
  onOpenStory: (story: CoffeeStory) => void;
  onOpenSubmitStory: () => void;
  likedStoryIds: string[];
  onLikeStory: (id: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  stories,
  onOpenStory,
  onOpenSubmitStory,
  likedStoryIds,
  onLikeStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Origins & Terroir', 'Barista Craft', 'Brewing Science', 'Cafe Memoirs'];

  const filteredStories = stories.filter((story) => {
    if (selectedCategory === 'All') return true;
    return story.category === selectedCategory;
  });

  return (
    <section id="stories" className="py-16 md:py-24 bg-[#F4EFEA] border-y border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Share Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
              The Atelier Journal & Cafe Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
              Stories Steeped in Slow Time
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#7E7267] max-w-xl">
              From high-altitude Ethiopian hillsides and roaster thermodynamic journals, to decade-long morning conversations at our oak tables.
            </p>
          </div>

          <button
            onClick={onOpenSubmitStory}
            className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#231C16] bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#E8DFD5] rounded-md transition-colors shadow-xs inline-flex items-center gap-2 shrink-0 self-start md:self-end"
          >
            <PenLine className="w-3.5 h-3.5 text-[#9C6644]" />
            <span>Share Your Coffee Story</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#231C16] text-white shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#7E7267] hover:text-[#231C16] border border-[#E8DFD5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => {
            const isLiked = likedStoryIds.includes(story.id);
            return (
              <article
                key={story.id}
                className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs hover:border-[#D8CCC0] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Story Image */}
                  {story.image && (
                    <div
                      className="aspect-[16/9] w-full overflow-hidden bg-[#FAF7F2] cursor-pointer"
                      onClick={() => onOpenStory(story)}
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-[#7E7267] mb-2">
                      <span className="text-[#9C6644] font-semibold uppercase tracking-wider text-[11px]">
                        {story.category}
                      </span>
                      <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
                      <span>{story.readTime}</span>
                      <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
                      <span>{story.date}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenStory(story)}
                      className="text-xl sm:text-2xl font-serif font-medium text-[#231C16] group-hover:text-[#9C6644] transition-colors cursor-pointer leading-tight mb-2"
                    >
                      {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed line-clamp-3 mb-4">
                      {story.excerpt}
                    </p>

                    {/* Author Byline */}
                    <div className="text-xs text-[#7E7267] pt-2 border-t border-[#E8DFD5]">
                      <span className="font-semibold text-[#231C16]">{story.author}</span>
                      <span className="mx-1.5 text-[#D8CCC0]">/</span>
                      <span>{story.role}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Read and Like */}
                <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E8DFD5] flex items-center justify-between">
                  <button
                    onClick={() => onOpenStory(story)}
                    className="text-xs font-semibold text-[#231C16] hover:text-[#9C6644] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeStory(story.id);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      isLiked ? 'text-red-600' : 'text-[#7E7267] hover:text-[#231C16]'
                    }`}
                    title="Like this story"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                    <span className="font-mono tabular-nums">{story.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
