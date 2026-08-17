export interface CSSEffect {
  id: string;
  name: string;
  category: string;
  description: string;
  cssCode: string;
  htmlCode: string;
}

export const categories = [
  { id: 'all', name: 'All Effects', icon: '✦' },
  { id: 'hover', name: 'Hover', icon: '◎' },
  { id: 'loading', name: 'Loading', icon: '⟳' },
  { id: 'text', name: 'Text', icon: 'T' },
  { id: 'background', name: 'Background', icon: '◇' },
  { id: '3d', name: '3D', icon: '⬡' },
  { id: 'border', name: 'Border', icon: '□' },
  { id: 'shadow', name: 'Shadow', icon: '◉' },
  { id: 'transition', name: 'Transition', icon: '↝' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const effects: CSSEffect[] = [
  // ==================== HOVER EFFECTS ====================
  {
    id: 'fill-slide-up',
    name: 'Fill Slide Up',
    category: 'hover',
    description: 'A button that fills with color from the bottom on hover, creating a smooth slide-up reveal effect.',
    cssCode: `.fill-slide-up {
  position: relative;
  overflow: hidden;
  background: transparent;
  border: 2px solid #f59e0b;
  color: #f59e0b;
  padding: 12px 32px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 1;
}

.fill-slide-up::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0%;
  background: #f59e0b;
  transition: height 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}

.fill-slide-up:hover {
  color: #000;
}

.fill-slide-up:hover::before {
  height: 100%;
}`,
    htmlCode: `<button class="fill-slide-up">Hover Me</button>`,
  },
  {
    id: 'ripple-effect',
    name: 'Ripple Effect',
    category: 'hover',
    description: 'Material Design inspired ripple that emanates from the click point across the button surface.',
    cssCode: `.ripple-btn {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
  padding: 12px 32px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  animation: ripple-anim 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-anim {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`,
    htmlCode: `<button class="ripple-btn" onclick="createRipple(event)">Click Me</button>

<script>
function createRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  circle.style.width = circle.style.height = '100px';
  circle.style.left = e.clientX - rect.left - 50 + 'px';
  circle.style.top = e.clientY - rect.top - 50 + 'px';
  circle.classList.add('ripple');
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}
</script>`,
  },
  {
    id: 'glow-pulse',
    name: 'Glow Pulse',
    category: 'hover',
    description: 'A button with a continuously pulsing glow that radiates outward, drawing attention.',
    cssCode: `.glow-pulse {
  padding: 12px 32px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #f59e0b;
  color: #000;
  animation: glow-pulse-anim 2s ease-in-out infinite;
}

@keyframes glow-pulse-anim {
  0%, 100% {
    box-shadow: 0 0 5px #f59e0b, 0 0 10px rgba(245, 158, 11, 0.27);
  }
  50% {
    box-shadow: 0 0 20px #f59e0b, 0 0 40px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2);
  }
}`,
    htmlCode: `<button class="glow-pulse">Pulsing Glow</button>`,
  },
  {
    id: 'lift-shadow',
    name: 'Lift Shadow',
    category: 'hover',
    description: 'Card lifts upward on hover with an expanding colored shadow, creating depth.',
    cssCode: `.lift-shadow {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 24px;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.lift-shadow:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px -12px rgba(245, 158, 11, 0.3),
    0 8px 16px -8px rgba(0, 0, 0, 0.4);
}`,
    htmlCode: `<div class="lift-shadow">
  <h3>Card Title</h3>
  <p>Hover to lift</p>
</div>`,
  },
  {
    id: 'underline-grow',
    name: 'Underline Grow',
    category: 'hover',
    description: 'An underline that expands from the center on hover with a gradient sweep.',
    cssCode: `.underline-grow {
  position: relative;
  color: #e5e5e5;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.underline-grow::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f59e0b, #ef4444);
  transition: width 0.35s ease, left 0.35s ease;
}

.underline-grow:hover::after {
  width: 100%;
  left: 0;
}`,
    htmlCode: `<a href="#" class="underline-grow">Hover for underline</a>`,
  },
  {
    id: 'border-draw',
    name: 'Border Draw',
    category: 'hover',
    description: 'Borders draw themselves around the element sequentially — left, right, then top, bottom.',
    cssCode: `.border-draw {
  position: relative;
  padding: 20px 28px;
  border-radius: 8px;
  background: transparent;
  color: #f59e0b;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
}

.border-draw::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 0;
  background: #f59e0b;
  transition: height 0.3s ease 0s;
}

.border-draw::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 3px; height: 0;
  background: #f59e0b;
  transition: height 0.3s ease 0s;
}

.border-draw .bd-top {
  position: absolute;
  top: 0; right: 0;
  width: 0; height: 3px;
  background: #f59e0b;
  transition: width 0.3s ease 0.3s;
}

.border-draw .bd-bottom {
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 3px;
  background: #f59e0b;
  transition: width 0.3s ease 0.3s;
}

.border-draw:hover::before,
.border-draw:hover::after {
  height: 100%;
  transition: height 0.3s ease 0.3s;
}

.border-draw:hover .bd-top,
.border-draw:hover .bd-bottom {
  width: 100%;
  transition: width 0.3s ease 0s;
}`,
    htmlCode: `<div class="border-draw">
  <span>Hover Me</span>
  <div class="bd-top"></div>
  <div class="bd-bottom"></div>
</div>`,
  },

  // ==================== LOADING EFFECTS ====================
  {
    id: 'dual-ring',
    name: 'Dual Ring Spinner',
    category: 'loading',
    description: 'Two concentric rings spinning in opposite directions, creating a sophisticated loading indicator.',
    cssCode: `.dual-ring {
  width: 48px;
  height: 48px;
  position: relative;
}

.dual-ring::before,
.dual-ring::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.dual-ring::before {
  top: 0; left: 0; right: 0; bottom: 0;
  border: 3px solid transparent;
  border-top-color: #f59e0b;
  animation: spin 1s linear infinite;
}

.dual-ring::after {
  top: 8px; left: 8px; right: 8px; bottom: 8px;
  border: 3px solid transparent;
  border-bottom-color: #ef4444;
  animation: spin-reverse 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}`,
    htmlCode: `<div class="dual-ring"></div>`,
  },
  {
    id: 'bouncing-dots',
    name: 'Bouncing Dots',
    category: 'loading',
    description: 'Three dots bouncing in sequence with staggered timing and color variation.',
    cssCode: `.bouncing-dots {
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
}

.bouncing-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: bounce-dot 1.4s ease-in-out infinite both;
}

.bouncing-dots span:nth-child(1) {
  animation-delay: -0.32s;
  background: #f59e0b;
}
.bouncing-dots span:nth-child(2) {
  animation-delay: -0.16s;
  background: #fb923c;
}
.bouncing-dots span:nth-child(3) {
  animation-delay: 0s;
  background: #ef4444;
}

@keyframes bounce-dot {
  0%, 80%, 100% {
    transform: scale(0.4);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}`,
    htmlCode: `<div class="bouncing-dots">
  <span></span><span></span><span></span>
</div>`,
  },
  {
    id: 'bar-wave',
    name: 'Bar Wave',
    category: 'loading',
    description: 'Equalizer-style bars that pulse in a wave pattern with gradient coloring.',
    cssCode: `.bar-wave {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 40px;
}

.bar-wave span {
  width: 5px;
  background: linear-gradient(to top, #f59e0b, #ef4444);
  border-radius: 3px;
  animation: bar-wave 1.2s ease-in-out infinite;
}

.bar-wave span:nth-child(1) { animation-delay: 0s; }
.bar-wave span:nth-child(2) { animation-delay: 0.1s; }
.bar-wave span:nth-child(3) { animation-delay: 0.2s; }
.bar-wave span:nth-child(4) { animation-delay: 0.3s; }
.bar-wave span:nth-child(5) { animation-delay: 0.4s; }

@keyframes bar-wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.2); }
}`,
    htmlCode: `<div class="bar-wave">
  <span></span><span></span><span></span><span></span><span></span>
</div>`,
  },
  {
    id: 'pulse-ring',
    name: 'Pulse Ring',
    category: 'loading',
    description: 'An expanding ring that pulses outward from a center dot, like a radar ping.',
    cssCode: `.pulse-ring {
  position: relative;
  width: 48px;
  height: 48px;
}

.pulse-ring::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 3px solid #f59e0b;
  border-radius: 50%;
  animation: pulse-ring-anim 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulse-ring::after {
  content: '';
  position: absolute;
  inset: 14px;
  background: #f59e0b;
  border-radius: 50%;
}

@keyframes pulse-ring-anim {
  0% { transform: scale(0.5); opacity: 1; }
  80%, 100% { transform: scale(1.3); opacity: 0; }
}`,
    htmlCode: `<div class="pulse-ring"></div>`,
  },
  {
    id: 'square-spin',
    name: 'Square Spin',
    category: 'loading',
    description: 'A square that rotates and morphs between square and circle shapes smoothly.',
    cssCode: `.square-spin {
  width: 40px;
  height: 40px;
  background: #f59e0b;
  animation: square-spin-anim 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes square-spin-anim {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(90deg) scale(0.6); border-radius: 50%; }
  50%  { transform: rotate(180deg) scale(1); border-radius: 0; }
  75%  { transform: rotate(270deg) scale(0.6); border-radius: 50%; }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="square-spin"></div>`,
  },
  {
    id: 'orbit-loader',
    name: 'Orbit Loader',
    category: 'loading',
    description: 'Four colored dots orbiting around a central point in continuous rotation.',
    cssCode: `.orbit-loader {
  width: 48px;
  height: 48px;
  position: relative;
  animation: spin 2s linear infinite;
}

.orbit-loader span {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.orbit-loader span:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); background: #f59e0b; }
.orbit-loader span:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); background: #fb923c; }
.orbit-loader span:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); background: #ef4444; }
.orbit-loader span:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); background: #fbbf24; }

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="orbit-loader">
  <span></span><span></span><span></span><span></span>
</div>`,
  },

  // ==================== TEXT EFFECTS ====================
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    category: 'text',
    description: 'Text with an animated gradient that shifts colors across the surface smoothly.',
    cssCode: `.gradient-text {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #f59e0b, #ef4444, #ec4899, #f59e0b);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    htmlCode: `<h2 class="gradient-text">Gradient Magic</h2>`,
  },
  {
    id: 'glitch',
    name: 'Glitch Effect',
    category: 'text',
    description: 'Cyberpunk-style glitch effect with color-separated layers and random displacement.',
    cssCode: `.glitch {
  position: relative;
  font-size: 24px;
  font-weight: 800;
  color: #e5e5e5;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  color: #ff00ff;
  animation: glitch-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}

.glitch::after {
  color: #00ffff;
  animation: glitch-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%   { transform: translate(0); }
  20%  { transform: translate(-3px, 3px); }
  40%  { transform: translate(-3px, -3px); }
  60%  { transform: translate(3px, 3px); }
  80%  { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}

@keyframes glitch-2 {
  0%   { transform: translate(0); }
  20%  { transform: translate(3px, -3px); }
  40%  { transform: translate(3px, 3px); }
  60%  { transform: translate(-3px, -3px); }
  80%  { transform: translate(-3px, 3px); }
  100% { transform: translate(0); }
}`,
    htmlCode: `<span class="glitch" data-text="GLITCH">GLITCH</span>`,
  },
  {
    id: 'neon-glow-text',
    name: 'Neon Glow Text',
    category: 'text',
    description: 'Realistic neon sign effect with multiple text-shadow layers and subtle flickering.',
    cssCode: `.neon-text {
  font-size: 26px;
  font-weight: 800;
  color: #f59e0b;
  text-shadow:
    0 0 7px #f59e0b,
    0 0 10px #f59e0b,
    0 0 21px #f59e0b,
    0 0 42px #d97706,
    0 0 82px #d97706,
    0 0 92px #d97706;
  animation: neon-flicker 1.5s infinite alternate;
}

@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow:
      0 0 7px #f59e0b, 0 0 10px #f59e0b,
      0 0 21px #f59e0b, 0 0 42px #d97706,
      0 0 82px #d97706;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}`,
    htmlCode: `<span class="neon-text">NEON</span>`,
  },
  {
    id: 'typing-cursor',
    name: 'Typing Cursor',
    category: 'text',
    description: 'A blinking cursor that mimics a terminal typing effect beside monospace text.',
    cssCode: `.typing-cursor {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background: #f59e0b;
  margin-left: 2px;
  animation: blink-cursor 1s step-end infinite;
  vertical-align: text-bottom;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`,
    htmlCode: `<span style="font-family: monospace; color: #f59e0b;">console.log<span class="typing-cursor"></span></span>`,
  },
  {
    id: 'text-stroke',
    name: 'Text Stroke',
    category: 'text',
    description: 'Outlined text that fills with solid color on hover, creating a dramatic reveal.',
    cssCode: `.text-stroke {
  font-size: 28px;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px #f59e0b;
  transition: color 0.3s ease, -webkit-text-stroke 0.3s ease;
  cursor: pointer;
}

.text-stroke:hover {
  color: #f59e0b;
  -webkit-text-stroke: 2px #f59e0b;
}`,
    htmlCode: `<span class="text-stroke">OUTLINED</span>`,
  },
  {
    id: 'shimmer-text',
    name: 'Shimmer Text',
    category: 'text',
    description: 'A sweeping highlight that glides across text, creating a metallic shimmer appearance.',
    cssCode: `.shimmer-text {
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f59e0b 50%,
    #e5e5e5 70%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    htmlCode: `<span class="shimmer-text">Shimmer Effect</span>`,
  },

  // ==================== BACKGROUND EFFECTS ====================
  {
    id: 'bg-animated-gradient',
    name: 'Animated Gradient',
    category: 'background',
    description: 'A multi-color gradient that continuously shifts and morphs across the surface.',
    cssCode: `.animated-gradient {
  background: linear-gradient(-45deg, #f59e0b, #ef4444, #ec4899, #8b5cf6);
  background-size: 400% 400%;
  animation: bg-grad-move 8s ease infinite;
  border-radius: 8px;
}

@keyframes bg-grad-move {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    htmlCode: `<div class="animated-gradient" style="width: 100%; height: 200px;"></div>`,
  },
  {
    id: 'bg-dot-matrix',
    name: 'Dot Matrix',
    category: 'background',
    description: 'A pulsating grid of dots that breathe in and out, creating a subtle living texture.',
    cssCode: `.dot-matrix {
  background-color: #0a0a0a;
  background-image: radial-gradient(circle, rgba(245, 158, 11, 0.2) 1px, transparent 1px);
  background-size: 16px 16px;
  border-radius: 8px;
  animation: dot-pulse 3s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { background-size: 16px 16px; }
  50%      { background-size: 20px 20px; }
}`,
    htmlCode: `<div class="dot-matrix" style="width: 100%; height: 200px;"></div>`,
  },
  {
    id: 'bg-stripes',
    name: 'Diagonal Stripes',
    category: 'background',
    description: 'Animated diagonal stripes that move continuously, creating a dynamic striped pattern.',
    cssCode: `.bg-stripes {
  background: repeating-linear-gradient(
    45deg,
    rgba(245, 158, 11, 0.13),
    rgba(245, 158, 11, 0.13) 10px,
    rgba(245, 158, 11, 0.07) 10px,
    rgba(245, 158, 11, 0.07) 20px
  );
  background-size: 200% 200%;
  animation: stripe-move 4s linear infinite;
  border-radius: 8px;
}

@keyframes stripe-move {
  0%   { background-position: 0 0; }
  100% { background-position: 28px 28px; }
}`,
    htmlCode: `<div class="bg-stripes" style="width: 100%; height: 200px;"></div>`,
  },
  {
    id: 'bg-aurora',
    name: 'Aurora',
    category: 'background',
    description: 'Northern lights inspired effect with blurred color orbs floating and blending.',
    cssCode: `.aurora-bg {
  width: 100%; height: 100%;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: #0a0a0a;
}

.aurora-bg::before,
.aurora-bg::after {
  content: '';
  position: absolute;
  width: 200%; height: 200%;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: aurora-move 6s ease-in-out infinite alternate;
}

.aurora-bg::before {
  background: radial-gradient(circle, rgba(245, 158, 11, 0.33), transparent 70%);
  top: -80%; left: -60%;
}

.aurora-bg::after {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.33), transparent 70%);
  bottom: -80%; right: -60%;
  animation-delay: -3s;
  animation-direction: alternate-reverse;
}

@keyframes aurora-move {
  0%   { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(30%, 30%) rotate(15deg); }
}`,
    htmlCode: `<div class="aurora-bg" style="width: 100%; height: 200px;"></div>`,
  },
  {
    id: 'bg-geometric',
    name: 'Geometric Pattern',
    category: 'background',
    description: 'Rotating triangular geometric pattern using repeating linear gradients.',
    cssCode: `.geometric-bg {
  width: 100%; height: 100%;
  border-radius: 8px;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.geometric-bg::before {
  content: '';
  position: absolute;
  inset: -50%;
  background:
    linear-gradient(30deg, rgba(245,158,11,0.07) 12%, transparent 12.5%, transparent 87%, rgba(245,158,11,0.07) 87.5%),
    linear-gradient(150deg, rgba(245,158,11,0.07) 12%, transparent 12.5%, transparent 87%, rgba(245,158,11,0.07) 87.5%),
    linear-gradient(30deg, rgba(245,158,11,0.07) 12%, transparent 12.5%, transparent 87%, rgba(245,158,11,0.07) 87.5%),
    linear-gradient(150deg, rgba(245,158,11,0.07) 12%, transparent 12.5%, transparent 87%, rgba(245,158,11,0.07) 87.5%);
  background-size: 40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px;
  animation: geo-move 8s linear infinite;
}

@keyframes geo-move {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="geometric-bg" style="width: 100%; height: 200px;"></div>`,
  },
  {
    id: 'bg-waves',
    name: 'Flowing Waves',
    category: 'background',
    description: 'Layered elliptical shapes rotating in opposite directions, mimicking ocean waves.',
    cssCode: `.waves-bg {
  width: 100%; height: 100%;
  border-radius: 8px;
  background: linear-gradient(180deg, #0a0a0a, #1a0f00);
  position: relative;
  overflow: hidden;
}

.waves-bg::before {
  content: '';
  position: absolute;
  bottom: 0; left: -50%;
  width: 200%; height: 50%;
  background: radial-gradient(ellipse at center, rgba(245,158,11,0.13), transparent 70%);
  border-radius: 40%;
  animation: wave-rotate 6s linear infinite;
}

.waves-bg::after {
  content: '';
  position: absolute;
  bottom: 0; left: -50%;
  width: 200%; height: 45%;
  background: radial-gradient(ellipse at center, rgba(239,68,68,0.13), transparent 70%);
  border-radius: 42%;
  animation: wave-rotate 8s linear infinite reverse;
}

@keyframes wave-rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    htmlCode: `<div class="waves-bg" style="width: 100%; height: 200px;"></div>`,
  },

  // ==================== 3D EFFECTS ====================
  {
    id: 'card-flip',
    name: 'Card Flip',
    category: '3d',
    description: 'A card that flips 180° on hover to reveal content on its back face.',
    cssCode: `.card-flip-container {
  perspective: 800px;
  width: 200px;
  height: 120px;
  cursor: pointer;
}

.card-flip {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-flip-container:hover .card-flip {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.card-flip-front {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #000;
}

.card-flip-back {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  transform: rotateY(180deg);
}`,
    htmlCode: `<div class="card-flip-container">
  <div class="card-flip">
    <div class="card-flip-front">Front</div>
    <div class="card-flip-back">Back</div>
  </div>
</div>`,
  },
  {
    id: 'tilt-card',
    name: 'Tilt Card',
    category: '3d',
    description: 'A card with perspective-based tilt that shifts angle on hover, simulating 3D depth.',
    cssCode: `.tilt-card {
  width: 200px;
  padding: 24px;
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  border: 1px solid #333;
  border-radius: 12px;
  transform: perspective(600px) rotateX(5deg) rotateY(-5deg);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
}

.tilt-card:hover {
  transform: perspective(600px) rotateX(-5deg) rotateY(5deg);
  box-shadow: -5px -5px 15px rgba(245, 158, 11, 0.15);
}`,
    htmlCode: `<div class="tilt-card">
  <h3>Tilt Me</h3>
  <p>Hover to see the effect</p>
</div>`,
  },
  {
    id: 'cube',
    name: '3D Cube',
    category: '3d',
    description: 'A continuously rotating 3D cube with semi-transparent colored faces.',
    cssCode: `.cube-scene {
  width: 80px; height: 80px;
  perspective: 300px;
}

.cube {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: cube-rotate 6s ease-in-out infinite;
}

.cube-face {
  position: absolute;
  width: 80px; height: 80px;
  border: 2px solid #f59e0b;
  background: rgba(245, 158, 11, 0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: #f59e0b;
  border-radius: 4px;
}

.cube-face:nth-child(1) { transform: rotateY(0deg)   translateZ(40px); }
.cube-face:nth-child(2) { transform: rotateY(90deg)  translateZ(40px); }
.cube-face:nth-child(3) { transform: rotateY(180deg) translateZ(40px); }
.cube-face:nth-child(4) { transform: rotateY(-90deg) translateZ(40px); }
.cube-face:nth-child(5) { transform: rotateX(90deg)  translateZ(40px); }
.cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(40px); }

@keyframes cube-rotate {
  0%   { transform: rotateX(-20deg) rotateY(30deg); }
  25%  { transform: rotateX(20deg)  rotateY(120deg); }
  50%  { transform: rotateX(-20deg) rotateY(210deg); }
  75%  { transform: rotateX(20deg)  rotateY(300deg); }
  100% { transform: rotateX(-20deg) rotateY(390deg); }
}`,
    htmlCode: `<div class="cube-scene">
  <div class="cube">
    <div class="cube-face">1</div>
    <div class="cube-face">2</div>
    <div class="cube-face">3</div>
    <div class="cube-face">4</div>
    <div class="cube-face">5</div>
    <div class="cube-face">6</div>
  </div>
</div>`,
  },
  {
    id: 'depth-stack',
    name: 'Depth Stack',
    category: '3d',
    description: 'Multiple layers stacked with translateZ that spread apart on hover for a 3D depth effect.',
    cssCode: `.depth-stack {
  position: relative;
  width: 150px; height: 100px;
  perspective: 500px;
}

.depth-layer {
  position: absolute;
  width: 100%; height: 100%;
  border-radius: 8px;
  border: 1px solid;
  transition: transform 0.4s ease;
}

.depth-layer:nth-child(1) {
  background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.27);
  transform: translateZ(0px);
}
.depth-layer:nth-child(2) {
  background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.27);
  transform: translateZ(-20px) translateX(8px) translateY(8px);
}
.depth-layer:nth-child(3) {
  background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.27);
  transform: translateZ(-40px) translateX(16px) translateY(16px);
}

.depth-stack:hover .depth-layer:nth-child(1) { transform: translateZ(20px) translateX(-16px) translateY(-16px); }
.depth-stack:hover .depth-layer:nth-child(2) { transform: translateZ(0px) translateX(-8px) translateY(-8px); }
.depth-stack:hover .depth-layer:nth-child(3) { transform: translateZ(-20px); }
.depth-stack:hover { transform-style: preserve-3d; }`,
    htmlCode: `<div class="depth-stack">
  <div class="depth-layer"></div>
  <div class="depth-layer"></div>
  <div class="depth-layer"></div>
</div>`,
  },
  {
    id: 'perspective-rotate',
    name: 'Perspective Rotate',
    category: '3d',
    description: 'An element that rotates continuously in 3D space, showing different faces as it turns.',
    cssCode: `.perspective-rotate {
  width: 100px; height: 100px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 12px;
  animation: persp-rotate 4s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
}

@keyframes persp-rotate {
  0%   { transform: perspective(500px) rotateY(0deg); }
  25%  { transform: perspective(500px) rotateY(90deg); }
  50%  { transform: perspective(500px) rotateY(180deg); }
  75%  { transform: perspective(500px) rotateY(270deg); }
  100% { transform: perspective(500px) rotateY(360deg); }
}`,
    htmlCode: `<div class="perspective-rotate"></div>`,
  },
  {
    id: 'swing-door',
    name: 'Swing Door',
    category: '3d',
    description: 'An element that swings open like a door hinged on the left edge.',
    cssCode: `.swing-container {
  perspective: 600px;
  width: 160px; height: 120px;
  cursor: pointer;
}

.swing-door {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  border: 1px solid rgba(245, 158, 11, 0.27);
  border-radius: 8px;
  transform-origin: left center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex; align-items: center; justify-content: center;
  color: #f59e0b; font-weight: 600;
}

.swing-container:hover .swing-door {
  transform: rotateY(-85deg);
}`,
    htmlCode: `<div class="swing-container">
  <div class="swing-door">Open Door</div>
</div>`,
  },

  // ==================== BORDER EFFECTS ====================
  {
    id: 'gradient-border',
    name: 'Gradient Border',
    category: 'border',
    description: 'An animated gradient border using mask compositing for a smooth rotating color edge.',
    cssCode: `.gradient-border {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background: #111;
  overflow: hidden;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(135deg, #f59e0b, #ef4444, #ec4899, #8b5cf6);
  background-size: 300% 300%;
  animation: grad-border-move 4s ease infinite;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@keyframes grad-border-move {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    htmlCode: `<div class="gradient-border">
  <p>Content with gradient border</p>
</div>`,
  },
  {
    id: 'animated-dashed',
    name: 'Animated Dashed',
    category: 'border',
    description: 'A marching-ants style dashed border that appears to move continuously around the element.',
    cssCode: `.animated-dashed {
  border: none;
  background:
    repeating-linear-gradient(90deg, #f59e0b 0px, #f59e0b 6px, transparent 6px, transparent 12px),
    repeating-linear-gradient(0deg,  #f59e0b 0px, #f59e0b 6px, transparent 6px, transparent 12px),
    repeating-linear-gradient(90deg, #f59e0b 0px, #f59e0b 6px, transparent 6px, transparent 12px),
    repeating-linear-gradient(0deg,  #f59e0b 0px, #f59e0b 6px, transparent 6px, transparent 12px);
  background-size:
    12px 2px, 2px 12px,
    12px 2px, 2px 12px;
  background-position:
    0 0, 0 0, 0 100%, 100% 0;
  background-repeat:
    repeat-x, repeat-y, repeat-x, repeat-y;
  padding: 20px;
  border-radius: 10px;
  animation: border-march 0.6s linear infinite;
}

@keyframes border-march {
  0%   { background-position: 0 0, 0 0, 0 100%, 100% 0; }
  100% { background-position: 12px 0, 0 12px, -12px 100%, 100% -12px; }
}`,
    htmlCode: `<div class="animated-dashed">
  <p>Marching ants border</p>
</div>`,
  },
  {
    id: 'corner-accents',
    name: 'Corner Accents',
    category: 'border',
    description: 'Decorative L-shaped corners that expand on hover, framing the content elegantly.',
    cssCode: `.corner-accents {
  position: relative;
  padding: 24px;
  border-radius: 8px;
  background: #111;
}

.corner-accents::before,
.corner-accents::after {
  content: '';
  position: absolute;
  width: 24px; height: 24px;
  border-color: #f59e0b;
  border-style: solid;
  transition: width 0.3s ease, height 0.3s ease;
}

.corner-accents::before {
  top: -1px; left: -1px;
  border-width: 3px 0 0 3px;
  border-radius: 4px 0 0 0;
}

.corner-accents::after {
  bottom: -1px; right: -1px;
  border-width: 0 3px 3px 0;
  border-radius: 0 0 4px 0;
}

.corner-accents:hover::before,
.corner-accents:hover::after {
  width: 40px; height: 40px;
}`,
    htmlCode: `<div class="corner-accents">
  <p>Hover to expand corners</p>
</div>`,
  },
  {
    id: 'glow-border',
    name: 'Glow Border',
    category: 'border',
    description: 'A border that gently pulses with an inner and outer glow, creating a breathing effect.',
    cssCode: `.glow-border {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(245, 158, 11, 0.27);
  background: #111;
  animation: glow-border-anim 2s ease-in-out infinite;
}

@keyframes glow-border-anim {
  0%, 100% {
    border-color: rgba(245, 158, 11, 0.27);
    box-shadow: 0 0 5px rgba(245, 158, 11, 0.13), inset 0 0 5px rgba(245, 158, 11, 0.07);
  }
  50% {
    border-color: rgba(245, 158, 11, 0.8);
    box-shadow:
      0 0 20px rgba(245, 158, 11, 0.27),
      0 0 40px rgba(245, 158, 11, 0.13),
      inset 0 0 15px rgba(245, 158, 11, 0.07);
  }
}`,
    htmlCode: `<div class="glow-border">
  <p>Content with glow</p>
</div>`,
  },
  {
    id: 'neon-border',
    name: 'Neon Border',
    category: 'border',
    description: 'Intense neon light effect on the border with both inner and outer glow layers.',
    cssCode: `.neon-border {
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #f59e0b;
  background: #0a0a0a;
  box-shadow:
    0 0 5px #f59e0b,
    0 0 10px #f59e0b,
    inset 0 0 5px #f59e0b,
    inset 0 0 10px rgba(245, 158, 11, 0.2);
  animation: neon-border-pulse 2s ease-in-out infinite alternate;
}

@keyframes neon-border-pulse {
  0% {
    box-shadow:
      0 0 5px #f59e0b, 0 0 10px rgba(245, 158, 11, 0.33),
      inset 0 0 5px rgba(245, 158, 11, 0.33),
      inset 0 0 10px rgba(245, 158, 11, 0.13);
  }
  100% {
    box-shadow:
      0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 40px rgba(245, 158, 11, 0.33),
      inset 0 0 10px #f59e0b, inset 0 0 20px rgba(245, 158, 11, 0.27);
  }
}`,
    htmlCode: `<div class="neon-border">
  <p>Neon bordered content</p>
</div>`,
  },
  {
    id: 'double-border',
    name: 'Double Border Fade',
    category: 'border',
    description: 'A subtle double border effect using outline that intensifies on hover.',
    cssCode: `.double-border {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background: #111;
  border: 2px solid rgba(245, 158, 11, 0.2);
  outline: 2px solid rgba(245, 158, 11, 0.07);
  outline-offset: 4px;
  transition: border-color 0.4s ease, outline-color 0.4s ease;
}

.double-border:hover {
  border-color: #f59e0b;
  outline-color: rgba(245, 158, 11, 0.33);
}`,
    htmlCode: `<div class="double-border">
  <p>Double bordered content</p>
</div>`,
  },

  // ==================== SHADOW EFFECTS ====================
  {
    id: 'multi-shadow',
    name: 'Multi Layer Shadow',
    category: 'shadow',
    description: 'Multiple stacked box-shadows creating a smooth, realistic elevation gradient.',
    cssCode: `.multi-shadow {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow:
    0 1px 2px rgba(245, 158, 11, 0.1),
    0 2px 4px rgba(245, 158, 11, 0.1),
    0 4px 8px rgba(245, 158, 11, 0.1),
    0 8px 16px rgba(245, 158, 11, 0.1),
    0 16px 32px rgba(245, 158, 11, 0.1),
    0 32px 64px rgba(245, 158, 11, 0.1);
  transition: box-shadow 0.3s ease;
}

.multi-shadow:hover {
  box-shadow:
    0 1px 2px rgba(245, 158, 11, 0.15),
    0 2px 4px rgba(245, 158, 11, 0.15),
    0 4px 8px rgba(245, 158, 11, 0.15),
    0 8px 16px rgba(245, 158, 11, 0.15),
    0 16px 32px rgba(245, 158, 11, 0.15),
    0 32px 64px rgba(245, 158, 11, 0.2);
}`,
    htmlCode: `<div class="multi-shadow">
  <h3>Layered Elevation</h3>
</div>`,
  },
  {
    id: 'neon-box-shadow',
    name: 'Neon Box Shadow',
    category: 'shadow',
    description: 'A box with neon glow emanating from all edges, intensifying on hover.',
    cssCode: `.neon-box-shadow {
  background: #0a0a0a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(245, 158, 11, 0.27);
  box-shadow:
    0 0 5px #f59e0b,
    0 0 10px rgba(245, 158, 11, 0.27),
    0 0 20px rgba(245, 158, 11, 0.13),
    0 0 40px rgba(245, 158, 11, 0.07);
  transition: box-shadow 0.3s ease;
}

.neon-box-shadow:hover {
  box-shadow:
    0 0 10px #f59e0b,
    0 0 20px rgba(245, 158, 11, 0.4),
    0 0 40px rgba(245, 158, 11, 0.27),
    0 0 80px rgba(245, 158, 11, 0.13);
}`,
    htmlCode: `<div class="neon-box-shadow">
  <h3>Neon Shadow</h3>
</div>`,
  },
  {
    id: 'long-shadow',
    name: 'Long Shadow',
    category: 'shadow',
    description: 'Flat design long shadow effect with a retro, layered offset appearance.',
    cssCode: `.long-shadow {
  background: #f59e0b;
  border-radius: 12px;
  padding: 24px;
  color: #000;
  font-weight: 700;
  box-shadow:
    1px 1px 0 #b45309, 2px 2px 0 #b45309,
    3px 3px 0 #b45309, 4px 4px 0 #b45309,
    5px 5px 0 #b45309, 6px 6px 0 #b45309,
    7px 7px 0 #b45309, 8px 8px 0 #b45309,
    9px 9px 0 #b45309, 10px 10px 0 #b45309;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.long-shadow:hover {
  transform: translate(-2px, -2px);
  box-shadow:
    3px 3px 0 #b45309, 4px 4px 0 #b45309,
    5px 5px 0 #b45309, 6px 6px 0 #b45309,
    7px 7px 0 #b45309, 8px 8px 0 #b45309,
    9px 9px 0 #b45309, 10px 10px 0 #b45309,
    11px 11px 0 #b45309, 12px 12px 0 #b45309;
}`,
    htmlCode: `<div class="long-shadow">
  <span>Long Shadow</span>
</div>`,
  },
  {
    id: 'shadow-morph',
    name: 'Shadow Morph',
    category: 'shadow',
    description: 'A shadow that continuously changes position, color, and border-radius for a living feel.',
    cssCode: `.shadow-morph {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  animation: shadow-morph-anim 3s ease-in-out infinite;
}

@keyframes shadow-morph-anim {
  0%   { box-shadow: 10px 10px 30px rgba(245, 158, 11, 0.27); border-radius: 12px; }
  25%  { box-shadow: -10px 10px 30px rgba(239, 68, 68, 0.27); border-radius: 20px 8px; }
  50%  { box-shadow: -10px -10px 30px rgba(236, 72, 153, 0.27); border-radius: 8px 20px; }
  75%  { box-shadow: 10px -10px 30px rgba(139, 92, 246, 0.27); border-radius: 20px; }
  100% { box-shadow: 10px 10px 30px rgba(245, 158, 11, 0.27); border-radius: 12px; }
}`,
    htmlCode: `<div class="shadow-morph">
  <h3>Morphing Shadow</h3>
</div>`,
  },
  {
    id: 'inset-glow',
    name: 'Inset Glow',
    category: 'shadow',
    description: 'A deep inset glow that intensifies on hover, creating an inner light effect.',
    cssCode: `.inset-glow {
  background: #111;
  border-radius: 12px;
  padding: 24px;
  box-shadow:
    inset 0 0 20px rgba(245, 158, 11, 0.13),
    inset 0 0 40px rgba(245, 158, 11, 0.07);
  transition: box-shadow 0.4s ease;
}

.inset-glow:hover {
  box-shadow:
    inset 0 0 30px rgba(245, 158, 11, 0.27),
    inset 0 0 60px rgba(245, 158, 11, 0.13),
    inset 0 0 100px rgba(245, 158, 11, 0.07);
}`,
    htmlCode: `<div class="inset-glow">
  <h3>Inner Glow</h3>
</div>`,
  },
  {
    id: 'colored-shadow',
    name: 'Colored Shadow',
    category: 'shadow',
    description: 'Vibrant solid-colored shadows stacked in different hues for a bold, playful look.',
    cssCode: `.colored-shadow {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow:
    8px 8px 0 #f59e0b,
    16px 16px 0 #ef4444,
    24px 24px 0 #ec4899;
  transition: box-shadow 0.4s ease, transform 0.4s ease;
}

.colored-shadow:hover {
  transform: translate(-4px, -4px);
  box-shadow:
    12px 12px 0 #f59e0b,
    20px 20px 0 #ef4444,
    28px 28px 0 #ec4899;
}`,
    htmlCode: `<div class="colored-shadow">
  <h3>Color Stack</h3>
</div>`,
  },

  // ==================== TRANSITION EFFECTS ====================
  {
    id: 'smooth-expand',
    name: 'Smooth Expand',
    category: 'transition',
    description: 'Content that smoothly expands and collapses with max-height and opacity transitions.',
    cssCode: `.smooth-expand {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s ease;
  opacity: 0;
  padding: 0 16px;
  background: #1e1e1e;
  border-radius: 8px;
}

.smooth-expand.is-expanded {
  max-height: 120px;
  opacity: 1;
  padding: 16px;
}`,
    htmlCode: `<div class="smooth-expand is-expanded">
  <p>This content smoothly expands.</p>
</div>`,
  },
  {
    id: 'slide-reveal',
    name: 'Slide Reveal',
    category: 'transition',
    description: 'Content hidden off-screen that slides into view from the right on hover.',
    cssCode: `.slide-reveal-container {
  overflow: hidden;
  border-radius: 8px;
}

.slide-reveal {
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  padding: 16px 24px;
  border-radius: 8px;
  color: #000;
  font-weight: 600;
}

.slide-reveal-container:hover .slide-reveal {
  transform: translateX(0);
}`,
    htmlCode: `<div class="slide-reveal-container">
  <div class="slide-reveal">Revealed Content</div>
</div>`,
  },
  {
    id: 'scale-bounce',
    name: 'Scale Bounce',
    category: 'transition',
    description: 'An element that bouncily scales up on hover using a spring-like cubic bezier curve.',
    cssCode: `.scale-bounce {
  display: inline-block;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
 border: none;
}

.scale-bounce:hover {
  transform: scale(1.1);
}`,
    htmlCode: `<button class="scale-bounce">Bounce Scale</button>`,
  },
  {
    id: 'rotate-in',
    name: 'Rotate In',
    category: 'transition',
    description: 'An element that continuously rotates in from 180° and fades out in a loop.',
    cssCode: `.rotate-in {
  display: inline-block;
  width: 60px; height: 60px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 12px;
  animation: rotate-in-anim 3s ease-in-out infinite;
}

@keyframes rotate-in-anim {
  0%   { transform: rotate(-180deg) scale(0); opacity: 0; }
  50%  { transform: rotate(0deg) scale(1); opacity: 1; }
  70%  { transform: rotate(0deg) scale(1); opacity: 1; }
  100% { transform: rotate(180deg) scale(0); opacity: 0; }
}`,
    htmlCode: `<div class="rotate-in"></div>`,
  },
  {
    id: 'elastic-pop',
    name: 'Elastic Pop',
    category: 'transition',
    description: 'An element that pops with an elastic overshoot on hover using a custom easing curve.',
    cssCode: `.elastic-pop {
  display: inline-block;
  padding: 12px 24px;
  background: #1e1e1e;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  color: #f59e0b;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.elastic-pop:hover {
  transform: scale(1.08);
}`,
    htmlCode: `<button class="elastic-pop">Elastic Pop</button>`,
  },
  {
    id: 'fade-slide-up',
    name: 'Fade Slide Up',
    category: 'transition',
    description: 'An element that fades in while sliding up, holds, then fades out sliding further up.',
    cssCode: `.fade-slide-up {
  display: inline-block;
  animation: fade-slide-anim 3s ease-in-out infinite;
}

.fade-slide-up-inner {
  background: rgba(245, 158, 11, 0.13);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 10px;
  padding: 16px 24px;
  color: #e5e5e5;
}

@keyframes fade-slide-anim {
  0%   { transform: translateY(20px); opacity: 0; }
  20%  { transform: translateY(0); opacity: 1; }
  80%  { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
}`,
    htmlCode: `<div class="fade-slide-up">
  <div class="fade-slide-up-inner">Animated Entry</div>
</div>`,
  },
];
