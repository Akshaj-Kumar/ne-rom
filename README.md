# 💕 For My Girlfriend - A Romantic Digital Love Story

A romantic, cinematic, and interactive single-page love website dedicated to my girlfriend.

> *«“Tum ho isliye main khush hoon. Tum ho isliye mujhe tension nahi hoti. Tum meri life ka woh beautiful part ho jiske bina sab kuch incomplete lagta hai. Main tumse bahut pyaar karta hoon.”»*

---

## ✨ Features

- **Cinematic Landing Screen**: Floating hearts, glowing sparkles, animated typewriter intro, and glowing *"Open My Heart 💗"* button.
- **Heartfelt Love Message**: Hindi & English message with line-by-line blur-to-clear reveal animations (*"Why Am I So Happy?"*).
- **"You Are Special Because…"**: Staggered glassmorphic cards deck highlighting her uniqueness.
- **Flirty Interactive Questions**: 5 playful questions with humorous reactions, forehead kisses, system errors, and heart explosions.
- **Playful Dodging "NO" Button**: Playfully bounces and dodges the cursor with humorous responses (*"Are you sure? 👀"* → *"Think again 😭"* → *"Nice try 😂"*).
- **Romantic Vertical Timeline**: *"What I Love About You"* featuring her smile, voice, heart, habits, and presence.
- **"Our Little World" Polaroid Gallery**: Nostalgic Polaroid photo cards with washi tape accents, dates, and captions.
- **Love Counter**: Viewport-triggered statistics (*∞ Reasons I love you*, *100% My favourite person*, *24/7 Thinking about you*, *1 Girl who has my heart*).
- **Flirty "Choose One" Game**: Interactive gift selector (*Kiss*, *Hug*, *Flowers*, *Chocolate*, *All of the above*) with instant cheeky reactions.
- **Nocturnal Emotional Message**: Deep romantic gradient with slow, meaningful reflections (*"One Serious Thing…"*)
- **The Big Question**: Cinematic starry night asking *"Will you keep being my favourite person? ❤️"* with confetti fireworks.
- **Handwritten Love Letter**: Parchment style letter card with wax seal and cursive typography (*Dancing Script*).
- **One Last Surprise 🎁**: Fullscreen dark cinema mode with pulsating heartbeat animation, audio simulation, and eternal promise.
- **Ambient Floating Music Player**: Plays `/assets/romantic-music.mp3` or falls back to an integrated Web Audio ambient lullaby chime.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for production (optional)
```bash
npm run build
```

---

## ❤️ Easy Personalization

All customization is handled in a single file:  
📁 [`src/config/loveData.js`](src/config/loveData.js)

### Change Names & Nicknames:
```javascript
export const loveData = {
  girlfriendName: "HER NAME", // e.g., "Aanya", "Simran", "Priya"
  boyfriendName: "AKSHAJ",
  nickname: "MY LOVE",        // e.g., "Cutie", "Princess", "Bacha"
  ...
}
```

### Add Her Photos:
1. Copy her photos into:  
   📁 `public/assets/photos/`  
   *(e.g. `pic1.jpg`, `pic2.jpg`, etc.)*
2. In `src/config/loveData.js`, under `memories.gallery`, set:
   ```javascript
   image: "/assets/photos/pic1.jpg"
   ```
*(Until you add photos, the website displays romantic illustrated placeholder polaroids so it looks beautiful out of the box).*

### Add Your Romantic Song:
1. Place any MP3 audio file into:  
   📁 `public/assets/romantic-music.mp3`
2. That's it! The floating music button will automatically play your song. If no song is provided, the website smoothly plays a built-in gentle music-box melody so the button never fails.

---

## 📱 Mobile Experience
Fully optimized for mobile touch screens, tablets, laptops, and desktops. Includes touch-friendly dodging interactions, responsive typography, and smooth glassmorphic aesthetics.
