import React, { useEffect, useRef } from 'react';

/**
 * High-performance HTML5 Canvas romantic particle engine.
 * Renders floating translucent hearts, soft sparkles, and glowing petals.
 */
export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle types: 'heart', 'sparkle', 'petal'
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 14 + 8;
        this.speedY = Math.random() * 0.7 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = (Math.random() - 0.5) * 0.005;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'sparkle' : 'petal';
        
        // Color palettes in soft pink, rose, lavender, peach
        const colors = [
          'rgba(251, 113, 133, ', // Rose
          'rgba(244, 63, 94, ',   // Deep rose
          'rgba(249, 168, 212, ', // Soft pink
          'rgba(233, 213, 255, ', // Lavender
          'rgba(254, 215, 170, '  // Peach
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.5 + this.speedX;
        this.angle += this.spinSpeed;

        this.opacity += this.fadeSpeed;
        if (this.opacity > 0.7 || this.opacity < 0.15) {
          this.fadeSpeed = -this.fadeSpeed;
        }

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle * 0.3);
        context.fillStyle = `${this.color}${this.opacity})`;
        context.shadowColor = `${this.color}0.6)`;
        context.shadowBlur = 8;

        if (this.type === 'heart') {
          // Draw mini heart path
          const s = this.size * 0.06;
          context.beginPath();
          context.moveTo(0, 0);
          context.bezierCurveTo(-10 * s, -15 * s, -25 * s, -5 * s, -25 * s, 10 * s);
          context.bezierCurveTo(-25 * s, 25 * s, -10 * s, 35 * s, 0, 45 * s);
          context.bezierCurveTo(10 * s, 35 * s, 25 * s, 25 * s, 25 * s, 10 * s);
          context.bezierCurveTo(25 * s, -5 * s, 10 * s, -15 * s, 0, 0);
          context.fill();
        } else if (this.type === 'sparkle') {
          // Draw four-point star sparkle
          const r = this.size * 0.5;
          context.beginPath();
          for (let i = 0; i < 4; i++) {
            context.rotate(Math.PI / 2);
            context.lineTo(0, -r);
            context.lineTo(r * 0.25, -r * 0.25);
          }
          context.closePath();
          context.fill();
        } else {
          // Draw soft flower petal
          context.beginPath();
          context.ellipse(0, 0, this.size * 0.35, this.size * 0.7, Math.PI / 4, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Moving Gradient Orbs */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rose-600/20 blur-[120px] animate-pulse-glow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-pink-500/15 blur-[100px] animate-pulse-glow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[28rem] h-[28rem] rounded-full bg-burgundy-600/25 blur-[130px] animate-pulse-glow"
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />

      {/* Floating Canvas Elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
