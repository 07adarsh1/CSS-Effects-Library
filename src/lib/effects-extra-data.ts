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
    cssCode: `.toggle-switch {
  position: relative;
  width: 52px;
  height: 28px;
  background: #333;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}
.toggle-switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: #e5e5e5;
  border-radius: 50%;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.toggle-switch.active {
  background: #f59e0b;
}
.toggle-switch.active::after {
  transform: translateX(24px);
  background: #fff;
  box-shadow: 0 1px 8px rgba(245,158,11,0.5);
}`,
    htmlCode: `<div class="toggle-switch" onclick="this.classList.toggle('active')"></div>`,
  },
  {
    id: 'checkbox-anim',
    name: 'Animated Checkbox',
    category: 'components',
    description: 'A custom checkbox with an SVG checkmark that draws itself in with a smooth stroke animation on selection.',
    cssCode: `.checkbox-anim {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #e5e5e5;
  user-select: none;
}
.checkbox-anim input[type="checkbox"] {
  display: none;
}
.checkbox-anim .checkbox-box {
  width: 22px;
  height: 22px;
  border: 2px solid #555;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}
.checkbox-anim .checkbox-box svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  stroke: #fff;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset 0.3s cubic-bezier(0.65, 0, 0.35, 1) 0.1s;
}
.checkbox-anim input:checked + .checkbox-box {
  background: #f59e0b;
  border-color: #f59e0b;
  transform: scale(1.1);
}
.checkbox-anim input:checked + .checkbox-box svg {
  stroke-dashoffset: 0;
}`,
    htmlCode: `<label class="checkbox-anim">
  <input type="checkbox" />
  <span class="checkbox-box">
    <svg viewBox="0 0 16 16"><polyline points="3 8 7 12 13 4" /></svg>
  </span>
  Accept terms
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
    cssCode: `.skeleton {
  position: relative;
  overflow: hidden;
  background: #222;
  border-radius: 8px;
}
.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 60%, transparent 100%);
  animation: skeleton-shimmer 1.8s ease-in-out infinite;
}
@keyframes skeleton-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`,
    htmlCode: `<div style="display:flex;flex-direction:column;gap:12px;">
  <div class="skeleton" style="width:60%;height:20px;"></div>
  <div class="skeleton" style="width:100%;height:14px;"></div>
  <div class="skeleton" style="width:80%;height:14px;"></div>
  <div class="skeleton" style="width:40%;height:32px;border-radius:6px;margin-top:8px;"></div>
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
  width: 200px;
  height: 6px;
  background: linear-gradient(to right, #f59e0b 0%, #f59e0b 70%, #333 70%, #333 100%);
  border-radius: 3px;
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
  border: 3px solid #0a0a0a;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.range-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.6);
  transform: scale(1.15);
}
.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #f59e0b;
  border-radius: 50%;
  border: 3px solid #0a0a0a;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}`,
    htmlCode: `<input type="range" class="range-slider" min="0" max="100" value="70" />`,
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
}
.noise-grain::after {
  content: '';
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
  animation: noise-shift 0.5s steps(5) infinite;
  mix-blend-mode: overlay;
}
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-5%, -5%); }
  40% { transform: translate(5%, 5%); }
  60% { transform: translate(-3%, 3%); }
  80% { transform: translate(3%, -3%); }
  100% { transform: translate(0, 0); }
}`,
    htmlCode: `<div class="noise-grain" style="background:#1e1e1e;padding:40px;border-radius:12px;">
  <h3 style="color:#e5e5e5;font-size:18px;font-weight:700;">Cinematic Grain</h3>
  <p style="color:#999;font-size:14px;margin-top:8px;">A subtle noise texture overlay adds depth and a film-like quality.</p>
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
];
