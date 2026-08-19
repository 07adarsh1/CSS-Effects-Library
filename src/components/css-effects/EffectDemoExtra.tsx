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
  const [activeSegment, setActiveSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cookieAccepted, setCookieAccepted] = useState(false);
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

    case 'glass-credit-card':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-glass-credit-card">
            <div className="flex justify-between items-center">
              <div className="fx-card-chip" />
              <span className="text-[10px] text-white/60 font-mono">WIRELESS</span>
            </div>
            <div className="fx-card-number">4582 •••• •••• 9204</div>
            <div className="fx-card-footer">
              <div>
                <div className="fx-card-holder">Cardholder</div>
                <div className="fx-card-holder-name">ALEX R. VAULT</div>
              </div>
              <div className="fx-card-logo">CSSHUB</div>
            </div>
          </div>
        </div>
      );

    case 'stat-metric-card':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-stat-card">
            <div className="fx-stat-header">
              <span className="fx-stat-label">Monthly Active Users</span>
              <span className="fx-stat-badge">↑ +24.8%</span>
            </div>
            <div className="fx-stat-value">148,290</div>
            <svg className="fx-stat-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fx-stat-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path className="fx-sparkline-fill" d="M0,25 Q20,10 40,20 T70,5 T100,2 L100,30 L0,30 Z" />
              <path className="fx-sparkline-path" d="M0,25 Q20,10 40,20 T70,5 T100,2" />
            </svg>
          </div>
        </div>
      );

    case 'pricing-tier-card':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-pricing-card">
            <div className="fx-pricing-badge">Popular</div>
            <div className="fx-pricing-plan">Pro Tier</div>
            <div className="fx-pricing-price">$29<span>/month</span></div>
            <ul className="fx-pricing-features">
              <li>Unlimited Animations</li>
              <li>8-Way Live Studio</li>
              <li>Multi-Framework Export</li>
            </ul>
            <button className="fx-pricing-btn">Upgrade to Pro</button>
          </div>
        </div>
      );

    case 'spotlight-search-bar':
      return (
        <div className="flex items-center justify-center h-full w-full px-3">
          <div className="fx-spotlight-input-wrap">
            <span className="fx-spotlight-icon">🔍</span>
            <input className="fx-spotlight-input" type="text" placeholder="Quick search effects..." defaultValue="Glass Card" />
            <kbd className="fx-spotlight-kbd">⌘K</kbd>
          </div>
        </div>
      );

    case 'floating-action-menu':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-fab-container">
            <div className="fx-fab-item">💬</div>
            <div className="fx-fab-item">⭐</div>
            <div className="fx-fab-item">📤</div>
            <button className="fx-fab-main">+</button>
          </div>
        </div>
      );

    case 'overlapping-avatar-stack':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-avatar-stack">
            <div className="fx-avatar-item" style={{ background: '#3b82f6' }}>JD<span className="fx-avatar-status" /></div>
            <div className="fx-avatar-item" style={{ background: '#ec4899' }}>SA<span className="fx-avatar-status" /></div>
            <div className="fx-avatar-item" style={{ background: '#8b5cf6' }}>MR<span className="fx-avatar-status" /></div>
            <div className="fx-avatar-item" style={{ background: '#10b981' }}>KL<span className="fx-avatar-status" /></div>
            <div className="fx-avatar-item fx-avatar-more">+4</div>
          </div>
        </div>
      );

    case 'segmented-pill-control':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-segmented-control">
            {['Daily', 'Weekly', 'Monthly'].map((period, i) => (
              <button
                key={period}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSegment(i);
                }}
                className={`fx-segmented-btn ${activeSegment === i ? 'active' : ''}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      );

    case 'audio-waveform-player':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-audio-player">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="fx-audio-play-btn"
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <div>
              <div className="text-[10px] font-bold text-white mb-1">Cyber Synthwave</div>
              <div className="fx-waveform-bars">
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                <span className="fx-waveform-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
              </div>
            </div>
          </div>
        </div>
      );

    case 'split-flap-countdown':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-countdown-wrap">
            <div className="fx-countdown-box">
              <div className="fx-countdown-digit">04</div>
              <span className="fx-countdown-label">Days</span>
            </div>
            <div className="fx-countdown-box">
              <div className="fx-countdown-digit">18</div>
              <span className="fx-countdown-label">Hours</span>
            </div>
            <div className="fx-countdown-box">
              <div className="fx-countdown-digit">32</div>
              <span className="fx-countdown-label">Mins</span>
            </div>
            <div className="fx-countdown-box">
              <div className="fx-countdown-digit">59</div>
              <span className="fx-countdown-label">Secs</span>
            </div>
          </div>
        </div>
      );

    case 'floating-cookie-banner':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-cookie-banner">
            <div className="fx-cookie-title">🍪 Cookie Preferences</div>
            <div className="fx-cookie-text">
              {cookieAccepted ? 'Preferences saved successfully!' : 'We use cookies to optimize your interactive studio experience.'}
            </div>
            <div className="fx-cookie-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCookieAccepted(true);
                }}
                className="fx-cookie-btn-accept"
              >
                {cookieAccepted ? '✓ Saved' : 'Accept All'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCookieAccepted(false);
                }}
                className="fx-cookie-btn-decline"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      );

    // ==================== 18 NEW MEGAPACK DEMOS ====================
    case 'bg-matrix-rain':
      return (
        <div className="h-full w-full">
          <div className="fx-matrix-bg">
            <div className="fx-matrix-col">0101100101010</div>
            <div className="fx-matrix-col">1011001011010</div>
            <div className="fx-matrix-col">0010110100101</div>
            <div className="fx-matrix-col">1101001011010</div>
            <div className="fx-matrix-col">0101101001011</div>
          </div>
        </div>
      );

    case 'bg-deep-space-warp':
      return (
        <div className="h-full w-full">
          <div className="fx-space-warp-bg">
            <div className="fx-warp-star" />
            <div className="fx-warp-star" />
            <div className="fx-warp-star" />
            <div className="fx-warp-star" />
            <div className="fx-warp-star" />
          </div>
        </div>
      );

    case 'bg-conic-swirl':
      return (
        <div className="h-full w-full">
          <div className="fx-conic-vortex" />
        </div>
      );

    case 'bg-cyber-grid-horizon':
      return (
        <div className="h-full w-full">
          <div className="fx-synthwave-bg">
            <div className="fx-synthwave-sun" />
            <div className="fx-synthwave-floor" />
          </div>
        </div>
      );

    case 'dynamic-island-pill':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-dynamic-island">
            <span className="text-sm">🎧</span>
            <div className="fx-island-details">
              <div className="text-[10px] font-bold">Midnight City</div>
              <div className="text-[8px] text-zinc-400">M83 &middot; Now Playing</div>
            </div>
            <span className="text-[10px] text-emerald-400">●</span>
          </div>
        </div>
      );

    case 'floating-macos-dock':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-macos-dock">
            <div className="fx-dock-item" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>📁</div>
            <div className="fx-dock-item" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>🎨</div>
            <div className="fx-dock-item" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>⚡</div>
            <div className="fx-dock-item" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>🔥</div>
            <div className="fx-dock-item" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>⚙️</div>
          </div>
        </div>
      );

    case 'radial-wheel-menu':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-radial-menu-wrap">
            <button className="fx-radial-center-btn">✦</button>
            <div className="fx-radial-node">🚀</div>
            <div className="fx-radial-node">⭐</div>
            <div className="fx-radial-node">❤️</div>
            <div className="fx-radial-node">💬</div>
            <div className="fx-radial-node">📤</div>
          </div>
        </div>
      );

    case 'interactive-code-card':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-code-card-window">
            <div className="fx-code-card-header">
              <div className="fx-code-dots">
                <span className="fx-code-dot" style={{ background: '#ef4444' }} />
                <span className="fx-code-dot" style={{ background: '#f59e0b' }} />
                <span className="fx-code-dot" style={{ background: '#10b981' }} />
              </div>
              <span className="text-[9px] text-zinc-400 font-mono">studio.config.ts</span>
            </div>
            <div className="fx-code-content">
              <span style={{ color: '#f43f5e' }}>const</span> app = <span style={{ color: '#38bdf8' }}>new</span> CSSHUB({`{`}<br />
              &nbsp;&nbsp;effects: <span style={{ color: '#fbbf24' }}>100</span>,<br />
              &nbsp;&nbsp;tier: <span style={{ color: '#a3e635' }}>'elite'</span><br />
              {`}`});
            </div>
          </div>
        </div>
      );

    case 'glass-modal-dialog':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-glass-modal-box">
            <div className="fx-glass-modal-icon">✦</div>
            <div className="fx-glass-modal-title">Upgrade to Pro</div>
            <div className="fx-glass-modal-desc">Unlock 100+ production components and live reactive preview.</div>
            <button className="fx-glass-modal-btn">Continue →</button>
          </div>
        </div>
      );

    case 'music-mini-player':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-music-player-card">
            <div className="fx-vinyl-disk" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-white truncate">Starlight Voyage</div>
              <div className="text-[9px] text-amber-400">Cosmic Waves</div>
            </div>
            <button className="w-6 h-6 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center font-bold">▶</button>
          </div>
        </div>
      );

    case 'liquid-morph-button':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-liquid-btn">Liquid Morph</button>
        </div>
      );

    case 'magnetic-glow-button':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-magnetic-btn">Magnetic Glow</button>
        </div>
      );

    case 'neon-shimmer-border':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-laser-border-box" />
        </div>
      );

    case 'holographic-foil-card':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-holo-foil-card">
            <span className="relative z-10 font-bold">HOLO FOIL</span>
          </div>
        </div>
      );

    case 'kinetic-3d-stack':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-layer-stack-wrap">
            <div className="fx-layer-sheet" />
            <div className="fx-layer-sheet" />
            <div className="fx-layer-sheet" />
          </div>
        </div>
      );

    case 'cylinder-photo-carousel':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-cylinder-scene">
            <div className="fx-cylinder-ring">
              <div className="fx-cylinder-panel">01</div>
              <div className="fx-cylinder-panel">02</div>
              <div className="fx-cylinder-panel">03</div>
              <div className="fx-cylinder-panel">04</div>
            </div>
          </div>
        </div>
      );

    case 'liquid-fill-loader':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-liquid-flask">
            <div className="fx-liquid-wave" />
          </div>
        </div>
      );

    case 'glitch-cyber-card':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-glitch-card">SYSTEM ACTIVE</div>
        </div>
      );

    // ==================== 50 NEW MEGAPACK DEMOS ====================
    case 'command-menu-palette':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-cmd-palette-box">
            <input className="fx-cmd-search-input" placeholder="Type a command..." defaultValue="Search effects..." readOnly />
            <div className="fx-cmd-item-list">
              <div className="fx-cmd-item active">
                <span>⚡ Quick Export</span>
                <span className="fx-cmd-badge">⌘E</span>
              </div>
              <div className="fx-cmd-item">
                <span>🎨 Switch Theme</span>
                <span className="fx-cmd-badge">⌘T</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'animated-file-tree':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-file-tree-wrap">
            <div className="fx-tree-node">📁 src/components</div>
            <div className="fx-tree-indent">
              <div className="fx-tree-node active">📄 LiveStudioModal.tsx</div>
              <div className="fx-tree-node">📄 EffectCard.tsx</div>
            </div>
          </div>
        </div>
      );

    case 'split-button-dropdown':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-split-btn-group">
            <button className="fx-split-main-btn">Deploy Studio</button>
            <button className="fx-split-chevron-btn">▼</button>
          </div>
        </div>
      );

    case 'stepper-form-wizard':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-wizard-bar">
            <div className="fx-wizard-step done">
              <div className="fx-wizard-circle">✓</div>
              <span className="fx-wizard-label">Design</span>
            </div>
            <div className="fx-wizard-line done" />
            <div className="fx-wizard-step active">
              <div className="fx-wizard-circle">2</div>
              <span className="fx-wizard-label">Code</span>
            </div>
            <div className="fx-wizard-line" />
            <div className="fx-wizard-step">
              <div className="fx-wizard-circle">3</div>
              <span className="fx-wizard-label">Ship</span>
            </div>
          </div>
        </div>
      );

    case 'gradient-pricing-slider':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-pricing-slider-card">
            <div className="fx-price-display">
              <span className="fx-price-amount">$29</span>
              <span className="fx-price-unit">/mo &middot; Pro</span>
            </div>
            <input type="range" min="1" max="100" defaultValue="29" className="fx-custom-range" />
          </div>
        </div>
      );

    case 'activity-feed-timeline':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-feed-wrap">
            <div className="fx-feed-item">
              <div className="fx-feed-dot" />
              <div className="fx-feed-title">Released 150+ Pack</div>
              <div className="fx-feed-time">Just now</div>
            </div>
            <div className="fx-feed-item">
              <div className="fx-feed-dot" style={{ background: '#10b981' }} />
              <div className="fx-feed-title">Fixed Live Studio</div>
              <div className="fx-feed-time">5m ago</div>
            </div>
          </div>
        </div>
      );

    case 'color-picker-wheel':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-swatch-row">
            <div className="fx-swatch-dot selected" style={{ background: '#f59e0b' }} />
            <div className="fx-swatch-dot" style={{ background: '#10b981' }} />
            <div className="fx-swatch-dot" style={{ background: '#06b6d4' }} />
            <div className="fx-swatch-dot" style={{ background: '#8b5cf6' }} />
            <div className="fx-swatch-dot" style={{ background: '#ec4899' }} />
          </div>
        </div>
      );

    case 'glass-cookie-consent-bar':
      return (
        <div className="flex items-center justify-center h-full w-full px-2">
          <div className="fx-consent-pill">
            <span>🍪 Enable analytics?</span>
            <button className="fx-consent-btn-ok">Allow</button>
          </div>
        </div>
      );

    case 'spotlight-glow-border-btn':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-spotlight-btn">Spotlight Hover</button>
        </div>
      );

    case 'isometric-cube-button':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-iso-cube-btn">PUSH ME</button>
        </div>
      );

    case 'split-curtain-reveal-btn':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-curtain-btn">Curtain Reveal</button>
        </div>
      );

    case 'glitch-cyberpunk-btn':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-glitch-btn">CYBER GLITCH</button>
        </div>
      );

    case 'gravity-magnetic-pill':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <button className="fx-magnetic-pill">Magnetic Core</button>
        </div>
      );

    case 'dna-helix-loader':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-dna-wrap">
            <div className="fx-dna-dot" />
            <div className="fx-dna-dot" />
            <div className="fx-dna-dot" />
            <div className="fx-dna-dot" />
            <div className="fx-dna-dot" />
          </div>
        </div>
      );

    case 'orbit-ring-spinner':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-orbit-system">
            <div className="fx-orbit-ring" />
            <div className="fx-orbit-ring" />
            <div className="fx-orbit-ring" />
          </div>
        </div>
      );

    case 'morphing-geometric-loader':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-morph-geom" />
        </div>
      );

    case 'liquid-pulse-dots':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-liquid-dots-wrap">
            <div className="fx-liq-dot" />
            <div className="fx-liq-dot" />
            <div className="fx-liq-dot" />
          </div>
        </div>
      );

    case 'cyber-radar-sweep':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-radar-scanner" />
        </div>
      );

    case 'matrix-decode-text':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-matrix-decode-txt">&lt;ACCESS_GRANTED /&gt;</div>
        </div>
      );

    case 'liquid-fill-text':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-liquid-txt">OCEAN WAVE</div>
        </div>
      );

    case 'chrome-metallic-text':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-chrome-txt">FUTURE SYNTH</div>
        </div>
      );

    case 'kinetic-stagger-text':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-kinetic-txt-wrap">
            <span className="fx-kinetic-letter">B</span>
            <span className="fx-kinetic-letter">O</span>
            <span className="fx-kinetic-letter">U</span>
            <span className="fx-kinetic-letter">N</span>
            <span className="fx-kinetic-letter">D</span>
          </div>
        </div>
      );

    case 'neon-burn-in-text':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-neon-burn-txt">OPEN 24/7</div>
        </div>
      );

    case 'quantum-particle-field':
      return (
        <div className="h-full w-full">
          <div className="fx-quantum-bg" />
        </div>
      );

    case 'crt-scanline-retro':
      return (
        <div className="h-full w-full">
          <div className="fx-crt-screen" />
        </div>
      );

    case 'cyber-hex-mesh':
      return (
        <div className="h-full w-full">
          <div className="fx-hex-mesh-bg" />
        </div>
      );

    case 'flowing-lava-lamp':
      return (
        <div className="h-full w-full">
          <div className="fx-lava-bg">
            <div className="fx-lava-blob" />
            <div className="fx-lava-blob" />
          </div>
        </div>
      );

    case 'nebula-cloud-drift':
      return (
        <div className="h-full w-full">
          <div className="fx-nebula-bg">
            <div className="fx-nebula-cloud" />
          </div>
        </div>
      );

    case 'isometric-device-mockup':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-device-scene">
            <div className="fx-device-frame">
              <div className="fx-device-screen">CSSHUB PRO</div>
            </div>
          </div>
        </div>
      );

    case '3d-cube-carousel':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-cube-scene">
            <div className="fx-cube-box">
              <div className="fx-cube-face fx-cube-front">✦</div>
              <div className="fx-cube-face fx-cube-right">⚡</div>
              <div className="fx-cube-face fx-cube-back">🎨</div>
              <div className="fx-cube-face fx-cube-left">🚀</div>
            </div>
          </div>
        </div>
      );

    case 'origami-fold-card':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-origami-wrap">
            <div className="fx-origami-panel">
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>ORIGAMI FOLD</div>
              <div style={{ fontSize: '8px', color: '#a1a1aa', marginTop: '2px' }}>Hover to unfold</div>
            </div>
          </div>
        </div>
      );

    case 'parallax-depth-layers':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-parallax-card">
            <div className="fx-parallax-floating-tag">DEPTH LAYER</div>
          </div>
        </div>
      );

    case 'interactive-globe-wireframe':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-globe-wrap">
            <div className="fx-globe-ring" />
            <div className="fx-globe-ring" />
            <div className="fx-globe-ring" />
          </div>
        </div>
      );

    case 'circuit-board-border':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-pcb-border-box">CIRCUIT ONLINE</div>
        </div>
      );

    case 'gradient-conic-glow-border':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-conic-border-card">CONIC GLOW</div>
        </div>
      );

    case 'corner-bracket-pulse':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-hud-bracket-card">TARGET LOCKED</div>
        </div>
      );

    case 'multi-gradient-chase':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-laser-chase-box">LASER CHASE</div>
        </div>
      );

    case 'liquid-blob-border':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-blob-border-box">BLOB FRAME</div>
        </div>
      );

    case 'chromatic-shadow-split':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-chroma-shadow-card">ANAGLYPH SHADOW</div>
        </div>
      );

    case 'glass-refraction-shadow':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-caustic-card">GLASS CAUSTIC</div>
        </div>
      );

    case 'pulsing-ambient-shadow':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-ambient-pulse-card">BREATHING SHADOW</div>
        </div>
      );

    case 'hard-pop-brutalist-shadow':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-brutalist-card">NEOBRUTALISM</div>
        </div>
      );

    case 'pixel-dissolve-reveal':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-pixel-card">PIXEL DISSOLVE</div>
        </div>
      );

    case 'circular-wipe-expand':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-iris-card"><span>IRIS WIPE</span></div>
        </div>
      );

    case 'slice-shutter-transition':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-shutter-box">VENETIAN SHUTTER</div>
        </div>
      );

    case 'cube-flip-3d-transition':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-cube-flip-wrap">
            <div className="fx-cube-flip-inner">
              <div className="fx-cube-side fx-cube-side-front">HOVER TO FLIP</div>
              <div className="fx-cube-side fx-cube-side-back">REVEALED ✦</div>
            </div>
          </div>
        </div>
      );

    case 'frosted-liquid-glass':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-liquid-glass-card">LIQUID GLASS</div>
        </div>
      );

    case 'audio-visualizer-bars':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-eq-visualizer">
            <div className="fx-eq-bar" />
            <div className="fx-eq-bar" />
            <div className="fx-eq-bar" />
            <div className="fx-eq-bar" />
            <div className="fx-eq-bar" />
          </div>
        </div>
      );

    case 'morphing-svg-mesh':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-mesh-wrap" />
        </div>
      );

    case 'holographic-security-badge':
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="fx-security-badge">
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#f59e0b' }}>CSSHUB AUTH</div>
            <div style={{ fontSize: '8px', color: '#71717a', fontFamily: 'monospace' }}>ID: #9948-ELITE</div>
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
