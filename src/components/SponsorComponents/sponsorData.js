// Pure data file - no JSX or React imports


export const currentSponsorsData = [
  { 
    id: 101,
    name: "Adidas India", 
    tier: "Platinum",
    tagline: "Impossible is Nothing",
    description: "Global leader in sports apparel and equipment, Adidas brings cutting-edge innovation to martial arts.",
    contribution: [
      "Official Uniform Partner - Providing gi and competition uniforms",
      "Prize money contribution: ₹5,00,000",
      "Sports equipment and training gear for all participants",
      "Winner's trophy and medals"
    ],
    website: "https://adidas.com",
    email: "sports@adidas.com",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
    stats: {
      years: "5+ Years",
      events: "50+ Events",
      athletes: "1000+ Athletes"
    }
  },
  { 
    id: 102,
    name: "Decathlon Sports", 
    tier: "Gold",
    tagline: "Making Sports Accessible",
    description: "World's largest sporting goods retailer supporting grassroots sports development and athlete excellence.",
    contribution: [
      "Training equipment and protective gear",
      "Prize money contribution: ₹3,00,000",
      "Fitness and wellness support",
      "Athlete recovery and nutrition kits"
    ],
    website: "https://decathlon.in",
    email: "partnerships@decathlon.in",
    phone: "+91 98765 43211",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    stats: {
      years: "3+ Years",
      events: "30+ Events",
      athletes: "500+ Athletes"
    }
  },
  { 
    id: 103,
    name: "Red Bull Energy", 
    tier: "Gold",
    tagline: "Gives You Wings",
    description: "Premium energy drink brand powering athletes with the energy and focus needed for peak performance.",
    contribution: [
      "Official Hydration Partner",
      "Energy drinks and refreshments for all participants",
      "Prize money contribution: ₹2,50,000",
      "Post-event celebration and networking"
    ],
    website: "https://redbull.com",
    email: "events@redbull.com",
    phone: "+91 98765 43212",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=800&q=80",
    stats: {
      years: "4+ Years",
      events: "40+ Events",
      athletes: "800+ Athletes"
    }
  },
  { 
    id: 104,
    name: "Karate Gear Pro", 
    tier: "Silver",
    tagline: "Equipment Excellence",
    description: "Specialized martial arts equipment manufacturer providing professional-grade gear for serious practitioners.",
    contribution: [
      "Official Equipment Supplier",
      "Competition mats and safety equipment",
      "Prize money contribution: ₹1,50,000",
      "Discount vouchers for participants"
    ],
    website: "https://karategear.com",
    email: "info@karategear.com",
    phone: "+91 98765 43213",
    image: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80",
    stats: {
      years: "2+ Years",
      events: "20+ Events",
      athletes: "300+ Athletes"
    }
  },
];

export const sponsorPackagesData = [
  { 
    id: 1,
    name: "Main Title Partner", 
    price: "₹2,50,000",
    tier: "Title",
    tagline: "Be Part of History",
    description: "Associate your brand with the prestigious IWKA 50th Year Celebration Tournament as the Main Title Partner. Get maximum visibility and exclusive privileges.",
    goldCoins: 3, // Adding this field for highlighting
    goldCoinLabel: "3 IWKA 50 Years Special Edition Gold Coins", // Specific label
    contribution: [
      "Logo/Name on all Certificates, Volunteer Jerseys & Trophies",
      "Tournament T-Shirts (Back Side) - Over 1000 participants",
      "Magazine Back Cover or Front Inside Page",
      "Guest of Honour for Grand Championship Event",
      "Full Ring/Bout Area Branding",
      "Full-Page Ad in Tournament Magazine",
      "Brand Announcement Every Hour",
      "6x10 FREE Stall Space",
      "25 Spectator Tickets"
    ],
    iconType: "Crown",
    stats: {
      reach: "1000+ Families",
      visibility: "Premium",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 2,
    name: "Co-Title Partner", 
    price: "₹1,50,000",
    tier: "Platinum",
    tagline: "Premium Partnership",
    description: "Elevate your brand as a Platinum Co-Sponsor with extensive visibility across the tournament venue and promotional materials.",
    goldCoins: 1, // Adding this field for highlighting
    goldCoinLabel: "1 IWKA 50-Year Special Edition Gold Coins", // Specific label
    contribution: [
      "Honoured on Stage with Memento & Certificate",
      "Full Ring/Bout Area Branding",
      "Logo on Tournament T-Shirt (Back Side)",
      "Sponsors Banner at Venue",
      "Half Page Advertisement in Magazine",
      "Brand Announcement Every Hour",
      "25 Spectator Tickets",
      "FREE 6x8 Stall Space"
    ],
    iconType: "Medal",
    stats: {
      reach: "800+ Families",
      visibility: "High",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 3,
    name: "Diamond Package", 
    price: "₹1,00,000",
    tier: "Diamond",
    tagline: "Dazzling Presence",
    silverCoins: 1, // Fixed typo from silverCoinsL
    description: "Shine bright as a Diamond Sponsor with prominent branding and advertising benefits throughout the tournament.",
    contribution: [
      "50gm IWKA 50-Year Special Edition Silver Coins",
      "Honoured on Stage with Memento & Certificate",
      "Full Ring/Bout Area Branding",
      "Logo on Volunteer Jerseys",
      "Sponsors Banner at Venue",
      "Half Page Advertisement in Magazine",
      "Brand Announcement Every Hour",
      "25 Spectator Tickets",
      "FREE 6x6 Stall Space"
    ],
    iconType: "Medal",
    stats: {
      reach: "800+ Families",
      visibility: "High",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 4,
    name: "Gold Package", 
    price: "₹50,000",
    tier: "Gold",
    tagline: "Golden Opportunity",
    silverCoins: 1,
    description: "Shine bright as a Gold Sponsor with prominent branding and advertising benefits throughout the tournament.",
    contribution: [
      "50gm IWKA 50-Year Special Edition Silver Coin",
      "Memento + Certificate on Stage",
      "Logo on Tournament T-Shirt (Back Side)",
      "Sponsor Banner at Venue",
      "Quarter Page Ad in Tournament Magazine",
      "Brand Mention Every Hour",
      "20 Spectator Passes with Lucky Draw Coupons",
    ],
    iconType: "Trophy",
    stats: {
      reach: "600+ Families",
      visibility: "Medium-High",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 5,
    name: "Silver Package", 
    price: "₹25,000",
    tier: "Silver",
    tagline: "Supporting Excellence",
    description: "Support martial arts excellence as a Silver Sponsor with valuable brand exposure and recognition benefits.",
    contribution: [
      "Memento + Certificate on Stage",
      "Logo on Tournament T-Shirt/Banners",
      "Quarter Page Ad in Magazine",
      "Brand Announced Every Hour",
      "10 Spectator Passes with Lucky Draw Coupons"
    ],
    iconType: "Star",
    stats: {
      reach: "400+ Families",
      visibility: "Medium",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 6,
    name: "Business Sponsor", 
    price: "₹10,000",
    tier: "Business",
    tagline: "Business Growth",
    description: "Perfect for businesses looking to connect with the martial arts community and promote their brand effectively.",
    contribution: [
      "Memento + Certificate on Stage",
      "Logo on Sponsor Banner at Venue",
      "6x4 Ad Space in Tournament Magazine",
      "5 Spectator Passes with Lucky Draw Coupons"
    ],
    iconType: "Briefcase",
    stats: {
      reach: "300+ Families",
      visibility: "Good",
      recognition: "Stage Honor"
    }
  },
  { 
    id: 7,
    name: "Economy Package", 
    price: "₹5,000",
    tier: "Economy",
    tagline: "Start Your Journey",
    description: "An affordable entry point for supporters and small businesses to be part of this historic martial arts celebration.",
    contribution: [
      "Memento + Certificate on Stage",
      "Logo on Sponsors Banner",
      "3x2 Ad Space in Magazine",
      "2 Spectator Passes with Lucky Draw Coupons"
    ],
    iconType: "Building2",
    stats: {
      reach: "200+ Families",
      visibility: "Standard",
      recognition: "Stage Honor"
    }
  },
];

export const additionalOptionsData = [
  { name: "Spectator Ticket (with Food)", price: "₹200", icon: "🎫" },
  { name: "Tournament T-Shirt", price: "₹600", icon: "👕" },
  { name: "Photo in Magazine", price: "₹1,000", icon: "📰" },
  { name: "Lucky Draw Ticket", price: "₹200", icon: "🎟️" },
  { name: "Logo on T-Shirt (Back)", price: "₹3,000", icon: "🖨️" },
  { name: "Board Standees (6x4, 2 Days)", price: "₹3,000", icon: "📢" },
  { name: "Pamphlet Distribution (1 Day)", price: "₹2,500", icon: "📄" },
  { name: "Stall (10x10 Size)", price: "₹20,000", icon: "🛍️" },
];

export const getTierColor = (tier) => {
  switch(tier) {
    case "Title":
      return {
        badge: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900",
        border: "border-yellow-400 hover:border-yellow-500",
        glow: "group-hover:shadow-yellow-400/30",
        accent: "from-yellow-500/10 to-yellow-600/10",
        bg: "from-yellow-50 to-amber-50"
      };
    case "Platinum":
      return {
        badge: "bg-gradient-to-r from-slate-700 to-slate-900 text-white",
        border: "border-slate-300 hover:border-slate-400",
        glow: "group-hover:shadow-slate-400/20",
        accent: "from-slate-500/5 to-slate-600/5",
        bg: "from-slate-50 to-gray-50"
      };
    case "Diamond":
      return {
        badge: "bg-gradient-to-r from-cyan-400 to-blue-500 text-white",
        border: "border-cyan-300 hover:border-cyan-400",
        glow: "group-hover:shadow-cyan-400/20",
        accent: "from-cyan-500/5 to-blue-600/5",
        bg: "from-cyan-50 to-blue-50"
      };
    case "Gold":
      return {
        badge: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
        border: "border-yellow-200 hover:border-yellow-300",
        glow: "group-hover:shadow-yellow-400/20",
        accent: "from-yellow-500/5 to-yellow-600/5",
        bg: "from-yellow-50 to-orange-50"
      };
    case "Silver":
      return {
        badge: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
        border: "border-gray-200 hover:border-gray-300",
        glow: "group-hover:shadow-gray-400/20",
        accent: "from-gray-500/5 to-gray-600/5",
        bg: "from-gray-50 to-slate-50"
      };
    case "Business":
      return {
        badge: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        border: "border-blue-200 hover:border-blue-300",
        glow: "group-hover:shadow-blue-400/20",
        accent: "from-blue-500/5 to-blue-600/5",
        bg: "from-blue-50 to-cyan-50"
      };
    case "Economy":
      return {
        badge: "bg-gradient-to-r from-green-500 to-green-600 text-white",
        border: "border-green-200 hover:border-green-300",
        glow: "group-hover:shadow-green-400/20",
        accent: "from-green-500/5 to-green-600/5",
        bg: "from-green-50 to-emerald-50"
      };
    default:
      return {
        badge: "bg-gray-200 text-gray-700",
        border: "border-gray-200 hover:border-gray-300",
        glow: "group-hover:shadow-gray-400/20",
        accent: "from-gray-500/5 to-gray-600/5",
        bg: "from-gray-50 to-slate-50"
      };
  }
};