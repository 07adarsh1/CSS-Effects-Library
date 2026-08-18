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
        <div className="flex items-center justify-center h-full w-full px-3">
          <div
            className="fx-toggle-card"
            onClick={() => setToggleActive(!toggleActive)}
          >
            <div>
              <div className="fx-toggle-title">Push Notifications</div>
              <div className="fx-toggle-desc">Real-time system alerts</div>
            </div>
            <div className={`fx-toggle-switch ${toggleActive ? 'active' : ''}`} />
          </div>
        </div>
      );

    case 'checkbox-anim':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <label className="fx-checkbox-card">
            <span className="fx-checkbox-anim">
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
              <span className="fx-checkbox-label-text">
                <span className="fx-checkbox-title">Hardware Acceleration</span>
                <span className="fx-checkbox-desc">Boost rendering performance</span>
              </span>
            </span>
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
          <div className="fx-skeleton-card">
            <div className="fx-skeleton" style={{ width: '55%', height: '16px' }} />
            <div className="fx-skeleton" style={{ width: '100%', height: '11px' }} />
            <div className="fx-skeleton" style={{ width: '85%', height: '11px' }} />
            <div className="fx-skeleton" style={{ width: '40%', height: '26px', borderRadius: '6px', marginTop: '4px' }} />
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
                className={`fx-star ${i < (hoveredStar !== -1 ? hoveredStar + 1 : filledStars) ? 'filled' : ''}`}
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
            onInput={(e) => {
              (e.currentTarget as HTMLInputElement).style.backgroundSize = `${(e.currentTarget as HTMLInputElement).value}% 100%`;
            }}
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
          <div className="fx-noise-grain" style={{ padding: '24px 20px', maxWidth: '250px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: '#f59e0b', textTransform: 'uppercase', background: 'rgba(245,158,11,0.15)', padding: '3px 6px', borderRadius: '4px' }}>Film 35mm</span>
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginTop: '8px' }}>Cinematic Grain</h3>
            <p style={{ color: '#a1a1aa', fontSize: '11px', marginTop: '4px', lineHeight: 1.4 }}>Realtime animated fractal noise texture with analog warmth.</p>
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

    // ==================== NEW MODERN UI COMPONENTS ====================
    case 'floating-input':
      return (
        <div className="flex items-center justify-center h-full w-full px-4">
          <div className="fx-floating-input-group">
            <input type="text" className="fx-floating-input" placeholder=" " defaultValue="developer@csshub.io" />
            <label className="fx-floating-label">Email Address</label>
          </div>
        </div>
      );

    case 'sliding-tab-bar':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-sliding-tabs">
            <button className="fx-tab-item active" onClick={(e) => {
              const p = (e.target as HTMLElement).parentElement;
              p?.querySelectorAll('.fx-tab-item').forEach((el) => el.classList.remove('active'));
              (e.target as HTMLElement).classList.add('active');
            }}>Overview</button>
            <button className="fx-tab-item" onClick={(e) => {
              const p = (e.target as HTMLElement).parentElement;
              p?.querySelectorAll('.fx-tab-item').forEach((el) => el.classList.remove('active'));
              (e.target as HTMLElement).classList.add('active');
            }}>Analytics</button>
            <button className="fx-tab-item" onClick={(e) => {
              const p = (e.target as HTMLElement).parentElement;
              p?.querySelectorAll('.fx-tab-item').forEach((el) => el.classList.remove('active'));
              (e.target as HTMLElement).classList.add('active');
            }}>Settings</button>
          </div>
        </div>
      );

    case 'animated-accordion':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <div className="fx-accordion-item open" onClick={(e) => (e.currentTarget as HTMLElement).classList.toggle('open')}>
            <div className="fx-accordion-header">
              <span>What is CSSHUB?</span>
              <svg className="fx-accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <div className="fx-accordion-content">
              CSSHUB is an open-source library of pure CSS effects with an 8-direction live interactive studio.
            </div>
          </div>
        </div>
      );

    case 'step-progress-bar':
      return (
        <div className="flex items-center justify-center h-full w-full px-4">
          <div className="fx-step-tracker">
            <div className="fx-step-node completed">✓</div>
            <div className="fx-step-line filled" />
            <div className="fx-step-node active">2</div>
            <div className="fx-step-line" />
            <div className="fx-step-node">3</div>
          </div>
        </div>
      );

    case 'floating-toast':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <div className="fx-toast-card">
            <div className="fx-toast-icon">✓</div>
            <div>
              <div className="fx-toast-title">Changes Saved</div>
              <div className="fx-toast-desc">Your CSS effect was copied!</div>
            </div>
            <div className="fx-toast-progress" />
          </div>
        </div>
      );

    case 'otp-input-boxes':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-otp-container">
            <input className="fx-otp-box" maxLength={1} defaultValue="7" />
            <input className="fx-otp-box" maxLength={1} defaultValue="2" />
            <input className="fx-otp-box" maxLength={1} defaultValue="9" />
            <input className="fx-otp-box" maxLength={1} placeholder="•" />
          </div>
        </div>
      );

    case 'file-dropzone':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <div className="fx-dropzone-box">
            <div className="fx-dropzone-icon">📁</div>
            <div className="fx-dropzone-text">Drop files to upload</div>
            <div className="fx-dropzone-sub">PNG, JPG, SVG up to 10MB</div>
          </div>
        </div>
      );

    case 'bento-spotlight-card':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <div
            className="fx-bento-card"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
          >
            <div className="fx-bento-badge">Component</div>
            <div className="fx-bento-title">Smart Analytics</div>
            <div className="fx-bento-desc">Interactive bento spotlight container with reactive hover tracking.</div>
          </div>
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
