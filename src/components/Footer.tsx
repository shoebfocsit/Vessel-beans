import React, { useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateView?: (view: 'home' | 'our-story' | 'blog' | 'gallery', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const handleLinkClick = (view: 'home' | 'our-story' | 'blog' | 'gallery', sectionId?: string) => {
    if (onNavigateView) {
      onNavigateView(view, sectionId);
    }
  };

  return (
    <footer className="bg-[#231C16] text-[#FAF7F2] border-t border-[#3E3228]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Newsletter & Story Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#3E3228] items-start">
          
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-[#FAF7F2]">
              Vessel & Bean <span className="italic font-normal text-[#D8CCC0]">Atelier</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#A89C90] max-w-md leading-relaxed">
              We exist to honor the slow, unhurried craft of single-origin coffee. Roasted with care in micro-batches, extracted with scientific precision, and poured with genuine warmth.
            </p>
            <div className="text-xs text-[#D8CCC0] flex items-center gap-2 pt-2">
              <span>Direct Trade</span>
              <span aria-hidden="true">·</span>
              <span>100% Specialty Arabica</span>
              <span aria-hidden="true">·</span>
              <span>Compostable Packaging</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#D8CCC0]">
              Seasonal Harvest Dispatches
            </div>
            <p className="text-xs text-[#A89C90]">
              Subscribe to receive notice of limited micro-lot arrivals, private cupping dates, and newly published barista stories.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#33281F] border border-[#4A3B2F] rounded-md text-xs text-[#FAF7F2] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You will receive our seasonal harvest dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-[#2F241C] border border-[#4A3B2F] rounded-md text-[#FAF7F2] placeholder:text-[#7E7267] focus:outline-hidden focus:border-[#D8CCC0]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#231C16] bg-[#FAF7F2] hover:bg-[#E8DFD5] rounded-md transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Navigation & Footnote */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7E72]">
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => handleLinkClick('our-story')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Our Story</button>
            <button onClick={() => handleLinkClick('gallery')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Atelier Gallery</button>
            <button onClick={() => handleLinkClick('home', 'culture')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Coffee Culture</button>
            <button onClick={() => handleLinkClick('home', 'menu')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Menu</button>
            <button onClick={() => handleLinkClick('blog', 'blog')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Atelier Blog</button>
            <button onClick={() => handleLinkClick('home', 'brew-guide')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Brewing Laboratory</button>
            <button onClick={() => handleLinkClick('home', 'visit')} className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Visit Atelier</button>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted for slow mornings & mindful cups</span>
            <span aria-hidden="true" className="mx-1">·</span>
            <span>© 2026 Vessel & Bean</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
