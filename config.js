/**
 * =============================================================================
 * THE GAMING ARENA - CENTRAL BUSINESS CONFIGURATION
 * =============================================================================
 * Edit your café information here in ONE place!
 * Updating these values will automatically update every section of the website:
 * hero buttons, prices, tournament details, contact numbers, maps, opening hours,
 * and WhatsApp message triggers.
 * =============================================================================
 */

const ARENA_CONFIG = {
  // --- BRAND & HERO ---
  brand: {
    name: "The Gaming Arena",
    shortName: "TGA",
    tagline: "Play. Compete. Enjoy.",
    subtitle: "Your local gaming destination for PlayStation, Tekken and competitive gaming.",
    establishedYear: 2026,
  },

  // --- CONTACT & SOCIAL (Update these with your real details) ---
  contact: {
    // Exact Address (Do NOT invent an address; replace this placeholder with your real location)
    address: "Shop No 1, near Lal Bhag Colony Road, Sector 6, Avas Vikas Colony, Lohamandi, Agra, Uttar Pradesh 282007",
    addressShort: "AGRA / SECTOR 6]",

    // Phone number for direct phone calls (e.g., "+919876543210")
    phone: "6397551518",
    phoneDisplay: "6397551518",

    // WhatsApp number with country code, no symbols (e.g., "919876543210")
    whatsapp: "6397551518",
    whatsappDisplay: "6397551518",
    whatsappDefaultMessage: "Hi The Gaming Arena! I'd like to ask about station availability, game prices, or tournaments.",

    // Instagram username / URL (e.g., "https://instagram.com/thegamingarena" or username)
    instagram: "https://www.instagram.com/thegamingarenaaa?igsi=YWI4Ym1sdGJ0ZTl3",
    instagramHandle: "https://www.instagram.com/thegamingarenaaa?igsi=YWI4Ym1sdGJ0ZTl3",

    // Optional email
    email: "contact@thegamingarena.com",
  },

  // --- OPENING HOURS (Used for display and real-time open/closed status indicator) ---
  openingHours: {
    displayDays: "Tuesday – Sunday (Monday Closed)",
    displayTime: "11:00 AM – 10:00 PM",
    // Days of week closed: 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
    closedDays: [1],
    // 24-hour format integers for real-time calculation:
    openHour24: 11,
    closeHour24: 22,
    timezone: "Asia/Kolkata",
    counterNote: "Last station check-in is at 9:30 PM. Walk-ins welcome Tuesday to Sunday!",
  },

  // --- GAME PRICES ---
  pricing: {
    currencySymbol: "₹",
    ps5: {
      title: "PS5 Console",
      rate: 50,
      period: "/ hour",
      badge: "Next-Gen 4K 120Hz",
      highlights: [
        "Premium 4K ultra-smooth display",
        "DualSense haptic feedback controllers",
        "1 to 4 players multiplayer support",
        "Latest trending titles installed"
      ],
      popular: true,
    },
    ps4: {
      title: "PS4 Console",
      rate: 50,
      period: "/ hour",
      badge: "Massive Game Vault",
      highlights: [
        "Huge library of beloved games",
        "Local co-op & multiplayer matches",
        "Clean, responsive DualShock controllers",
        "Perfect for friendly party battles"
      ],
      popular: false,
    },
    tekken: {
      title: "Tekken & Arcade Fighting",
      subtitle: "Arcade-Style Coin Bundles",
      badge: "Pure Competitive Thrill",
      packages: [
        { price: 10, coins: 6, label: "Starter Pack", perCoin: "₹1.66 / coin", popular: false },
        { price: 20, coins: 12, label: "Fighter Pack", perCoin: "₹1.66 / coin", popular: false },
        { price: 50, coins: 30, label: "Brawler Pack", perCoin: "₹1.66 / coin", popular: true, tag: "MOST POPULAR" },
        { price: 100, coins: 60, label: "Arcade Champion", perCoin: "₹1.66 / coin", popular: false, tag: "BEST VALUE" }
      ],
      highlights: [
        "Authentic arcade fighting experience",
        "Zero-delay input monitors",
        "King-of-the-hill 1v1 challenges",
        "Arcade fight sticks & controller options"
      ]
    },
    counterNote: "Ask at the counter for current offers, combo passes and tournament pricing."
  },

  // --- GOOGLE MAPS SETTINGS ---
  // When you have your Google Maps Embed link or location coordinates, paste here:
  maps: {
    // If you have a Google Maps embed iframe src, paste it here.
    // Default fallback shows an interactive search query embed for the address:
    embedUrl: "https://maps.google.com/maps?q=[Shop No 1, near Lal Bhag Colony Road, Sector 6, Avas Vikas Colony, Lohamandi, Agra, Uttar Pradesh 282007]&t=&z=15&ie=UTF8&iwloc=&output=embed",
    // Link for the "Get Directions" button:
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=[Shop No 1, near Lal Bhag Colony Road, Sector 6, Avas Vikas Colony, Lohamandi, Agra, Uttar Pradesh 282007]"
  },

  // --- UPCOMING TOURNAMENTS ---
  tournaments: [
    {
      id: "tekken-king",
      title: "Tekken 8 Arena King",
      game: "Tekken 8",
      category: "Fighting",
      date: "Upcoming Saturday",
      time: "5:00 PM onwards",
      entryFee: "₹100",
      prizePool: "₹2,500 Cash + Arena Champion Trophy",
      format: "1v1 Double Elimination Bracket",
      seatsLeft: "8 Slots Open",
      status: "Registration Open",
      badgeColor: "cyan"
    },
    {
      id: "fc25-cup",
      title: "EA SPORTS FC Showdown",
      game: "EA SPORTS FC",
      category: "Sports",
      date: "Upcoming Sunday",
      time: "4:00 PM onwards",
      entryFee: "₹150",
      prizePool: "₹3,500 Cash + Free Game Hours Pass",
      format: "1v1 Knockout Tournament",
      seatsLeft: "6 Slots Open",
      status: "Registration Open",
      badgeColor: "purple"
    },
    {
      id: "mk-fatal",
      title: "Mortal Kombat Fatality Clash",
      game: "Mortal Kombat 1",
      category: "Fighting",
      date: "Next Weekend",
      time: "6:00 PM onwards",
      entryFee: "₹100",
      prizePool: "₹2,000 Cash + 60 Arcade Coins",
      format: "Best of 3 Sets",
      seatsLeft: "10 Slots Open",
      status: "Registration Open",
      badgeColor: "green"
    }
  ],

  // --- POPULAR GAMES CATALOG ---
  gamesCatalog: [
    {
      id: 1,
      title: "EA SPORTS FC 25 / FC 24",
      categories: ["ps5", "ps4", "sports", "multiplayer"],
      genre: "Sports / Football",
      players: "1 - 4 Players",
      platform: "PS5 & PS4",
      tag: "Best for 1v1 & 2v2",
      badge: "⚽ Top Pick",
      coverGradient: "linear-gradient(135deg, #0d3b66 0%, #00f0ff 100%)",
      icon: "⚽"
    },
    {
      id: 2,
      title: "Tekken 8",
      categories: ["ps5", "fighting", "multiplayer"],
      genre: "3D Fighting / Arcade",
      players: "1v1 Intense Battles",
      platform: "PS5 & Arcade Corner",
      tag: "Arcade Classic",
      badge: "🥊 Fan Favorite",
      coverGradient: "linear-gradient(135deg, #7b1113 0%, #ff4500 100%)",
      icon: "🥊"
    },
    {
      id: 3,
      title: "Tekken 7",
      categories: ["ps4", "fighting", "multiplayer"],
      genre: "Fighting / Competitive",
      players: "1v1 Fighting",
      platform: "PS4 & Arcade",
      tag: "Pure Skill",
      badge: "💥 Tournament Classic",
      coverGradient: "linear-gradient(135deg, #4a0e4e 0%, #b5179e 100%)",
      icon: "🥋"
    },
    {
      id: 4,
      title: "Grand Theft Auto V",
      categories: ["ps5", "ps4", "multiplayer"],
      genre: "Action / Open World",
      players: "Single / Online Co-op",
      platform: "PS5 & PS4",
      tag: "Los Santos Mayhem",
      badge: "🚗 Legend",
      coverGradient: "linear-gradient(135deg, #1b4332 0%, #52b788 100%)",
      icon: "🚗"
    },
    {
      id: 5,
      title: "Mortal Kombat 1",
      categories: ["ps5", "fighting", "multiplayer"],
      genre: "Fighting / Brutal Combat",
      players: "1v1 Local Versus",
      platform: "PS5",
      tag: "Fatalities Unleashed",
      badge: "🩸 1v1 Showdown",
      coverGradient: "linear-gradient(135deg, #851818 0%, #e63946 100%)",
      icon: "🐉"
    },
    {
      id: 6,
      title: "Call of Duty: Modern Warfare III",
      categories: ["ps5", "ps4", "multiplayer"],
      genre: "First Person Shooter",
      players: "Multiplayer / Warzone",
      platform: "PS5 & PS4",
      tag: "Tactical FPS Action",
      badge: "🎯 Tactical",
      coverGradient: "linear-gradient(135deg, #242424 0%, #3f51b5 100%)",
      icon: "🎯"
    },
    {
      id: 7,
      title: "Fortnite",
      categories: ["ps5", "ps4", "multiplayer"],
      genre: "Battle Royale",
      players: "Squads / Duos",
      platform: "PS5 & PS4",
      tag: "Victory Royale",
      badge: "🔥 Squad Up",
      coverGradient: "linear-gradient(135deg, #5c2d91 0%, #00d2ff 100%)",
      icon: "⚡"
    },
    {
      id: 8,
      title: "WWE 2K24",
      categories: ["ps5", "ps4", "sports", "fighting", "multiplayer"],
      genre: "Wrestling / Sports",
      players: "1 - 4 Players",
      platform: "PS5 & PS4",
      tag: "Royal Rumble Chaos",
      badge: "🏆 Party Hit",
      coverGradient: "linear-gradient(135deg, #780000 0%, #c1121f 100%)",
      icon: "🏆"
    },
    {
      id: 9,
      title: "Rocket League",
      categories: ["ps5", "ps4", "sports", "multiplayer"],
      genre: "Vehicular Soccer",
      players: "1 - 4 Players Split-Screen",
      platform: "PS5 & PS4",
      tag: "Fast-Paced Goal Action",
      badge: "🚀 High Flying",
      coverGradient: "linear-gradient(135deg, #003049 0%, #f77f00 100%)",
      icon: "🚀"
    },
    {
      id: 10,
      title: "Minecraft",
      categories: ["ps5", "ps4", "multiplayer"],
      genre: "Sandbox / Survival",
      players: "1 - 4 Players Split-Screen",
      platform: "PS5 & PS4",
      tag: "Build, Mine & Survive",
      badge: "🧱 Chill Session",
      coverGradient: "linear-gradient(135deg, #2d6a4f 0%, #74c69d 100%)",
      icon: "⛏️"
    },
    {
      id: 11,
      title: "Marvel's Spider-Man 2",
      categories: ["ps5"],
      genre: "Action / Adventure",
      players: "1 Player",
      platform: "PS5 Exclusive",
      tag: "Next-Gen Visual Marvel",
      badge: "🕷️ Marvel Hit",
      coverGradient: "linear-gradient(135deg, #990000 0%, #0044cc 100%)",
      icon: "🕷️"
    },
    {
      id: 12,
      title: "Street Fighter 6",
      categories: ["ps5", "fighting", "multiplayer"],
      genre: "Fighting / Drive Impact",
      players: "1v1 Combat",
      platform: "PS5",
      tag: "Hyped 1v1 Bouts",
      badge: "🥋 Fighting Legend",
      coverGradient: "linear-gradient(135deg, #3a0ca3 0%, #4cc9f0 100%)",
      icon: "👊"
    }
  ],

  // --- GALLERY IMAGES & CATEGORIES ---
  // Users can easily substitute these with real café photos by putting image paths in assets/
  gallery: [
    {
      title: "PS5 Pro Lounge Station",
      category: "setups",
      description: "4K ultra-low latency curved displays and ergonomic gaming seating.",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #0f172a, #1e1b4b)"
    },
    {
      title: "Tekken Arcade & Fight Stick Arena",
      category: "arcade",
      description: "Dedicated 1v1 battle station equipped for lightning-quick combos.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #2b0938, #581c87)"
    },
    {
      title: "Multiplayer Squad Session",
      category: "players",
      description: "Friends locked into a heated 4-player football clash.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #09203f, #537895)"
    },
    {
      title: "PS4 Multiplayer Vault",
      category: "setups",
      description: "Cozy co-op console station loaded with hundreds of games.",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #111827, #1f2937)"
    },
    {
      title: "Tournament Final Showdown",
      category: "tournaments",
      description: "Crowd cheering during the Tekken King weekend finals.",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #1e1b4b, #312e81)"
    },
    {
      title: "Café Chill Zone & Ambient Neon Lights",
      category: "interior",
      description: "Premium cyberpunk lighting, air conditioning, cold drinks and gaming vibes.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      fallbackGradient: "linear-gradient(135deg, #0b0f19, #022c43)"
    }
  ],

  // --- FREQUENTLY ASKED QUESTIONS (CSSUI Accordion) ---
  faq: [
    {
      q: "Can I bring my own controller or fight stick?",
      a: "Yes, absolutely! You are welcome to plug in your own personal DualSense, DualShock, or arcade fight stick at any of our PlayStation 5, PS4, or arcade stations."
    },
    {
      q: "How do the Tekken arcade coins work?",
      a: "Our Tekken fighting cabinets operate with arcade tokens! Tokens start at just ₹10 for 6 coins. Each coin grants full match credits for intense 1v1 bouts."
    },
    {
      q: "Can we book multiple consoles for a squad session or birthday party?",
      a: "Yes! We regularly host squad gaming sessions and party bookings. Contact us on WhatsApp in advance to lock in your preferred consoles and seating."
    },
    {
      q: "Are the games updated with the latest seasons and DLCs?",
      a: "All installed titles including EA SPORTS FC 25, Tekken 8, Mortal Kombat 1, and Call of Duty are kept fully up to date with the latest rosters, seasons, and patches."
    },
    {
      q: "How do I register for weekend tournaments?",
      a: "Browse the 'Ready to Compete?' section below and click 'Join Tournament' to submit your gamer details, or message us directly on WhatsApp."
    }
  ]
};

// Export to window so any script can reference ARENA_CONFIG cleanly
if (typeof window !== "undefined") {
  window.ARENA_CONFIG = ARENA_CONFIG;
}
