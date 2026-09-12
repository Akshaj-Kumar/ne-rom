import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, Eye, Wand2, CheckCircle, Move } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function RomanticPuzzle() {
  const [tiles, setTiles] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [hoveredDropIdx, setHoveredDropIdx] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const [moves, setMoves] = useState(0);

  // Touch drag state
  const [touchDragPos, setTouchDragPos] = useState(null);
  const gridContainerRef = useRef(null);

  const puzzleImage = loveData.puzzle?.image || '/assets/photos/photo4.jpg';

  // Shuffle tiles into a solvable, fun arrangement
  const shuffleTiles = () => {
    // Scrambled so it takes 3-6 satisfying swaps/drags to solve
    const shuffled = [3, 4, 7, 0, 1, 8, 6, 2, 5];
    setTiles(shuffled);
    setSelectedIdx(null);
    setDraggedIdx(null);
    setHoveredDropIdx(null);
    setIsCompleted(false);
    setMoves(0);
  };

  useEffect(() => {
    shuffleTiles();
  }, []);

  const checkSolved = (currentTiles) => {
    return currentTiles.every((val, idx) => val === idx);
  };

  // Perform swap between two tile positions
  const performSwap = (fromPos, toPos) => {
    if (fromPos === toPos || fromPos === null || toPos === null) return;

    const newTiles = [...tiles];
    const temp = newTiles[fromPos];
    newTiles[fromPos] = newTiles[toPos];
    newTiles[toPos] = temp;

    setTiles(newTiles);
    setSelectedIdx(null);
    setDraggedIdx(null);
    setHoveredDropIdx(null);
    setMoves((m) => m + 1);

    if (checkSolved(newTiles)) {
      setIsCompleted(true);
      triggerGrandCelebration();
    }
  };

  // Click-to-swap fallback
  const handleTileClick = (index) => {
    if (isCompleted || draggedIdx !== null) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else if (selectedIdx === index) {
      setSelectedIdx(null);
    } else {
      performSwap(selectedIdx, index);
    }
  };

  // HTML5 Desktop Drag Handlers
  const handleDragStart = (e, index) => {
    if (isCompleted) return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (hoveredDropIdx !== index) {
      setHoveredDropIdx(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (hoveredDropIdx === index) {
      setHoveredDropIdx(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = draggedIdx !== null ? draggedIdx : parseInt(e.dataTransfer.getData('text/plain'), 10);
    performSwap(sourceIndex, targetIndex);
    setDraggedIdx(null);
    setHoveredDropIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setHoveredDropIdx(null);
  };

  // Mobile Touch Drag Handlers
  const handleTouchStart = (e, index) => {
    if (isCompleted) return;
    const touch = e.touches[0];
    setDraggedIdx(index);
    setTouchDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (draggedIdx === null) return;
    const touch = e.touches[0];
    setTouchDragPos({ x: touch.clientX, y: touch.clientY });

    // Detect tile element under current finger position
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const slotElement = targetElement ? targetElement.closest('[data-puzzle-slot]') : null;

    if (slotElement) {
      const targetPos = parseInt(slotElement.getAttribute('data-puzzle-slot'), 10);
      if (!isNaN(targetPos) && targetPos !== hoveredDropIdx) {
        setHoveredDropIdx(targetPos);
      }
    } else {
      setHoveredDropIdx(null);
    }
  };

  const handleTouchEnd = () => {
    if (draggedIdx !== null && hoveredDropIdx !== null && draggedIdx !== hoveredDropIdx) {
      performSwap(draggedIdx, hoveredDropIdx);
    }
    setDraggedIdx(null);
    setHoveredDropIdx(null);
    setTouchDragPos(null);
  };

  // Auto-solve helper
  const handleAutoSolve = () => {
    setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSelectedIdx(null);
    setDraggedIdx(null);
    setHoveredDropIdx(null);
    setIsCompleted(true);
    triggerGrandCelebration();
  };

  const triggerGrandCelebration = () => {
    confetti({
      particleCount: 85,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a', '#ffffff']
    });
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden select-none">
      <div className="site-container max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Move className="w-4 h-4 text-pink-300" />
            <span>Drag & Drop Romantic Puzzle</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {loveData.puzzle?.heading || "You Complete Me 🧩❤️"}
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
            Drag the puzzle pieces and drop them into place to reunite us!
          </p>
        </motion.div>

        {/* Puzzle Board Area */}
        <div className="flex flex-col items-center">
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 w-full max-w-md mb-4 px-2 text-xs sm:text-sm">
            <div className="text-pink-200/80 font-medium flex items-center gap-2">
              <span>Moves:</span>
              <span className="text-rose-400 font-bold text-base px-2 py-0.5 rounded-md bg-white/10">{moves}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPeek((p) => !p)}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                  showPeek
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                    : 'bg-white/10 text-pink-200 border-white/20 hover:bg-white/20'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPeek ? 'Hide Hint' : 'Peek At Us 👀'}</span>
              </button>

              <button
                onClick={shuffleTiles}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Shuffle tiles again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Shuffle 🔀</span>
              </button>
            </div>
          </div>

          {/* Puzzle Frame Container */}
          <div 
            ref={gridContainerRef}
            className="relative p-3.5 sm:p-4 rounded-3xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-rose-400/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-w-md w-full aspect-square"
          >
            {/* The 3x3 Grid */}
            <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2 rounded-2xl overflow-hidden bg-black/50 p-1">
              {tiles.map((pieceNumber, gridPos) => {
                const row = Math.floor(pieceNumber / 3);
                const col = pieceNumber % 3;
                const isSelected = selectedIdx === gridPos;
                const isDragging = draggedIdx === gridPos;
                const isHoveredTarget = hoveredDropIdx === gridPos && draggedIdx !== gridPos;
                const isCorrect = pieceNumber === gridPos;

                return (
                  <div
                    key={gridPos}
                    data-puzzle-slot={gridPos}
                    draggable={!isCompleted}
                    onDragStart={(e) => handleDragStart(e, gridPos)}
                    onDragOver={(e) => handleDragOver(e, gridPos)}
                    onDragLeave={(e) => handleDragLeave(e, gridPos)}
                    onDrop={(e) => handleDrop(e, gridPos)}
                    onDragEnd={handleDragEnd}
                    onTouchStart={(e) => handleTouchStart(e, gridPos)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => handleTileClick(gridPos)}
                    className={`relative w-full h-full cursor-grab active:cursor-grabbing transition-all duration-200 rounded-xl overflow-hidden shadow-md touch-none ${
                      isHoveredTarget
                        ? 'ring-4 ring-rose-400 scale-105 z-20 shadow-[0_0_25px_rgba(244,63,94,0.9)] bg-rose-500/20'
                        : isSelected
                        ? 'ring-4 ring-rose-400 z-10 scale-95 shadow-[0_0_20px_rgba(244,63,94,0.8)]'
                        : isCorrect && !isCompleted
                        ? 'border-2 border-rose-400/50'
                        : 'border border-white/25 hover:border-white/50'
                    } ${isDragging ? 'opacity-40 scale-90' : 'opacity-100'}`}
                    style={{
                      backgroundImage: `url(${puzzleImage})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${(col / 2) * 100}% ${(row / 2) * 100}%`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Hover Drop Indicator Overlay */}
                    {isHoveredTarget && (
                      <div className="absolute inset-0 bg-rose-500/35 backdrop-blur-[1px] flex flex-col items-center justify-center text-white text-xs font-bold gap-1 animate-pulse">
                        <Heart className="w-5 h-5 fill-white text-white" />
                        <span>Drop Here!</span>
                      </div>
                    )}

                    {/* Selected Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white fill-white animate-ping" />
                      </div>
                    )}

                    {/* Subtle Correct Spot Indicator Dot */}
                    {isCorrect && !isCompleted && !isHoveredTarget && (
                      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185] border border-white/60" />
                    )}

                    {/* Subtle Drag Handle Icon on Hover (Desktop) */}
                    {!isCompleted && !isHoveredTarget && (
                      <div className="absolute bottom-1 right-1 opacity-0 hover:opacity-100 sm:group-hover:opacity-100 transition-opacity p-1 bg-black/50 rounded text-white/70">
                        <Move className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Touch Drag Floating Ghost Preview */}
            {touchDragPos && draggedIdx !== null && (
              <div
                className="fixed pointer-events-none z-50 w-24 h-24 rounded-xl border-2 border-rose-400 shadow-2xl overflow-hidden opacity-90 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: touchDragPos.x,
                  top: touchDragPos.y - 20,
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${((tiles[draggedIdx] % 3) / 2) * 100}% ${
                    (Math.floor(tiles[draggedIdx] / 3) / 2) * 100
                  }%`
                }}
              />
            )}

            {/* "Peek at Us" Overlay */}
            <AnimatePresence>
              {showPeek && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-3.5 sm:inset-4 rounded-2xl overflow-hidden z-20 pointer-events-none border-2 border-rose-400"
                >
                  <img
                    src={puzzleImage}
                    alt="Original us"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-medium shadow-lg">
                    Full Picture Hint ✨
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick "Kiss Me Instead / Auto-solve" Helper */}
          {!isCompleted && (
            <button
              onClick={handleAutoSolve}
              className="mt-4 text-xs text-pink-300/70 hover:text-rose-300 flex items-center gap-1.5 py-1.5 px-4 rounded-full hover:bg-white/5 transition-all cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Too hard? Kiss me instead to auto-solve 😘</span>
            </button>
          )}

          {/* Completed Romantic Message Card */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 sm:p-8 glass-panel rounded-3xl max-w-lg text-center border border-rose-400/40 shadow-2xl relative overflow-hidden bg-black/60"
              >
                <div className="flex items-center justify-center gap-2 text-rose-400 mb-3">
                  <CheckCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-xs uppercase tracking-widest font-bold">Puzzle Complete!</span>
                  <CheckCircle className="w-5 h-5 text-rose-400" />
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-white mb-4 leading-relaxed">
                  "{loveData.puzzle?.loveQuote || "Just like every piece found its place, you fit into my life like the missing piece of my soul. You complete my world. ❤️"}"
                </p>

                <p className="text-xs text-pink-300/80 font-sans mb-4">
                  Solved in <span className="font-bold text-rose-300">{moves}</span> moves • Every piece belongs with you 🔐❤️
                </p>

                <button
                  onClick={shuffleTiles}
                  className="btn-love-primary text-xs px-6 py-2.5 rounded-full cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
