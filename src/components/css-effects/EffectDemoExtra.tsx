'use client';

import { useState, useCallback, useRef } from 'react';

interface EffectDemoProps {
  effectId: string;
}

export function EffectDemoExtra({ effectId }: EffectDemoProps) {
  const [toggleActive, setToggleActive] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [filledStars, setFilledStars] = useState(4);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleSpotlightMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  switch (effectId) {
    // ==================== COMPONENTS ====================
    case 'toggle-switch':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className={`fx-toggle-switch ${toggleActive ? 'active' : ''}`}
            onClick={() => setToggleActive(!toggleActive)}
          />
        </div>
      );

    case 'checkbox-anim':
      return (
        <div className="flex items-center justify-center h-full">
          <label className="fx-checkbox-anim">
            <input
              type="checkbox"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <span className="fx-checkbox-box">
              <svg viewBox="0 0 16 16">
                <polyline points="3 8 7 12 13 4" />
              </svg>
            </span>
            Accept terms
          </label>
        </div>
      );

    case 'progress-ring':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-progress-ring">
            <svg width="100" height="100">
              <circle className="fx-ring-bg" cx="50" cy="50" r="45" strokeWidth="6" />
              <circle className="fx-ring-fill" cx="50" cy="50" r="45" strokeWidth="6" />
            </svg>
            <span className="fx-ring-text">70%</span>
          </div>
        </div>
      );

    case 'skeleton':
      return (
        <div className="flex items-center justify-center h-full w-full px-4">
          <div className="flex flex-col gap-3 w-full max-w-[240px]">
            <div className="fx-skeleton" style={{ width: '60%', height: '20px' }} />
            <div className="fx-skeleton" style={{ width: '100%', height: '14px' }} />
            <div className="fx-skeleton" style={{ width: '80%', height: '14px' }} />
            <div className="fx-skeleton" style={{ width: '40%', height: '32px', borderRadius: '6px', marginTop: '8px' }} />
          </div>
        </div>
      );

    case 'tooltip':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-tooltip">
            <span className="text-sm" style={{ color: '#e5e5e5', borderBottom: '1px dashed #555', paddingBottom: '2px' }}>
              Hover me
            </span>
            <span className="fx-tooltip-text">This is a tooltip!</span>
          </div>
        </div>
      );

    case 'badge-pulse':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-badge-pulse">
            <span className="fx-badge-icon">🔔</span>
            <span className="fx-badge-dot" />
          </div>
        </div>
      );

    case 'rating-stars': {
      const stars = [0, 1, 2, 3, 4];
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-rating-stars">
            {stars.map((i) => (
              <span
                key={i}
                className={`fx-star ${i < filledStars ? 'filled' : ''}`}
                onMouseEnter={() => setHoveredStar(i)}
                onMouseLeave={() => setHoveredStar(-1)}
                onClick={() => setFilledStars(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      );
    }

    case 'range-slider':
      return (
        <div className="flex items-center justify-center h-full">
          <input
            type="range"
            className="fx-range-slider"
            min="0"
            max="100"
            defaultValue="70"
          />
        </div>
      );

    // ==================== ADVANCED ====================
    case 'glassmorphism':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-glassmorphism" style={{ maxWidth: '280px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#f59e0b' }}>
              Frosted Card
            </h3>
            <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.5 }}>
              A translucent glass effect using backdrop-filter blur and layered box shadows.
            </p>
          </div>
        </div>
      );

    case 'text-reveal':
      return (
        <div className="flex items-center justify-center h-full">
          <h2 className="fx-text-reveal">Revealed Text</h2>
        </div>
      );

    case 'marquee':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-marquee w-full">
            <div className="fx-marquee-track">
              <span><span className="fx-marquee-dot" />Breaking News</span>
              <span><span className="fx-marquee-dot" />New Feature</span>
              <span><span className="fx-marquee-dot" />Announcement</span>
              <span><span className="fx-marquee-dot" />Breaking News</span>
              <span><span className="fx-marquee-dot" />New Feature</span>
              <span><span className="fx-marquee-dot" />Announcement</span>
            </div>
          </div>
        </div>
      );

    case 'morphing-blob':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-morphing-blob" />
        </div>
      );

    case 'card-spotlight':
      return (
        <div className="flex items-center justify-center h-full">
          <div
            ref={spotlightRef}
            className="fx-card-spotlight"
            onMouseMove={handleSpotlightMove}
            style={{ maxWidth: '280px' }}
          >
            <div className="fx-spotlight-title">Spotlight Card</div>
            <div className="fx-spotlight-desc">
              Move your mouse over this card to see the amber spotlight follow your cursor.
            </div>
          </div>
        </div>
      );

    case 'noise-grain':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="fx-noise-grain" style={{ background: '#1e1e1e', padding: '32px', borderRadius: '12px', maxWidth: '280px' }}>
            <h3 style={{ color: '#e5e5e5', fontSize: '18px', fontWeight: 700 }}>Cinematic Grain</h3>
            <p style={{ color: '#999', fontSize: '14px', marginTop: '8px' }}>
              A subtle noise texture overlay adds depth and a film-like quality.
            </p>
          </div>
        </div>
      );

    case 'neon-button':
      return (
        <div className="flex items-center justify-center h-full">
          <button className="fx-neon-button">Neon Glow</button>
        </div>
      );

    case 'text-mask':
      return (
        <div className="flex items-center justify-center h-full">
          <h2 className="fx-text-mask">Gradient Text</h2>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
          Demo not available
        </div>
      );
  }
}
