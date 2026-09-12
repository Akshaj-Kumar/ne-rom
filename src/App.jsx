import React, { useRef } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import Hero from './components/Hero';
import LoveMessage from './components/LoveMessage';
import Reasons from './components/Reasons';
import FlirtyQuestions from './components/FlirtyQuestions';
import LoveTimeline from './components/LoveTimeline';
import Memories from './components/Memories';
import RomanticPuzzle from './components/RomanticPuzzle';
import LoveCounters from './components/LoveCounters';
import ChooseOne from './components/ChooseOne';
import EmotionalMessage from './components/EmotionalMessage';
import BigQuestion from './components/BigQuestion';
import LoveLetter from './components/LoveLetter';
import SurpriseModal from './components/SurpriseModal';
import FinalPromise from './components/FinalPromise';
import { Heart, Sparkles } from 'lucide-react';
import { loveData } from './config/loveData';

export default function App() {
  const loveMessageRef = useRef(null);

  const handleOpenHeart = () => {
    // Start playing background romantic music
    window.dispatchEvent(new CustomEvent('start-romantic-music'));

    const el = document.getElementById('love-message-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* 60fps Romantic Ambient Particle Engine */}
      <BackgroundParticles />

      {/* Floating Audio Controller */}
      <FloatingMusicPlayer />

      {/* Main Love Story Experience */}
      <main className="relative z-10">
        {/* 1 & 2: Landing Screen */}
        <Hero onOpenHeart={handleOpenHeart} />

        {/* 3: Personal Love Message ("Why Am I So Happy?") */}
        <LoveMessage />

        {/* 4: "You Are Special Because…" */}
        <Reasons />

        {/* 5 & 6: Interactive Flirty Questions & Elusive NO Button */}
        <FlirtyQuestions />

        {/* 7: "What I Love About You" Vertical Timeline */}
        <LoveTimeline />

        {/* 8: "Our Little World" Polaroid Gallery */}
        <Memories />

        {/* Romantic Photo Puzzle: "You Complete Me 🧩" */}
        <RomanticPuzzle />

        {/* 9: Love Counters (∞, 100%, 24/7, 1) */}
        <LoveCounters />

        {/* 10: Flirty "Choose One" Game */}
        <ChooseOne />

        {/* 11: Emotional Night Message */}
        <EmotionalMessage />

        {/* 12: Big Question ("Will you keep being my favourite person?") */}
        <BigQuestion />

        {/* 13: Final Handwritten Love Letter */}
        <LoveLetter />

        {/* 14: One Last Surprise Heartbeat Modal */}
        <SurpriseModal />

        {/* ❤️ Final Section — “Bas Tum Aur Main” */}
        <FinalPromise />
      </main>

      {/* Romantic Footer */}
      <footer className="relative z-10 py-12 px-4 text-center border-t border-rose-500/10">
        <div className="site-container flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-heartbeat" />
            <span className="font-serif italic text-pink-200 text-sm sm:text-base">
              Crafted with all my heart for {loveData.girlfriendName}
            </span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-heartbeat" />
          </div>

          <p className="text-xs text-pink-300/40 tracking-wider font-light">
            Forever & Always • Made by {loveData.boyfriendName}
          </p>
        </div>
      </footer>
    </div>
  );
}
