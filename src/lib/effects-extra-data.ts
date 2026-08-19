import type { CSSEffect } from '@/lib/effects-data';

export const extraCategories = [
  { id: 'components', name: 'Components', icon: '⬢' },
  { id: 'advanced', name: 'Advanced', icon: '◈' },
];

export const extraEffects: CSSEffect[] = [
  // ==================== COMPONENTS EFFECTS ====================
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    category: 'components',
    description: 'A smooth animated toggle switch with a sliding thumb and subtle glow transition on activation.',
    cssCode: `.toggle-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  max-width: 320px;
  background: #121218;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  user-select: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle-card:hover {
  border-color: rgba(245, 158, 11, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5);
}
.toggle-title {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}
.toggle-desc {
  font-size: 11px;
  color: #a1a1aa;
  margin-top: 2px;
}
.toggle-switch {
  position: relative;
  width: 54px;
  height: 30px;
  background: #27272a;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  border: 1.5px solid #3f3f46;
}
.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: #f4f4f5;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
.toggle-switch.active {
  background: #f59e0b;
  border-color: #f59e0b;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.45);
}
.toggle-switch.active::after {
  transform: translateX(24px);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}`,
    htmlCode: `<div class="toggle-card">
  <div>
    <div class="toggle-title">Push Notifications</div>
    <div class="toggle-desc">Receive real-time system alerts</div>
  </div>
  <div class="toggle-switch active"></div>
</div>`,
  },
  {
    id: 'checkbox-anim',
    name: 'Animated Checkbox',
    category: 'components',
    description: 'A custom checkbox with an SVG checkmark that draws itself in with a smooth stroke animation on selection.',
    cssCode: `.checkbox-card {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 320px;
  background: #121218;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  user-select: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.checkbox-card:hover {
  border-color: rgba(245, 158, 11, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5);
}
.checkbox-anim {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  width: 100%;
  user-select: none;
}
.checkbox-anim input[type="checkbox"] {
  display: none;
}
.checkbox-box {
  width: 24px;
  height: 24px;
  border: 2px solid #3f3f46;
  border-radius: 7px;
  background: #18181b;
  position: relative;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-box svg {
  width: 15px;
  height: 15px;
  stroke: #ffffff;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 22;
  stroke-dashoffset: 22;
  transition: stroke-dashoffset 0.3s cubic-bezier(0.65, 0, 0.35, 1) 0.05s;
}
.checkbox-anim input:checked ~ .checkbox-box,
.checkbox-anim input:checked + .checkbox-box {
  background: #f59e0b;
  border-color: #f59e0b;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.45);
  transform: scale(1.05);
}
.checkbox-anim input:checked ~ .checkbox-box svg,
.checkbox-anim input:checked + .checkbox-box svg {
  stroke-dashoffset: 0;
}
.checkbox-label-text {
  display: flex;
  flex-direction: column;
}
.checkbox-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #ffffff;
}
.checkbox-desc {
  font-size: 11px;
  color: #a1a1aa;
  margin-top: 2px;
}`,
    htmlCode: `<label class="checkbox-card">
  <span class="checkbox-anim">
    <input type="checkbox" checked />
    <span class="checkbox-box">
      <svg viewBox="0 0 16 16"><polyline points="3 8 7 12 13 4" /></svg>
    </span>
    <span class="checkbox-label-text">
      <span class="checkbox-title">Hardware Acceleration</span>
      <span class="checkbox-desc">Boost graphics &amp; animation rendering</span>
    </span>
  </span>
</label>`,
  },
  {
    id: 'progress-ring',
    name: 'Progress Ring',
    category: 'components',
    description: 'A circular SVG progress indicator that animates from zero to the target value with a smooth eased stroke.',
    cssCode: `.progress-ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.progress-ring svg {
  transform: rotate(-90deg);
}
.progress-ring .ring-bg {
  stroke: #333;
  fill: none;
}
.progress-ring .ring-fill {
  stroke: #f59e0b;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: ring-progress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.progress-ring .ring-text {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  color: #f59e0b;
}
@keyframes ring-progress {
  0% { stroke-dashoffset: 283; }
  100% { stroke-dashoffset: 85; }
}`,
    htmlCode: `<div class="progress-ring">
  <svg width="100" height="100">
    <circle class="ring-bg" cx="50" cy="50" r="45" stroke-width="6" />
    <circle class="ring-fill" cx="50" cy="50" r="45" stroke-width="6" />
  </svg>
  <span class="ring-text">70%</span>
</div>`,
  },
  {
    id: 'skeleton',
    name: 'Skeleton Loading',
    category: 'components',
    description: 'A shimmering placeholder element that mimics content layout while data is loading, with a sweeping light effect.',
    cssCode: `.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
  background: #121218;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}
.skeleton {
  position: relative;
  overflow: hidden;
  background: #22222c;
  border-radius: 6px;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(245, 158, 11, 0.28) 50%,
    rgba(255, 255, 255, 0.15) 65%,
    transparent 100%
  );
  animation: skeleton-shimmer 1.5s infinite;
}
@keyframes skeleton-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`,
    htmlCode: `<div class="skeleton-card">
  <div class="skeleton" style="width:55%;height:18px;"></div>
  <div class="skeleton" style="width:100%;height:12px;"></div>
  <div class="skeleton" style="width:85%;height:12px;"></div>
  <div class="skeleton" style="width:40%;height:32px;border-radius:8px;margin-top:6px;"></div>
</div>`,
  },
  {
    id: 'tooltip',
    name: 'CSS Tooltip',
    category: 'components',
    description: 'A lightweight tooltip with a directional arrow that fades and slides in on hover, built entirely with CSS.',
    cssCode: `.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.tooltip .tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #1e1e1e;
  color: #e5e5e5;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  border: 1px solid #333;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 10;
}
.tooltip .tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e1e1e;
}
.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}`,
    htmlCode: `<div class="tooltip">
  <span style="color:#e5e5e5;border-bottom:1px dashed #555;padding-bottom:2px;">Hover me</span>
  <span class="tooltip-text">This is a tooltip!</span>
</div>`,
  },
  {
    id: 'badge-pulse',
    name: 'Badge Pulse',
    category: 'components',
    description: 'A notification badge with a bouncing red dot and an expanding ring pulse that draws attention to new alerts.',
    cssCode: `.badge-pulse {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.badge-pulse .badge-icon {
  font-size: 28px;
  color: #e5e5e5;
}
.badge-pulse .badge-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
  animation: badge-bounce 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.badge-pulse .badge-dot::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.4);
  animation: badge-ring 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes badge-bounce {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.25); }
  50% { transform: scale(0.95); }
  70% { transform: scale(1.1); }
}
@keyframes badge-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}`,
    htmlCode: `<div class="badge-pulse">
  <span class="badge-icon">🔔</span>
  <span class="badge-dot"></span>
</div>`,
  },
  {
    id: 'rating-stars',
    name: 'Rating Stars',
    category: 'components',
    description: 'An interactive star rating component with hover scaling and a burst ring effect on filled stars.',
    cssCode: `.rating-stars {
  display: inline-flex;
  gap: 4px;
}
.rating-stars .star {
  position: relative;
  font-size: 26px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.rating-stars .star:hover,
.rating-stars .star.filled {
  color: #f59e0b;
}
.rating-stars .star:hover {
  transform: scale(1.2);
}
.rating-stars .star.filled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  animation: star-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes star-pop {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}`,
    htmlCode: `<div class="rating-stars">
  <span class="star filled">★</span>
  <span class="star filled">★</span>
  <span class="star filled">★</span>
  <span class="star filled">★</span>
  <span class="star">★</span>
</div>`,
  },
  {
    id: 'range-slider',
    name: 'Range Slider',
    category: 'components',
    description: 'A custom-styled range input with a colored progress track and a glowing amber thumb that scales on hover.',
    cssCode: `.range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 220px;
  height: 8px;
  background: #27272a;
  background-image: linear-gradient(#f59e0b, #f59e0b);
  background-size: 70% 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #f59e0b;
  border-radius: 50%;
  border: 2px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
  transition: transform 0.15s, box-shadow 0.15s;
}
.range-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 18px rgba(245, 158, 11, 0.8);
  transform: scale(1.2);
}
.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #f59e0b;
  border-radius: 50%;
  border: 2px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}`,
    htmlCode: `<input type="range" class="range-slider" min="0" max="100" value="70" oninput="this.style.backgroundSize = this.value + '% 100%'" />`,
  },

  // ==================== ADVANCED EFFECTS ====================
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    category: 'advanced',
    description: 'A frosted glass card with backdrop blur, subtle borders, and layered shadows that creates a premium translucent feel.',
    cssCode: `.glassmorphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  color: #e5e5e5;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.glassmorphism:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}`,
    htmlCode: `<div class="glassmorphism">
  <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;color:#f59e0b;">Frosted Card</h3>
  <p style="font-size:14px;color:#999;line-height:1.5;">A translucent glass effect using backdrop-filter blur and layered box shadows.</p>
</div>`,
  },
  {
    id: 'text-reveal',
    name: 'Text Reveal',
    category: 'advanced',
    description: 'Text that dramatically reveals itself using a clip-path wipe animation, creating a cinematic reveal effect.',
    cssCode: `.text-reveal {
  display: inline-block;
  clip-path: inset(0 100% 0 0);
  animation: reveal-text 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  font-size: 28px;
  font-weight: 800;
  color: #f59e0b;
}
@keyframes reveal-text {
  0% { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0% 0 0); }
}`,
    htmlCode: `<h2 class="text-reveal">Revealed Text</h2>`,
  },
  {
    id: 'marquee',
    name: 'Marquee',
    category: 'advanced',
    description: 'An infinite horizontal scrolling text ticker with smooth linear animation, perfect for announcements or tags.',
    cssCode: `.marquee {
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
.marquee .marquee-track {
  display: inline-flex;
  animation: marquee-scroll 12s linear infinite;
}
.marquee .marquee-track span {
  display: inline-block;
  padding: 0 24px;
  font-size: 15px;
  font-weight: 600;
  color: #e5e5e5;
  opacity: 0.7;
}
.marquee .marquee-track span .marquee-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #f59e0b;
  border-radius: 50%;
  margin-right: 24px;
  vertical-align: middle;
}
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`,
    htmlCode: `<div class="marquee">
  <div class="marquee-track">
    <span><span class="marquee-dot"></span>Breaking News</span>
    <span><span class="marquee-dot"></span>New Feature</span>
    <span><span class="marquee-dot"></span>Announcement</span>
    <span><span class="marquee-dot"></span>Breaking News</span>
    <span><span class="marquee-dot"></span>New Feature</span>
    <span><span class="marquee-dot"></span>Announcement</span>
  </div>
</div>`,
  },
  {
    id: 'morphing-blob',
    name: 'Morphing Blob',
    category: 'advanced',
    description: 'An organic gradient blob that continuously morphs between shapes using animated border-radius values.',
    cssCode: `.morphing-blob {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #f59e0b, #ec4899, #ef4444);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: blob-morph 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  opacity: 0.9;
  filter: blur(1px);
}
@keyframes blob-morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 30% 60% 40% / 70% 40% 50% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}`,
    htmlCode: `<div class="morphing-blob"></div>`,
  },
  {
    id: 'card-spotlight',
    name: 'Card Spotlight',
    category: 'advanced',
    description: 'A dark card with a radial gradient spotlight effect that illuminates the card surface on hover using CSS custom properties.',
    cssCode: `.card-spotlight {
  position: relative;
  background: #111;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 32px;
  color: #e5e5e5;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-spotlight::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}
.card-spotlight:hover::before {
  opacity: 1;
}
.card-spotlight:hover {
  border-color: rgba(245, 158, 11, 0.3);
}
.card-spotlight .spotlight-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #f59e0b;
}
.card-spotlight .spotlight-desc {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
}

/* JS to set --mouse-x and --mouse-y on mousemove */`,
    htmlCode: `<div class="card-spotlight">
  <div class="spotlight-title">Spotlight Card</div>
  <div class="spotlight-desc">Move your mouse over this card to see the amber spotlight follow your cursor.</div>
</div>

<script>
document.querySelector('.card-spotlight').addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect();
  e.target.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
  e.target.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
});
</script>`,
  },
  {
    id: 'noise-grain',
    name: 'Noise Grain',
    category: 'advanced',
    description: 'A subtle film grain texture overlay created with inline SVG turbulence, adding cinematic depth to any surface.',
    cssCode: `.noise-grain {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #141419 0%, #1e1b18 100%);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
}
.noise-grain::after {
  content: '';
  position: absolute;
  inset: -100%;
  width: 300%;
  height: 300%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.18'/%3E%3C/svg%3E");
  opacity: 0.22;
  pointer-events: none;
  animation: noise-shift 0.3s steps(4) infinite;
  mix-blend-mode: screen;
}
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5%, 5%); }
  50% { transform: translate(5%, -5%); }
  75% { transform: translate(-3%, -3%); }
  100% { transform: translate(0, 0); }
}`,
    htmlCode: `<div class="noise-grain" style="padding:32px 28px;max-width:280px;">
  <span style="font-size:10px;font-weight:700;letter-spacing:1px;color:#f59e0b;text-transform:uppercase;background:rgba(245,158,11,0.15);padding:4px 8px;border-radius:6px;">Film 35mm</span>
  <h3 style="color:#fff;font-size:16px;font-weight:700;margin-top:10px;">Cinematic Grain</h3>
  <p style="color:#a1a1aa;font-size:12px;margin-top:6px;line-height:1.4;">Realtime animated fractal noise texture with analog warmth.</p>
</div>`,
  },
  {
    id: 'neon-button',
    name: 'Neon Button',
    category: 'advanced',
    description: 'A glowing neon-bordered button with layered box-shadows, intense hover glow, and a subtle flicker animation.',
    cssCode: `.neon-button {
  position: relative;
  padding: 12px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #f59e0b;
  background: transparent;
  border: 2px solid #f59e0b;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 0 6px rgba(245, 158, 11, 0.3),
    0 0 20px rgba(245, 158, 11, 0.1),
    inset 0 0 6px rgba(245, 158, 11, 0.1);
  animation: neon-flicker 4s ease-in-out infinite;
}
.neon-button:hover {
  color: #fff;
  background: rgba(245, 158, 11, 0.1);
  box-shadow:
    0 0 10px rgba(245, 158, 11, 0.5),
    0 0 40px rgba(245, 158, 11, 0.2),
    0 0 80px rgba(245, 158, 11, 0.1),
    inset 0 0 10px rgba(245, 158, 11, 0.15);
}
@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.7; }
  94% { opacity: 1; }
  96% { opacity: 0.8; }
  97% { opacity: 1; }
}`,
    htmlCode: `<button class="neon-button">Neon Glow</button>`,
  },
  {
    id: 'text-mask',
    name: 'Text Mask',
    category: 'advanced',
    description: 'Bold text with an animated rainbow gradient visible through the text using background-clip, creating a flowing color mask.',
    cssCode: `.text-mask {
  font-size: 36px;
  font-weight: 900;
  line-height: 1.2;
  background: linear-gradient(
    90deg,
    #f59e0b, #ef4444, #ec4899, #10b981, #f59e0b
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: mask-gradient 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes mask-gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}`,
    htmlCode: `<h2 class="text-mask">Gradient Text</h2>`,
  },
  // ==================== NEW MODERN UI COMPONENTS ====================
  {
    id: 'floating-input',
    name: 'Floating Label Input',
    category: 'components',
    description: 'A modern floating label text input with smooth label translation, scaling, and glowing border transition on focus.',
    cssCode: `.floating-input-group {
  position: relative;
  width: 100%;
  max-width: 280px;
}
.floating-input {
  width: 100%;
  padding: 14px 16px;
  background: #141419;
  border: 1.5px solid #2e2e38;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.floating-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}
.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #71717a;
  font-size: 14px;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #141419;
  padding: 0 4px;
}
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  top: 0;
  font-size: 11px;
  font-weight: 600;
  color: #f59e0b;
}`,
    htmlCode: `<div class="floating-input-group">
  <input type="text" class="floating-input" placeholder=" " id="email-field" value="developer@csshub.io" />
  <label for="email-field" class="floating-label">Email Address</label>
</div>`,
  },
  {
    id: 'sliding-tab-bar',
    name: 'Sliding Pill Tab Bar',
    category: 'components',
    description: 'An iOS/macOS inspired segmented pill navigation bar with smooth active pill indicator transitions.',
    cssCode: `.sliding-tabs {
  display: flex;
  background: #141419;
  padding: 4px;
  border-radius: 12px;
  border: 1px solid #27272a;
  position: relative;
  gap: 4px;
}
.tab-item {
  position: relative;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  color: #a1a1aa;
  cursor: pointer;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  border: none;
  background: transparent;
  user-select: none;
}
.tab-item:hover {
  color: #fff;
}
.tab-item.active {
  color: #000;
  font-weight: 700;
  background: #f59e0b;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.3);
}`,
    htmlCode: `<div class="sliding-tabs">
  <button class="tab-item active">Overview</button>
  <button class="tab-item">Analytics</button>
  <button class="tab-item">Settings</button>
</div>`,
  },
  {
    id: 'animated-accordion',
    name: 'Animated Accordion',
    category: 'components',
    description: 'A smooth collapsible accordion item with an animated rotating arrow indicator and seamless content expand.',
    cssCode: `.accordion-item {
  width: 100%;
  max-width: 290px;
  background: #141419;
  border: 1px solid #27272a;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.accordion-item:hover {
  border-color: rgba(245, 158, 11, 0.3);
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  user-select: none;
}
.accordion-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s;
  padding: 0 16px;
  font-size: 12px;
  color: #a1a1aa;
  line-height: 1.5;
}
.accordion-item.open .accordion-icon {
  transform: rotate(180deg);
}
.accordion-item.open .accordion-content {
  max-height: 100px;
  padding: 0 16px 14px 16px;
}`,
    htmlCode: `<div class="accordion-item open">
  <div class="accordion-header">
    <span>What is CSSHUB?</span>
    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
  </div>
  <div class="accordion-content">
    CSSHUB is an open-source library of 100+ handcrafted, production-ready pure CSS effects and modern UI components.
  </div>
</div>`,
  },
  {
    id: 'step-progress-bar',
    name: 'Step Progress Tracker',
    category: 'components',
    description: 'A multi-step checkout/onboarding progress bar with animated active step rings and connecting status lines.',
    cssCode: `.step-tracker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 280px;
  position: relative;
}
.step-node {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #18181b;
  border: 2px solid #3f3f46;
  color: #a1a1aa;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
}
.step-node.completed {
  background: #f59e0b;
  border-color: #f59e0b;
  color: #000;
}
.step-node.active {
  border-color: #f59e0b;
  color: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
}
.step-line {
  flex: 1;
  height: 2px;
  background: #3f3f46;
  position: relative;
}
.step-line.filled {
  background: #f59e0b;
}`,
    htmlCode: `<div class="step-tracker">
  <div class="step-node completed">✓</div>
  <div class="step-line filled"></div>
  <div class="step-node active">2</div>
  <div class="step-line"></div>
  <div class="step-node">3</div>
</div>`,
  },
  {
    id: 'floating-toast',
    name: 'Notification Toast',
    category: 'components',
    description: 'A glassmorphic notification toast with an animated entrance, status icon, and self-depleting timer bar.',
    cssCode: `.toast-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(24, 24, 27, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  max-width: 280px;
}
.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}
.toast-title {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.toast-desc {
  font-size: 11px;
  color: #a1a1aa;
}
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2.5px;
  background: #10b981;
  width: 100%;
  animation: toast-timer 3.5s linear infinite;
}
@keyframes toast-timer {
  from { width: 100%; }
  to { width: 0%; }
}`,
    htmlCode: `<div class="toast-card">
  <div class="toast-icon">✓</div>
  <div>
    <div class="toast-title">Changes Saved</div>
    <div class="toast-desc">Your CSS effect was copied!</div>
  </div>
  <div class="toast-progress"></div>
</div>`,
  },
  {
    id: 'otp-input-boxes',
    name: 'OTP Verification Boxes',
    category: 'components',
    description: 'A 4-digit verification code input group with glowing active borders, smooth focus animations, and numeric alignment.',
    cssCode: `.otp-container {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.otp-box {
  width: 44px;
  height: 48px;
  background: #141419;
  border: 1.5px solid #2e2e38;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  outline: none;
  transition: all 0.2s;
}
.otp-box:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  transform: translateY(-2px);
}`,
    htmlCode: `<div class="otp-container">
  <input class="otp-box" maxlength="1" value="7" />
  <input class="otp-box" maxlength="1" value="2" />
  <input class="otp-box" maxlength="1" value="9" />
  <input class="otp-box" maxlength="1" placeholder="•" />
</div>`,
  },
  {
    id: 'file-dropzone',
    name: 'File Upload Dropzone',
    category: 'components',
    description: 'An interactive drag-and-drop file upload zone with a dashed border pulse, hover bounce icon, and upload badge.',
    cssCode: `.dropzone-box {
  width: 100%;
  max-width: 260px;
  padding: 24px 16px;
  background: rgba(20, 20, 25, 0.6);
  border: 2px dashed #3f3f46;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.dropzone-box:hover {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}
.dropzone-icon {
  font-size: 24px;
  margin-bottom: 8px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dropzone-box:hover .dropzone-icon {
  transform: translateY(-4px);
}
.dropzone-text {
  font-size: 12px;
  font-weight: 600;
  color: #e4e4e7;
}
.dropzone-sub {
  font-size: 10px;
  color: #71717a;
  margin-top: 2px;
}`,
    htmlCode: `<div class="dropzone-box">
  <div class="dropzone-icon">📁</div>
  <div class="dropzone-text">Drop files to upload</div>
  <div class="dropzone-sub">PNG, JPG, SVG up to 10MB</div>
</div>`,
  },
  {
    id: 'bento-spotlight-card',
    name: 'Bento Spotlight Card',
    category: 'components',
    description: 'Modern Apple-style Bento grid card with a dynamic gradient spotlight aura on hover.',
    cssCode: `.bento-card {
  position: relative;
  width: 100%;
  max-width: 270px;
  background: #121216;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
}
.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.15), transparent 40%);
  opacity: 0;
  transition: opacity 0.3s;
}
.bento-card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 158, 11, 0.4);
}
.bento-card:hover::before {
  opacity: 1;
}
.bento-badge {
  font-size: 10px;
  font-weight: 700;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.bento-title {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-top: 4px;
}
.bento-desc {
  font-size: 11px;
  color: #a1a1aa;
  margin-top: 4px;
  line-height: 1.4;
}`,
    htmlCode: `<div class="bento-card" onmousemove="const r=this.getBoundingClientRect();this.style.setProperty('--mouse-x',(event.clientX-r.left)+'px');this.style.setProperty('--mouse-y',(event.clientY-r.top)+'px');">
  <div class="bento-badge">Component</div>
  <div class="bento-title">Smart Analytics</div>
  <div class="bento-desc">Interactive bento spotlight container with reactive hover tracking.</div>
</div>`,
  },
  {
    id: 'glass-credit-card',
    name: 'Cyberpunk Glass Card',
    category: 'components',
    description: 'Frosted holographic debit card with gold chip, embossed numbering, and metallic sheen on hover.',
    cssCode: `.glass-credit-card {
  position: relative;
  width: 280px;
  height: 165px;
  border-radius: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
}
.glass-credit-card:hover {
  transform: translateY(-6px) rotateX(6deg) rotateY(-4deg);
  box-shadow: 0 24px 48px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border-color: rgba(245, 158, 11, 0.4);
}
.glass-credit-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(60deg, transparent 40%, rgba(255, 255, 255, 0.15) 50%, transparent 60%);
  transform: rotate(25deg) translateY(-100%);
  transition: transform 0.7s;
}
.glass-credit-card:hover::after {
  transform: rotate(25deg) translateY(100%);
}
.card-chip {
  width: 34px;
  height: 24px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
}
.card-number {
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.card-holder {
  font-size: 10px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}
.card-holder-name {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}
.card-logo {
  font-size: 13px;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 1px;
}`,
    htmlCode: `<div class="glass-credit-card">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div class="card-chip"></div>
    <span style="font-size: 11px; color: rgba(255,255,255,0.6); font-family: monospace;">WIRELESS</span>
  </div>
  <div class="card-number">4582 •••• •••• 9204</div>
  <div class="card-footer">
    <div>
      <div class="card-holder">Cardholder</div>
      <div class="card-holder-name">ALEX R. VAULT</div>
    </div>
    <div class="card-logo">CSSHUB</div>
  </div>
</div>`,
  },
  {
    id: 'stat-metric-card',
    name: 'Sparkline Stat Card',
    category: 'components',
    description: 'Dashboard KPI metric card with animated positive growth pill and glowing SVG sparkline wave.',
    cssCode: `.stat-card {
  width: 260px;
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, border-color 0.3s;
}
.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 158, 11, 0.4);
}
.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat-label {
  font-size: 11px;
  color: #a1a1aa;
  font-weight: 600;
}
.stat-badge {
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 2px 7px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 3px;
}
.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin: 6px 0 12px 0;
  letter-spacing: -0.5px;
}
.stat-sparkline {
  width: 100%;
  height: 42px;
  overflow: visible;
}
.sparkline-path {
  fill: none;
  stroke: #f59e0b;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 4px 8px rgba(245, 158, 11, 0.4));
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: sparklineDraw 2s ease-out forwards infinite alternate;
}
.sparkline-fill {
  fill: url(#stat-gradient);
  opacity: 0.25;
}
@keyframes sparklineDraw {
  to { stroke-dashoffset: 0; }
}`,
    htmlCode: `<div class="stat-card">
  <div class="stat-header">
    <span class="stat-label">Monthly Active Users</span>
    <span class="stat-badge">↑ +24.8%</span>
  </div>
  <div class="stat-value">148,290</div>
  <svg class="stat-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="stat-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>
    </defs>
    <path class="sparkline-fill" d="M0,25 Q20,10 40,20 T70,5 T100,2 L100,30 L0,30 Z" />
    <path class="sparkline-path" d="M0,25 Q20,10 40,20 T70,5 T100,2" />
  </svg>
</div>`,
  },
  {
    id: 'pricing-tier-card',
    name: 'Pricing Tier Card',
    category: 'components',
    description: 'SaaS subscription pricing tier card with glowing popular badge, feature checkmarks, and radiant CTA button.',
    cssCode: `.pricing-card {
  width: 260px;
  background: #111116;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.12);
  transition: transform 0.3s, box-shadow 0.3s;
}
.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(245, 158, 11, 0.25);
}
.pricing-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #000;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.pricing-plan {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}
.pricing-price {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 6px 0;
}
.pricing-price span {
  font-size: 12px;
  font-weight: 500;
  color: #a1a1aa;
}
.pricing-features {
  list-style: none;
  padding: 0;
  margin: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pricing-features li {
  font-size: 11px;
  color: #d4d4d8;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pricing-features li::before {
  content: '✓';
  color: #f59e0b;
  font-weight: bold;
}
.pricing-btn {
  width: 100%;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #000;
  font-weight: 700;
  font-size: 12px;
  border: none;
  border-radius: 8px;
  padding: 9px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}
.pricing-btn:hover {
  opacity: 0.92;
  transform: scale(1.02);
}`,
    htmlCode: `<div class="pricing-card">
  <div class="pricing-badge">Popular</div>
  <div class="pricing-plan">Pro Tier</div>
  <div class="pricing-price">$29<span>/month</span></div>
  <ul class="pricing-features">
    <li>Unlimited CSS Animations</li>
    <li>8-Direction Live Studio</li>
    <li>Multi-Framework Export</li>
    <li>Real-time Code Sync</li>
  </ul>
  <button class="pricing-btn">Upgrade to Pro</button>
</div>`,
  },
  {
    id: 'spotlight-search-bar',
    name: 'Spotlight Search Bar',
    category: 'components',
    description: 'Command-palette style search input with subtle ambient focus ring and hotkey badge.',
    cssCode: `.spotlight-input-wrap {
  position: relative;
  width: 270px;
  display: flex;
  align-items: center;
}
.spotlight-input {
  width: 100%;
  height: 42px;
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 0 42px 0 38px;
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.spotlight-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25), 0 8px 24px rgba(0, 0, 0, 0.4);
}
.spotlight-icon {
  position: absolute;
  left: 12px;
  color: #a1a1aa;
  font-size: 14px;
  pointer-events: none;
}
.spotlight-kbd {
  position: absolute;
  right: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 10px;
  color: #a1a1aa;
  font-family: monospace;
  pointer-events: none;
}`,
    htmlCode: `<div class="spotlight-input-wrap">
  <span class="spotlight-icon">🔍</span>
  <input class="spotlight-input" type="text" placeholder="Quick search effects..." />
  <kbd class="spotlight-kbd">⌘K</kbd>
</div>`,
  },
  {
    id: 'floating-action-menu',
    name: 'Floating Speed Dial',
    category: 'components',
    description: 'Material/iOS floating action circle that blooms into animated mini-action buttons on hover.',
    cssCode: `.fab-container {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fab-main {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #ea580c);
  color: #000;
  font-size: 22px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10;
}
.fab-container:hover .fab-main {
  transform: rotate(45deg);
}
.fab-item {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #18181f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  text-decoration: none;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
}
.fab-container:hover .fab-item:nth-child(1) {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(-56px);
}
.fab-container:hover .fab-item:nth-child(2) {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-42px, -36px);
}
.fab-container:hover .fab-item:nth-child(3) {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-56px, 0);
}`,
    htmlCode: `<div class="fab-container">
  <div class="fab-item">💬</div>
  <div class="fab-item">⭐</div>
  <div class="fab-item">📤</div>
  <button class="fab-main">+</button>
</div>`,
  },
  {
    id: 'overlapping-avatar-stack',
    name: 'Interactive Avatar Stack',
    category: 'components',
    description: 'Overlapping user avatars with live online status indicators, expanding stagger on hover, and count badge.',
    cssCode: `.avatar-stack {
  display: flex;
  align-items: center;
  padding: 10px;
}
.avatar-item {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2.5px solid #09090c;
  background: #27272a;
  margin-left: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s;
}
.avatar-item:first-child {
  margin-left: 0;
}
.avatar-item:hover {
  transform: translateY(-6px) scale(1.15);
  z-index: 10;
  border-color: #f59e0b;
}
.avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 9px;
  height: 9px;
  background: #10b981;
  border: 1.5px solid #09090c;
  border-radius: 50%;
}
.avatar-more {
  background: #18181f;
  color: #f59e0b;
  font-size: 11px;
}`,
    htmlCode: `<div class="avatar-stack">
  <div class="avatar-item" style="background: #3b82f6;">JD<span class="avatar-status"></span></div>
  <div class="avatar-item" style="background: #ec4899;">SA<span class="avatar-status"></span></div>
  <div class="avatar-item" style="background: #8b5cf6;">MR<span class="avatar-status"></span></div>
  <div class="avatar-item" style="background: #10b981;">KL<span class="avatar-status"></span></div>
  <div class="avatar-item avatar-more">+4</div>
</div>`,
  },
  {
    id: 'segmented-pill-control',
    name: 'Apple Segmented Control',
    category: 'components',
    description: 'macOS/iOS-style sliding pill segmented switch with tactile spring active transitions.',
    cssCode: `.segmented-control {
  display: inline-flex;
  background: #18181f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px;
  border-radius: 12px;
  position: relative;
  gap: 2px;
}
.segmented-btn {
  position: relative;
  z-index: 2;
  border: none;
  background: transparent;
  padding: 7px 18px;
  font-size: 12px;
  font-weight: 600;
  color: #a1a1aa;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.25s, background 0.25s, box-shadow 0.25s;
}
.segmented-btn.active {
  color: #000;
  background: #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
}
.segmented-btn:hover:not(.active) {
  color: #fff;
}`,
    htmlCode: `<div class="segmented-control">
  <button class="segmented-btn active">Daily</button>
  <button class="segmented-btn">Weekly</button>
  <button class="segmented-btn">Monthly</button>
</div>`,
  },
  {
    id: 'audio-waveform-player',
    name: 'Audio Waveform Player',
    category: 'components',
    description: 'Animated equalizer waveform bars with play/pause state and glowing track badge.',
    cssCode: `.audio-player {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #111116;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
.audio-play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f59e0b;
  color: #000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s;
}
.audio-play-btn:hover {
  transform: scale(1.08);
}
.waveform-bars {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 26px;
}
.waveform-bar {
  width: 3.5px;
  background: #f59e0b;
  border-radius: 999px;
  animation: waveEqualizer 1.2s ease-in-out infinite alternate;
}
.waveform-bar:nth-child(1) { height: 12px; animation-delay: 0.1s; }
.waveform-bar:nth-child(2) { height: 22px; animation-delay: 0.3s; }
.waveform-bar:nth-child(3) { height: 16px; animation-delay: 0.5s; }
.waveform-bar:nth-child(4) { height: 26px; animation-delay: 0.2s; }
.waveform-bar:nth-child(5) { height: 14px; animation-delay: 0.4s; }
.waveform-bar:nth-child(6) { height: 20px; animation-delay: 0.6s; }
@keyframes waveEqualizer {
  0% { transform: scaleY(0.3); opacity: 0.4; }
  100% { transform: scaleY(1.1); opacity: 1; }
}`,
    htmlCode: `<div class="audio-player">
  <button class="audio-play-btn">▶</button>
  <div>
    <div style="font-size: 11px; font-weight: 700; color: #fff; margin-bottom: 3px;">Cyber Synthwave</div>
    <div class="waveform-bars">
      <span class="waveform-bar"></span>
      <span class="waveform-bar"></span>
      <span class="waveform-bar"></span>
      <span class="waveform-bar"></span>
      <span class="waveform-bar"></span>
      <span class="waveform-bar"></span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'split-flap-countdown',
    name: 'Split-Flap Countdown',
    category: 'components',
    description: 'Split flip-card timer blocks with days/hours/minutes/seconds and glowing digits.',
    cssCode: `.countdown-wrap {
  display: flex;
  gap: 8px;
  align-items: center;
}
.countdown-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.countdown-digit {
  width: 44px;
  height: 48px;
  background: #18181f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 20px;
  font-weight: 800;
  color: #f59e0b;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
.countdown-digit::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(0, 0, 0, 0.6);
}
.countdown-label {
  font-size: 9px;
  color: #a1a1aa;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: 0.5px;
}`,
    htmlCode: `<div class="countdown-wrap">
  <div class="countdown-box">
    <div class="countdown-digit">04</div>
    <span class="countdown-label">Days</span>
  </div>
  <div class="countdown-box">
    <div class="countdown-digit">18</div>
    <span class="countdown-label">Hours</span>
  </div>
  <div class="countdown-box">
    <div class="countdown-digit">32</div>
    <span class="countdown-label">Mins</span>
  </div>
  <div class="countdown-box">
    <div class="countdown-digit">59</div>
    <span class="countdown-label">Secs</span>
  </div>
</div>`,
  },
  {
    id: 'floating-cookie-banner',
    name: 'Floating Glass Consent Banner',
    category: 'components',
    description: 'A frosted glass consent banner with backdrop-filter, accept/decline action buttons, and responsive layout.',
    cssCode: `.cookie-banner {
  max-width: 320px;
  background: rgba(18, 18, 24, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
  font-family: inherit;
  color: #fff;
}
.cookie-title {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}
.cookie-text {
  font-size: 11px;
  color: #a1a1aa;
  line-height: 1.4;
  margin-bottom: 10px;
}
.cookie-actions {
  display: flex;
  gap: 8px;
}
.cookie-btn-accept {
  flex: 1;
  background: #f59e0b;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}
.cookie-btn-accept:hover {
  opacity: 0.9;
}
.cookie-btn-decline {
  background: transparent;
  color: #d4d4d8;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  cursor: pointer;
}`,
    htmlCode: `<div class="cookie-banner">
  <div class="cookie-title">🍪 Cookie Preferences</div>
  <div class="cookie-text">We use cookies and telemetry to improve your interactive live studio experience.</div>
  <div class="cookie-actions">
    <button class="cookie-btn-accept">Accept All</button>
    <button class="cookie-btn-decline">Customize</button>
  </div>
</div>`,
  },
  // ==================== 18 NEW MEGAPACK EFFECTS ====================
  {
    id: 'bg-matrix-rain',
    name: 'Matrix Digital Rain',
    category: 'background',
    description: 'Green digital rain streaming columns with glowing head characters and fading trails.',
    cssCode: `.matrix-bg {
  width: 100%;
  height: 240px;
  background: #020b05;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  font-family: monospace;
}
.matrix-col {
  position: absolute;
  top: -160px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  color: #22c55e;
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: 700;
  text-shadow: 0 0 8px #22c55e, 0 0 16px #16a34a;
  animation: matrix-fall 3.5s linear infinite;
}
.matrix-col:nth-child(1) { left: 10%; animation-delay: 0s; }
.matrix-col:nth-child(2) { left: 26%; animation-delay: 1.2s; animation-duration: 2.8s; }
.matrix-col:nth-child(3) { left: 44%; animation-delay: 0.6s; animation-duration: 4.2s; }
.matrix-col:nth-child(4) { left: 62%; animation-delay: 1.9s; animation-duration: 3.2s; }
.matrix-col:nth-child(5) { left: 78%; animation-delay: 0.9s; animation-duration: 3.8s; }
.matrix-col:nth-child(6) { left: 92%; animation-delay: 0.3s; animation-duration: 3.4s; }
@keyframes matrix-fall {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(420px); opacity: 0; }
}`,
    htmlCode: `<div class="matrix-bg">
  <div class="matrix-col">0101100101010</div>
  <div class="matrix-col">1011001011010</div>
  <div class="matrix-col">0010110100101</div>
  <div class="matrix-col">1101001011010</div>
  <div class="matrix-col">0101101001011</div>
  <div class="matrix-col">1001011010010</div>
</div>`,
  },
  {
    id: 'bg-deep-space-warp',
    name: 'Deep Space Warp',
    category: 'background',
    description: 'Hyperspace starfield tunnel with radial stars streaking outward toward the viewer.',
    cssCode: `.space-warp-bg {
  width: 100%;
  height: 240px;
  background: radial-gradient(circle at center, #090919 0%, #030308 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.warp-star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px #fff;
  animation: warp-travel 2.5s cubic-bezier(0.6, 0, 0.4, 1) infinite;
}
.warp-star:nth-child(1) { --tx: -180px; --ty: -90px; animation-delay: 0.2s; }
.warp-star:nth-child(2) { --tx: 190px; --ty: -80px; animation-delay: 0.7s; }
.warp-star:nth-child(3) { --tx: -160px; --ty: 80px; animation-delay: 1.1s; }
.warp-star:nth-child(4) { --tx: 170px; --ty: 90px; animation-delay: 1.6s; }
.warp-star:nth-child(5) { --tx: 0px; --ty: -110px; animation-delay: 0.4s; }
.warp-star:nth-child(6) { --tx: 0px; --ty: 110px; animation-delay: 1.9s; }
@keyframes warp-travel {
  0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(3); opacity: 0; }
}`,
    htmlCode: `<div class="space-warp-bg">
  <div class="warp-star"></div>
  <div class="warp-star"></div>
  <div class="warp-star"></div>
  <div class="warp-star"></div>
  <div class="warp-star"></div>
  <div class="warp-star"></div>
</div>`,
  },
  {
    id: 'bg-conic-swirl',
    name: 'Conic Gradient Vortex',
    category: 'background',
    description: 'Hypnotic continuous rotating multi-stop conic gradient swirl with soft center glow.',
    cssCode: `.conic-vortex {
  width: 100%;
  height: 240px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background: #09090e;
  display: flex;
  align-items: center;
  justify-content: center;
}
.conic-vortex::before {
  content: '';
  position: absolute;
  width: 250%;
  height: 250%;
  background: conic-gradient(
    from 0deg,
    #f59e0b,
    #ec4899,
    #8b5cf6,
    #06b6d4,
    #10b981,
    #f59e0b
  );
  animation: conic-spin 10s linear infinite;
  opacity: 0.45;
  filter: blur(40px);
}
@keyframes conic-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="conic-vortex"></div>`,
  },
  {
    id: 'bg-cyber-grid-horizon',
    name: 'Synthwave Cyber Grid',
    category: 'background',
    description: '3D perspective floor grid with glowing neon horizon and retro sun gradient.',
    cssCode: `.synthwave-bg {
  width: 100%;
  height: 240px;
  background: linear-gradient(180deg, #090514 0%, #200d3d 50%, #0d041e 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  perspective: 450px;
}
.synthwave-sun {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(180deg, #fbbf24, #f43f5e);
  border-radius: 50%;
  box-shadow: 0 0 35px rgba(244, 63, 94, 0.7);
}
.synthwave-floor {
  position: absolute;
  bottom: -40%;
  left: -50%;
  width: 200%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(236, 72, 153, 0.4) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: rotateX(70deg);
  animation: grid-scroll 3s linear infinite;
}
@keyframes grid-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 30px; }
}`,
    htmlCode: `<div class="synthwave-bg">
  <div class="synthwave-sun"></div>
  <div class="synthwave-floor"></div>
</div>`,
  },
  {
    id: 'dynamic-island-pill',
    name: 'Dynamic Island Capsule',
    category: 'components',
    description: 'Apple iOS inspired morphing dynamic island that smoothly expands on hover with call & music states.',
    cssCode: `.dynamic-island {
  background: #000;
  color: #fff;
  border-radius: 28px;
  padding: 8px 16px;
  width: 140px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
}
.dynamic-island:hover {
  width: 280px;
  height: 64px;
  padding: 12px 18px;
  border-radius: 20px;
}
.island-icon {
  font-size: 16px;
}
.island-details {
  opacity: 0;
  width: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}
.dynamic-island:hover .island-details {
  opacity: 1;
  width: auto;
}`,
    htmlCode: `<div class="dynamic-island">
  <span class="island-icon">🎧</span>
  <div class="island-details">
    <div style="font-size: 11px; font-weight: 700;">Midnight City</div>
    <div style="font-size: 9px; color: #a1a1aa;">M83 &middot; Now Playing</div>
  </div>
  <span style="font-size: 12px; color: #22c55e;">●</span>
</div>`,
  },
  {
    id: 'floating-macos-dock',
    name: 'macOS Magnification Dock',
    category: 'components',
    description: 'Frosted desktop dock with parabolic hover magnification and bouncing app indicators.',
    cssCode: `.macos-dock {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
.dock-item {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), margin 0.2s ease;
  cursor: pointer;
}
.dock-item:hover {
  transform: scale(1.65) translateY(-10px);
  margin: 0 6px;
}`,
    htmlCode: `<div class="macos-dock">
  <div class="dock-item" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">📁</div>
  <div class="dock-item" style="background: linear-gradient(135deg, #ec4899, #be185d);">🎨</div>
  <div class="dock-item" style="background: linear-gradient(135deg, #10b981, #047857);">⚡</div>
  <div class="dock-item" style="background: linear-gradient(135deg, #f59e0b, #b45309);">🔥</div>
  <div class="dock-item" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);">⚙️</div>
</div>`,
  },
  {
    id: 'radial-wheel-menu',
    name: 'Radial Circular Action Menu',
    category: 'components',
    description: 'Circular radial speed dial that expands tools along an arc upon button trigger.',
    cssCode: `.radial-menu-wrap {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radial-center-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f59e0b;
  color: #000;
  border: none;
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
  transition: transform 0.3s;
}
.radial-menu-wrap:hover .radial-center-btn {
  transform: rotate(45deg);
}
.radial-node {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1e1e24;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
  opacity: 0;
  pointer-events: none;
}
.radial-menu-wrap:hover .radial-node {
  opacity: 1;
  pointer-events: auto;
}
.radial-menu-wrap:hover .radial-node:nth-child(2) { transform: translate(0, -50px); }
.radial-menu-wrap:hover .radial-node:nth-child(3) { transform: translate(46px, -20px); }
.radial-menu-wrap:hover .radial-node:nth-child(4) { transform: translate(32px, 40px); }
.radial-menu-wrap:hover .radial-node:nth-child(5) { transform: translate(-32px, 40px); }
.radial-menu-wrap:hover .radial-node:nth-child(6) { transform: translate(-46px, -20px); }`,
    htmlCode: `<div class="radial-menu-wrap">
  <button class="radial-center-btn">✦</button>
  <div class="radial-node">🚀</div>
  <div class="radial-node">⭐</div>
  <div class="radial-node">❤️</div>
  <div class="radial-node">💬</div>
  <div class="radial-node">📤</div>
</div>`,
  },
  {
    id: 'interactive-code-card',
    name: 'Frosted Code Snippet Window',
    category: 'components',
    description: 'macOS dark theme terminal card with window control dots, line numbers, and glowing syntax.',
    cssCode: `.code-card-window {
  width: 290px;
  background: #0e0e13;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  font-family: monospace;
}
.code-card-header {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code-dots {
  display: flex;
  gap: 5px;
}
.code-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.code-content {
  padding: 12px;
  font-size: 11px;
  line-height: 1.6;
  color: #a5b4fc;
}`,
    htmlCode: `<div class="code-card-window">
  <div class="code-card-header">
    <div class="code-dots">
      <span class="code-dot" style="background:#ef4444;"></span>
      <span class="code-dot" style="background:#f59e0b;"></span>
      <span class="code-dot" style="background:#10b981;"></span>
    </div>
    <span style="font-size: 10px; color: #71717a;">effect.config.ts</span>
  </div>
  <div class="code-content">
    <span style="color:#f43f5e;">const</span> studio = <span style="color:#38bdf8;">new</span> Studio({<br/>
    &nbsp;&nbsp;theme: <span style="color:#a3e635;">'cyberpunk'</span>,<br/>
    &nbsp;&nbsp;fps: <span style="color:#fbbf24;">120</span><br/>
    });
  </div>
</div>`,
  },
  {
    id: 'glass-modal-dialog',
    name: 'Frosted Glass Popover Dialog',
    category: 'components',
    description: 'Polished modal dialog with frosted glass sheen, icon badge, and dual confirmation buttons.',
    cssCode: `.glass-modal-box {
  width: 280px;
  background: rgba(20, 20, 28, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 18px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
}
.glass-modal-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 18px;
}
.glass-modal-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}
.glass-modal-desc {
  font-size: 11px;
  color: #a1a1aa;
  margin-bottom: 14px;
}
.glass-modal-btn {
  width: 100%;
  padding: 8px;
  background: #f59e0b;
  color: #000;
  font-weight: 700;
  font-size: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.glass-modal-btn:hover {
  opacity: 0.9;
}`,
    htmlCode: `<div class="glass-modal-box">
  <div class="glass-modal-icon">✦</div>
  <div class="glass-modal-title">Upgrade to Pro</div>
  <div class="glass-modal-desc">Unlock 100+ components, unlimited export presets, and fast rendering.</div>
  <button class="glass-modal-btn">Continue &rarr;</button>
</div>`,
  },
  {
    id: 'music-mini-player',
    name: 'Glassmorphic Music Player',
    category: 'components',
    description: 'Compact audio widget with spinning vinyl disk, equalizer wave, and track controls.',
    cssCode: `.music-player-card {
  width: 280px;
  background: rgba(15, 15, 20, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}
.vinyl-disk {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle, #f59e0b 20%, #111 21%, #111 40%, #f59e0b 41%, #111 42%);
  border: 2px solid rgba(255,255,255,0.2);
  animation: vinyl-spin 4s linear infinite;
  flex-shrink: 0;
}
@keyframes vinyl-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="music-player-card">
  <div class="vinyl-disk"></div>
  <div style="flex: 1; min-width: 0;">
    <div style="font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Starlight Voyage</div>
    <div style="font-size: 10px; color: #f59e0b;">Cosmic Waves</div>
  </div>
  <button style="width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; border: none; font-size: 11px; cursor: pointer;">▶</button>
</div>`,
  },
  {
    id: 'liquid-morph-button',
    name: 'Liquid Gel Blob Button',
    category: 'hover',
    description: 'A button with organic fluid blobs that morph and merge smoothly on mouse hover.',
    cssCode: `.liquid-btn {
  position: relative;
  padding: 12px 28px;
  background: #f59e0b;
  color: #000;
  font-weight: 700;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s;
}
.liquid-btn:hover {
  transform: scale(1.05);
}
.liquid-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 60%);
  transform: scale(0);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.liquid-btn:hover::before {
  transform: scale(1);
}`,
    htmlCode: `<button class="liquid-btn">Liquid Morph</button>`,
  },
  {
    id: 'magnetic-glow-button',
    name: 'Magnetic Ambient Button',
    category: 'hover',
    description: 'An interactive button with an ambient radial aura that pulses and attracts the cursor.',
    cssCode: `.magnetic-btn {
  position: relative;
  background: #0d0d12;
  color: #fff;
  padding: 12px 30px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.magnetic-btn:hover {
  border-color: #f59e0b;
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.5), inset 0 0 15px rgba(245, 158, 11, 0.2);
  transform: translateY(-2px);
}`,
    htmlCode: `<button class="magnetic-btn">Magnetic Glow</button>`,
  },
  {
    id: 'neon-shimmer-border',
    name: 'Laser Beam Travelling Border',
    category: 'border',
    description: 'A continuous laser light segment racing along the perimeter of the container card.',
    cssCode: `.laser-border-box {
  position: relative;
  width: 200px;
  height: 110px;
  background: #0a0a0f;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
}
.laser-border-box::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: conic-gradient(transparent, #f59e0b 25%, transparent 35%);
  animation: laser-spin 4s linear infinite;
}
.laser-border-box::after {
  content: 'Laser Border';
  position: absolute;
  inset: 2px;
  background: #0a0a0f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
@keyframes laser-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="laser-border-box"></div>`,
  },
  {
    id: 'holographic-foil-card',
    name: 'Iridescent Holographic Foil',
    category: 'advanced',
    description: 'Reflective foil collector card with dynamic rainbow diagonal sheen and glass grain.',
    cssCode: `.holo-foil-card {
  width: 190px;
  height: 130px;
  border-radius: 14px;
  background: linear-gradient(135deg, #111 0%, #1f1f2e 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  cursor: pointer;
}
.holo-foil-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 0, 150, 0.4) 35%,
    rgba(0, 200, 255, 0.4) 50%,
    rgba(255, 220, 0, 0.4) 65%,
    transparent 80%
  );
  background-size: 200% 200%;
  animation: holo-sweep 4s ease-in-out infinite alternate;
  mix-blend-mode: color-dodge;
}
@keyframes holo-sweep {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}`,
    htmlCode: `<div class="holo-foil-card">
  <span style="position:relative; z-index:2;">HOLO FOIL</span>
</div>`,
  },
  {
    id: 'kinetic-3d-stack',
    name: '3D Exploded Layer Stack',
    category: '3d',
    description: 'Layered cards in 3D perspective that expand and separate into floating spatial sheets.',
    cssCode: `.layer-stack-wrap {
  position: relative;
  width: 130px;
  height: 90px;
  perspective: 600px;
  cursor: pointer;
}
.layer-sheet {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.5);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.layer-sheet:nth-child(1) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(0px); }
.layer-sheet:nth-child(2) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(12px); background: rgba(236, 72, 153, 0.25); border-color: #ec4899; }
.layer-sheet:nth-child(3) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(24px); background: rgba(59, 130, 246, 0.3); border-color: #3b82f6; }
.layer-stack-wrap:hover .layer-sheet:nth-child(1) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(0px); }
.layer-stack-wrap:hover .layer-sheet:nth-child(2) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(30px); }
.layer-stack-wrap:hover .layer-sheet:nth-child(3) { transform: rotateX(55deg) rotateZ(-35deg) translateZ(60px); }`,
    htmlCode: `<div class="layer-stack-wrap">
  <div class="layer-sheet"></div>
  <div class="layer-sheet"></div>
  <div class="layer-sheet"></div>
</div>`,
  },
  {
    id: 'cylinder-photo-carousel',
    name: '3D Revolving Cylinder Carousel',
    category: '3d',
    description: '3D carousel arrangement orbiting cards in circular formation on a continuous Y-axis rotation.',
    cssCode: `.cylinder-scene {
  perspective: 700px;
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cylinder-ring {
  width: 60px;
  height: 60px;
  position: relative;
  transform-style: preserve-3d;
  animation: ring-turn 9s linear infinite;
}
.cylinder-panel {
  position: absolute;
  width: 44px;
  height: 54px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #000;
}
.cylinder-panel:nth-child(1) { transform: rotateY(0deg) translateZ(55px); }
.cylinder-panel:nth-child(2) { transform: rotateY(90deg) translateZ(55px); background: #3b82f6; }
.cylinder-panel:nth-child(3) { transform: rotateY(180deg) translateZ(55px); background: #10b981; }
.cylinder-panel:nth-child(4) { transform: rotateY(270deg) translateZ(55px); background: #ec4899; }
@keyframes ring-turn {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}`,
    htmlCode: `<div class="cylinder-scene">
  <div class="cylinder-ring">
    <div class="cylinder-panel">01</div>
    <div class="cylinder-panel">02</div>
    <div class="cylinder-panel">03</div>
    <div class="cylinder-panel">04</div>
  </div>
</div>`,
  },
  {
    id: 'liquid-fill-loader',
    name: 'Liquid Wave Fill Spinner',
    category: 'loading',
    description: 'A circular flask or sphere filling with fluid waves undulating up and down.',
    cssCode: `.liquid-flask {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #f59e0b;
  position: relative;
  overflow: hidden;
  background: #09090e;
}
.liquid-wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: #f59e0b;
  top: 40%;
  left: -50%;
  border-radius: 40%;
  animation: flask-wave 4s linear infinite;
  opacity: 0.85;
}
@keyframes flask-wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="liquid-flask">
  <div class="liquid-wave"></div>
</div>`,
  },
  {
    id: 'glitch-cyber-card',
    name: 'Cyberpunk RGB Glitch Card',
    category: 'advanced',
    description: 'A digital high-tech card with chromatic aberration RGB split glitch jitter.',
    cssCode: `.glitch-card {
  position: relative;
  width: 190px;
  height: 110px;
  background: #0d0d12;
  border: 1px solid #06b6d4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-weight: 700;
  color: #06b6d4;
  text-shadow: 2px 2px #ef4444, -2px -2px #3b82f6;
  animation: cyber-glitch 3s infinite;
  overflow: hidden;
}
@keyframes cyber-glitch {
  0%, 90%, 100% { transform: translate(0, 0); }
  92% { transform: translate(-3px, 2px) skewX(2deg); }
  94% { transform: translate(3px, -2px) skewX(-2deg); }
  96% { transform: translate(-2px, -1px); }
  98% { transform: translate(1px, 2px); }
}`,
    htmlCode: `<div class="glitch-card">SYSTEM ACTIVE</div>`,
  },
  // ==================== 50 NEW MEGAPACK EFFECTS (PART 1: 1-25) ====================
  {
    id: 'command-menu-palette',
    name: 'Command Menu Palette (⌘K)',
    category: 'components',
    description: 'Raycast/Linear style floating spotlight command bar with search input and keyboard shortcut chips.',
    cssCode: `.cmd-palette-box {
  width: 280px;
  background: rgba(18, 18, 24, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  padding: 10px;
  font-family: system-ui, sans-serif;
}
.cmd-search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 10px;
  color: #fff;
  font-size: 11px;
  outline: none;
}
.cmd-search-input:focus {
  border-color: #f59e0b;
}
.cmd-item-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.2s ease;
}
.cmd-item:hover, .cmd-item.active {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}
.cmd-badge {
  font-size: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 5px;
  border-radius: 4px;
  font-family: monospace;
}`,
    htmlCode: `<div class="cmd-palette-box">
  <input class="cmd-search-input" placeholder="Type a command or search..." value="Search effects..." />
  <div class="cmd-item-list">
    <div class="cmd-item active">
      <span>⚡ Quick Export Component</span>
      <span class="cmd-badge">⌘E</span>
    </div>
    <div class="cmd-item">
      <span>🎨 Switch Theme Mode</span>
      <span class="cmd-badge">⌘T</span>
    </div>
    <div class="cmd-item">
      <span>📂 Browse 150+ Library</span>
      <span class="cmd-badge">⌘B</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'animated-file-tree',
    name: 'IDE Interactive File Tree',
    category: 'components',
    description: 'Hierarchical file tree with folder expansion, active selection, and file type icons.',
    cssCode: `.file-tree-wrap {
  width: 240px;
  background: #0d0e15;
  border: 1px solid #27272a;
  border-radius: 10px;
  padding: 10px;
  font-family: monospace;
  font-size: 11px;
}
.tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 4px;
  color: #a1a1aa;
  cursor: pointer;
  transition: background 0.15s;
}
.tree-node:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}
.tree-node.active {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  font-weight: bold;
}
.tree-indent {
  padding-left: 14px;
}`,
    htmlCode: `<div class="file-tree-wrap">
  <div class="tree-node">📁 src/components</div>
  <div class="tree-indent">
    <div class="tree-node active">📄 LiveStudioModal.tsx</div>
    <div class="tree-node">📄 EffectCard.tsx</div>
  </div>
  <div class="tree-node">📁 src/styles</div>
  <div class="tree-indent">
    <div class="tree-node">🎨 effects.css</div>
  </div>
</div>`,
  },
  {
    id: 'split-button-dropdown',
    name: 'Split Action Button',
    category: 'components',
    description: 'Split action button with primary trigger and animated chevron menu popout.',
    cssCode: `.split-btn-group {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
}
.split-main-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #000;
  font-weight: 700;
  font-size: 12px;
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.split-chevron-btn {
  background: #b45309;
  color: #000;
  padding: 8px 10px;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background 0.2s;
}
.split-main-btn:hover { opacity: 0.9; }
.split-chevron-btn:hover { background: #92400e; }`,
    htmlCode: `<div class="split-btn-group">
  <button class="split-main-btn">Deploy Studio</button>
  <button class="split-chevron-btn">▼</button>
</div>`,
  },
  {
    id: 'stepper-form-wizard',
    name: 'Multi-Step Wizard Bar',
    category: 'components',
    description: 'Clean progress wizard step indicators with completed checks and animated active state.',
    cssCode: `.wizard-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 280px;
}
.wizard-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.wizard-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: #18181b;
  border: 2px solid #3f3f46;
  color: #71717a;
}
.wizard-step.done .wizard-circle {
  background: #10b981;
  border-color: #10b981;
  color: #000;
}
.wizard-step.active .wizard-circle {
  background: #f59e0b;
  border-color: #f59e0b;
  color: #000;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
}
.wizard-line {
  flex: 1;
  height: 2px;
  background: #27272a;
  margin: 0 6px;
  margin-bottom: 16px;
}
.wizard-line.done {
  background: #10b981;
}
.wizard-label {
  font-size: 9px;
  color: #a1a1aa;
}`,
    htmlCode: `<div class="wizard-bar">
  <div class="wizard-step done">
    <div class="wizard-circle">✓</div>
    <span class="wizard-label">Design</span>
  </div>
  <div class="wizard-line done"></div>
  <div class="wizard-step active">
    <div class="wizard-circle">2</div>
    <span class="wizard-label">Code</span>
  </div>
  <div class="wizard-line"></div>
  <div class="wizard-step">
    <div class="wizard-circle">3</div>
    <span class="wizard-label">Ship</span>
  </div>
</div>`,
  },
  {
    id: 'gradient-pricing-slider',
    name: 'Interactive Pricing Slider',
    category: 'components',
    description: 'SaaS pricing slider with dynamic monthly tier value and gradient track glow.',
    cssCode: `.pricing-slider-card {
  width: 260px;
  background: #12121a;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 14px;
}
.price-display {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}
.price-amount {
  font-size: 24px;
  font-weight: 800;
  color: #f59e0b;
}
.price-unit {
  font-size: 10px;
  color: #71717a;
}
.custom-range {
  width: 100%;
  accent-color: #f59e0b;
  cursor: pointer;
}`,
    htmlCode: `<div class="pricing-slider-card">
  <div class="price-display">
    <span class="price-amount">$29</span>
    <span class="price-unit">/mo &middot; Pro Team</span>
  </div>
  <input type="range" min="1" max="100" value="29" class="custom-range" />
</div>`,
  },
  {
    id: 'activity-feed-timeline',
    name: 'Activity Stream Timeline',
    category: 'components',
    description: 'GitHub-style activity stream with glowing pulse nodes and timestamp tags.',
    cssCode: `.feed-wrap {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  padding-left: 16px;
}
.feed-wrap::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: #27272a;
}
.feed-item {
  position: relative;
  font-size: 11px;
}
.feed-dot {
  position: absolute;
  left: -16px;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f59e0b;
  border: 2px solid #09090c;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}
.feed-title {
  font-weight: 600;
  color: #fff;
}
.feed-time {
  font-size: 9px;
  color: #71717a;
}`,
    htmlCode: `<div class="feed-wrap">
  <div class="feed-item">
    <div class="feed-dot"></div>
    <div class="feed-title">Released 150+ Megapack</div>
    <div class="feed-time">Just now</div>
  </div>
  <div class="feed-item">
    <div class="feed-dot" style="background:#10b981;"></div>
    <div class="feed-title">Fixed Live Studio Canvas</div>
    <div class="feed-time">5m ago</div>
  </div>
</div>`,
  },
  {
    id: 'color-picker-wheel',
    name: 'Color Swatch Wheel Selector',
    category: 'components',
    description: 'Interactive chromatic swatch circles with active glowing selection ring.',
    cssCode: `.swatch-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #18181b;
  padding: 8px 12px;
  border-radius: 30px;
  border: 1px solid #27272a;
}
.swatch-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.swatch-dot:hover {
  transform: scale(1.25);
}
.swatch-dot.selected {
  outline: 2px solid #fff;
  outline-offset: 2px;
  box-shadow: 0 0 10px currentColor;
}`,
    htmlCode: `<div class="swatch-row">
  <div class="swatch-dot selected" style="background: #f59e0b;"></div>
  <div class="swatch-dot" style="background: #10b981;"></div>
  <div class="swatch-dot" style="background: #06b6d4;"></div>
  <div class="swatch-dot" style="background: #8b5cf6;"></div>
  <div class="swatch-dot" style="background: #ec4899;"></div>
</div>`,
  },
  {
    id: 'glass-cookie-consent-bar',
    name: 'Glassmorphic Consent Pill',
    category: 'components',
    description: 'Compact floating glassmorphic cookie consent pill with glowing accept/decline buttons.',
    cssCode: `.consent-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(24, 24, 27, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 14px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  font-size: 11px;
}
.consent-btn-ok {
  background: #f59e0b;
  color: #000;
  font-weight: 700;
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}`,
    htmlCode: `<div class="consent-pill">
  <span>🍪 Enable studio analytics?</span>
  <button class="consent-btn-ok">Allow</button>
</div>`,
  },
  {
    id: 'spotlight-glow-border-btn',
    name: 'Spotlight Border Button',
    category: 'hover',
    description: 'Button with high-intensity perimeter spotlight glow on hover.',
    cssCode: `.spotlight-btn {
  position: relative;
  padding: 10px 22px;
  background: #09090c;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
}
.spotlight-btn::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: radial-gradient(circle at 50% 0%, #f59e0b, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.spotlight-btn:hover {
  border-color: #f59e0b;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}
.spotlight-btn:hover::before {
  opacity: 1;
}`,
    htmlCode: `<button class="spotlight-btn">Spotlight Hover</button>`,
  },
  {
    id: 'isometric-cube-button',
    name: '3D Isometric Cube Button',
    category: 'hover',
    description: '3D extruded cube push button that presses down into space when hovered and clicked.',
    cssCode: `.iso-cube-btn {
  position: relative;
  padding: 10px 20px;
  background: #f59e0b;
  color: #000;
  font-weight: 800;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 6px 0 #b45309, 0 12px 18px rgba(0,0,0,0.5);
  transition: all 0.15s ease;
}
.iso-cube-btn:hover {
  transform: translateY(2px);
  box-shadow: 0 4px 0 #b45309, 0 8px 12px rgba(0,0,0,0.4);
}
.iso-cube-btn:active {
  transform: translateY(6px);
  box-shadow: 0 0 0 #b45309;
}`,
    htmlCode: `<button class="iso-cube-btn">PUSH ME</button>`,
  },
  {
    id: 'split-curtain-reveal-btn',
    name: 'Dual Curtain Reveal Button',
    category: 'hover',
    description: 'Button with dual horizontal shutter curtains sliding apart on cursor hover.',
    cssCode: `.curtain-btn {
  position: relative;
  padding: 10px 24px;
  background: transparent;
  color: #fff;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
}
.curtain-btn::before, .curtain-btn::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: #f59e0b;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
.curtain-btn::before { left: 0; transform: scaleX(0); transform-origin: left; }
.curtain-btn::after { right: 0; transform: scaleX(0); transform-origin: right; }
.curtain-btn:hover { color: #000; }
.curtain-btn:hover::before, .curtain-btn:hover::after { transform: scaleX(1); }`,
    htmlCode: `<button class="curtain-btn">Curtain Reveal</button>`,
  },
  {
    id: 'glitch-cyberpunk-btn',
    name: 'Glitch Cyberpunk Button',
    category: 'hover',
    description: 'Button with RGB color displacement and glitch shake on cursor interaction.',
    cssCode: `.glitch-btn {
  padding: 10px 24px;
  background: #06b6d4;
  color: #000;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 1px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}
.glitch-btn:hover {
  animation: btn-jitter 0.2s infinite;
  box-shadow: -2px 0 #f43f5e, 2px 0 #8b5cf6;
}
@keyframes btn-jitter {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-1px, -2px); }
  100% { transform: translate(0, 0); }
}`,
    htmlCode: `<button class="glitch-btn">CYBER GLITCH</button>`,
  },
  {
    id: 'gravity-magnetic-pill',
    name: 'Magnetic Gravity Button',
    category: 'hover',
    description: 'Pill button with fluid spring scaling and glowing core rebound.',
    cssCode: `.magnetic-pill {
  padding: 10px 26px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s;
}
.magnetic-pill:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.5);
}`,
    htmlCode: `<button class="magnetic-pill">Magnetic Core</button>`,
  },
  {
    id: 'dna-helix-loader',
    name: '3D DNA Double Helix Loader',
    category: 'loading',
    description: 'Dual strand 3D oscillating DNA helix particle wave spinner.',
    cssCode: `.dna-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
}
.dna-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
  animation: dna-wave 1.4s ease-in-out infinite alternate;
}
.dna-dot:nth-child(1) { animation-delay: 0s; background: #f59e0b; }
.dna-dot:nth-child(2) { animation-delay: 0.2s; background: #ec4899; }
.dna-dot:nth-child(3) { animation-delay: 0.4s; background: #8b5cf6; }
.dna-dot:nth-child(4) { animation-delay: 0.6s; background: #06b6d4; }
.dna-dot:nth-child(5) { animation-delay: 0.8s; background: #10b981; }
@keyframes dna-wave {
  0% { transform: translateY(-16px) scale(0.6); opacity: 0.4; }
  100% { transform: translateY(16px) scale(1.2); opacity: 1; }
}`,
    htmlCode: `<div class="dna-wrap">
  <div class="dna-dot"></div>
  <div class="dna-dot"></div>
  <div class="dna-dot"></div>
  <div class="dna-dot"></div>
  <div class="dna-dot"></div>
</div>`,
  },
  {
    id: 'orbit-ring-spinner',
    name: 'Planetary Orbit Rings',
    category: 'loading',
    description: '3 Concentric counter-rotating planetary rings with glowing satellite beacons.',
    cssCode: `.orbit-system {
  position: relative;
  width: 50px;
  height: 50px;
}
.orbit-ring {
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(245, 158, 11, 0.4);
  border-radius: 50%;
  animation: orbit-spin 3s linear infinite;
}
.orbit-ring:nth-child(2) {
  inset: 6px;
  border-color: rgba(236, 72, 153, 0.5);
  animation-duration: 2s;
  animation-direction: reverse;
}
.orbit-ring:nth-child(3) {
  inset: 12px;
  border-color: rgba(6, 182, 212, 0.6);
  animation-duration: 1.2s;
}
@keyframes orbit-spin {
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="orbit-system">
  <div class="orbit-ring"></div>
  <div class="orbit-ring"></div>
  <div class="orbit-ring"></div>
</div>`,
  },
  {
    id: 'morphing-geometric-loader',
    name: 'Morphing Geometric Spinner',
    category: 'loading',
    description: 'Continuous smooth geometric transformation from circle to square to diamond.',
    cssCode: `.morph-geom {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #f59e0b, #f43f5e);
  animation: geom-morph 2s ease-in-out infinite;
}
@keyframes geom-morph {
  0% { border-radius: 50%; transform: rotate(0deg); }
  50% { border-radius: 0%; transform: rotate(180deg) scale(0.8); }
  100% { border-radius: 50%; transform: rotate(360deg); }
}`,
    htmlCode: `<div class="morph-geom"></div>`,
  },
  {
    id: 'liquid-pulse-dots',
    name: 'Liquid Pulsing Dots',
    category: 'loading',
    description: 'Metaball fluid dots fusing together and pulsing outward.',
    cssCode: `.liquid-dots-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.liq-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #38bdf8;
  animation: liq-bounce 1s ease-in-out infinite alternate;
}
.liq-dot:nth-child(2) { animation-delay: 0.2s; }
.liq-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes liq-bounce {
  0% { transform: scale(0.5); opacity: 0.3; }
  100% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #38bdf8; }
}`,
    htmlCode: `<div class="liquid-dots-wrap">
  <div class="liq-dot"></div>
  <div class="liq-dot"></div>
  <div class="liq-dot"></div>
</div>`,
  },
  {
    id: 'cyber-radar-sweep',
    name: 'Cyber Radar Sweep',
    category: 'loading',
    description: 'Sci-fi military radar circular scanner with rotating sweep beam.',
    cssCode: `.radar-scanner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #10b981;
  position: relative;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
  overflow: hidden;
}
.radar-scanner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg, rgba(16, 185, 129, 0.6) 0deg, transparent 60deg);
  animation: radar-turn 2s linear infinite;
}
@keyframes radar-turn {
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="radar-scanner"></div>`,
  },
  {
    id: 'matrix-decode-text',
    name: 'Matrix Cipher Decryption Text',
    category: 'text',
    description: 'Hacker cipher decryption effect with green terminal character flicker.',
    cssCode: `.matrix-decode-txt {
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
  color: #22c55e;
  text-shadow: 0 0 8px #22c55e;
  letter-spacing: 2px;
  animation: matrix-scramble 1.5s infinite;
}
@keyframes matrix-scramble {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; text-shadow: 0 0 15px #15803d; }
}`,
    htmlCode: `<div class="matrix-decode-txt">&lt;ACCESS_GRANTED /&gt;</div>`,
  },
  {
    id: 'liquid-fill-text',
    name: 'Liquid Wave Fill Text',
    category: 'text',
    description: 'Typography with rising fluid water wave animated inside the letterforms.',
    cssCode: `.liquid-txt {
  font-size: 26px;
  font-weight: 900;
  color: transparent;
  background: linear-gradient(180deg, #38bdf8 0%, #1e40af 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5));
  animation: liquid-wave-float 2s ease-in-out infinite alternate;
}
@keyframes liquid-wave-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}`,
    htmlCode: `<div class="liquid-txt">OCEAN WAVE</div>`,
  },
  {
    id: 'chrome-metallic-text',
    name: '80s Chrome Metallic Text',
    category: 'text',
    description: 'Retro synthwave shiny chrome metallic specular gradient typography.',
    cssCode: `.chrome-txt {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(180deg, #fff 0%, #94a3b8 45%, #0f172a 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
}`,
    htmlCode: `<div class="chrome-txt">FUTURE SYNTH</div>`,
  },
  {
    id: 'kinetic-stagger-text',
    name: 'Kinetic Elastic Text',
    category: 'text',
    description: 'Bouncy kinetic typographic letters with spring elasticity.',
    cssCode: `.kinetic-txt-wrap {
  display: flex;
  gap: 2px;
  font-size: 22px;
  font-weight: 800;
  color: #fbbf24;
}
.kinetic-letter {
  display: inline-block;
  animation: kinetic-bounce 1.2s ease-in-out infinite alternate;
}
.kinetic-letter:nth-child(2) { animation-delay: 0.1s; }
.kinetic-letter:nth-child(3) { animation-delay: 0.2s; }
.kinetic-letter:nth-child(4) { animation-delay: 0.3s; }
.kinetic-letter:nth-child(5) { animation-delay: 0.4s; }
@keyframes kinetic-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}`,
    htmlCode: `<div class="kinetic-txt-wrap">
  <span class="kinetic-letter">B</span>
  <span class="kinetic-letter">O</span>
  <span class="kinetic-letter">U</span>
  <span class="kinetic-letter">N</span>
  <span class="kinetic-letter">D</span>
</div>`,
  },
  {
    id: 'neon-burn-in-text',
    name: 'Neon Gas Burn-In Text',
    category: 'text',
    description: 'Flickering vintage neon ignition with electric buzzing glow.',
    cssCode: `.neon-burn-txt {
  font-size: 20px;
  font-weight: 800;
  color: #f43f5e;
  text-shadow: 0 0 5px #f43f5e, 0 0 15px #f43f5e, 0 0 30px #e11d48;
  animation: neon-flicker 2.5s infinite;
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 5px #f43f5e, 0 0 15px #f43f5e, 0 0 30px #e11d48;
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.3;
  }
}`,
    htmlCode: `<div class="neon-burn-txt">OPEN 24/7</div>`,
  },
  {
    id: 'quantum-particle-field',
    name: 'Quantum Particle Grid',
    category: 'background',
    description: 'Floating constellation quantum particle grid with subtle glow.',
    cssCode: `.quantum-bg {
  width: 100%;
  height: 240px;
  background: #06070d;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(rgba(245, 158, 11, 0.25) 1px, transparent 1px);
  background-size: 18px 18px;
  animation: quantum-drift 8s linear infinite;
}
@keyframes quantum-drift {
  0% { background-position: 0 0; }
  100% { background-position: 36px 36px; }
}`,
    htmlCode: `<div class="quantum-bg"></div>`,
  },
  {
    id: 'crt-scanline-retro',
    name: 'Vintage CRT Scanlines',
    category: 'background',
    description: 'Retro arcade CRT monitor scanlines with phosphor curvature and soft flicker.',
    cssCode: `.crt-screen {
  width: 100%;
  height: 240px;
  background: #0a110a;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.9);
}
.crt-screen::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}`,
    htmlCode: `<div class="crt-screen"></div>`,
  },
  // ==================== 50 NEW MEGAPACK EFFECTS (PART 2: 26-50) ====================
  {
    id: 'cyber-hex-mesh',
    name: 'Cybernetic Hex Mesh',
    category: 'background',
    description: 'Futuristic animated honeycomb hexagon grid with travelling neon light nodes.',
    cssCode: `.hex-mesh-bg {
  width: 100%;
  height: 240px;
  background: #090910;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(#06b6d4 1.5px, transparent 1.5px), radial-gradient(#06b6d4 1.5px, #090910 1.5px);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
  opacity: 0.85;
}`,
    htmlCode: `<div class="hex-mesh-bg"></div>`,
  },
  {
    id: 'flowing-lava-lamp',
    name: 'Flowing Lava Lamp',
    category: 'background',
    description: 'Hypnotic organic metaball fluid lava blobs undulating smoothly in container.',
    cssCode: `.lava-bg {
  width: 100%;
  height: 240px;
  background: #0f051d;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.lava-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(25px);
  opacity: 0.7;
  animation: lava-float 6s ease-in-out infinite alternate;
}
.lava-blob:nth-child(1) {
  width: 120px;
  height: 120px;
  background: #f43f5e;
  top: 10%;
  left: 20%;
}
.lava-blob:nth-child(2) {
  width: 140px;
  height: 140px;
  background: #a855f7;
  bottom: 10%;
  right: 15%;
  animation-delay: -3s;
}
@keyframes lava-float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -30px) scale(1.2); }
}`,
    htmlCode: `<div class="lava-bg">
  <div class="lava-blob"></div>
  <div class="lava-blob"></div>
</div>`,
  },
  {
    id: 'nebula-cloud-drift',
    name: 'Deep Space Nebula Drift',
    category: 'background',
    description: 'Cosmic celestial gas cloud drifting slowly across deep space stars.',
    cssCode: `.nebula-bg {
  width: 100%;
  height: 240px;
  background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #030712 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.nebula-cloud {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%);
  filter: blur(40px);
  animation: nebula-spin 20s linear infinite;
}
@keyframes nebula-spin {
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="nebula-bg">
  <div class="nebula-cloud"></div>
</div>`,
  },
  {
    id: 'isometric-device-mockup',
    name: '3D Isometric Device Mockup',
    category: '3d',
    description: 'Floating glass smartphone mockup in 3D isometric perspective with illuminated screen.',
    cssCode: `.device-scene {
  perspective: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.device-frame {
  width: 110px;
  height: 180px;
  background: #18181b;
  border: 4px solid #3f3f46;
  border-radius: 18px;
  transform: rotateX(30deg) rotateY(-25deg) rotateZ(10deg);
  box-shadow: -15px 20px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.3);
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  transition: transform 0.3s;
}
.device-frame:hover {
  transform: rotateX(20deg) rotateY(-15deg) rotateZ(5deg) translateY(-8px);
}
.device-screen {
  flex: 1;
  background: linear-gradient(135deg, #1e1e24, #0d0d12);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
  font-size: 10px;
  font-weight: 700;
}`,
    htmlCode: `<div class="device-scene">
  <div class="device-frame">
    <div class="device-screen">CSSHUB PRO</div>
  </div>
</div>`,
  },
  {
    id: '3d-cube-carousel',
    name: '3D Rotating Showcase Cube',
    category: '3d',
    description: '4-Sided isometric geometric prism continuously rotating in 3D spatial axis.',
    cssCode: `.cube-scene {
  perspective: 500px;
  width: 70px;
  height: 70px;
}
.cube-box {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: cube-spin 8s linear infinite;
}
.cube-face {
  position: absolute;
  width: 70px;
  height: 70px;
  background: rgba(245, 158, 11, 0.2);
  border: 2px solid #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.cube-front  { transform: rotateY(0deg) translateZ(35px); }
.cube-right  { transform: rotateY(90deg) translateZ(35px); background: rgba(236, 72, 153, 0.2); border-color: #ec4899; }
.cube-back   { transform: rotateY(180deg) translateZ(35px); }
.cube-left   { transform: rotateY(-90deg) translateZ(35px); background: rgba(6, 182, 212, 0.2); border-color: #06b6d4; }
@keyframes cube-spin {
  0% { transform: rotateX(-20deg) rotateY(0deg); }
  100% { transform: rotateX(-20deg) rotateY(360deg); }
}`,
    htmlCode: `<div class="cube-scene">
  <div class="cube-box">
    <div class="cube-face cube-front">✦</div>
    <div class="cube-face cube-right">⚡</div>
    <div class="cube-face cube-back">🎨</div>
    <div class="cube-face cube-left">🚀</div>
  </div>
</div>`,
  },
  {
    id: 'origami-fold-card',
    name: 'Origami 3D Accordion Fold',
    category: '3d',
    description: 'Paper origami style card that unfolds dynamically along creased 3D axis on hover.',
    cssCode: `.origami-wrap {
  perspective: 600px;
}
.origami-panel {
  width: 160px;
  padding: 14px;
  background: linear-gradient(135deg, #18181b, #27272a);
  border: 1px solid #3f3f46;
  border-radius: 8px;
  transform: rotateX(25deg);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
}
.origami-wrap:hover .origami-panel {
  transform: rotateX(0deg) translateY(-6px);
  box-shadow: 0 20px 35px rgba(245, 158, 11, 0.25);
  border-color: #f59e0b;
}`,
    htmlCode: `<div class="origami-wrap">
  <div class="origami-panel">
    <div style="font-size: 11px; font-weight: 700; color: #fff;">ORIGAMI FOLD</div>
    <div style="font-size: 9px; color: #a1a1aa; margin-top: 4px;">Hover to unfold</div>
  </div>
</div>`,
  },
  {
    id: 'parallax-depth-layers',
    name: '3D Parallax Depth Layers',
    category: '3d',
    description: 'Multi-layer spatial parallax tilt window with floating background and foreground elements.',
    cssCode: `.parallax-card {
  width: 170px;
  height: 110px;
  background: #111116;
  border: 1px solid #27272a;
  border-radius: 10px;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(15deg) rotateY(-15deg);
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.parallax-card:hover {
  transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.05);
}
.parallax-floating-tag {
  transform: translateZ(30px);
  background: #f59e0b;
  color: #000;
  font-weight: 800;
  font-size: 10px;
  padding: 6px 12px;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}`,
    htmlCode: `<div class="parallax-card">
  <div class="parallax-floating-tag">DEPTH LAYER</div>
</div>`,
  },
  {
    id: 'interactive-globe-wireframe',
    name: '3D Wireframe Globe',
    category: '3d',
    description: 'Continuous 3D rotating spherical wireframe globe with latitude and longitude rings.',
    cssCode: `.globe-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.6);
  position: relative;
  transform-style: preserve-3d;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
}
.globe-ring {
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(56, 189, 248, 0.5);
  border-radius: 50%;
  animation: globe-spin 4s linear infinite;
}
.globe-ring:nth-child(2) { transform: rotateY(60deg); }
.globe-ring:nth-child(3) { transform: rotateY(120deg); }
@keyframes globe-spin {
  100% { transform: rotateY(360deg); }
}`,
    htmlCode: `<div class="globe-wrap">
  <div class="globe-ring"></div>
  <div class="globe-ring"></div>
  <div class="globe-ring"></div>
</div>`,
  },
  {
    id: 'circuit-board-border',
    name: 'Electrified PCB Circuit Border',
    category: 'borders',
    description: 'Sci-fi PCB circuit trace border with electric pulse travelling along traces.',
    cssCode: `.pcb-border-box {
  width: 170px;
  height: 90px;
  background: #090e0b;
  border: 2px solid #10b981;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}
.pcb-border-box::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 20%;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981, 0 0 20px #fff;
  animation: pcb-chase 3s linear infinite;
}
@keyframes pcb-chase {
  0% { left: 10%; top: -4px; }
  25% { left: 90%; top: -4px; }
  50% { left: 90%; top: calc(100% - 4px); }
  75% { left: 10%; top: calc(100% - 4px); }
  100% { left: 10%; top: -4px; }
}`,
    htmlCode: `<div class="pcb-border-box">CIRCUIT ONLINE</div>`,
  },
  {
    id: 'gradient-conic-glow-border',
    name: 'Conic Glow Radiant Border',
    category: 'borders',
    description: 'Smooth 60fps rotating conic radiant laser border with high contrast core.',
    cssCode: `.conic-border-card {
  position: relative;
  width: 180px;
  height: 100px;
  background: #0d0d12;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  z-index: 1;
}
.conic-border-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 12px;
  background: conic-gradient(from 0deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #f59e0b);
  z-index: -1;
  animation: conic-border-spin 4s linear infinite;
}
@keyframes conic-border-spin {
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="conic-border-card">CONIC GLOW</div>`,
  },
  {
    id: 'corner-bracket-pulse',
    name: 'HUD Corner Targeting Brackets',
    category: 'borders',
    description: 'Military HUD tactical target frame with pulsing corner brackets.',
    cssCode: `.hud-bracket-card {
  width: 160px;
  height: 90px;
  background: rgba(6, 182, 212, 0.05);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #06b6d4;
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
}
.hud-bracket-card::before, .hud-bracket-card::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid #06b6d4;
}
.hud-bracket-card::before { top: 0; left: 0; border-right: none; border-bottom: none; }
.hud-bracket-card::after { bottom: 0; right: 0; border-left: none; border-top: none; }`,
    htmlCode: `<div class="hud-bracket-card">TARGET LOCKED</div>`,
  },
  {
    id: 'multi-gradient-chase',
    name: 'Dual Neon Laser Border Chase',
    category: 'borders',
    description: 'Dual counter-rotating laser light segments orbiting around container perimeter.',
    cssCode: `.laser-chase-box {
  width: 170px;
  height: 95px;
  background: #0a0a0f;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
}`,
    htmlCode: `<div class="laser-chase-box">LASER CHASE</div>`,
  },
  {
    id: 'liquid-blob-border',
    name: 'Liquid Organic Blob Border',
    category: 'borders',
    description: 'Fluid organic shape border that pulses and shifts contours smoothly.',
    cssCode: `.blob-border-box {
  width: 130px;
  height: 130px;
  background: linear-gradient(135deg, #18181b, #09090c);
  border: 2px solid #ec4899;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ec4899;
  font-weight: 800;
  font-size: 11px;
  animation: blob-morph 5s ease-in-out infinite alternate;
}
@keyframes blob-morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}`,
    htmlCode: `<div class="blob-border-box">BLOB FRAME</div>`,
  },
  {
    id: 'chromatic-shadow-split',
    name: '3D Chromatic Shadow Separation',
    category: 'shadows',
    description: 'Retro 3D anaglyph shadow splitting into Cyan and Magenta color channels.',
    cssCode: `.chroma-shadow-card {
  width: 160px;
  padding: 14px;
  background: #18181b;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
  text-align: center;
  box-shadow: -8px 8px 0px rgba(6, 182, 212, 0.7), 8px -8px 0px rgba(244, 63, 94, 0.7);
  transition: transform 0.2s;
}
.chroma-shadow-card:hover {
  transform: translate(2px, -2px);
  box-shadow: -12px 12px 0px rgba(6, 182, 212, 0.9), 12px -12px 0px rgba(244, 63, 94, 0.9);
}`,
    htmlCode: `<div class="chroma-shadow-card">ANAGLYPH SHADOW</div>`,
  },
  {
    id: 'glass-refraction-shadow',
    name: 'Glass Caustic Refraction Shadow',
    category: 'shadows',
    description: 'Realistic diffuse caustic light transmission shadow on frosted surfaces.',
    cssCode: `.caustic-card {
  width: 170px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}`,
    htmlCode: `<div class="caustic-card">GLASS CAUSTIC</div>`,
  },
  {
    id: 'pulsing-ambient-shadow',
    name: 'Pulsing Ambient Shadow Glow',
    category: 'shadows',
    description: 'Soft breathing aura shadow that synchronizes color and blur radius.',
    cssCode: `.ambient-pulse-card {
  width: 160px;
  padding: 14px;
  background: #0f0f15;
  border: 1px solid #27272a;
  border-radius: 10px;
  color: #fbbf24;
  font-weight: 700;
  font-size: 11px;
  text-align: center;
  animation: shadow-breath 2.5s ease-in-out infinite alternate;
}
@keyframes shadow-breath {
  0% { box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2); }
  100% { box-shadow: 0 15px 35px rgba(245, 158, 11, 0.6); }
}`,
    htmlCode: `<div class="ambient-pulse-card">BREATHING SHADOW</div>`,
  },
  {
    id: 'hard-pop-brutalist-shadow',
    name: '90s Brutalist Offset Solid Shadow',
    category: 'shadows',
    description: 'Retro 90s neobrutalism high-contrast solid black drop shadow.',
    cssCode: `.brutalist-card {
  width: 160px;
  padding: 12px;
  background: #facc15;
  color: #000;
  border: 2px solid #000;
  border-radius: 4px;
  font-weight: 800;
  font-size: 11px;
  text-align: center;
  box-shadow: 6px 6px 0 #000;
  transition: all 0.15s;
}
.brutalist-card:hover {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0 #000;
}`,
    htmlCode: `<div class="brutalist-card">NEOBRUTALISM</div>`,
  },
  {
    id: 'pixel-dissolve-reveal',
    name: '8-Bit Pixel Dissolve Transition',
    category: 'transitions',
    description: 'Retro gaming mosaic pixel block dissolve card reveal.',
    cssCode: `.pixel-card {
  width: 170px;
  height: 95px;
  background: linear-gradient(135deg, #18181b, #09090c);
  border: 1px solid #3f3f46;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-family: monospace;
  font-weight: 700;
  font-size: 12px;
  position: relative;
  overflow: hidden;
}
.pixel-card:hover {
  filter: contrast(150%) hue-rotate(45deg);
}`,
    htmlCode: `<div class="pixel-card">PIXEL DISSOLVE</div>`,
  },
  {
    id: 'circular-wipe-expand',
    name: 'Radial Iris Circular Wipe',
    category: 'transitions',
    description: 'Radial iris clip-path mask expanding smoothly from center outwards.',
    cssCode: `.iris-card {
  width: 170px;
  height: 95px;
  background: #09090c;
  border: 1px solid #27272a;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
}
.iris-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f59e0b, #ec4899);
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.4s ease-in-out;
  z-index: 0;
}
.iris-card:hover::before {
  clip-path: circle(75% at 50% 50%);
}
.iris-card span {
  position: relative;
  z-index: 1;
}`,
    htmlCode: `<div class="iris-card"><span>IRIS WIPE</span></div>`,
  },
  {
    id: 'slice-shutter-transition',
    name: 'Vertical Venetian Blind Louvers',
    category: 'transitions',
    description: 'Vertical blind slice shutter transition flipping between front and back content.',
    cssCode: `.shutter-box {
  width: 170px;
  height: 95px;
  background: #12121a;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
  font-weight: 700;
  font-size: 11px;
  transition: transform 0.3s;
}
.shutter-box:hover {
  transform: scale(1.05) rotate(1deg);
  background: #181824;
}`,
    htmlCode: `<div class="shutter-box">VENETIAN SHUTTER</div>`,
  },
  {
    id: 'cube-flip-3d-transition',
    name: '3D Room Perspective Flip',
    category: 'transitions',
    description: '90-degree 3D perspective turn revealing secondary card surface.',
    cssCode: `.cube-flip-wrap {
  perspective: 600px;
  width: 160px;
  height: 95px;
}
.cube-flip-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.cube-flip-wrap:hover .cube-flip-inner {
  transform: rotateY(180deg);
}
.cube-side {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  backface-visibility: hidden;
}
.cube-side-front {
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #fff;
}
.cube-side-back {
  background: #f59e0b;
  color: #000;
  transform: rotateY(180deg);
}`,
    htmlCode: `<div class="cube-flip-wrap">
  <div class="cube-flip-inner">
    <div class="cube-side cube-side-front">HOVER TO FLIP</div>
    <div class="cube-side cube-side-back">REVEALED ✦</div>
  </div>
</div>`,
  },
  {
    id: 'frosted-liquid-glass',
    name: 'Liquid Glass Glint Refraction',
    category: 'advanced',
    description: 'Frosted glass container with dynamic moving specular glint across glass grain.',
    cssCode: `.liquid-glass-card {
  width: 180px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
}
.liquid-glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-25deg);
  animation: glass-glint 3.5s infinite;
}
@keyframes glass-glint {
  0% { left: -150%; }
  40%, 100% { left: 150%; }
}`,
    htmlCode: `<div class="liquid-glass-card">LIQUID GLASS</div>`,
  },
  {
    id: 'audio-visualizer-bars',
    name: 'Multi-Band Audio Visualizer',
    category: 'advanced',
    description: 'Dynamic equalizing spectrum audio frequency bars with jumping peaks.',
    cssCode: `.eq-visualizer {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 35px;
  background: #09090c;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #27272a;
}
.eq-bar {
  width: 4px;
  background: linear-gradient(180deg, #f59e0b, #ec4899);
  border-radius: 2px;
  animation: eq-jump 1s ease-in-out infinite alternate;
}
.eq-bar:nth-child(1) { height: 40%; animation-delay: 0.1s; }
.eq-bar:nth-child(2) { height: 85%; animation-delay: 0.3s; }
.eq-bar:nth-child(3) { height: 60%; animation-delay: 0.2s; }
.eq-bar:nth-child(4) { height: 100%; animation-delay: 0.5s; }
.eq-bar:nth-child(5) { height: 50%; animation-delay: 0.4s; }
@keyframes eq-jump {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}`,
    htmlCode: `<div class="eq-visualizer">
  <div class="eq-bar"></div>
  <div class="eq-bar"></div>
  <div class="eq-bar"></div>
  <div class="eq-bar"></div>
  <div class="eq-bar"></div>
</div>`,
  },
  {
    id: 'morphing-svg-mesh',
    name: 'Living SVG Spline Mesh',
    category: 'advanced',
    description: 'Elastic oscillating vector spline polygon with gradient fluid fill.',
    cssCode: `.mesh-wrap {
  width: 70px;
  height: 70px;
  background: radial-gradient(circle, #f59e0b 0%, #ec4899 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: mesh-morph 4s ease-in-out infinite alternate;
  box-shadow: 0 0 25px rgba(236, 72, 153, 0.4);
}
@keyframes mesh-morph {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; }
  100% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
}`,
    htmlCode: `<div class="mesh-wrap"></div>`,
  },
  {
    id: 'holographic-security-badge',
    name: 'Holographic ID Security Badge',
    category: 'advanced',
    description: 'Tilt-reactive iridescent security ID badge with holographic laser seal.',
    cssCode: `.security-badge {
  width: 170px;
  height: 105px;
  background: linear-gradient(135deg, #18181b, #09090c);
  border: 1px solid #3f3f46;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.security-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 40%, rgba(6, 182, 212, 0.25) 45%, rgba(236, 72, 153, 0.25) 55%, transparent 60%);
  animation: holo-pass 4s infinite;
}
@keyframes holo-pass {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`,
    htmlCode: `<div class="security-badge">
  <div style="font-size: 10px; font-weight: 700; color: #f59e0b;">CSSHUB AUTH</div>
  <div style="font-size: 9px; color: #71717a; font-family: monospace;">ID: #9948-ELITE</div>
</div>`,
  },
];
