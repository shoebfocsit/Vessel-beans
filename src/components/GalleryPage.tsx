import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, Maximize2, Sparkles, Filter, Camera } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData.ts';
import { GalleryLightbox } from './GalleryLightbox.tsx';

interface GalleryPageProps {
  onBackToHome: () => void;
  onExploreMenu: () => void;
  onExploreStory: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
  onExploreMenu,
  onExploreStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [likedItemIds, setLikedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vessel_bean_gallery_likes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = [
    'All',
    'Community & Parties',
    'Barista & Roastery',
    'Latte Art & Drinks',
    'Bakery & Food',
    'Space & Heritage',
  ];

  const handleLike = (id: string) => {
    setLikedItemIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('vessel_bean_gallery_likes_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchLoc = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTags && !matchLoc) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Top Banner Navigation */}
      <div className="border-b border-[#E8DFD5] bg-[#FFFFFF]/80 backdrop-blur-xs py-3 px-4 sm:px-6 lg:px-8 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-[#231C16] hover:text-[#9C6644] inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cafe Home</span>
          </button>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onExploreStory}
              className="text-[#7E7267] hover:text-[#231C16] transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <span className="text-[#D8CCC0]">·</span>
            <button
              onClick={onExploreMenu}
              className="text-[#7E7267] hover:text-[#231C16] transition-colors cursor-pointer"
            >
              Seasonal Menu
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 border-b border-[#E8DFD5] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
                Visual Chronicle & Moments
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
                The Atelier Gallery & Life
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#7E7267] max-w-xl">
                Candid snapshots of Friday acoustic nights, dawn cuppings, fresh cardamom bakes, and daily encounters around our cedar bar.
              </p>
            </div>

            {/* Keyword Search */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-[#7E7267] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search parties, latte art, bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] placeholder:text-[#7E7267]/70 focus:outline-hidden focus:border-[#9C6644] transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mt-8 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#231C16] text-white shadow-xs font-semibold'
                      : 'bg-[#FFFFFF] text-[#7E7267] hover:text-[#231C16] border border-[#E8DFD5]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono tabular-nums ${selectedCategory === cat ? 'text-[#D8CCC0]' : 'text-[#7E7267]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pinterest-Style Masonry Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] rounded-xl border border-[#E8DFD5] p-8">
              <Camera className="w-8 h-8 text-[#7E7267] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-serif text-[#231C16]">No moments found</h3>
              <p className="text-xs text-[#7E7267] mt-1">Try switching categories or clearing your search keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-medium text-[#231C16] bg-[#F4EFEA] hover:bg-[#E8DFD5] rounded-md cursor-pointer"
              >
                View All Moments
              </button>
            </div>
          ) : (
            /* CSS Columns Masonry */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
              {filteredItems.map((item) => {
                const isLiked = likedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="break-inside-avoid mb-5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group relative"
                  >
                    {/* Image Container with Pinterest-style Overlay */}
                    <div
                      className="relative overflow-hidden cursor-pointer bg-[#F4EFEA]"
                      onClick={() => setActiveLightboxItem(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Scrim Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                        
                        {/* Top action row */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
                            {item.category}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(item.id);
                            }}
                            className={`p-2 rounded-full transition-transform active:scale-90 ${
                              isLiked
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 hover:bg-white text-[#231C16]'
                            }`}
                            title="Appreciate"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Bottom action row */}
                        <div className="text-white flex items-center justify-between">
                          <span className="text-xs font-medium flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5 text-[#D8CCC0]" />
                            <span>Fullscreen</span>
                          </span>
                          <span className="text-[11px] font-mono tabular-nums text-[#D8CCC0]">
                            {item.likes + (isLiked ? 1 : 0)} likes
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Card Caption Information */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#7E7267]">
                        <span>{item.location}</span>
                        <span>{item.date}</span>
                      </div>

                      <h3
                        onClick={() => setActiveLightboxItem(item)}
                        className="text-sm font-serif font-semibold text-[#231C16] hover:text-[#9C6644] transition-colors cursor-pointer leading-snug"
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#7E7267] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tag badges */}
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[#FAF7F2]">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-[#7E7267] bg-[#FAF7F2] border border-[#E8DFD5] px-2 py-0.5 rounded-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Interactive Fullscreen Lightbox */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onSelect={(item) => setActiveLightboxItem(item)}
        onLike={handleLike}
        isLiked={activeLightboxItem ? likedItemIds.includes(activeLightboxItem.id) : false}
      />
    </div>
  );
};
