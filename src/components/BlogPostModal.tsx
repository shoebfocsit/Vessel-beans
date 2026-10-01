import React, { useState } from 'react';
import { X, Heart, Clock, Calendar, User, BookOpen, MessageSquare, Send, Check } from 'lucide-react';
import { BlogPost } from '../data/coffeeData.ts';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onLike: (postId: string) => void;
  isLiked: boolean;
}

interface ReaderComment {
  id: string;
  name: string;
  comment: string;
  date: string;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onLike,
  isLiked,
}) => {
  const [comments, setComments] = useState<ReaderComment[]>([
    {
      id: 'c1',
      name: 'Oliver Thorne',
      comment: 'This completely changed how I think about my tap water at home. Switched to balanced spring water this morning and my morning V60 had double the peach florality!',
      date: '2 days ago',
    },
    {
      id: 'c2',
      name: 'Claire Moreau',
      comment: 'Such a thoughtful piece. I love that you highlight the farmers and washing station artisans behind these micro-lots.',
      date: 'Yesterday',
    },
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  if (!post) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: ReaderComment = {
      id: `comment-${Date.now()}`,
      name: commentName.trim(),
      comment: commentText.trim(),
      date: 'Just now',
    };

    setComments([newComment, ...comments]);
    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#231C16]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="bg-[#FAF7F2] max-w-3xl w-full rounded-xl border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7E7267]">
            <span className="font-semibold uppercase tracking-wider text-[#9C6644]">
              {post.category}
            </span>
            <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
            <span>{post.date}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7E7267] hover:text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-[#231C16]">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#231C16] leading-tight text-balance">
              {post.title}
            </h2>
            <p className="text-base sm:text-lg text-[#7E7267] font-serif italic">
              {post.subtitle}
            </p>

            {/* Author Byline */}
            <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#7E7267] border-t border-[#E8DFD5]">
              <div className="flex items-center gap-1.5 font-medium text-[#231C16]">
                <User className="w-3.5 h-3.5 text-[#9C6644]" />
                <span>{post.author}</span>
                <span className="text-[#7E7267] font-normal">({post.authorRole})</span>
              </div>
              <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9C6644]" />
                <span>Published {post.date}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden border border-[#E8DFD5] bg-[#EFE9E2] aspect-[16/9]">
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg shadow-2xs space-y-2.5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#9C6644] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Key Harvest & Roastery Takeaways</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#3E3228]">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#9C6644] font-bold">―</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pull Quote */}
          {post.pullQuote && (
            <div className="my-6 pl-5 border-l-2 border-[#9C6644] py-1 bg-[#F4EFEA] pr-4 rounded-r-md">
              <p className="font-serif italic text-lg sm:text-xl text-[#231C16] leading-snug">
                “{post.pullQuote}”
              </p>
            </div>
          )}

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#3E3228] font-normal">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Comments / Reader Reflections Section */}
          <div className="pt-8 border-t border-[#E8DFD5] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#9C6644]" />
                <h3 className="text-base font-serif font-medium text-[#231C16]">
                  Reader Reflections ({comments.length})
                </h3>
              </div>
              <span className="text-xs text-[#7E7267]">Join the conversation</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="p-4 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#231C16] focus:outline-hidden focus:border-[#9C6644]"
                />
              </div>
              <textarea
                required
                rows={2}
                placeholder="Share your perspective or brewing experience with this origin..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#231C16] focus:outline-hidden focus:border-[#9C6644] leading-relaxed"
              ></textarea>
              <div className="flex items-center justify-between pt-1">
                {commentSubmitted ? (
                  <span className="text-xs text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Note shared to journal
                  </span>
                ) : (
                  <span></span>
                )}
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors inline-flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Post Reflection</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-3.5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#7E7267]">
                    <span className="font-semibold text-[#231C16]">{c.name}</span>
                    <span className="text-[11px]">{c.date}</span>
                  </div>
                  <p className="text-[#3E3228] leading-relaxed">{c.comment}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between shrink-0">
          <button
            onClick={() => onLike(post.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border text-xs font-medium transition-all ${
              isLiked
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-[#E8DFD5] hover:border-[#D8CCC0] text-[#7E7267]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
            <span>{isLiked ? 'Appreciated' : 'Appreciate Post'}</span>
            <span className="font-mono tabular-nums font-semibold">({post.likes + (isLiked ? 1 : 0)})</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#231C16] bg-[#F4EFEA] hover:bg-[#E8DFD5] rounded-md transition-colors"
          >
            Back to Blog
          </button>
        </div>

      </div>
    </div>
  );
};
