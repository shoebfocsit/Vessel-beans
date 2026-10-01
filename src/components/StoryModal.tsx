import React from 'react';
import { X, Heart, Clock, Calendar, User, BookOpen } from 'lucide-react';
import { CoffeeStory } from '../data/coffeeData.ts';

interface StoryModalProps {
  story: CoffeeStory | null;
  onClose: () => void;
  onLike: (storyId: string) => void;
  isLiked: boolean;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onLike,
  isLiked,
}) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#231C16]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="bg-[#FAF7F2] max-w-3xl w-full rounded-xl border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7E7267]">
            <span className="font-semibold uppercase tracking-wider text-[#9C6644]">
              {story.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{story.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7E7267] hover:text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
            aria-label="Close story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-[#231C16]">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#231C16] leading-tight">
              {story.title}
            </h2>
            <p className="text-base sm:text-lg text-[#7E7267] font-serif italic">
              {story.subtitle}
            </p>

            {/* Author Byline */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#7E7267] border-t border-[#E8DFD5]">
              <div className="flex items-center gap-1.5 font-medium text-[#231C16]">
                <User className="w-3.5 h-3.5 text-[#9C6644]" />
                <span>{story.author}</span>
                <span className="text-[#7E7267] font-normal">({story.role})</span>
              </div>
              <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9C6644]" />
                <span>{story.date}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {story.image && (
            <div className="rounded-lg overflow-hidden border border-[#E8DFD5] bg-[#EFE9E2] aspect-[16/9]">
              <img
                src={story.image}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Pull Quote */}
          {story.pullQuote && (
            <div className="my-6 pl-5 border-l-2 border-[#9C6644] py-1 bg-[#F4EFEA] pr-4 rounded-r-md">
              <p className="font-serif italic text-lg sm:text-xl text-[#231C16] leading-snug">
                “{story.pullQuote}”
              </p>
            </div>
          )}

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#3E3228] font-normal">
            {story.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Tasting Pairing Box */}
          {story.tastingPairing && (
            <div className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#9C6644] mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Atelier Tasting Recommendation</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7E7267]">
                {story.tastingPairing}
              </p>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between shrink-0">
          <button
            onClick={() => onLike(story.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border text-xs font-medium transition-all ${
              isLiked
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-[#E8DFD5] hover:border-[#D8CCC0] text-[#7E7267]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
            <span>{isLiked ? 'Appreciated' : 'Appreciate Story'}</span>
            <span className="font-mono tabular-nums font-semibold">({story.likes + (isLiked ? 1 : 0)})</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#231C16] bg-[#F4EFEA] hover:bg-[#E8DFD5] rounded-md transition-colors"
          >
            Back to Stories
          </button>
        </div>

      </div>
    </div>
  );
};
