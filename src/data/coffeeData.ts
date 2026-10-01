export interface SingleOriginBean {
  id: string;
  name: string;
  country: string;
  region: string;
  elevation: string;
  process: string;
  variety: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium';
  notes: string[];
  description: string;
  radar: {
    acidity: number;
    sweetness: number;
    body: number;
    floral: number;
    fruit: number;
  };
  recommendedMethod: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pour-over' | 'espresso' | 'cold-brew' | 'tea' | 'bakery';
  price: number;
  description: string;
  tastingNotes?: string[];
  beanOrigin?: string;
  dietary?: ('Vegan' | 'Dairy-Free' | 'Gluten-Free' | 'House Favorite' | 'Decaf')[];
  image?: string;
  options?: {
    milk?: string[];
    temperature?: ('Hot' | 'Iced')[];
    grind?: string[];
  };
}

export interface CoffeeStory {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: 'Origins & Terroir' | 'Barista Craft' | 'Cafe Memoirs' | 'Brewing Science';
  excerpt: string;
  content: string[];
  image: string;
  pullQuote?: string;
  tastingPairing?: string;
  likes: number;
}

export const HERO_IMAGE = '/src/assets/images/hero_cafe_pourover_1790870137812.jpg';
export const CULTURE_BEANS_IMAGE = '/src/assets/images/coffee_beans_culture_1790870151902.jpg';
export const LATTE_ART_IMAGE = '/src/assets/images/flat_white_ceramic_1790870170235.jpg';
export const COLD_BREW_IMAGE = '/src/assets/images/cold_brew_glass_1790870183081.jpg';
export const BARISTA_CRAFT_IMAGE = '/src/assets/images/barista_craft_story_1790870194432.jpg';
export const OUR_STORY_FOUNDING_IMAGE = '/src/assets/images/our_story_founding_1790870477294.jpg';
export const BARISTA_SPOTLIGHT_IMAGE = '/src/assets/images/barista_spotlight_1790870491029.jpg';
export const COMMUNITY_CUPPING_IMAGE = '/src/assets/images/community_cupping_1790870504681.jpg';

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: 'Coffee Origins' | 'Brewing Methods' | 'Barista Spotlights' | 'Community News';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  excerpt: string;
  content: string[];
  pullQuote?: string;
  keyTakeaways?: string[];
  likes: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-origins-san-marcos',
    title: 'The Volcanic Slopes of San Marcos: Why Altitude Shapes Brightness',
    subtitle: 'A botanical investigation into high-elevation cell density and sweetness.',
    category: 'Coffee Origins',
    author: 'Elena Vance',
    authorRole: 'Head of Green Sourcing',
    date: 'October 2026',
    readTime: '6 min read',
    image: CULTURE_BEANS_IMAGE,
    featured: true,
    excerpt: 'Above 1,800 meters on the slopes of Volcán Tajumulco, nights dip to near-freezing temperatures. This extreme diurnal temperature shift forces coffee trees into survival mode, yielding dense, sugar-laden seeds.',
    pullQuote: 'At extreme elevations, coffee trees cannot rush their maturation. Every milligram of organic acid is patiently synthesized over ten long months.',
    keyTakeaways: [
      'Cold nights slow respiration, preserving precious sucrose within the bean embryo.',
      'Volcanic mineral soils provide potassium, magnesium, and phosphorus for complex malic acidity.',
      'Denser beans require higher charge temperatures and steady conductive heat transfer during roasting.'
    ],
    likes: 92,
    content: [
      'When you look at a green coffee bean from our San Marcos lot in Guatemala under a magnifying loupe, the difference from lowland commercial coffee is immediately apparent. The center cut is tight, zigzagged, and closed like a clenched fist. The bean is heavy, possessing a physical density comparable to polished jade.',
      'Why does altitude matter so profoundly? In the tropics, altitude is nature’s thermostat. While daytime temperatures on the Guatemalan slopes reach a gentle 24°C, nightfall causes cold mountain air to pour down the volcanic ridges, dropping temperatures to 7°C.',
      'This dramatic daily swing slows the coffee plant’s metabolic respiration. Instead of burning through carbohydrates overnight to support leafy foliage, the tree channels all its energy into protecting the seed. Sugars, chlorogenic acids, and volatile lipid precursors accumulate slowly in the bean parenchyma.',
      'When roasted to a light-medium profile, these dense high-altitude beans don’t taste merely of "roastiness." They sing with crisp red apple malic acid, wildflower honey, and raw dark cacao nibs. Sourcing at altitude is not a luxury; it is the fundamental prerequisite of nuance.'
    ]
  },
  {
    id: 'post-brewing-water-chemistry',
    title: 'Water Chemistry 101: Why Minerals Save Your Morning Pour-Over',
    subtitle: 'Understanding Total Dissolved Solids, calcium, and magnesium extraction power.',
    category: 'Brewing Methods',
    author: 'Marcus Lin',
    authorRole: 'Head of Quality & Calibration',
    date: 'September 2026',
    readTime: '5 min read',
    image: HERO_IMAGE,
    featured: false,
    excerpt: 'Brewed coffee is 98.6% water. If your brewing water is stripped bare or choked with carbonate scale, even the world’s most expensive Geisha will taste hollow, astringent, or flat.',
    pullQuote: 'Water is not a passive liquid solvent; its dissolved ionic minerals actively grab onto and pull out volatile flavor molecules.',
    keyTakeaways: [
      'Magnesium ions (Mg²⁺) have a high charge density, binding strongly to fruit and floral volatiles.',
      'Calcium ions (Ca²⁺) balance heavy, sweet, and nutty compounds for creamy mouthfeel.',
      'Bicarbonate buffer must remain between 40-50 ppm to avoid neutralizing bright fruit acidity.'
    ],
    likes: 78,
    content: [
      'A frequent question at our tasting bar is: "Why does this Ethiopian pour-over taste like jasmine tea in your cafe, but tastes sour and dry when I brew the same beans at home?" In nine out of ten cases, the culprit is not the grinder or the dripper—it is the municipal tap water.',
      'Pure distilled water (0 TDS) makes terrible coffee. Without dissolved mineral cations, pure water lacks the ionic affinity required to pull non-polar aromatic compounds out of ground coffee cells. The result is a sharp, acidic, hollow brew with an unpleasantly quick finish.',
      'Conversely, hard tap water loaded with calcium carbonate acts as a chemical sponge, neutralizing the delicate citric and malic acids that give specialty coffee its life. The cup tastes muddy, chalky, and flat.',
      'At Vessel & Bean, our reverse-osmosis system strips municipal water to near-zero, and then precisely remineralizes it to 130 ppm TDS: 70 ppm magnesium, 30 ppm calcium, and 30 ppm sodium bicarbonate buffer. Try brewing with bottled natural spring water with ~120 ppm TDS at home and taste the immediate transformation.'
    ]
  },
  {
    id: 'post-barista-aoi-tanaka',
    title: 'Barista Spotlight: Aoi Tanaka on Sensory Memory and the Morning Shift',
    subtitle: 'From Tokyo tea ceremonies to pulling seasonal double shots at our cedar bar.',
    category: 'Barista Spotlights',
    author: 'Julian Thorne',
    authorRole: 'Cafe Writer & Patron',
    date: 'September 2026',
    readTime: '4 min read',
    image: BARISTA_SPOTLIGHT_IMAGE,
    featured: false,
    excerpt: 'At 6:30 AM before the first customer taps their umbrella on the door mat, Aoi Tanaka is already tasting espresso shots blind, calibrating the grind down to a fraction of a second.',
    pullQuote: 'Pouring coffee is about creating an uninterrupted pocket of calm. When someone orders their morning cup, they are placing their first conscious moments into your hands.',
    keyTakeaways: [
      'Sensory memory is a muscle trained through daily blind aroma cupping.',
      'Temperature drops across a shift require continuous micro-adjustments on the grinder burrs.',
      'Hospitality begins with mindful pacing, not rushed mechanical speed.'
    ],
    likes: 114,
    content: [
      'Aoi Tanaka moved to the city five years ago after apprenticing at an unhurried kissaten in Kyoto. In her approach to espresso, you can see the quiet discipline of Japanese tea culture translated into the modern specialty cafe.',
      '"People often think being a great barista is about pulling latte art hearts or steaming milk quickly," Aoi says with a quiet smile, wiping the stainless steam wand with a clean damp cloth. "Those are just mechanical habits. The true work of a barista is sensory empathy."',
      'Every morning, Aoi tests the espresso blend three times at different grind settings. "Humidity changes inside the room as the morning warms up. The air gets drier, and the coffee beans release their CO2 differently. A shot that ran in 28 seconds at seven in the morning might run in 24 seconds by nine. If you don’t taste and calibrate continuously, you are serving someone a compromised memory."',
      'Her favorite offering on the menu? "The minimalist Cortado. In equal parts espresso and steamed whole milk, there is nowhere to hide. If the espresso extraction has even a whisper of astringency, the milk reveals it. When it is dialed in, it tastes like melted praline."'
    ]
  },
  {
    id: 'post-community-public-cupping',
    title: 'Community News: Saturday Morning Public Cuppings Return',
    subtitle: 'Join us at the communal oak table every first and third Saturday at 10:00 AM.',
    category: 'Community News',
    author: 'Samira Gomez',
    authorRole: 'Master Roaster',
    date: 'August 2026',
    readTime: '3 min read',
    image: COMMUNITY_CUPPING_IMAGE,
    featured: false,
    excerpt: 'Whether you are a seasoned home barista or someone who simply loves the morning aroma of ground coffee, our bi-weekly public cupping sessions are free, welcoming, and open to all.',
    pullQuote: 'There are no wrong answers in sensory evaluation. If a coffee reminds you of your grandmother’s peach jam or an autumn campfire, that is authentic tasting.',
    keyTakeaways: [
      'Free bi-weekly public sensory cupping every 1st & 3rd Saturday at 10:00 AM.',
      'Taste 5 to 6 micro-lot coffees from Ethiopia, Kenya, Colombia, and Sumatra side-by-side.',
      'Learn the standard SCA cupping protocol using professional silver tasting spoons.'
    ],
    likes: 87,
    content: [
      'There is something deeply communal about gathering around a long table with a silver spoon in hand. For the past two years, our public Saturday cuppings have welcomed college students, neighborhood retirees, local chefs, and curious visitors.',
      'Cupping is the global standard protocol by which coffee quality is judged around the world. We set out five or six bowls containing freshly ground coffees from our current seasonal roast batches.',
      'First, we evaluate the "dry fragrance" before adding hot water. Then we pour 93°C water, wait four minutes as grounds form a buoyant crust on the bowl surface, and invite everyone to "break the crust" with their spoon while leaning in close to inhale the burst of volatile aromatics.',
      'After skimming off the top foam, we slurp the coffee from shallow spoons to atomize the liquid across our palates. It is noisy, informal, and eye-opening. You will leave with a heightened palate and a complimentary 50g sample bag of your favorite roast of the morning.'
    ]
  },
  {
    id: 'post-community-ceramics-collab',
    title: 'Community News: Hand-Thrown Stoneware in Collaboration with Studio Nō',
    subtitle: 'A bespoke series of 150 textured latte mugs made from local clay and wood ash glaze.',
    category: 'Community News',
    author: 'Julian Thorne',
    authorRole: 'Cafe Writer & Patron',
    date: 'July 2026',
    readTime: '3 min read',
    image: OUR_STORY_FOUNDING_IMAGE,
    featured: false,
    excerpt: 'We have long believed that the vessel you hold profoundly shapes the flavor of what you sip. This month, we debut our custom tableware handcrafted just three blocks away.',
    pullQuote: 'The weight of raw stoneware, the tactile tooth of natural clay, and the heat retention of thick walls transform a simple drink into a grounding physical experience.',
    keyTakeaways: [
      'Locally sourced red stoneware clay fired in a reduction kiln with wood ash glaze.',
      'Curved internal geometry optimized to cradle crema and preserve silky latte microfoam.',
      'Limited edition run of 150 individually numbered cups available in the cafe and online.'
    ],
    likes: 95,
    content: [
      'Have you ever noticed how drinking coffee from a paper cup feels hurried, utilitarian, and disposable, while drinking from a heavy ceramic vessel makes you want to sit down and sigh with relief?',
      'For the past six months, our barista team collaborated with ceramicist Hiroshi Sato of Studio Nō. We tested seven different lip thicknesses, handle geometries, and internal bowl curves to design the ideal vessel for our Atelier Velvet Flat White.',
      'The interior bowl has a continuous parabolic curve without hard angles, allowing espresso to swirl smoothly as steamed microfoam is poured, preserving the delicate rosette surface. The exterior is left unglazed raw buff clay, textured with subtle finger ridges that fit naturally into the palm of your hand.',
      'Each cup in this limited batch of 150 is hand-thrown and numbered on the foot. Starting this week, all dine-in flat whites and pour-overs will be served in Studio Nō stoneware, and 50 boxed vessels will be available for purchase at the counter.'
    ]
  },
];

export const SINGLE_ORIGIN_BEANS: SingleOriginBean[] = [
  {
    id: 'ethiopia-chelchele',
    name: 'Gedeb Chelchele Heirloom',
    country: 'Ethiopia',
    region: 'Yirgacheffe, Gedeb District',
    elevation: '1,950 – 2,200m',
    process: 'Washed, Sun-dried on African Beds',
    variety: 'Indigenous Heirloom Varieties',
    roastLevel: 'Light',
    notes: ['Jasmine Blossom', 'White Peach', 'Bergamot Tea', 'Wild Honey'],
    description: 'Harvested from smallholder garden plots in high-altitude southern Ethiopia. Delicate, tea-like elegance with vibrant citrus sparkle and honeyed florality.',
    radar: { acidity: 92, sweetness: 88, body: 62, floral: 96, fruit: 90 },
    recommendedMethod: 'V60 Pour-Over / Origami Dripper',
    image: CULTURE_BEANS_IMAGE,
  },
  {
    id: 'colombia-geisha-huila',
    name: 'Finca La Esperanza Geisha',
    country: 'Colombia',
    region: 'Huila, San Adolfo',
    elevation: '1,850m',
    process: 'Anaerobic Natural (72hr fermentation)',
    variety: 'Geisha (Panama heritage seed)',
    roastLevel: 'Light',
    notes: ['Papaya', 'Lemongrass', 'Meyer Lemon', 'Orange Blossom'],
    description: 'An exceptional competition-grade lot produced by third-generation growers. Intensely perfumed aromatics with silky tropical brightness.',
    radar: { acidity: 88, sweetness: 95, body: 68, floral: 94, fruit: 94 },
    recommendedMethod: 'Kalita Wave or Chemex',
    image: HERO_IMAGE,
  },
  {
    id: 'guatemala-san-marcos',
    name: 'Volcán Tajumulco Reserve',
    country: 'Guatemala',
    region: 'San Marcos Volcanic Slope',
    elevation: '1,700 – 1,900m',
    process: 'Fully Washed Spring Water',
    variety: 'Bourbon & Caturra',
    roastLevel: 'Medium-Light',
    notes: ['Dark Cocoa 70%', 'Brown Sugar Toffee', 'Red Apple', 'Roasted Pecan'],
    description: 'Nourished by nutrient-dense volcanic soil and morning mountain mists. Round, balanced, comforting body with a lingering caramel finish.',
    radar: { acidity: 68, sweetness: 86, body: 84, floral: 52, fruit: 74 },
    recommendedMethod: 'Aeropress or Espresso',
    image: LATTE_ART_IMAGE,
  },
  {
    id: 'sumatra-pantani',
    name: 'Kerinci Valley Red Honey',
    country: 'Indonesia',
    region: 'Sumatra, Mount Kerinci',
    elevation: '1,650m',
    process: 'Red Honey (Slow sun dry with mucilage)',
    variety: 'Andung Sari & Sigarar Utang',
    roastLevel: 'Medium',
    notes: ['Black Currant', 'Cedar Smoke', 'Dark Fig', 'Molasses'],
    description: 'A revolutionary Departure from conventional wet-hulled Sumatras. Luscious, deep velvety body with tropical dried fruit richness.',
    radar: { acidity: 58, sweetness: 85, body: 95, floral: 45, fruit: 82 },
    recommendedMethod: 'French Press or Cold Drip',
    image: COLD_BREW_IMAGE,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Pour-over
  {
    id: 'menu-chelchele-v60',
    name: 'Ethiopia Chelchele V60',
    category: 'pour-over',
    price: 6.5,
    description: 'Hand-poured single-origin filter. Tea-like delicacy with notes of jasmine, bergamot, and sweet white peach.',
    tastingNotes: ['Jasmine', 'Bergamot', 'White Peach'],
    beanOrigin: 'Yirgacheffe, Ethiopia (1,950m)',
    dietary: ['Vegan', 'House Favorite'],
    image: HERO_IMAGE,
    options: {
      temperature: ['Hot', 'Iced'],
    },
  },
  {
    id: 'menu-geisha-filter',
    name: 'Huila Geisha Reserve Origami',
    category: 'pour-over',
    price: 9.0,
    description: 'Slow-extracted through the Origami ceramic dripper. Tropical explosion of lemongrass, papaya, and sweet honey blossom.',
    tastingNotes: ['Papaya', 'Lemongrass', 'Orange Blossom'],
    beanOrigin: 'Huila, Colombia',
    dietary: ['Vegan', 'House Favorite'],
    image: CULTURE_BEANS_IMAGE,
    options: {
      temperature: ['Hot', 'Iced'],
    },
  },
  {
    id: 'menu-guatemala-chemex',
    name: 'Guatemala Volcán Chemex for Two',
    category: 'pour-over',
    price: 11.0,
    description: 'Shared glass carafe poured table-side. Clean, rich notes of cocoa nibs, brown sugar toffee, and crisp red apple.',
    tastingNotes: ['Dark Cocoa', 'Toffee', 'Red Apple'],
    beanOrigin: 'San Marcos, Guatemala',
    dietary: ['Vegan'],
    image: BARISTA_CRAFT_IMAGE,
    options: {
      temperature: ['Hot'],
    },
  },

  // Espresso
  {
    id: 'menu-flat-white',
    name: 'Atelier Velvet Flat White',
    category: 'espresso',
    price: 5.25,
    description: 'Double ristretto pulled on our Synesso MVP, textured with silky microfoam poured at the golden 62°C temperature.',
    tastingNotes: ['Caramel Cream', 'Hazelnut', 'Dark Chocolate'],
    beanOrigin: 'House Seasonal Espresso Blend (Ethiopia + Guatemala)',
    dietary: ['House Favorite'],
    image: LATTE_ART_IMAGE,
    options: {
      milk: ['Oat Milk (Minor Figures)', 'House Whole Milk', 'Almond Milk', 'Coconut Milk'],
      temperature: ['Hot'],
    },
  },
  {
    id: 'menu-cortado',
    name: 'Minimalist Cortado (1:1 Ratio)',
    category: 'espresso',
    price: 4.75,
    description: 'Equal parts dense double espresso and gently steamed milk in a fluted Gibraltar glass.',
    tastingNotes: ['Roasted Walnut', 'Cacao', 'Molasses'],
    beanOrigin: 'Guatemala Tajumulco Reserve',
    dietary: ['House Favorite'],
    options: {
      milk: ['House Whole Milk', 'Oat Milk', 'Almond Milk'],
      temperature: ['Hot'],
    },
  },
  {
    id: 'menu-cardamom-cappuccino',
    name: 'Cardamom & Bourbon Vanilla Cappuccino',
    category: 'espresso',
    price: 6.0,
    description: 'Double espresso infused with house-cracked green cardamom pods and organic Madagascar vanilla pod syrup.',
    tastingNotes: ['Green Cardamom', 'Sweet Spice', 'Warm Cream'],
    beanOrigin: 'Ethiopia + Colombia Roaster Cut',
    options: {
      milk: ['Oat Milk', 'House Whole Milk'],
      temperature: ['Hot', 'Iced'],
    },
  },

  // Cold Brew
  {
    id: 'menu-kyoto-cold-drip',
    name: '18-Hour Kyoto Slow Drip',
    category: 'cold-brew',
    price: 6.5,
    description: 'Single-origin Sumatra Kerinci slowly dripped over 18 hours through our Japanese glass tower. Syrupy, wine-like clarity served over hand-cut clear ice.',
    tastingNotes: ['Black Currant', 'Cedar', 'Dark Plum'],
    beanOrigin: 'Mount Kerinci, Sumatra',
    dietary: ['Vegan', 'House Favorite'],
    image: COLD_BREW_IMAGE,
    options: {
      temperature: ['Iced'],
    },
  },
  {
    id: 'menu-cascara-tonic',
    name: 'Sparkling Cascara & Blood Orange Tonic',
    category: 'cold-brew',
    price: 6.25,
    description: 'Sun-dried coffee cherry husk tisane steeped cold, married with botanical tonic and expressed Sicilian blood orange peel.',
    tastingNotes: ['Rosehip', 'Tamarind', 'Citrus Zest'],
    dietary: ['Vegan', 'Dairy-Free'],
    options: {
      temperature: ['Iced'],
    },
  },

  // Tea
  {
    id: 'menu-uji-matcha',
    name: 'Ceremonial Uji Matcha Latte',
    category: 'tea',
    price: 6.5,
    description: 'First-harvest shade-grown tencha stone-ground in Kyoto. Whisked with bamboo chasen and folded into warm oat milk.',
    tastingNotes: ['Sweet Umami', 'Pistachio Cream', 'Fresh Grass'],
    dietary: ['Vegan', 'Dairy-Free'],
    options: {
      milk: ['Oat Milk', 'House Whole Milk', 'Almond Milk'],
      temperature: ['Hot', 'Iced'],
    },
  },
  {
    id: 'menu-hojicha-roasted',
    name: 'Charcoal Roasted Hojicha',
    category: 'tea',
    price: 5.5,
    description: 'Slow-roasted green tea stems from Shizuoka. Naturally low in caffeine with deeply comforting nutty notes.',
    tastingNotes: ['Toasted Barley', 'Brown Rice', 'Caramelized Wood'],
    dietary: ['Vegan', 'Decaf'],
    options: {
      temperature: ['Hot', 'Iced'],
    },
  },

  // Bakery
  {
    id: 'menu-cardamom-knot',
    name: 'Swedish Cardamom Knot (Kardemummabulle)',
    category: 'bakery',
    price: 4.85,
    description: 'Braided slow-fermented brioche dough infused with freshly crushed cardamom seeds and pearl sugar crystals.',
    tastingNotes: ['Cardamom', 'Cultured Butter', 'Caramelized Crust'],
    dietary: ['House Favorite'],
  },
  {
    id: 'menu-almond-croissant',
    name: 'Double-Baked Frangipane Brioche',
    category: 'bakery',
    price: 5.5,
    description: 'Laminated French butter pastry filled with rich almond cream and topped with toasted flaked almonds and powdered sugar.',
    tastingNotes: ['Toasted Almond', 'Vanilla Bean', 'Flaky Butter'],
  },
  {
    id: 'menu-sourdough-toast',
    name: 'Country Sourdough with Espresso Butter',
    category: 'bakery',
    price: 5.0,
    description: 'Warm thick slice of naturally leavened sourdough paired with our house-whipped brown sugar & espresso compound butter.',
    tastingNotes: ['Tangy Crumb', 'Dark Espresso', 'Smoked Maldon Salt'],
    dietary: ['House Favorite'],
  },
];

export const COFFEE_STORIES: CoffeeStory[] = [
  {
    id: 'story-chelchele-roots',
    title: 'The High Slopes of Chelchele: A Journey into Ethiopian Heirloom Varieties',
    subtitle: 'Walking the misty hills of Gedeb at 2,000 meters above sea level where wild coffee was born.',
    author: 'Elena Vance',
    role: 'Head of Green Coffee & Sourcing',
    date: 'September 2026',
    readTime: '5 min read',
    category: 'Origins & Terroir',
    excerpt: 'In the high altitudes of southern Ethiopia, coffee doesn’t grow in tidy commercial plantations. It thrives in shaded backyard forest plots, picked hand by hand at peak ruby ripeness.',
    image: CULTURE_BEANS_IMAGE,
    pullQuote: 'Coffee in Ethiopia is not merely an export commodity; it is a sacred daily rhythm of hospitality and gratitude that unfolds over three slow cups.',
    tastingPairing: 'Pair this story with our Ethiopia Chelchele V60 for an immersive sensory reading experience.',
    likes: 84,
    content: [
      'The road to Chelchele village in the Gedeb woreda is narrow, red-clay, and carved through dense eucalyptus and banana groves. At 2,100 meters above sea level, the air is crisp, thinning with altitude, and fragrant with the honeysuckle scent of blooming coffee trees.',
      'Unlike modern monoculture farms, the smallholder growers here cultivate what botanists simply classify as "indigenous heirloom varieties"—thousands of genetically distinct wild cultivars that have adapted to their specific micro-slope over centuries.',
      'During harvest, every cherry is hand-selected. Cherries are delivered to the village washing station by sunset, depulped with crystal mountain spring water, and set to dry on raised bamboo beds. For eighteen days, workers turn the cherries hourly under the dappled midday sun.',
      'The result in the cup is unmistakable: an extraordinary clarity that drinks more like jasmine tea and white peach nectar than traditional coffee. When you brew Chelchele, you taste the altitude, the mineral soil, and the calm reverence of hands that have tended these trees for generations.'
    ],
  },
  {
    id: 'story-microfoam-physics',
    title: 'The Anatomy of Silky Microfoam: Why 62°C is the Golden Barista Threshold',
    subtitle: 'Demystifying milk proteins, micro-bubbles, and thermal sweetness in the espresso cup.',
    author: 'Marcus Lin',
    role: 'Lead Barista & Educator',
    date: 'August 2026',
    readTime: '4 min read',
    category: 'Barista Craft',
    excerpt: 'Steam wand roaring, milk swirling into a vortex. Ever wondered why a masterfully poured flat white feels like liquid velvet against your palate?',
    image: LATTE_ART_IMAGE,
    pullQuote: 'At 62°C, lactose is at peak perception on human taste receptors. Pass 68°C, and the fragile whey proteins denature, muting delicate sweetness forever.',
    tastingPairing: 'Enjoy with our Velvet Flat White while watching the morning light stream across our cedar bar.',
    likes: 67,
    content: [
      'When you ask a barista for an "extra hot" latte, their heart quietly aches. Here is the science behind why.',
      'Milk is a complex emulsion of water, butterfat globules, and proteins (principally caseins and whey). When steam is introduced via the wand tip, we are doing two distinct things: injecting micro-pockets of air to create foam, and texturing that foam through a continuous centrifugal vortex.',
      'Between 58°C and 62°C, lactose—milk’s natural sugar—is at its peak solubility and perceived sweetness. The milk tastes naturally sweet without adding a single gram of sugar.',
      'However, once milk climbs past 68°C, beta-lactoglobulin begins to denature. It releases sulphur compounds, turns the milk chalky, and destroys the silky emulsion that suspends the espresso crema. The golden rule: steam for texture and sweetness, never for boiling heat.'
    ],
  },
  {
    id: 'story-dawn-roast-calibration',
    title: 'Zero Defect Calibration: How We Dial the Loring S15 Each Dawn',
    subtitle: 'Inside the roastery at 5:30 AM before the doors open and the first espresso is extracted.',
    author: 'Samira Gomez',
    role: 'Master Roaster',
    date: 'July 2026',
    readTime: '6 min read',
    category: 'Brewing Science',
    excerpt: 'Roasting coffee is the delicate intersection of fluid thermodynamics and sensory memory. Here is how our daily morning cupping shapes your cup.',
    image: BARISTA_CRAFT_IMAGE,
    pullQuote: 'We do not roast coffee to impart roasty flavors; our purpose is to be invisible translators of the soil where the bean was born.',
    tastingPairing: 'Recommended alongside our Volcán Tajumulco Reserve espresso.',
    likes: 102,
    content: [
      'The roastery smells different at five in the morning. The ambient air is cool, undisturbed by the buzz of espresso pumps, and smells faintly of toasted barley and dried stone fruits from yesterday’s last batch.',
      'Before a single pound of green coffee touches the drum of our convection roaster, we perform sensory calibration. We cup yesterday’s roasts blind across five numbered ceramic bowls.',
      'Using a silver cupping spoon, we break the crust with three firm pushes, capturing the aromatic release of volatile compounds. We slurp vigorously to aerate the liquor across the palate, scoring acidity, sweetness, clarity, and finish.',
      'If the roast rate-of-rise was slightly too aggressive during the Maillard phase, the fruit note shifts from crisp peach to baked apple. We adjust the burner profiles in fractions of a percent. This obsessive pursuit of balance is what keeps our coffee alive.'
    ],
  },
  {
    id: 'story-slow-sundays',
    title: 'Rain on the Skylight, 10 Years at the Corner Oak Table',
    subtitle: 'A reflection from one of our very first patrons on the restorative pace of cafe life.',
    author: 'Julian Thorne',
    role: 'Patron & Architect',
    date: 'June 2026',
    readTime: '3 min read',
    category: 'Cafe Memoirs',
    excerpt: 'In a world that demands ceaseless velocity, the cafe remains one of the few civil sanctuaries where doing nothing with a hot cup is considered noble work.',
    image: HERO_IMAGE,
    pullQuote: 'A great cafe is not just where coffee is prepared; it is an acoustic room where strangers sit in companionable silence.',
    tastingPairing: 'Order a Chemex for Two and a warm Cardamom Knot on a slow morning.',
    likes: 129,
    content: [
      'I began coming to Vessel & Bean when the counters still smelled of fresh cedar sawdust and the owners only had one two-group machine.',
      'Over a decade, governments have changed, technologies have sprinted forward, and our days have grown noisier. Yet every Sunday at eight, the same ritual holds: the brass kettle whistling softly, the slow bloom of grounds, the hiss of the steam wand, and people reading paper books.',
      'There are no screens flashing advertisements here, no jarring notifications. Just warm timber, soft morning light, and coffee that demands you slow your pulse to match its extraction.',
      'It reminds us that luxury is not speed or excess; true luxury is having forty uninterrupted minutes to watch steam rise from a ceramic cup.'
    ],
  },
];
