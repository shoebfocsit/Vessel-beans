import React from 'react';
import { ShoppingBag, Calendar, Menu, X, Coffee } from 'lucide-react';

interface NavbarProps {
  trayCount: number;
  onOpenTray: () => void;
  onOpenReserve: () => void;
  activeSection: string;
  currentView: 'home' | 'our-story' | 'blog' | 'gallery';
  onNavigateView: (view: 'home' | 'our-story' | 'blog' | 'gallery', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  trayCount,
  onOpenTray,
  onOpenReserve,
  activeSection,
  currentView,
  onNavigateView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { label: string; view?: 'home' | 'our-story' | 'blog' | 'gallery'; sectionId?: string }[] = [
    { label: 'Our Story', view: 'our-story' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Menu', view: 'home', sectionId: 'menu' },
    { label: 'Culture', view: 'home', sectionId: 'culture' },
    { label: 'Blog', view: 'blog', sectionId: 'blog' },
    { label: 'Brew Guide', view: 'home', sectionId: 'brew-guide' },
    { label: 'Visit', view: 'home', sectionId: 'visit' },
  ];

  const handleNavClick = (link: { label: string; view?: 'home' | 'our-story' | 'blog' | 'gallery'; sectionId?: string }) => {
    setMobileMenuOpen(false);
    if (link.view === 'our-story') {
      onNavigateView('our-story');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.view === 'gallery') {
      onNavigateView('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.view === 'blog') {
      onNavigateView('blog', 'blog');
    } else {
      onNavigateView('home', link.sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onNavigateView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-serif font-medium tracking-tight text-[#231C16] hover:text-[#9C6644] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="italic font-normal">Vessel</span>
          <span className="text-xs font-sans tracking-widest uppercase text-[#9C6644] font-semibold">·</span>
          <span>Bean</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav
          style={{ borderColor: '#000000' }}
          className="hidden lg:flex items-center gap-4 xl:gap-7 text-sm font-medium text-[#7E7267] shrink-0"
        >
          {navLinks.map((link) => {
            const isStoryActive = link.view === 'our-story' && currentView === 'our-story';
            const isGalleryActive = link.view === 'gallery' && currentView === 'gallery';
            const isBlogActive = link.view === 'blog' && (currentView === 'blog' || activeSection === 'blog');
            const isSectionActive = currentView === 'home' && link.sectionId === activeSection;
            const isActive = isStoryActive || isGalleryActive || isBlogActive || isSectionActive;

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`transition-colors py-1 border-b-2 text-sm cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#231C16] border-[#9C6644] font-semibold'
                    : 'border-transparent hover:text-[#231C16] hover:border-[#D8CCC0]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReserve}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wide uppercase text-[#231C16] bg-[#F4EFEA] hover:bg-[#EBE2D8] border border-[#E8DFD5] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#9C6644]" />
            <span>Table Booking</span>
          </button>

          <button
            onClick={onOpenTray}
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-medium tracking-wide uppercase text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-all shadow-xs whitespace-nowrap cursor-pointer"
            aria-label="View tasting tray and order"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D8CCC0]" />
            <span>Tasting Tray</span>
            {trayCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#9C6644] text-white text-[11px] font-bold flex items-center justify-center font-mono tabular-nums">
                {trayCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD5] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[#231C16] hover:bg-[#F4EFEA] rounded-md"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E8DFD5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-2.5 px-3 text-center text-xs font-semibold uppercase tracking-wider text-[#231C16] bg-[#F4EFEA] border border-[#E8DFD5] rounded-md"
            >
              Reserve Table or Cupping
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
