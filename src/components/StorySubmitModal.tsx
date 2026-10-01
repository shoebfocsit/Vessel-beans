import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { CoffeeStory, CULTURE_BEANS_IMAGE } from '../data/coffeeData.ts';

interface StorySubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitStory: (newStory: CoffeeStory) => void;
}

export const StorySubmitModal: React.FC<StorySubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitStory,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Coffee Enthusiast & Guest');
  const [category, setCategory] = useState<CoffeeStory['category']>('Cafe Memoirs');
  const [pullQuote, setPullQuote] = useState('');
  const [content, setContent] = useState('');
  const [tastingPairing, setTastingPairing] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Your name is required';
    if (!content.trim() || content.length < 50) {
      newErrors.content = 'Story must be at least 50 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const paragraphs = content
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const calculatedReadTime = `${Math.max(1, Math.ceil(content.split(' ').length / 150))} min read`;

    const newStory: CoffeeStory = {
      id: `story-user-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A community reflection from our cafe table.',
      author: author.trim(),
      role: role.trim() || 'Patron',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: calculatedReadTime,
      category,
      excerpt: paragraphs[0]?.slice(0, 160) + '...' || '',
      content: paragraphs.length > 0 ? paragraphs : [content],
      image: CULTURE_BEANS_IMAGE,
      pullQuote: pullQuote.trim() || undefined,
      tastingPairing: tastingPairing.trim() || undefined,
      likes: 1,
    };

    onSubmitStory(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#231C16]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-2xl w-full rounded-xl border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#9C6644]">
              Community Journal
            </div>
            <h2 className="text-xl font-serif text-[#231C16]">
              Share Your Coffee Story
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7E7267] hover:text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              />
              {errors.author && <p className="text-[11px] text-red-600 mt-1">{errors.author}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-1">
                Your Role / Perspective
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Weekend Regular, Home Brewer"
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#231C16] mb-1">
              Story Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
            >
              <option value="Cafe Memoirs">Cafe Memoirs & Morning Rituals</option>
              <option value="Barista Craft">Barista Craft & Home Brewing</option>
              <option value="Origins & Terroir">Origins & Farm Travels</option>
              <option value="Brewing Science">Brewing Science & Experiments</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#231C16] mb-1">
              Story Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The First Sip That Changed How I Taste Morning Light"
              className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
            />
            {errors.title && <p className="text-[11px] text-red-600 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#231C16] mb-1">
              Subtitle or Reflection
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A one-sentence summary or theme"
              className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#231C16] mb-1">
              Story Narrative (Separate paragraphs with double enter) *
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story, a memory of a particular roast, a travel encounter in a coffee plantation, or how slow mornings keep you grounded..."
              className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden leading-relaxed"
            ></textarea>
            {errors.content && <p className="text-[11px] text-red-600 mt-1">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-1">
                Pull Quote (Optional)
              </label>
              <input
                type="text"
                value={pullQuote}
                onChange={(e) => setPullQuote(e.target.value)}
                placeholder="A memorable line from your story"
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-1">
                Coffee Pairing (Optional)
              </label>
              <input
                type="text"
                value={tastingPairing}
                onChange={(e) => setTastingPairing(e.target.value)}
                placeholder="e.g. Best read with a steaming Cortado"
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#7E7267] hover:text-[#231C16]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Story to Journal</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
