import React, { useState } from 'react';
import { Droplet, Flame, Mountain, Sparkles, Check, Plus } from 'lucide-react';
import { SINGLE_ORIGIN_BEANS, SingleOriginBean, CULTURE_BEANS_IMAGE } from '../data/coffeeData.ts';

interface CultureSectionProps {
  onAddBeanToTray: (bean: SingleOriginBean) => void;
}

export const CultureSection: React.FC<CultureSectionProps> = ({ onAddBeanToTray }) => {
  const [selectedBeanId, setSelectedBeanId] = useState<string>(SINGLE_ORIGIN_BEANS[0].id);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const selectedBean = SINGLE_ORIGIN_BEANS.find((b) => b.id === selectedBeanId) || SINGLE_ORIGIN_BEANS[0];

  const handleAdd = (bean: SingleOriginBean) => {
    onAddBeanToTray(bean);
    setAddedNotice(bean.name);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const culturePillars = [
    {
      num: '01',
      title: 'High-Altitude Terroir',
      subtitle: 'Volcanic soils & slow maturation',
      desc: 'Great coffee is fundamentally agricultural. We partner with smallholder growers cultivating heirloom Arabica at 1,700m to 2,200m elevations, where cold mountain nights slow cherry development, packing beans with dense sugars and crisp organic acids.',
      icon: Mountain,
    },
    {
      num: '02',
      title: 'Light-to-Medium Roasting',
      subtitle: 'Highlighting origin over smoke',
      desc: 'We reject dark, scorched roasts that mask inferior green coffee behind bitter carbon. Our single-origin lots are roasted gently on our convection roaster to preserve delicate jasmine florality, bright citrus sparkle, and honeyed finishes.',
      icon: Flame,
    },
    {
      num: '03',
      title: 'Mineral Water Precision',
      subtitle: 'Custom TDS 130ppm extraction',
      desc: 'Brewed coffee is 98.6% water. Our water goes through remineralization with precise balances of calcium and magnesium ions. This exact ionic balance gently binds to volatile coffee aromatics without flattening bright malic and citric notes.',
      icon: Droplet,
    },
    {
      num: '04',
      title: 'The Cupping Ritual',
      subtitle: 'Sensory discipline each dawn',
      desc: 'Every morning at 5:30 AM, our baristas and roaster cup yesterday’s roasts blind across ceramic cupping bowls with silver spoons. Breaking the crust and evaluating volatile sweetness ensures only peak coffees reach your ceramic cup.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="culture" className="py-16 md:py-24 bg-[#F4EFEA] border-y border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
            The Philosophy of Single-Origin
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight text-balance">
            Coffee is Not a Commodity. <br />
            <span className="italic font-normal">It is a living fruit of the land.</span>
          </h2>
          <p className="mt-4 text-base text-[#7E7267] leading-relaxed">
            Authentic specialty coffee culture honors every hand along the path: the mountain farmer picking ruby cherries, the washing station artisans, the roaster balancing thermodynamic airflow, and the patient barista pouring water with steady hands.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {culturePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E8DFD5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-[#9C6644] font-semibold tracking-wider">
                      {pillar.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#7E7267]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#231C16] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs text-[#9C6644] font-medium mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-[#7E7267] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Single-Origin Explorer */}
        <div className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs">
          
          {/* Card Top Banner */}
          <div className="px-6 py-5 border-b border-[#E8DFD5] bg-[#FAF7F2] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9C6644] font-semibold block">
                Interactive Harvest Explorer
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#231C16]">
                Explore Our Current Seasonal Single-Origin Lots
              </h3>
            </div>

            {/* Segmented Origin Selector */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4EFEA] rounded-lg border border-[#E8DFD5]">
              {SINGLE_ORIGIN_BEANS.map((bean) => (
                <button
                  key={bean.id}
                  onClick={() => setSelectedBeanId(bean.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    selectedBeanId === bean.id
                      ? 'bg-[#FFFFFF] text-[#231C16] shadow-xs font-semibold'
                      : 'text-[#7E7267] hover:text-[#231C16]'
                  }`}
                >
                  {bean.country}
                </button>
              ))}
            </div>
          </div>

          {/* Bean Detail Layout */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Column: Coffee Beans Photo & Notes */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-[#E8DFD5] bg-[#F4EFEA] aspect-[4/3]">
                <img
                  src={selectedBean.image || CULTURE_BEANS_IMAGE}
                  alt={`Freshly roasted ${selectedBean.name} coffee beans`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-3 py-1.5 rounded border border-[#E8DFD5] text-[11px] text-[#231C16] font-medium">
                  {selectedBean.roastLevel} Roast · Hand-Sorted Lot
                </div>
              </div>

              {/* Cupping Notes ribbon */}
              <div className="mt-4 pt-4 border-t border-[#E8DFD5]">
                <span className="text-[11px] uppercase tracking-wider text-[#7E7267] block mb-2 font-medium">
                  Cupping Tasting Notes
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[#231C16]">
                  {selectedBean.notes.map((note, idx) => (
                    <span
                      key={note}
                      className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-md font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9C6644]"></span>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Information & Flavor Radar Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#9C6644] font-semibold mb-1">
                  {selectedBean.region} · {selectedBean.country}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#231C16] mb-2">
                  {selectedBean.name}
                </h3>
                <p className="text-sm text-[#7E7267] leading-relaxed">
                  {selectedBean.description}
                </p>
              </div>

              {/* Agronomic specifications metadata table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-[#E8DFD5] text-xs">
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Elevation</span>
                  <span className="font-mono tabular-nums text-[#231C16] font-semibold">{selectedBean.elevation}</span>
                </div>
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Processing</span>
                  <span className="text-[#231C16] font-medium">{selectedBean.process}</span>
                </div>
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Variety</span>
                  <span className="text-[#231C16] font-medium">{selectedBean.variety}</span>
                </div>
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Recommended Extraction</span>
                  <span className="text-[#231C16] font-medium">{selectedBean.recommendedMethod}</span>
                </div>
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Roast Profile</span>
                  <span className="text-[#231C16] font-medium">{selectedBean.roastLevel} Roast</span>
                </div>
                <div>
                  <span className="text-[#7E7267] block text-[11px]">Bag Size (Retail)</span>
                  <span className="font-mono tabular-nums text-[#231C16] font-semibold">250g Whole Bean</span>
                </div>
              </div>

              {/* Flavor Profile Balance Sliders */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#7E7267] font-semibold block">
                  Sensory Balance Radar
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[#231C16] mb-1">
                      <span>Floral Acidity</span>
                      <span className="font-mono tabular-nums text-[#7E7267]">{selectedBean.radar.acidity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8DFD5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9C6644] rounded-full transition-all duration-500"
                        style={{ width: `${selectedBean.radar.acidity}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#231C16] mb-1">
                      <span>Natural Sweetness</span>
                      <span className="font-mono tabular-nums text-[#7E7267]">{selectedBean.radar.sweetness}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8DFD5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9C6644] rounded-full transition-all duration-500"
                        style={{ width: `${selectedBean.radar.sweetness}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#231C16] mb-1">
                      <span>Silky Body / Texture</span>
                      <span className="font-mono tabular-nums text-[#7E7267]">{selectedBean.radar.body}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8DFD5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9C6644] rounded-full transition-all duration-500"
                        style={{ width: `${selectedBean.radar.body}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#231C16] mb-1">
                      <span>Fruit Clarity</span>
                      <span className="font-mono tabular-nums text-[#7E7267]">{selectedBean.radar.fruit}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8DFD5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9C6644] rounded-full transition-all duration-500"
                        style={{ width: `${selectedBean.radar.fruit}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => handleAdd(selectedBean)}
                  className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors shadow-xs inline-flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add 250g Retail Bag ($19.00)</span>
                </button>

                {addedNotice && (
                  <span className="text-xs text-[#9C6644] font-medium flex items-center gap-1.5 animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {addedNotice} to tasting tray</span>
                  </span>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
