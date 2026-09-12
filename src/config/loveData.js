/**
 * ❤️ PERSONALIZATION CONFIGURATION
 * 
 * Update these values to personalize the website for your girlfriend!
 * Everything here dynamically reflects across all components, love letters,
 * questions, and surprises.
 */

export const loveData = {
  // Names & Nicknames
  girlfriendName: "My Queen", // Her real name (e.g. "Simran", "Aanya", "Priya")
  boyfriendName: "Akshaj",
  nickname: "Beautiful", // What you love calling her (e.g., "Cutie", "Bacha", "My Love", "Princess")
  
  // Landing Page Typed Lines
  hero: {
    greeting: "Hey Beautiful ❤️",
    tagline1: "I made something for you…",
    tagline2: "Because you're not just someone in my life…",
    tagline3: "…you're one of the reasons I smile every day. ❤️",
    ctaButton: "Open My Heart 💗"
  },

  // Section 3: "Why Am I So Happy?" Personal Message
  loveMessage: {
    title: "Why Am I So Happy?",
    subtitle: "A question I find myself answering every single day…",
    lines: [
      "Tum ho isliye main khush hoon.",
      "Tum ho isliye mujhe tension nahi hoti.",
      "Tumse baat hoti hai toh din automatically better ho jata hai.",
      "Tumhari smile meri favourite notification hai. 📱✨",
      "Tumhari presence hi mere liye kaafi hai.",
      "Aur sabse important…",
      "Main tumse bahut pyaar karta hoon. ❤️"
    ]
  },

  // Section 4: "You Are Special Because…"
  reasons: [
    { icon: "❤️", text: "You make me smile.", desc: "Even on days when I feel completely exhausted." },
    { icon: "🌸", text: "You make ordinary days feel special.", desc: "A simple hello from you turns the mundane into magic." },
    { icon: "🫶", text: "You understand me.", desc: "Without me having to explain every little thought." },
    { icon: "✨", text: "You make me feel lucky.", desc: "Like I somehow won the greatest jackpot in the universe." },
    { icon: "🥹", text: "You are my comfort person.", desc: "The safest haven where I can simply be myself." },
    { icon: "💗", text: "You make my world better.", desc: "Brighter, kinder, softer, and so full of love." }
  ],
  reasonsClosing: {
    lead: "And honestly…",
    sub: "I could keep writing this list forever."
  },

  // Section 5 & 6: Interactive Flirty Questions
  questions: [
    {
      id: 1,
      question: "Do you know how beautiful you are?",
      yesResponse: "Good. At least you know what I see every day. 😌❤️",
      noResponse: "Wrong answer. Please try again, beautiful. 😏",
      dodgeNo: false
    },
    {
      id: 2,
      question: "Do you think you're my favourite person?",
      yesResponse: "Correct answer. You get one forehead kiss. 😘",
      noResponse: "Excuse me?! System error detected. 😂❤️",
      dodgeNo: false
    },
    {
      id: 3,
      question: "Do you know that your smile can fix my mood?",
      yesResponse: "Exactly. Now smile for me. ❤️",
      noResponse: "Then I guess I'll have to explain it with 100 more compliments. 😌",
      dodgeNo: false
    },
    {
      id: 4,
      question: "Would you choose me again?",
      yesResponse: "And I'd choose you. Again. And again. And again. ❤️",
      noResponse: "Nice try 😂 You can't escape this question.",
      dodgeNo: true, // Playful runaway button
      triggerHearts: true
    },
    {
      id: 5,
      question: "Do you love me?",
      yesResponse: "I KNEW IT. 😭❤️",
      yesSubtext: "But just so we're clear… I LOVE YOU MORE.",
      noResponse: "Hmm… I don't believe you. Try again. 😏",
      dodgeNo: true, // Playful runaway button
      hugeHeart: true
    }
  ],

  // Section 7: "What I Love About You" Vertical Timeline
  timeline: [
    {
      title: "Your Smile",
      badge: "Pure Sunshine ☀️",
      quote: "Because somehow your smile makes everything feel lighter."
    },
    {
      title: "Your Voice",
      badge: "My Favourite Sound 🎧",
      quote: "Because hearing you can instantly make my day better."
    },
    {
      title: "Your Heart",
      badge: "Pure & Golden ✨",
      quote: "Because you're beautiful from the inside too."
    },
    {
      title: "Your Little Habits",
      badge: "The Cutest Things 🥹",
      quote: "Even the tiny things you don't notice… I notice them."
    },
    {
      title: "Your Presence",
      badge: "Peace & Calm 🕊️",
      quote: "Because sometimes you don't even have to say anything. Just being there is enough."
    }
  ],

  // Section 8: "Our Little World" Memories
  memories: {
    heading: "If I Could Keep One Thing Forever…",
    reveal: "It would be us. ❤️",
    gallery: [
      {
        id: 1,
        title: "That Sweet Smile",
        tag: "My Favourite View",
        date: "Unforgettable",
        caption: "The way you look at me with that gentle smile makes my whole heart melt.",
        image: "/assets/photos/photo1.jpg",
        placeholderColor: "from-pink-400 to-rose-400"
      },
      {
        id: 2,
        title: "By Your Side Always",
        tag: "Us Together",
        date: "Our Dates",
        caption: "Standing with you is the only place in the world where I truly belong.",
        image: "/assets/photos/photo2.jpg",
        placeholderColor: "from-purple-400 to-indigo-400"
      },
      {
        id: 3,
        title: "Our Crazy & Silly Moments",
        tag: "Pure Laughter 😂❤️",
        date: "Never A Dull Day",
        caption: "The teasing, the laughter, the madness... I wouldn't trade our craziness for anything.",
        image: "/assets/photos/photo3.jpg",
        placeholderColor: "from-rose-400 to-red-400"
      },
      {
        id: 4,
        title: "You & Me, Always",
        tag: "My Whole Heart",
        date: "Forever",
        caption: "Even if the whole world turns upside down, as long as you're with me, everything is perfect.",
        image: "/assets/photos/photo4.jpg",
        placeholderColor: "from-amber-400 to-pink-400"
      }
    ]
  },

  // Romantic Photo Puzzle Game
  puzzle: {
    heading: "You Complete Me 🧩❤️",
    subheading: "Can you piece together our favourite memory?",
    image: "/assets/photos/photo4.jpg",
    loveQuote: "Just like every piece found its place, you fit into my life like the missing piece of my soul. You complete my world. ❤️"
  },

  // Section 9: Love Counter
  counters: [
    { value: "∞", label: "Reasons I love you", sub: "And counting every second" },
    { value: "100%", label: "My favourite person", sub: "Undisputed champion of my heart" },
    { value: "24/7", label: "Thinking about you", sub: "Rent-free in my mind always" },
    { value: "1", label: "Girl who has my heart", sub: "Only you, forever ❤️" }
  ],

  // Section 10: Flirty "Choose One" Game
  chooseOne: {
    question: "What should I give you right now?",
    options: [
      {
        id: "kiss",
        icon: "💋",
        label: "A Kiss",
        response: "Coming right up… but don't blame me if one turns into ten. 😏❤️"
      },
      {
        id: "hug",
        icon: "🤗",
        label: "A Hug",
        response: "The kind where I don't let go for a very long time. 🫶"
      },
      {
        id: "flowers",
        icon: "🌹",
        label: "Flowers",
        response: "Still not as pretty as you. 🌸"
      },
      {
        id: "chocolate",
        icon: "🍫",
        label: "Chocolate",
        response: "Sweet choice… almost as sweet as you. 🍫✨"
      },
      {
        id: "all",
        icon: "❤️",
        label: "All of the above",
        response: "Smart girl. You know exactly what you want. 😌"
      }
    ]
  },

  // Section 11: Emotional Message
  emotional: {
    badge: "From the bottom of my heart",
    heading: "One Serious Thing…",
    paragraphs: [
      "Life can be stressful.",
      "Things don't always go according to plan.",
      "But knowing that I have you makes everything feel a little easier.",
      "You are my comfort.",
      "My happiness.",
      "My favourite person.",
      "And someone I never want to take for granted."
    ],
    closing: "Thank you for being you. ❤️"
  },

  // Section 12: Big Question
  bigQuestion: {
    intro: "So… I have one last question.",
    question: "Will you keep being my favourite person? ❤️",
    options: [
      {
        id: "yes",
        label: "YES ❤️",
        title: "I KNEW IT ❤️",
        sub: "Now you're stuck with me. 😌"
      },
      {
        id: "always",
        label: "ALWAYS 🥹",
        title: "THAT'S MY GIRL ❤️🥹",
        sub: "Come here, you deserve the biggest hug."
      }
    ]
  },

  // Section 13: Final Handwritten Love Letter
  loveLetter: {
    title: "A Little Letter For You 💌",
    salutation: "My love,",
    body: [
      "I don't know if words will ever be enough to explain what you mean to me.",
      "But I want you to know one thing:",
      "I'm genuinely happier because you exist in my life.",
      "You make my bad days easier, my good days better, and my ordinary moments special.",
      "I love talking to you.",
      "I love seeing you smile.",
      "I love annoying you.",
      "I love making you laugh.",
      "And honestly…",
      "I just love you.",
      "No complicated reason.",
      "No perfect explanation.",
      "Just you."
    ],
    closing: "Always yours,",
    signature: "Akshaj ❤️"
  },

  // Section 14: Surprise Modal / Heartbeat
  surprise: {
    triggerButton: "One Last Surprise 🎁",
    lines: [
      "If you ever forget how special you are…",
      "Come back here.",
      "I'll remind you. ❤️"
    ],
    footer: "I love you more than I can put into a website."
  },

  // ❤️ Final Section — “Bas Tum Aur Main”
  finalPromise: {
    badge: "❤️ Final Section",
    title: "Bas Tum Aur Main",
    image: "/assets/photos/forever-us.jpg",
    lines: [
      "Chahe duniya ko samjhane mein thoda waqt lage,",
      "hum sabko mana lenge… aur pyaar se mana lenge. ❤️",
      "Bas tum mera haath pakad ke rehna,",
      "baaki sab main sambhaal lunga… meri Rasmalai. 😘❤️"
    ]
  },

  // Music Settings
  music: {
    audioSrc: "/assets/romantic-music.mp3",
    youtubeVideoId: "enidMo5izlE",
    trackName: "Our Special Song ❤️"
  }
};
