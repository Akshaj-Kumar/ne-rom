import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [useFallbackAudio, setUseFallbackAudio] = useState(false);
  const ytPlayerRef = useRef(null);
  const localAudioRef = useRef(null);

  const videoId = loveData.music?.youtubeVideoId || 'enidMo5izlE';

  // Load YouTube IFrame API
  useEffect(() => {
    // If YouTube API script is not yet added, inject it
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      try {
        if (!window.YT || !window.YT.Player) return;
        
        ytPlayerRef.current = new window.YT.Player('yt-bg-player', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              try {
                event.target.setVolume(75);
              } catch (e) {}
            },
            onStateChange: (event) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
            onError: (err) => {
              console.warn('YouTube Player error, falling back to local/synth audio:', err);
              setUseFallbackAudio(true);
            }
          }
        });
      } catch (err) {
        console.warn('Error initializing YouTube Player:', err);
        setUseFallbackAudio(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // Listen for custom trigger when user clicks "Open My Heart"
    const handleStartMusicEvent = () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.playVideo();
        } catch (e) {
          console.warn('Could not auto-start YouTube video', e);
        }
      } else if (localAudioRef.current) {
        localAudioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('start-romantic-music', handleStartMusicEvent);

    return () => {
      window.removeEventListener('start-romantic-music', handleStartMusicEvent);
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [videoId]);

  const toggleMusic = () => {
    if (!useFallbackAudio && ytPlayerRef.current && typeof ytPlayerRef.current.getPlayerState === 'function') {
      try {
        const state = ytPlayerRef.current.getPlayerState();
        if (state === 1) { // Currently playing
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
        return;
      } catch (e) {
        console.warn('YouTube toggle issue, switching to fallback:', e);
      }
    }

    // Fallback HTML5 audio player
    if (localAudioRef.current) {
      if (isPlaying) {
        localAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        localAudioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(true);
          });
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube Iframe Container */}
      <div 
        id="yt-player-wrapper" 
        className="fixed -bottom-96 -right-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]"
      >
        <div id="yt-bg-player" />
      </div>

      {/* Fallback Audio Tag */}
      <audio
        ref={localAudioRef}
        src={loveData.music?.audioSrc || '/assets/romantic-music.mp3'}
        loop
        preload="none"
      />

      {/* Floating Pill Music Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play romantic music"}
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? 'bg-rose-600/90 text-white shadow-rose-500/40 ring-2 ring-rose-400/60 backdrop-blur-md scale-105'
              : 'bg-black/60 text-pink-200 hover:bg-black/80 hover:text-white border border-rose-400/30 backdrop-blur-md shadow-black/40'
          }`}
        >
          {/* Animated Sound Wave Bars */}
          {isPlaying ? (
            <div className="flex items-end gap-1 h-4 w-4">
              <span className="w-1 bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" style={{ height: '70%' }}></span>
              <span className="w-1 bg-white rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" style={{ height: '100%' }}></span>
              <span className="w-1 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" style={{ height: '45%' }}></span>
            </div>
          ) : (
            <Music className="w-4 h-4 text-pink-300 group-hover:scale-110 group-hover:text-rose-400 transition-transform" />
          )}

          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wide">
              {isPlaying ? 'Playing Our Song 🎵' : 'Play Our Song 🎵'}
            </span>
            <span className="text-[10px] text-pink-300/70 font-light truncate max-w-[120px]">
              {loveData.music?.trackName || 'Romantic Melody'}
            </span>
          </div>

          {/* Pulse beacon beacon when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
