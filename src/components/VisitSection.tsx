import React from 'react';
import { MapPin, Clock, Calendar, Sparkles, Coffee } from 'lucide-react';

interface VisitSectionProps {
  onOpenReserve: () => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ onOpenReserve }) => {
  return (
    <section id="visit" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
            The Atelier Space
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
            A Quiet Respite from the City
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#7E7267]">
            Natural linen banquettes, bleached white oak counters, and the gentle crackle of jazz vinyl. Built for slow sips, notebooks, and shared conversation.
          </p>
        </div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Hours Card */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C6644]">
              <Clock className="w-4 h-4" />
              <span>Roastery & Cafe Hours</span>
            </div>
            <div className="space-y-2 text-xs text-[#231C16]">
              <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                <span className="text-[#7E7267]">Monday – Friday</span>
                <span className="font-mono tabular-nums font-medium">07:00 – 18:00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                <span className="text-[#7E7267]">Saturday – Sunday</span>
                <span className="font-mono tabular-nums font-medium">08:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7E7267]">Public Cupping Sessions</span>
                <span className="font-mono tabular-nums font-medium">Wed & Sat 10:00</span>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C6644]">
              <MapPin className="w-4 h-4" />
              <span>Coordinates & Location</span>
            </div>
            <div className="space-y-1 text-xs text-[#231C16]">
              <p className="font-medium text-sm">418 Roaster’s Alley, Lower Hearth</p>
              <p className="text-[#7E7267]">Corner of Cedar & 4th Avenue</p>
              <p className="text-[#7E7267]">Accessible via Hearth Station (Line 2)</p>
              <div className="pt-2 text-[#7E7267]">
                <span>atelier@vesselandbean.com</span>
                <span className="mx-2">·</span>
                <span>(555) 019-4820</span>
              </div>
            </div>
          </div>

          {/* Cafe House Rules / Mindful Atmosphere */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C6644]">
              <Sparkles className="w-4 h-4" />
              <span>Acoustic & Seating Policy</span>
            </div>
            <p className="text-xs text-[#7E7267] leading-relaxed">
              We cultivate a peaceful environment. Laptops are warmly welcomed at our central communal cedar bench; the window tables and armchairs are reserved for reading paper books, journaling, and conversation.
            </p>
          </div>

        </div>

        {/* Reservation / Cupping Banner */}
        <div className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#9C6644] font-semibold block mb-1">
              Private Tasting & Reservations
            </span>
            <h3 className="text-2xl font-serif text-[#231C16]">
              Book a Cupping Table or Coffee Flight
            </h3>
            <p className="text-xs sm:text-sm text-[#7E7267] mt-1 max-w-lg">
              Reserve our corner banquette for small groups, or book an intimate 45-minute sensory cupping flight led by our Head Roaster.
            </p>
          </div>

          <button
            onClick={onOpenReserve}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors shadow-xs whitespace-nowrap inline-flex items-center gap-2 shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#D8CCC0]" />
            <span>Reserve Table / Cupping</span>
          </button>
        </div>

      </div>
    </section>
  );
};
