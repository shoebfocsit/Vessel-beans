import React from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Mountain, Scale, Users, ShieldCheck } from 'lucide-react';
import { OUR_STORY_FOUNDING_IMAGE, BARISTA_CRAFT_IMAGE, CULTURE_BEANS_IMAGE } from '../data/coffeeData.ts';

interface OurStoryPageProps {
  onBackToHome: () => void;
  onExploreMenu: () => void;
  onExploreBlog: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  onBackToHome,
  onExploreMenu,
  onExploreBlog,
}) => {
  const milestones = [
    {
      year: '2016',
      title: 'The Carriage House Roaster',
      desc: 'Founded by architect Julian Thorne and agronomist Elena Vance in a drafty brick workshop with a restored 1968 cast-iron sample roaster and three sacks of Ethiopian Yirgacheffe.',
    },
    {
      year: '2018',
      title: 'Doors Open on Roaster’s Alley',
      desc: 'We opened our flagship cafe at 418 Roaster’s Alley, hand-building the cedar counters from salvaged timber beams and commissioning local potter Hiroshi Sato to throw our first 200 ceramic cups.',
    },
    {
      year: '2021',
      title: '100% Direct-Trade Contracts',
      desc: 'Eliminated intermediary import brokers entirely. Established direct 3-year guaranteed minimum price contracts with smallholder cooperatives in Huila, Colombia and Gedeb, Ethiopia.',
    },
    {
      year: '2024',
      title: 'The Public Cupping Lab',
      desc: 'Launched free bi-weekly Saturday morning sensory cuppings and our barista educational fellowship to make specialty coffee appreciation accessible to everyone.',
    },
    {
      year: 'Today',
      title: 'A Living Sanctuary of Slow Time',
      desc: 'Over 200,000 mindful cups poured. Still roasting each batch on demand with unwavering reverence for the volcanic soils and families that nurture the bean.',
    },
  ];

  const sourcingPrinciples = [
    {
      icon: Scale,
      title: 'Direct-Trade Economic Dignity',
      stat: '280%',
      statLabel: 'Above Fair-Trade Minimums',
      desc: 'We guarantee a financial floor of at least $4.85/lb for high-altitude micro-lots, ensuring farming families earn true living wages independent of volatile New York commodity C-market speculation.',
    },
    {
      icon: Mountain,
      title: 'High-Altitude Volcanic Terroir',
      stat: '1,800m+',
      statLabel: 'Average Harvest Elevation',
      desc: 'We source exclusively from shade-grown mountain gardens situated between 1,700m and 2,200m, where crisp alpine nights slow cherry maturation and concentrate delicate organic acids and floral aromatics.',
    },
    {
      icon: Users,
      title: 'Cooperative Infrastructure Giving',
      stat: '4%',
      statLabel: 'Of Annual Roastery Profits',
      desc: 'Every year, 4% of our roastery revenue is reinvested directly into washing station infrastructure: raised solar drying beds in Gedeb and gravity-fed natural bio-filtration systems in Huila.',
    },
    {
      icon: ShieldCheck,
      title: 'Radical Traceability & Ecology',
      stat: '100%',
      statLabel: 'Single-Cooperative Traceable',
      desc: 'Every bag of beans carries the exact cooperative name, washing station, altitude, and harvest month. In the cafe, all packaging is 100% compostable and spent espresso pucks fertilize neighborhood urban soil.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Top Banner Navigation */}
      <div className="border-b border-[#E8DFD5] bg-[#FFFFFF]/80 backdrop-blur-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-[#231C16] hover:text-[#9C6644] inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cafe Home</span>
          </button>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onExploreMenu}
              className="text-[#7E7267] hover:text-[#231C16] transition-colors"
            >
              Menu
            </button>
            <span className="text-[#D8CCC0]">·</span>
            <button
              onClick={onExploreBlog}
              className="text-[#7E7267] hover:text-[#231C16] transition-colors"
            >
              Atelier Blog
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-[#E8DFD5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold">
            Our Origin & Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#231C16] tracking-tight leading-[1.15] text-balance">
            Born from Slow Time &amp; <br />
            <span className="italic font-normal text-[#9C6644]">Reverence for the Bean.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#7E7267] leading-relaxed max-w-2xl mx-auto">
            We began with a singular conviction: that in an accelerating world driven by instant gratification, 
            the neighborhood coffee house should remain an enduring sanctuary of patience, craftsmanship, and human warmth.
          </p>
        </div>

        {/* Hero Photo Banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
          <div className="rounded-xl overflow-hidden border border-[#E8DFD5] shadow-md aspect-[16/9] sm:aspect-[21/9] bg-[#EFE9E2]">
            <img
              src={OUR_STORY_FOUNDING_IMAGE}
              alt="The founding workshop of Vessel and Bean with green coffee sacks and sample roaster"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mt-3 text-xs text-[#7E7267]">
            The original Roaster's Alley carriage house workshop, autumn 2016.
          </div>
        </div>
      </section>

      {/* Chapter 1: The Founding Narrative */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold">
            Chapter I
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#231C16]">
            The Antidote to the Disposable Cup
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed text-[#3E3228]">
          <p>
            In the winter of 2015, Julian Thorne was working late hours at an architectural firm, running on paper cups of bitter, over-roasted coffee grabbed from noisy corner chains. Across town, Elena Vance was completing her postgraduate fieldwork in agricultural botany, studying heirloom Coffea arabica cultivars in East Africa.
          </p>
          <p>
            When they reconnected over dinner, the contrast was inescapable. Elena described mountain slopes where wild coffee blossoms smelled like jasmine and honey, picked cherry by cherry by families who treated harvest as a festival. Julian described an urban landscape where coffee had been reduced to brown caffeine sludge gulped in sixty seconds behind windshields.
          </p>
        </div>

        {/* Pull Quote */}
        <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl shadow-xs">
          <p className="font-serif italic text-xl sm:text-2xl text-[#231C16] leading-snug text-center max-w-2xl mx-auto">
            “We did not want to build a business that maximizes transactions per hour. We wanted to build a place where forty minutes spent with a ceramic cup feels like the richest part of your day.”
          </p>
          <div className="text-center mt-4 text-xs font-semibold uppercase tracking-wider text-[#9C6644]">
            ― Julian &amp; Elena, Founders
          </div>
        </div>
      </section>

      {/* Chapter 2: Our Philosophy on Coffee Culture */}
      <section className="py-16 sm:py-20 bg-[#F4EFEA] border-y border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-1">
              Chapter II
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#231C16]">
              Our Philosophy on Coffee Culture
            </h2>
            <p className="mt-2 text-sm text-[#7E7267]">
              Three governing tenets that shape every roast profile, every pour, and every morning greeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E8DFD5] shadow-xs space-y-4">
              <span className="font-mono text-xs text-[#9C6644] font-bold">01.</span>
              <h3 className="text-xl font-serif text-[#231C16]">
                Coffee as a Seasonal Fruit
              </h3>
              <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
                Coffee is not a shelf-stable industrial commodity; it is the seed of an alpine fruit. Like a fine vineyard vintage, an Ethiopian Chelchele tastes radically different from a Colombian Huila Geisha. We roast light-to-medium to let the terroir, floral acidity, and honeydew sweetness speak unmasked.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E8DFD5] shadow-xs space-y-4">
              <span className="font-mono text-xs text-[#9C6644] font-bold">02.</span>
              <h3 className="text-xl font-serif text-[#231C16]">
                The Tactile Ritual of Space
              </h3>
              <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
                A great cup begins before the first sip. It begins with the weight of raw stoneware clay in your palm, the warmth radiating through unglazed ceramics, natural daylight falling across reclaimed timber, and the quiet crackle of vinyl rather than blaring digital monitors.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E8DFD5] shadow-xs space-y-4">
              <span className="font-mono text-xs text-[#9C6644] font-bold">03.</span>
              <h3 className="text-xl font-serif text-[#231C16]">
                Scientific Extraction &amp; Empathy
              </h3>
              <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
                We obsess over thermodynamics, flat SSP burr alignment, and 130 ppm magnesium-balanced water chemistry so that the coffee in your cup is crystalline and repeatable. Yet science without genuine hospitality is hollow. Our baristas are educators and listeners first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Sourcing Practices & Economic Dignity */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-1">
            Chapter III
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#231C16]">
            Ethical Direct-Trade &amp; Farm Stewardship
          </h2>
          <p className="mt-2 text-sm text-[#7E7267]">
            True specialty coffee cannot exist without financial transparency and respect for the agricultural producers who sustain it.
          </p>
        </div>

        {/* 4 Sourcing Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sourcingPrinciples.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E8DFD5] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-md bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#9C6644]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="font-mono tabular-nums text-2xl font-bold text-[#231C16]">
                      {item.stat}
                    </span>
                    <span className="block text-[11px] text-[#7E7267]">
                      {item.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-medium text-[#231C16]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Photo with caption */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
          <div className="md:col-span-6 rounded-xl overflow-hidden border border-[#E8DFD5] bg-[#EFE9E2] aspect-[4/3]">
            <img
              src={BARISTA_CRAFT_IMAGE}
              alt="Elena cupping micro-lot roasts at the atelier table"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-6 space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#9C6644] font-semibold">
              The Annual Origin Journey
            </div>
            <h3 className="text-2xl font-serif text-[#231C16]">
              Cupping Side-by-Side with Growing Families
            </h3>
            <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
              Every November and March, our team travels to the growing regions. We do not inspect from air-conditioned offices; we walk the shaded slopes, taste cherries straight from the branches, and cup side-by-side with cooperative leaders in communal washing stations.
            </p>
            <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed">
              When we shake hands on a harvest price, that price is locked in for three continuous seasons. This stability allows our farming partners to invest in soil conservation, organic composting, and solar infrastructure without fear of market collapses.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4: Milestones Timeline */}
      <section className="py-16 sm:py-20 bg-[#F4EFEA] border-t border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold">
              The Journey So Far
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#231C16]">
              A Decade of Mindful Roasting
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E8DFD5] shadow-2xs flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
              >
                <div className="font-mono text-xl font-bold text-[#9C6644] shrink-0 sm:w-20">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-serif font-semibold text-[#231C16]">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#7E7267] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-serif text-[#231C16]">
          Experience the Craft in Every Sip
        </h2>
        <p className="text-sm text-[#7E7267] max-w-lg mx-auto">
          Whether you join us at our cedar bar for a morning flat white or brew our single-origin lots at your kitchen counter, thank you for sharing this slow journey with us.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onExploreMenu}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <span>Explore Seasonal Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreBlog}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#231C16] bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#E8DFD5] rounded-md transition-colors inline-flex items-center gap-2"
          >
            <span>Read Atelier Blog Dispatches</span>
          </button>
        </div>
      </section>
    </div>
  );
};
