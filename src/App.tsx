import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CultureSection } from './components/CultureSection.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { StoriesSection } from './components/StoriesSection.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { BrewGuideSection } from './components/BrewGuideSection.tsx';
import { VisitSection } from './components/VisitSection.tsx';
import { OurStoryPage } from './components/OurStoryPage.tsx';
import { GalleryPage } from './components/GalleryPage.tsx';
import { Footer } from './components/Footer.tsx';
import { TastingTrayDrawer, TrayItem } from './components/TastingTrayDrawer.tsx';
import { StoryModal } from './components/StoryModal.tsx';
import { StorySubmitModal } from './components/StorySubmitModal.tsx';
import { BlogPostModal } from './components/BlogPostModal.tsx';
import { ReservationModal } from './components/ReservationModal.tsx';
import {
  COFFEE_STORIES,
  CoffeeStory,
  MenuItem,
  SingleOriginBean,
  MENU_ITEMS,
  BlogPost,
  BLOG_POSTS,
} from './data/coffeeData.ts';

const STORAGE_KEY_TRAY = 'vessel_bean_tray_v1';
const STORAGE_KEY_STORIES = 'vessel_bean_stories_v1';
const STORAGE_KEY_LIKES = 'vessel_bean_likes_v1';
const STORAGE_KEY_BLOG_LIKES = 'vessel_bean_blog_likes_v1';

export default function App() {
  // Navigation View State ('home' | 'our-story' | 'blog' | 'gallery')
  const [currentView, setCurrentView] = useState<'home' | 'our-story' | 'blog' | 'gallery'>('home');

  // Tray State
  const [trayItems, setTrayItems] = useState<TrayItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRAY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stories State
  const [stories, setStories] = useState<CoffeeStory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORIES);
      return saved ? JSON.parse(saved) : COFFEE_STORIES;
    } catch {
      return COFFEE_STORIES;
    }
  });

  // Liked Stories State
  const [likedStoryIds, setLikedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Liked Blog Posts State
  const [likedBlogPostIds, setLikedBlogPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOG_LIKES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<CoffeeStory | null>(null);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [isSubmitStoryOpen, setIsSubmitStoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('culture');

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRAY, JSON.stringify(trayItems));
    } catch {}
  }, [trayItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch {}
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likedStoryIds));
    } catch {}
  }, [likedStoryIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BLOG_LIKES, JSON.stringify(likedBlogPostIds));
    } catch {}
  }, [likedBlogPostIds]);

  // Track active section on scroll
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = ['culture', 'menu', 'stories', 'blog', 'brew-guide', 'visit'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // View Navigation
  const handleNavigateView = (view: 'home' | 'our-story' | 'blog' | 'gallery', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'our-story' || view === 'gallery') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'blog') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (view === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Handlers for Tasting Tray
  const handleAddItemToTray = (item: MenuItem, customOptions?: { milk?: string; temp?: string }) => {
    setTrayItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.itemId === item.id &&
          i.customOptions?.milk === customOptions?.milk &&
          i.customOptions?.temp === customOptions?.temp
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      const newItem: TrayItem = {
        id: `tray-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        customOptions,
        image: item.image,
      };

      return [...prev, newItem];
    });
  };

  const handleAddBeanToTray = (bean: SingleOriginBean) => {
    setTrayItems((prev) => {
      const itemId = `bean-bag-${bean.id}`;
      const existing = prev.find((i) => i.itemId === itemId);
      if (existing) {
        return prev.map((i) =>
          i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      const newItem: TrayItem = {
        id: `tray-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        itemId,
        name: `${bean.name} (250g Whole Bean)`,
        price: 19.0,
        quantity: 1,
        customOptions: {
          milk: `${bean.roastLevel} Roast`,
          temp: `${bean.region}, ${bean.country}`,
        },
        image: bean.image,
      };
      return [...prev, newItem];
    });
  };

  const handleQuickAddSpecialty = () => {
    const chelchele = MENU_ITEMS.find((m) => m.id === 'menu-chelchele-v60') || MENU_ITEMS[0];
    handleAddItemToTray(chelchele, { temp: 'Hot' });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setTrayItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as TrayItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setTrayItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Handlers for Stories
  const handleLikeStory = (storyId: string) => {
    setLikedStoryIds((prev) => {
      if (prev.includes(storyId)) {
        return prev.filter((id) => id !== storyId);
      } else {
        return [...prev, storyId];
      }
    });
  };

  const handleSubmitStory = (newStory: CoffeeStory) => {
    setStories((prev) => [newStory, ...prev]);
    setActiveStory(newStory);
  };

  // Handlers for Blog
  const handleLikeBlogPost = (postId: string) => {
    setLikedBlogPostIds((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const totalTrayCount = trayItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#E8DFD5] selection:text-[#1F1914]">
      {/* 3-Zone Navigation Header */}
      <Navbar
        trayCount={totalTrayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        activeSection={activeSection}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {currentView === 'our-story' ? (
          /* Dedicated Our Story Page */
          <OurStoryPage
            onBackToHome={() => handleNavigateView('home')}
            onExploreMenu={() => handleNavigateView('home', 'menu')}
            onExploreBlog={() => handleNavigateView('home', 'blog')}
          />
        ) : currentView === 'gallery' ? (
          /* Dedicated Pinterest-Style Gallery Page */
          <GalleryPage
            onBackToHome={() => handleNavigateView('home')}
            onExploreMenu={() => handleNavigateView('home', 'menu')}
            onExploreStory={() => handleNavigateView('our-story')}
          />
        ) : (
          /* Home & Atelier Content */
          <>
            {/* 1. Hero Atmosphere */}
            <HeroSection
              onExploreMenu={() => handleNavigateView('home', 'menu')}
              onExploreCulture={() => handleNavigateView('home', 'culture')}
              onQuickAddSpecialty={handleQuickAddSpecialty}
            />

            {/* 2. Single-Origin Coffee Culture & Interactive Harvest Explorer */}
            <CultureSection onAddBeanToTray={handleAddBeanToTray} />

            {/* 3. Artisanal Seasonal Menu */}
            <MenuSection onAddItemToTray={handleAddItemToTray} />

            {/* 4. Atelier Blog & Field Notes */}
            <BlogSection
              onOpenPost={(post) => setActiveBlogPost(post)}
              likedPostIds={likedBlogPostIds}
              onLikePost={handleLikeBlogPost}
            />

            {/* 5. Coffee Stories & Community Journal */}
            <StoriesSection
              stories={stories}
              onOpenStory={(story) => setActiveStory(story)}
              onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
              likedStoryIds={likedStoryIds}
              onLikeStory={handleLikeStory}
            />

            {/* 6. Barista Brewing Laboratory & Live Timer */}
            <BrewGuideSection />

            {/* 7. Cafe Ambiance & Table Booking */}
            <VisitSection onOpenReserve={() => setIsReserveOpen(true)} />
          </>
        )}
      </main>

      {/* Minimalist Footnote */}
      <Footer onNavigateView={handleNavigateView} />

      {/* Slide-Over Tasting Tray / Checkout Drawer */}
      <TastingTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

      {/* Story Reader Modal */}
      <StoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onLike={handleLikeStory}
        isLiked={activeStory ? likedStoryIds.includes(activeStory.id) : false}
      />

      {/* Blog Post Reader Modal */}
      <BlogPostModal
        post={activeBlogPost}
        onClose={() => setActiveBlogPost(null)}
        onLike={handleLikeBlogPost}
        isLiked={activeBlogPost ? likedBlogPostIds.includes(activeBlogPost.id) : false}
      />

      {/* Submit Story Modal */}
      <StorySubmitModal
        isOpen={isSubmitStoryOpen}
        onClose={() => setIsSubmitStoryOpen(false)}
        onSubmitStory={handleSubmitStory}
      />

      {/* Table & Cupping Reservation Modal */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </div>
  );
}
