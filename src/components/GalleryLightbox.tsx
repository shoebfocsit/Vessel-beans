import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, Camera, Maximize2, Minimize2, Check } from 'lucide-react';
import { GalleryItem } from '../data/galleryData.ts';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
  onLike: (id: string) => void;
  isLiked: boolean;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
  onLike,
  isLiked,
}) => {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
    setIsZoomed(false);
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#140F0B]/95 backdrop-blur-md flex flex-col justify-between text-[#FAF7F2] animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar Controls */}
      <div className="px-6 py-4 border-b border-[#2C231D] flex items-center justify-between shrink-0 bg-[#1A1410]/70">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#D8CCC0] uppercase">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="text-[#5A4B40]">·</span>
          <span className="text-xs font-medium text-[#C8B8AA]">
            {item.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 text-[#C8B8AA] hover:text-white hover:bg-[#2C231D] rounded-md transition-colors"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            aria-label="Toggle zoom"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 text-[#C8B8AA] hover:text-white hover:bg-[#2C231D] rounded-md transition-colors"
            title="Share moment"
            aria-label="Share moment"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-[#C8B8AA] hover:text-white hover:bg-[#2C231D] rounded-md transition-colors"
            aria-label="Close fullscreen gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Visual Display & Navigation Arrows */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 p-3 text-[#FAF7F2] bg-[#231C16]/80 hover:bg-[#3E3228] border border-[#3E3228] rounded-full transition-all shadow-lg hover:scale-105"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Image Frame */}
        <div className="max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center transition-all duration-300">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className={`max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-10 p-3 text-[#FAF7F2] bg-[#231C16]/80 hover:bg-[#3E3228] border border-[#3E3228] rounded-full transition-all shadow-lg hover:scale-105"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Story & Metadata Drawer */}
      <div className="bg-[#1A1410] border-t border-[#2C231D] px-6 py-5 shrink-0 max-h-48 overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="space-y-1.5 flex-1 pr-4">
            <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed">
              {item.story || item.description}
            </p>

            {/* Context line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E7E72] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#9C6644]" />
                {item.location}
              </span>
              <span className="text-[#3E3228]">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#9C6644]" />
                {item.date}
              </span>
              <span className="text-[#3E3228]">·</span>
              <span className="flex items-center gap-1">
                <Camera className="w-3 h-3 text-[#9C6644]" />
                {item.photographer}
              </span>
            </div>
          </div>

          {/* Action on the right: Like button & Tags */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onLike(item.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border text-xs font-medium transition-all ${
                isLiked
                  ? 'border-red-400 bg-red-950/40 text-red-300'
                  : 'border-[#3E3228] hover:border-[#5A4B40] text-[#D8CCC0] bg-[#231C16]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
              <span>{isLiked ? 'Appreciated' : 'Appreciate'}</span>
              <span className="font-mono tabular-nums">({item.likes + (isLiked ? 1 : 0)})</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
