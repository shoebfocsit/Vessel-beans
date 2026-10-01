import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { HERO_IMAGE } from '../data/coffeeData.ts';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onExploreCulture: () => void;
  onQuickAddSpecialty: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onExploreCulture,
  onQuickAddSpecialty,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle top indicator */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C6644] font-medium mb-4">
          <span>Artisanal Roastery & Slow Cafe</span>
          <span aria-hidden="true">·</span>
          <span>Single-Origin Focus</span>
          <span aria-hidden="true">·</span>
          <span>Open Daily 07:00 – 18:00</span>
        </div>

        {/* 2-column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#231C16] leading-[1.12] tracking-tight text-balance">
              Slow Mornings. <br />
              <span className="italic font-normal text-[#9C6644]">Intentional Roasts.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#7E7267] leading-relaxed max-w-xl font-normal">
              A tranquil sanctuary celebrating the journey from high-altitude volcanic soils to ceramic cup. 
              We roast in small, gentle batches to highlight pure floral notes, juicy stone fruits, and balanced sweetness.
            </p>

            {/* Micro proof line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#7E7267] pt-1">
              <span>Direct Trade Cooperatives</span>
              <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
              <span>100% Specialty Arabica</span>
              <span aria-hidden="true" className="text-[#D8CCC0]">·</span>
              <span>Custom Mineral Water (TDS 130)</span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 text-sm font-medium tracking-wide text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <span>Explore Seasonal Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCulture}
                className="px-6 py-3 text-sm font-medium tracking-wide text-[#231C16] bg-[#FFFFFF] hover:bg-[#F4EFEA] border border-[#E8DFD5] rounded-md transition-colors inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#9C6644]" />
                <span>Our Coffee Culture</span>
              </button>
            </div>

            {/* Roaster's Note of the Day Box */}
            <div className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg shadow-xs mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#9C6644] mb-1">
                    Today’s Roaster Spotlight
                  </div>
                  <h2 className="text-base sm:text-lg font-serif font-medium text-[#231C16]">
                    Ethiopia Gedeb Chelchele (Washed Heirloom)
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#7E7267] mt-1">
                    <span>Jasmine Blossom</span>
                    <span aria-hidden="true">·</span>
                    <span>Bergamot Tea</span>
                    <span aria-hidden="true">·</span>
                    <span>White Peach</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-[#231C16] font-semibold">$6.50</span>
                  </div>
                </div>

                <button
                  onClick={onQuickAddSpecialty}
                  className="shrink-0 px-3 py-1.5 text-xs font-medium text-[#231C16] hover:text-white bg-[#F4EFEA] hover:bg-[#9C6644] border border-[#E8DFD5] hover:border-[#9C6644] rounded-md transition-colors whitespace-nowrap"
                  title="Add to Tasting Tray"
                >
                  + Add to Tray
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Atmospheric Image Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-md border border-[#E8DFD5] bg-[#FFFFFF] group">
              <div className="aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-[#EFE9E2]">
                <img
                  src={HERO_IMAGE}
                  alt="Barista hand pouring water through a ceramic V60 dripper over freshly bloomed coffee grounds in morning cafe light"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Minimal caption ribbon */}
              <div className="px-5 py-4 bg-[#FFFFFF] border-t border-[#E8DFD5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#231C16] block">
                    The Morning Extraction Ritual
                  </span>
                  <span className="text-xs text-[#7E7267]">
                    Hand-poured at 93°C with a gentle 45-second bloom
                  </span>
                </div>
                <span className="text-xs font-mono text-[#9C6644] tracking-wider uppercase font-medium">
                  Atelier Bar No. 1
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
