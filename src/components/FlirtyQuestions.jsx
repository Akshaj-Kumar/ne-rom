import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Smile, RotateCcw, CheckCircle2 } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function FlirtyQuestions() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = loveData.questions[currentIdx];

  // Playful dodging labels
  const dodgeLabels = [
    "NO 🙈",
    "Are you sure? 👀",
    "Think again 😭",
    "Nice try 😂",
    "You can't escape! 🏃‍♀️",
    "Okay okay… you win. ❤️"
  ];

  const currentNoLabel = dodgeLabels[Math.min(noHoverCount, dodgeLabels.length - 1)];

  // Trigger heart burst
  const triggerHeartBurst = () => {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.7 },
        colors: colors,
        shapes: ['circle']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.7 },
        colors: colors,
        shapes: ['circle']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Dodging behavior for Question 4 & Question 5 or playful questions
  const handleNoHover = () => {
    if (currentQ.dodgeNo) {
      const randomX = (Math.random() - 0.5) * 220;
      const randomY = (Math.random() - 0.5) * 160;
      setNoButtonPosition({ x: randomX, y: randomY });
      setNoHoverCount((prev) => prev + 1);
    }
  };

  const handleAnswer = (isYes) => {
    if (isYes) {
      if (currentQ.triggerHearts || currentQ.hugeHeart) {
        triggerHeartBurst();
      }
      setFeedback({
        isYes: true,
        text: currentQ.yesResponse,
        subtext: currentQ.yesSubtext || null,
        hugeHeart: currentQ.hugeHeart || false
      });
    } else {
      if (currentQ.dodgeNo && noHoverCount < 3) {
        handleNoHover();
        return;
      }
      setFeedback({
        isYes: false,
        text: currentQ.noResponse,
        subtext: null,
        hugeHeart: false
      });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoHoverCount(0);

    if (currentIdx < loveData.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
      triggerHeartBurst();
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setFeedback(null);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoHoverCount(0);
    setCompleted(false);
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="site-container max-w-2xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Smile className="w-4 h-4 text-pink-300" />
            <span>Interactive Truth Chamber</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Okay… Now Answer Honestly 😏❤️
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base">
            Careful, there is only one acceptable way out of these!
          </p>
        </motion.div>

        {/* Card Container */}
        <div className="glass-panel p-8 sm:p-12 relative min-h-[380px] flex flex-col justify-center items-center text-center shadow-2xl border border-rose-400/25">
          {!completed ? (
            <AnimatePresence mode="wait">
              {!feedback ? (
                /* Question View */
                <motion.div
                  key={`q-${currentIdx}`}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-1.5 mb-8">
                    {loveData.questions.map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentIdx
                            ? 'w-8 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                            : i < currentIdx
                            ? 'w-2 bg-rose-400/70'
                            : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs uppercase tracking-widest text-rose-300/80 mb-3 font-semibold">
                    Question {currentIdx + 1} of {loveData.questions.length}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-10 max-w-lg leading-relaxed">
                    "{currentQ.question}"
                  </h3>

                  {/* Buttons */}
                  <div className="relative flex flex-wrap items-center justify-center gap-5 w-full min-h-[70px]">
                    {/* YES Button */}
                    <button
                      onClick={() => handleAnswer(true)}
                      className="btn-love-primary text-base sm:text-lg px-8 py-3.5 rounded-full cursor-pointer z-10"
                    >
                      <Heart className="w-5 h-5 fill-white text-white" />
                      <span>YES ❤️</span>
                    </button>

                    {/* NO Button (With runaway dodge on hover/touch) */}
                    <motion.button
                      animate={{
                        x: noButtonPosition.x,
                        y: noButtonPosition.y
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoHover}
                      onClick={() => handleAnswer(false)}
                      className="btn-love-secondary text-base sm:text-lg px-7 py-3.5 rounded-full cursor-pointer transition-colors"
                    >
                      <span>{currentNoLabel}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Feedback View */
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center py-4"
                >
                  {/* Huge Animated Heart if Q5 */}
                  {feedback.hugeHeart ? (
                    <div className="mb-6 relative">
                      <Heart className="w-24 h-24 text-rose-500 fill-rose-500/90 animate-heartbeat drop-shadow-[0_0_35px_rgba(244,63,94,0.8)]" />
                    </div>
                  ) : feedback.isYes ? (
                    <div className="mb-4 p-4 rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/40">
                      <Heart className="w-10 h-10 fill-rose-400 text-rose-400 animate-bounce" />
                    </div>
                  ) : (
                    <div className="mb-4 p-4 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                      <Sparkles className="w-10 h-10" />
                    </div>
                  )}

                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 max-w-md">
                    {feedback.text}
                  </p>

                  {feedback.subtext && (
                    <p className="font-sans text-xl sm:text-2xl font-semibold gradient-text-love mb-6 animate-pulse">
                      {feedback.subtext}
                    </p>
                  )}

                  <button
                    onClick={handleNext}
                    className="btn-love-primary mt-6 text-base px-8 py-3 rounded-full cursor-pointer"
                  >
                    <span>
                      {currentIdx < loveData.questions.length - 1
                        ? 'Next Question ✨'
                        : 'See Results 💗'}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            /* Quiz Completed View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-6"
            >
              <div className="mb-4 p-4 rounded-full bg-rose-500/20 border border-rose-400/30">
                <CheckCircle2 className="w-12 h-12 text-rose-400" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                Passed With 100% Score! 💯
              </h3>
              <p className="text-pink-200/80 text-base sm:text-lg mb-8 max-w-md">
                You passed every single question with flying colors. As expected from my favourite girl in the whole wide world! ❤️
              </p>

              <button
                onClick={handleResetQuiz}
                className="btn-love-secondary text-sm px-6 py-2.5 rounded-full flex items-center gap-2 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again Just For Fun</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
