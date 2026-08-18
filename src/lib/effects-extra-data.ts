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
    CSSHUB is an open-source library of 72+ handcrafted, production-ready pure CSS effects and modern UI components.
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
];
