import React, { useState } from 'react';
import { Search, Plus, Check, Coffee, SlidersHorizontal } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/coffeeData.ts';

interface MenuSectionProps {
  onAddItemToTray: (item: MenuItem, customOptions?: { milk?: string; temp?: string }) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddItemToTray }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<string>('House Whole Milk');
  const [selectedTemp, setSelectedTemp] = useState<string>('Hot');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'pour-over', label: 'Single-Origin Pour-Overs' },
    { id: 'espresso', label: 'Espresso & Velvet Milk' },
    { id: 'cold-brew', label: 'Slow Cold Drips' },
    { id: 'tea', label: 'Artisanal Botanicals & Tea' },
    { id: 'bakery', label: 'Morning Bakery' },
  ];

  const dietaryOptions = ['All', 'House Favorite', 'Vegan', 'Dairy-Free', 'Decaf'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    // Dietary match
    if (dietaryFilter !== 'All') {
      if (!item.dietary?.includes(dietaryFilter as any)) {
        return false;
      }
    }
    // Search match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchNotes) {
        return false;
      }
    }
    return true;
  });

  const handleQuickAdd = (item: MenuItem) => {
    if (item.options && (item.options.milk || (item.options.temperature && item.options.temperature.length > 1))) {
      setCustomizingItem(item);
      setSelectedMilk(item.options.milk?.[0] || 'House Whole Milk');
      setSelectedTemp(item.options.temperature?.[0] || 'Hot');
    } else {
      onAddItemToTray(item);
      showNotice(item.name);
    }
  };

  const handleConfirmCustomAdd = () => {
    if (!customizingItem) return;
    onAddItemToTray(customizingItem, {
      milk: customizingItem.options?.milk ? selectedMilk : undefined,
      temp: customizingItem.options?.temperature ? selectedTemp : undefined,
    });
    showNotice(customizingItem.name);
    setCustomizingItem(null);
  };

  const showNotice = (name: string) => {
    setAddedItemNotice(name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#E8DFD5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
              The Seasonal Atelier Menu
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
              Honest Extractions & Hearth Baking
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#7E7267] max-w-xl">
              Freshly dialled every dawn. We grind each order on demand using custom flat SSP burrs to guarantee flavor clarity.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#7E7267] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drinks, notes (e.g. peach)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] placeholder:text-[#7E7267]/70 focus:outline-hidden focus:border-[#9C6644] transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs & Dietary Filter Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#231C16] text-white shadow-xs font-semibold'
                    : 'bg-[#FFFFFF] text-[#7E7267] hover:text-[#231C16] border border-[#E8DFD5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 text-xs text-[#7E7267] overflow-x-auto pb-1">
            <span className="font-semibold text-[#231C16] shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#9C6644]" />
              Filter:
            </span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setDietaryFilter(opt)}
                className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                  dietaryFilter === opt
                    ? 'bg-[#E8DFD5] text-[#231C16] font-semibold'
                    : 'text-[#7E7267] hover:text-[#231C16]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Toast */}
        {addedItemNotice && (
          <div className="mb-6 p-3 bg-[#FFFFFF] border border-[#9C6644] rounded-md text-xs text-[#231C16] flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>
                Added <strong>{addedItemNotice}</strong> to your tasting tray.
              </span>
            </div>
            <span className="text-[11px] text-[#7E7267]">Ready for dine-in or pickup</span>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-lg border border-[#E8DFD5] p-8">
            <Coffee className="w-8 h-8 text-[#7E7267] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-serif text-[#231C16]">No items found</h3>
            <p className="text-xs text-[#7E7267] mt-1">Try clearing your search query or dietary filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#231C16] bg-[#F4EFEA] hover:bg-[#E8DFD5] rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#D8CCC0] transition-colors shadow-2xs group"
              >
                <div>
                  {/* Photo if present */}
                  {item.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#F4EFEA] border-b border-[#E8DFD5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Header: Title and Price */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-base font-serif font-semibold text-[#231C16] group-hover:text-[#9C6644] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono tabular-nums text-sm font-semibold text-[#231C16] shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Metadata line without pills */}
                    {item.beanOrigin && (
                      <div className="text-[11px] uppercase tracking-wider text-[#9C6644] font-medium mb-2">
                        {item.beanOrigin}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-[#7E7267] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Tasting notes */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#7E7267]">
                        <span className="text-[#231C16] font-medium">Notes:</span>
                        {item.tastingNotes.map((note, idx) => (
                          <span key={note} className="inline-flex items-center">
                            {idx > 0 && <span className="mx-1 text-[#D8CCC0]">·</span>}
                            <span>{note}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Dietary and Add Button */}
                <div className="px-5 py-3.5 bg-[#FAF7F2] border-t border-[#E8DFD5] flex items-center justify-between">
                  <div className="text-[11px] text-[#7E7267]">
                    {item.dietary && item.dietary.length > 0 ? (
                      item.dietary.join(' · ')
                    ) : (
                      <span>House Recipe</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleQuickAdd(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#231C16] hover:text-white bg-[#FFFFFF] hover:bg-[#231C16] border border-[#E8DFD5] hover:border-[#231C16] rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{item.options ? 'Customize & Add' : 'Add to Tray'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Customizing Milk / Temperature */}
        {customizingItem && (
          <div className="fixed inset-0 z-50 bg-[#231C16]/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FFFFFF] max-w-md w-full rounded-xl border border-[#E8DFD5] shadow-lg p-6 space-y-5 animate-scale-up">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#9C6644] font-semibold block mb-1">
                  Beverage Customization
                </span>
                <h3 className="text-xl font-serif text-[#231C16]">
                  {customizingItem.name}
                </h3>
                <span className="font-mono tabular-nums text-sm text-[#7E7267]">
                  ${customizingItem.price.toFixed(2)}
                </span>
              </div>

              {/* Milk Option */}
              {customizingItem.options?.milk && (
                <div>
                  <label className="block text-xs font-semibold text-[#231C16] uppercase tracking-wider mb-2">
                    Select Milk
                  </label>
                  <div className="space-y-1.5">
                    {customizingItem.options.milk.map((milk) => (
                      <button
                        key={milk}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`w-full text-left px-3.5 py-2 text-xs rounded-md border transition-all flex items-center justify-between ${
                          selectedMilk === milk
                            ? 'border-[#9C6644] bg-[#FAF7F2] text-[#231C16] font-semibold'
                            : 'border-[#E8DFD5] hover:border-[#D8CCC0] text-[#7E7267]'
                        }`}
                      >
                        <span>{milk}</span>
                        {selectedMilk === milk && <Check className="w-3.5 h-3.5 text-[#9C6644]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Temperature Option */}
              {customizingItem.options?.temperature && customizingItem.options.temperature.length > 1 && (
                <div>
                  <label className="block text-xs font-semibold text-[#231C16] uppercase tracking-wider mb-2">
                    Serving Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {customizingItem.options.temperature.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`py-2 text-xs font-medium rounded-md border text-center transition-all ${
                          selectedTemp === temp
                            ? 'border-[#9C6644] bg-[#FAF7F2] text-[#231C16] font-semibold'
                            : 'border-[#E8DFD5] text-[#7E7267]'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E8DFD5]">
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#7E7267] hover:text-[#231C16]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCustomAdd}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors"
                >
                  Add to Tasting Tray
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
