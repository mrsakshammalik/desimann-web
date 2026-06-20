// ============================================================
// DESIMANN.COM — CONSTANTS & DATA
// ============================================================

export const SITE_CONFIG = {
  name: "Desimann",
  tagline: "Dil Se Desi, Swad Mein Asli",
  mission: "To become India's most trusted homemade food brand.",
  vision: "Every Indian home should have at least one Desimann product.",
  launchDate: "2026-08-15T00:00:00+05:30", // Independence Day launch
  url: "https://desimann.com",
  email: "hello@desimann.com",
  phone: "+91 93184 64642",
};

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Why Us", href: "#why-desimann" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#reserve" },
];

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  shelfLife: string;
  price: number;
  originalPrice: number;
  image: string;
  color: string;
  accentColor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "mango-pickle",
    name: "Mango Pickle",
    tagline: "Sun-kissed raw mangoes, aged to perfection",
    description:
      "Made with hand-selected raw mangoes from Andhra orchards, our mango pickle is slow-aged in mustard oil with traditional spices. Each bite carries the warmth of a grandmother's kitchen.",
    ingredients: ["Raw Mango", "Mustard Oil", "Fenugreek", "Red Chilli", "Salt", "Turmeric"],
    nutrition: [
      { label: "Calories", value: "45 kcal" },
      { label: "Fat", value: "3.5g" },
      { label: "Carbs", value: "2.8g" },
      { label: "Protein", value: "0.5g" },
    ],
    shelfLife: "12 months",
    price: 299,
    originalPrice: 399,
    image: "/images/products/mango-pickle.png",
    color: "#D4A017",
    accentColor: "#FFC947",
  },
  {
    id: "lemon-pickle",
    name: "Lemon Pickle",
    tagline: "Tangy, zesty, and irresistibly bold",
    description:
      "Fresh lemons brined with rock salt and mustard, then kissed by the sun. A tangy explosion that elevates every meal from ordinary to extraordinary.",
    ingredients: ["Lemon", "Mustard Oil", "Mustard Seeds", "Salt", "Red Chilli", "Turmeric"],
    nutrition: [
      { label: "Calories", value: "35 kcal" },
      { label: "Fat", value: "2.8g" },
      { label: "Carbs", value: "2.2g" },
      { label: "Protein", value: "0.4g" },
    ],
    shelfLife: "12 months",
    price: 249,
    originalPrice: 349,
    image: "/images/products/lemon-pickle.png",
    color: "#C5B800",
    accentColor: "#E8D44D",
  },
  {
    id: "mixed-pickle",
    name: "Mixed Pickle",
    tagline: "A symphony of flavors in every spoonful",
    description:
      "The best of all worlds — mango, lemon, green chilli, carrot, and amla come together in a medley of spices. Our most popular blend, perfected over 80 years.",
    ingredients: ["Mango", "Lemon", "Carrot", "Amla", "Chilli", "Mustard Oil", "Spices"],
    nutrition: [
      { label: "Calories", value: "50 kcal" },
      { label: "Fat", value: "4.0g" },
      { label: "Carbs", value: "3.0g" },
      { label: "Protein", value: "0.6g" },
    ],
    shelfLife: "10 months",
    price: 329,
    originalPrice: 429,
    image: "/images/products/mixed-pickle.png",
    color: "#C2452D",
    accentColor: "#E86F5A",
  },
  {
    id: "garlic-pickle",
    name: "Garlic Pickle",
    tagline: "Bold garlic, fiery spices, unforgettable taste",
    description:
      "Whole garlic cloves marinated in a fiery blend of red chilli and mustard oil. A bold companion for parathas and dal rice that packs a punch.",
    ingredients: ["Garlic", "Mustard Oil", "Red Chilli", "Fenugreek", "Salt", "Vinegar"],
    nutrition: [
      { label: "Calories", value: "55 kcal" },
      { label: "Fat", value: "4.2g" },
      { label: "Carbs", value: "3.5g" },
      { label: "Protein", value: "0.8g" },
    ],
    shelfLife: "12 months",
    price: 279,
    originalPrice: 379,
    image: "/images/products/garlic-pickle.png",
    color: "#8B4513",
    accentColor: "#A0522D",
  },
  {
    id: "green-chilli-pickle",
    name: "Green Chilli Pickle",
    tagline: "For those who like it hot",
    description:
      "Fresh green chillies stuffed with aromatic spices and preserved in cold-pressed mustard oil. A fiery delight for the brave-hearted food lover.",
    ingredients: ["Green Chilli", "Mustard Oil", "Mustard Seeds", "Fennel", "Salt", "Amchoor"],
    nutrition: [
      { label: "Calories", value: "40 kcal" },
      { label: "Fat", value: "3.0g" },
      { label: "Carbs", value: "2.5g" },
      { label: "Protein", value: "0.7g" },
    ],
    shelfLife: "8 months",
    price: 259,
    originalPrice: 349,
    image: "/images/products/green-chilli-pickle.png",
    color: "#4C7A34",
    accentColor: "#6B9B50",
  },
  {
    id: "mustard-oil",
    name: "Pure Mustard Oil",
    tagline: "Cold-pressed, unrefined, pure tradition",
    description:
      "Extracted from the finest mustard seeds using traditional cold-press methods. No refining, no chemicals — just pure, pungent, golden mustard oil the way it was meant to be.",
    ingredients: ["100% Pure Mustard Seeds"],
    nutrition: [
      { label: "Calories", value: "884 kcal" },
      { label: "Fat", value: "100g" },
      { label: "MUFA", value: "59g" },
      { label: "PUFA", value: "21g" },
    ],
    shelfLife: "18 months",
    price: 399,
    originalPrice: 549,
    image: "/images/products/mustard-oil.png",
    color: "#DAA520",
    accentColor: "#FFD700",
  },
  {
    id: "turmeric-powder",
    name: "Turmeric Powder",
    tagline: "Golden goodness from Lakadong farms",
    description:
      "Sourced from the high-curcumin Lakadong variety of Meghalaya. Sun-dried, stone-ground, and packed with 7-9% curcumin content. The gold standard of turmeric.",
    ingredients: ["100% Lakadong Turmeric"],
    nutrition: [
      { label: "Curcumin", value: "7-9%" },
      { label: "Calories", value: "312 kcal" },
      { label: "Fiber", value: "22.7g" },
      { label: "Iron", value: "55mg" },
    ],
    shelfLife: "24 months",
    price: 349,
    originalPrice: 449,
    image: "/images/products/turmeric-powder.png",
    color: "#E8A317",
    accentColor: "#FFB84D",
  },
  {
    id: "red-chilli-powder",
    name: "Red Chilli Powder",
    tagline: "Byadgi chillies, legendary heat & color",
    description:
      "Made from premium Byadgi chillies of Karnataka — known for their deep red color and moderate heat. Sun-dried and stone-ground for authentic flavor.",
    ingredients: ["100% Byadgi Red Chillies"],
    nutrition: [
      { label: "Calories", value: "282 kcal" },
      { label: "Capsaicin", value: "High" },
      { label: "Vitamin A", value: "41610 IU" },
      { label: "Iron", value: "14.3mg" },
    ],
    shelfLife: "24 months",
    price: 299,
    originalPrice: 399,
    image: "/images/products/red-chilli-powder.png",
    color: "#CC2936",
    accentColor: "#E84855",
  },
];

export const TIMELINE_EVENTS = [
  {
    year: "1940",
    title: "Traditional Recipe Created",
    description:
      "In a small village kitchen of Uttar Pradesh, our great-grandmother crafted the first batch of mango pickle using a secret family recipe that would be cherished for generations.",
    icon: "📜",
  },
  {
    year: "1975",
    title: "Passed To Next Generation",
    description:
      "The recipes traveled through generations, each adding their own touch while preserving the soul. Our grandmother refined the process, maintaining the authentic taste.",
    icon: "👵",
  },
  {
    year: "2005",
    title: "Refined Process",
    description:
      "Modern food science met traditional wisdom. We standardized recipes while keeping the handmade essence, ensuring consistency without compromising authenticity.",
    icon: "🔬",
  },
  {
    year: "2026",
    title: "Desimann Launch",
    description:
      "After decades of perfection, we bring these treasured recipes to every Indian home. Desimann is born — where tradition meets trust, and homemade meets premium.",
    icon: "🚀",
  },
];

export const FARM_TO_TABLE_STEPS = [
  {
    step: 1,
    title: "Farm Selection",
    description: "We partner with organic farmers across India, visiting each farm personally to ensure sustainable and ethical practices.",
    icon: "🌾",
  },
  {
    step: 2,
    title: "Ingredient Harvest",
    description: "Ingredients are hand-picked at peak ripeness. No cold storage, no artificial ripening — just nature's timing.",
    icon: "🧺",
  },
  {
    step: 3,
    title: "Traditional Preparation",
    description: "Recipes handed down through generations are followed meticulously. Every spice is measured with love and precision.",
    icon: "👩‍🍳",
  },
  {
    step: 4,
    title: "Quality Inspection",
    description: "Every batch undergoes rigorous lab testing for purity, taste, and safety. We reject anything that doesn't meet our standards.",
    icon: "🔍",
  },
  {
    step: 5,
    title: "Premium Packaging",
    description: "Sealed in food-grade glass jars with tamper-proof packaging. Designed to preserve freshness and look beautiful on your shelf.",
    icon: "📦",
  },
  {
    step: 6,
    title: "Customer Delivery",
    description: "Carefully shipped to your doorstep with love. Track your order in real-time and taste the difference within 48 hours.",
    icon: "🚚",
  },
];

export interface Ingredient {
  id: string;
  name: string;
  image: string;
  sourceRegion: string;
  benefits: string[];
  farmerStory: string;
  harvestSeason: string;
  color: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: "mustard-seed",
    name: "Mustard Seeds",
    image: "/images/ingredients/mustard-seed.jpg",
    sourceRegion: "Rajasthan & Madhya Pradesh",
    benefits: ["Rich in Omega-3", "Anti-inflammatory", "Boosts metabolism", "Heart-healthy"],
    farmerStory:
      "Ramesh Kumar, a third-generation mustard farmer from Bharatpur, Rajasthan, grows our mustard using traditional irrigation methods. His family has been cultivating these golden fields for over 60 years.",
    harvestSeason: "February - March",
    color: "#DAA520",
  },
  {
    id: "raw-mango",
    name: "Raw Mango",
    image: "/images/ingredients/raw-mango.jpg",
    sourceRegion: "Andhra Pradesh & Maharashtra",
    benefits: ["Rich in Vitamin C", "Aids digestion", "Boosts immunity", "Natural antioxidant"],
    farmerStory:
      "Lakshmi Devi tends to 200 mango trees in Ratnagiri. Each mango is hand-picked when perfectly raw — firm, sour, and bursting with natural pectin for the perfect pickle.",
    harvestSeason: "April - May",
    color: "#8DB600",
  },
  {
    id: "lemon",
    name: "Fresh Lemon",
    image: "/images/ingredients/lemon.jpg",
    sourceRegion: "Andhra Pradesh & Gujarat",
    benefits: ["High Vitamin C", "Alkalizing", "Detoxifying", "Immune booster"],
    farmerStory:
      "Mohammed Ismail's lemon orchards in Nellore district produce the juiciest lemons in the region. His organic farming practices ensure every lemon is pesticide-free.",
    harvestSeason: "Year-round, Peak: July - September",
    color: "#FFC107",
  },
  {
    id: "turmeric",
    name: "Lakadong Turmeric",
    image: "/images/ingredients/turmeric.jpg",
    sourceRegion: "Meghalaya (Jaintia Hills)",
    benefits: ["7-9% Curcumin", "Anti-inflammatory", "Brain health", "Natural antibiotic"],
    farmerStory:
      "The Khasi tribal community in Lakadong village has been growing this high-curcumin turmeric for centuries. Their altitude farming gives it the distinctive deep orange color and potency.",
    harvestSeason: "January - March",
    color: "#E8A317",
  },
  {
    id: "garlic",
    name: "Mountain Garlic",
    image: "/images/ingredients/garlic.jpg",
    sourceRegion: "Madhya Pradesh & Rajasthan",
    benefits: ["Natural antibiotic", "Heart health", "Immune booster", "Anti-bacterial"],
    farmerStory:
      "Shankar Patel grows single-clove garlic in the foothills of Satpura. The mineral-rich soil gives our garlic its distinctive pungency and sweetness when pickled.",
    harvestSeason: "November - February",
    color: "#F5F5DC",
  },
];

export const WHY_DESIMANN_FEATURES = [
  {
    title: "No Preservatives",
    description: "Zero artificial preservatives, colors, or flavors. Just pure, natural goodness the way nature intended.",
    icon: "🚫",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "100% Homemade",
    description: "Every product is handcrafted in small batches using traditional methods passed down through generations.",
    icon: "🏡",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    title: "Farm Fresh Ingredients",
    description: "We source directly from organic farmers. No middlemen, no compromises. Fresh from farm to your table.",
    icon: "🌿",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Traditional Recipes",
    description: "Recipes perfected over 80+ years, preserving the authentic taste of India's culinary heritage.",
    icon: "📖",
    gradient: "from-purple-500/20 to-indigo-500/20",
  },
  {
    title: "Small Batch Production",
    description: "We never mass-produce. Each batch is limited to ensure quality, consistency, and that homemade touch.",
    icon: "⚡",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Made In India",
    description: "Proudly Indian. Supporting local farmers, local artisans, and the rich food culture of our nation.",
    icon: "🇮🇳",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export const TRUST_BADGES = [
  { title: "Lab Tested", description: "Every batch independently lab-tested for safety and purity", icon: "🧪" },
  { title: "FSSAI Certified", description: "Licensed and compliant with Food Safety Standards Authority of India", icon: "✅" },
  { title: "Hygienic Facility", description: "Prepared in FSSAI-approved, sanitized production facilities", icon: "🏭" },
  { title: "Quality Checked", description: "Multi-stage quality control process from sourcing to delivery", icon: "🎯" },
  { title: "Secure Packaging", description: "Tamper-proof, food-grade packaging that preserves freshness", icon: "🔒" },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "New Delhi",
    avatar: "PS",
    rating: 5,
    text: "The mango pickle reminds me of my grandmother's recipe. Absolutely authentic taste! I've been searching for this quality for years.",
    product: "Mango Pickle",
  },
  {
    name: "Rajesh Patel",
    location: "Mumbai",
    avatar: "RP",
    rating: 5,
    text: "The mustard oil is pure gold. Cold-pressed and you can smell the difference from the first drop. My whole family loves it.",
    product: "Pure Mustard Oil",
  },
  {
    name: "Anita Krishnan",
    location: "Bangalore",
    avatar: "AK",
    rating: 5,
    text: "Finally, a brand that doesn't use preservatives! The mixed pickle is a flavor bomb. My kids fight over the last spoon.",
    product: "Mixed Pickle",
  },
  {
    name: "Suresh Reddy",
    location: "Hyderabad",
    avatar: "SR",
    rating: 5,
    text: "The turmeric powder is exceptional. The color and potency are unmatched. I use it in everything from haldi doodh to curries.",
    product: "Turmeric Powder",
  },
  {
    name: "Meera Joshi",
    location: "Pune",
    avatar: "MJ",
    rating: 5,
    text: "I'm an NRI living in the US and this brand makes me feel connected to home. The garlic pickle is exactly like what my mom makes!",
    product: "Garlic Pickle",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    avatar: "VS",
    rating: 5,
    text: "Premium quality at honest prices. The red chilli powder has transformed my cooking. Authentic Byadgi flavor in every pinch.",
    product: "Red Chilli Powder",
  },
];

export const SOCIAL_LINKS = [
  { name: "WhatsApp", href: "https://wa.me/919318464642", icon: "whatsapp", members: "2.4K+" },
  { name: "Instagram", href: "https://instagram.com/desimannindia", icon: "instagram", members: "5.8K+" },
  { name: "Facebook", href: "https://facebook.com/desimannindia", icon: "facebook", members: "3.2K+" },
  { name: "YouTube", href: "https://youtube.com/@desimannindia", icon: "youtube", members: "1.5K+" },
];

export const VIP_BENEFITS = [
  { title: "Early Product Access", description: "Be the first to try new products before anyone else", icon: "🎯" },
  { title: "Special Discounts", description: "Exclusive 15-25% off on all products, all year round", icon: "💰" },
  { title: "Founder Updates", description: "Direct updates from the founder on company journey", icon: "📬" },
  { title: "Exclusive Recipes", description: "Chef-curated recipes using Desimann products", icon: "📖" },
  { title: "Limited Editions", description: "Access to limited-run seasonal products", icon: "⭐" },
  { title: "Priority Delivery", description: "Your orders ship first, always", icon: "🚀" },
];

export const REFERRAL_TIERS = [
  { referrals: 1, reward: "₹50 Credit", icon: "🎁" },
  { referrals: 5, reward: "₹300 Credit", icon: "💎" },
  { referrals: 10, reward: "Free Product", icon: "🏆" },
  { referrals: 25, reward: "VIP Member", icon: "👑" },
];

export const LIVE_NOTIFICATIONS = [
  { city: "Delhi", action: "joined the waitlist", time: "2 min ago" },
  { city: "Mumbai", action: "reserved a launch offer", time: "5 min ago" },
  { city: "Bangalore", action: "joined the Desimann family", time: "8 min ago" },
  { city: "Hyderabad", action: "referred 3 friends", time: "12 min ago" },
  { city: "Chennai", action: "joined the waitlist", time: "15 min ago" },
  { city: "Pune", action: "became a VIP member", time: "18 min ago" },
  { city: "Kolkata", action: "reserved a launch offer", time: "22 min ago" },
  { city: "Jaipur", action: "joined the Desimann family", time: "25 min ago" },
  { city: "Lucknow", action: "joined the waitlist", time: "28 min ago" },
  { city: "Ahmedabad", action: "reserved a launch offer", time: "32 min ago" },
];

export const INDIA_STATES = [
  { id: "RJ", name: "Rajasthan", product: "Mustard Oil", ingredient: "Premium Mustard Seeds", story: "The golden fields of Bharatpur produce India's finest mustard" },
  { id: "AP", name: "Andhra Pradesh", product: "Mango Pickle", ingredient: "Avakkai Mangoes", story: "Avakkai tradition meets Desimann quality" },
  { id: "MP", name: "Madhya Pradesh", product: "Garlic Pickle", ingredient: "Mountain Garlic", story: "Satpura foothills garlic with distinctive pungency" },
  { id: "KA", name: "Karnataka", product: "Red Chilli Powder", ingredient: "Byadgi Chillies", story: "Famous Byadgi chillies known for deep color and moderate heat" },
  { id: "ML", name: "Meghalaya", product: "Turmeric Powder", ingredient: "Lakadong Turmeric", story: "World's highest curcumin content turmeric from Jaintia Hills" },
  { id: "GJ", name: "Gujarat", product: "Lemon Pickle", ingredient: "Fresh Lemons", story: "Sun-drenched citrus orchards producing the juiciest lemons" },
  { id: "UP", name: "Uttar Pradesh", product: "Mixed Pickle", ingredient: "Heritage Recipes", story: "Where it all began — our ancestral home and original recipes" },
  { id: "MH", name: "Maharashtra", product: "Green Chilli Pickle", ingredient: "Kolhapuri Chillies", story: "Fiery Kolhapuri green chillies with authentic spice" },
];

export const ROADMAP_PHASES = [
  {
    phase: 1,
    title: "Foundation",
    timeline: "Aug 2026",
    status: "upcoming" as const,
    products: ["Achar (5 varieties)", "Pure Mustard Oil", "Spices (Turmeric, Chilli)"],
  },
  {
    phase: 2,
    title: "Expansion",
    timeline: "Dec 2026",
    status: "planned" as const,
    products: ["Pure Ghee", "Papad", "Murabba"],
  },
  {
    phase: 3,
    title: "Diversification",
    timeline: "Jun 2027",
    status: "planned" as const,
    products: ["Snacks", "Ready Mixes", "Dry Fruits"],
  },
  {
    phase: 4,
    title: "Marketplace",
    timeline: "Dec 2027",
    status: "planned" as const,
    products: ["Homemade Sellers", "Regional Brands", "Artisan Network"],
  },
  {
    phase: 5,
    title: "Global Expansion",
    timeline: "2028",
    status: "planned" as const,
    products: ["USA", "UK", "Canada", "Australia", "Dubai"],
  },
];
