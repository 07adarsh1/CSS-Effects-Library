'use client';

import { useCallback } from 'react';

interface EffectDemoProps {
  effectId: string;
}

export function EffectDemo({ effectId }: EffectDemoProps) {
  const createRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.className = 'fx-ripple';
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }, []);

  switch (effectId) {
    // ==================== HOVER ====================
    case 'fill-slide-up':
      return (
        <div className="flex items-center justify-center h-full">
          <button className="fx-fill-slide-up">Hover Me</button>
        </div>
      );

    case 'ripple-effect':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-ripple-wrap">
            <button className="fx-ripple-btn" onClick={createRipple}>Click Me</button>
          </div>
        </div>
      );

    case 'glow-pulse':
      return (
        <div className="flex items-center justify-center h-full">
          <button className="fx-glow-pulse">Pulsing Glow</button>
        </div>
      );

    case 'lift-shadow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-lift-shadow">
            <p className="text-xs text-muted-foreground font-medium">Card Title</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Hover to lift</p>
          </div>
        </div>
      );

    case 'underline-grow':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-underline-grow">Hover for underline</span>
        </div>
      );

    case 'border-draw':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-border-draw">
            <span>Hover Me</span>
            <div className="fx-bd-top" />
            <div className="fx-bd-bottom" />
          </div>
        </div>
      );

    // ==================== LOADING ====================
    case 'dual-ring':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-dual-ring" />
        </div>
      );

    case 'bouncing-dots':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-bouncing-dots">
            <span /><span /><span />
          </div>
        </div>
      );

    case 'bar-wave':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-bar-wave">
            <span /><span /><span /><span /><span />
          </div>
        </div>
      );

    case 'pulse-ring':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-pulse-ring" />
        </div>
      );

    case 'square-spin':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-square-spin" />
        </div>
      );

    case 'orbit-loader':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-orbit-loader">
            <span /><span /><span /><span />
          </div>
        </div>
      );

    // ==================== TEXT ====================
    case 'gradient-text':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-gradient-text">Gradient Magic</span>
        </div>
      );

    case 'glitch':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-glitch" data-text="GLITCH">GLITCH</span>
        </div>
      );

    case 'neon-glow-text':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-neon-text">NEON</span>
        </div>
      );

    case 'typing-cursor':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-typing">
            <span>console.log</span>
            <span className="fx-typing-cursor" />
          </span>
        </div>
      );

    case 'text-stroke':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-text-stroke">OUTLINED</span>
        </div>
      );

    case 'shimmer-text':
      return (
        <div className="flex items-center justify-center h-full">
          <span className="fx-shimmer-text">Shimmer Effect</span>
        </div>
      );

    // ==================== BACKGROUND ====================
    case 'bg-animated-gradient':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-animated-gradient h-full w-full" />
        </div>
      );

    case 'bg-dot-matrix':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-dot-matrix h-full w-full" />
        </div>
      );

    case 'bg-stripes':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-stripes h-full w-full" />
        </div>
      );

    case 'bg-aurora':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-aurora h-full w-full" />
        </div>
      );

    case 'bg-geometric':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-geometric h-full w-full" />
        </div>
      );

    case 'bg-waves':
      return (
        <div className="h-full w-full">
          <div className="fx-bg-waves h-full w-full" />
        </div>
      );

    // ==================== 3D ====================
    case 'card-flip':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-card-flip-container">
            <div className="fx-card-flip">
              <div className="fx-card-flip-front">Front</div>
              <div className="fx-card-flip-back">Back</div>
            </div>
          </div>
        </div>
      );

    case 'tilt-card':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-tilt-card">
            <p className="text-xs text-muted-foreground font-medium">Tilt Me</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Hover to see 3D</p>
          </div>
        </div>
      );

    case 'cube':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-cube-scene">
            <div className="fx-cube">
              <div className="fx-cube-face">1</div>
              <div className="fx-cube-face">2</div>
              <div className="fx-cube-face">3</div>
              <div className="fx-cube-face">4</div>
              <div className="fx-cube-face">5</div>
              <div className="fx-cube-face">6</div>
            </div>
          </div>
        </div>
      );

    case 'depth-stack':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-depth-stack">
            <div className="fx-depth-layer" />
            <div className="fx-depth-layer" />
            <div className="fx-depth-layer" />
          </div>
        </div>
      );

    case 'perspective-rotate':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-perspective-rotate" />
        </div>
      );

    case 'swing-door':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-swing-container">
            <div className="fx-swing-door">Open Door</div>
          </div>
        </div>
      );

    // ==================== BORDER ====================
    case 'gradient-border':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-gradient-border">
            <p className="text-xs text-foreground/70 relative z-10">Gradient Border</p>
          </div>
        </div>
      );

    case 'animated-dashed':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-animated-dashed">
            <p className="text-xs text-foreground/70">Marching Ants</p>
          </div>
        </div>
      );

    case 'corner-accents':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-corner-accents">
            <p className="text-xs text-foreground/70">Hover corners</p>
          </div>
        </div>
      );

    case 'glow-border':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-glow-border">
            <p className="text-xs text-foreground/70">Glowing Border</p>
          </div>
        </div>
      );

    case 'neon-border':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-neon-border">
            <p className="text-xs text-foreground/70">Neon Border</p>
          </div>
        </div>
      );

    case 'double-border':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-double-border">
            <p className="text-xs text-foreground/70">Double Border</p>
          </div>
        </div>
      );

    // ==================== SHADOW ====================
    case 'multi-shadow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-multi-shadow">
            <p className="text-xs text-foreground/70 font-medium">Layered</p>
          </div>
        </div>
      );

    case 'neon-box-shadow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-neon-box-shadow">
            <p className="text-xs text-foreground/70 font-medium">Neon Shadow</p>
          </div>
        </div>
      );

    case 'long-shadow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-long-shadow">
            <span className="text-sm font-bold text-black">Long Shadow</span>
          </div>
        </div>
      );

    case 'shadow-morph':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-shadow-morph">
            <p className="text-xs text-foreground/70 font-medium">Morphing</p>
          </div>
        </div>
      );

    case 'inset-glow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-inset-glow">
            <p className="text-xs text-foreground/70 font-medium">Inner Glow</p>
          </div>
        </div>
      );

    case 'colored-shadow':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-colored-shadow">
            <p className="text-xs text-foreground/70 font-medium">Color Stack</p>
          </div>
        </div>
      );

    // ==================== TRANSITION ====================
    case 'smooth-expand':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-smooth-expand is-expanded">
            <p className="text-xs text-foreground/70">Smoothly expanded content area with elegant transition.</p>
          </div>
        </div>
      );

    case 'slide-reveal':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-slide-reveal-container w-full px-4">
            <div className="fx-slide-reveal text-sm font-semibold">
              Revealed Content ✨
            </div>
          </div>
        </div>
      );

    case 'scale-bounce':
      return (
        <div className="flex items-center justify-center h-full">
          <button className="fx-scale-bounce text-sm">Bounce Scale</button>
        </div>
      );

    case 'rotate-in':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-rotate-in" />
        </div>
      );

    case 'elastic-pop':
      return (
        <div className="flex items-center justify-center h-full">
          <button className="fx-elastic-pop text-sm">Elastic Pop</button>
        </div>
      );

    case 'fade-slide-up':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-fade-slide-up">
            <div className="fx-fade-slide-up-inner">
              <p className="text-xs">Animated Entry ✦</p>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="flex items-center justify-center h-full text-muted-foreground text-xs">Demo not available</div>;
  }
}
