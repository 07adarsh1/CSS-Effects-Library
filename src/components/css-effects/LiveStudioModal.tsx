'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Heart,
  Eye,
  Code2,
  Maximize2,
  Minimize2,
  Sliders,
  Palette,
  Terminal,
  Zap,
  Layers,
  Columns,
  Rows,
  Package,
  Monitor,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CSSEffect, allEffects } from '@/lib/effects-data';
import { useEffectsStore } from '@/lib/store';
import {
  generateReactCode,
  generateVueCode,
  generateSvelteCode,
  generateStandaloneHtml,
} from '@/lib/export-generators';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { useTheme } from 'next-themes';
import { Logo } from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

interface LiveStudioModalProps {
  effect: CSSEffect | null;
  open: boolean;
  onClose: () => void;
  onSelectEffect?: (effect: CSSEffect) => void;
}

type BackgroundTheme = 'dark' | 'black' | 'light' | 'grid' | 'dots' | 'gradient';
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
type MobileTab = 'canvas' | 'overview' | 'frameworks' | 'css-editor' | 'html-editor' | 'syntax';

const PRESET_COLORS = [
  { name: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11' },
  { name: 'Cyan', hex: '#06b6d4', rgb: '6, 182, 212' },
  { name: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'Purple', hex: '#a855f7', rgb: '168, 85, 247' },
  { name: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94' },
  { name: 'Orange', hex: '#f97316', rgb: '249, 115, 22' },
];

interface LiveStudioContentProps {
  effect: CSSEffect;
  onClose: () => void;
  onSelectEffect?: (effect: CSSEffect) => void;
}

function LiveStudioContent({ effect, onClose, onSelectEffect }: LiveStudioContentProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'overview' | 'frameworks' | 'css-editor' | 'html-editor' | 'syntax'>('overview');
  const [mobileTab, setMobileTab] = useState<MobileTab>('canvas');
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'vue' | 'svelte' | 'html'>('react');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('dark');
  const [scale, setScale] = useState<number>(1);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('#f59e0b');
  const [customCss, setCustomCss] = useState<string>(effect.cssCode);
  const [customHtml, setCustomHtml] = useState<string>(effect.htmlCode);
  const [isCustomModified, setIsCustomModified] = useState<boolean>(false);
  const [isHoverSimulated, setIsHoverSimulated] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'css' | 'html' | 'react' | 'vue' | 'svelte' | 'standalone' | null>(null);
  const [splitDirection, setSplitDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [renderKey, setRenderKey] = useState<number>(0);

  const effectiveCss = useMemo(() => {
    let code = isCustomModified ? customCss : effect.cssCode;
    if (selectedColor !== '#f59e0b') {
      const rgb = PRESET_COLORS.find((c) => c.hex === selectedColor)?.rgb || '245, 158, 11';
      code = code
        .replace(/#f59e0b/gi, selectedColor)
        .replace(/rgba\(245,\s*158,\s*11,/gi, `rgba(${rgb},`);
    }
    return code;
  }, [customCss, effect.cssCode, isCustomModified, selectedColor]);

  const effectiveHtml = useMemo(() => {
    return isCustomModified ? customHtml : effect.htmlCode;
  }, [customHtml, effect.htmlCode, isCustomModified]);

  const reactCode = useMemo(
    () => generateReactCode(effect.id, effect.name, effectiveCss, effectiveHtml),
    [effect.id, effect.name, effectiveCss, effectiveHtml]
  );
  const vueCode = useMemo(
    () => generateVueCode(effect.name, effectiveCss, effectiveHtml),
    [effect.name, effectiveCss, effectiveHtml]
  );
  const svelteCode = useMemo(
    () => generateSvelteCode(effect.name, effectiveCss, effectiveHtml),
    [effect.name, effectiveCss, effectiveHtml]
  );
  const standaloneHtmlCode = useMemo(
    () => generateStandaloneHtml(effect.name, effectiveCss, effectiveHtml),
    [effect.name, effectiveCss, effectiveHtml]
  );

  const currentFrameworkCode = useMemo(() => {
    switch (selectedFramework) {
      case 'react':
        return reactCode;
      case 'vue':
        return vueCode;
      case 'svelte':
        return svelteCode;
      case 'html':
      default:
        return standaloneHtmlCode;
    }
  }, [selectedFramework, reactCode, vueCode, svelteCode, standaloneHtmlCode]);

  // 8-Direction Window Resizing & Dragging State (Desktop only)
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [windowBounds, setWindowBounds] = useState<{ width: number; height: number; x: number; y: number }>(() => {
    if (typeof window !== 'undefined') {
      const w = Math.min(1140, Math.max(500, window.innerWidth * 0.9));
      const h = Math.min(800, Math.max(450, window.innerHeight * 0.88));
      const x = Math.max(10, Math.round((window.innerWidth - w) / 2));
      const y = Math.max(10, Math.round((window.innerHeight - h) / 2));
      return { width: w, height: h, x, y };
    }
    return { width: 1120, height: 780, x: 40, y: 40 };
  });
  const preMaximizeRef = useRef<{ width: number; height: number; x: number; y: number }>({
    width: 1120,
    height: 780,
    x: 40,
    y: 40,
  });
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState<boolean>(false);
  const activeActionRef = useRef<{
    type: 'drag' | 'resize';
    direction?: ResizeDirection;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startXPos: number;
    startYPos: number;
  } | null>(null);

  const favorites = useEffectsStore((s) => s.favorites);
  const toggleFavorite = useEffectsStore((s) => s.toggleFavorite);

  const currentIndex = allEffects.findIndex((e) => e.id === effect.id);
  const isFavorite = favorites.includes(effect.id);

  const navigateEffect = useCallback(
    (delta: number) => {
      const total = allEffects.length;
      const nextIdx = (currentIndex + delta + total) % total;
      const nextEffect = allEffects[nextIdx];
      if (onSelectEffect && nextEffect) {
        onSelectEffect(nextEffect);
      }
    },
    [currentIndex, onSelectEffect]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateEffect(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateEffect(1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateEffect, onClose]);

  // Handle Drag Move & Resize Move globally with requestAnimationFrame
  useEffect(() => {
    if (isMobile) return;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      if (!activeActionRef.current) return;
      const action = activeActionRef.current;

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const dx = e.clientX - action.startX;
        const dy = e.clientY - action.startY;

        if (action.type === 'drag') {
          const newX = Math.max(-action.startW + 100, Math.min(window.innerWidth - 100, action.startXPos + dx));
          const newY = Math.max(0, Math.min(window.innerHeight - 80, action.startYPos + dy));
          setWindowBounds((prev) => ({ ...prev, x: newX, y: newY }));
        } else if (action.type === 'resize' && action.direction) {
          const dir = action.direction;
          const minW = 460;
          const minH = 380;
          const maxW = window.innerWidth - 10;
          const maxH = window.innerHeight - 10;

          let newW = action.startW;
          let newH = action.startH;
          let newX = action.startXPos;
          let newY = action.startYPos;

          // Horizontal resizing
          if (dir.includes('e')) {
            newW = Math.max(minW, Math.min(maxW, action.startW + dx));
          } else if (dir.includes('w')) {
            newW = Math.max(minW, Math.min(maxW, action.startW - dx));
            newX = action.startXPos + (action.startW - newW);
          }

          // Vertical resizing
          if (dir.includes('s')) {
            newH = Math.max(minH, Math.min(maxH, action.startH + dy));
          } else if (dir.includes('n')) {
            newH = Math.max(minH, Math.min(maxH, action.startH - dy));
            newY = action.startYPos + (action.startH - newH);
          }

          setWindowBounds({
            width: Math.round(newW),
            height: Math.round(newH),
            x: Math.round(newX),
            y: Math.round(newY),
          });
        }
      });
    };

    const handlePointerUp = () => {
      if (activeActionRef.current) {
        activeActionRef.current = null;
        setIsDraggingOrResizing(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  // Start Header Dragging (Desktop)
  const handleStartHeaderDrag = (e: React.PointerEvent) => {
    if (isMaximized || isMobile) return;
    if ((e.target as HTMLElement).closest('button, input, textarea, a')) return;

    e.preventDefault();
    setIsDraggingOrResizing(true);
    activeActionRef.current = {
      type: 'drag',
      startX: e.clientX,
      startY: e.clientY,
      startW: windowBounds.width,
      startH: windowBounds.height,
      startXPos: windowBounds.x,
      startYPos: windowBounds.y,
    };
  };

  // Start 8-way resizing (Desktop)
  const handleStartResize = (direction: ResizeDirection, e: React.PointerEvent) => {
    if (isMaximized || isMobile) return;
    e.preventDefault();
    e.stopPropagation();

    setIsDraggingOrResizing(true);
    activeActionRef.current = {
      type: 'resize',
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startW: windowBounds.width,
      startH: windowBounds.height,
      startXPos: windowBounds.x,
      startYPos: windowBounds.y,
    };
  };

  // Toggle Maximize Window
  const toggleMaximize = () => {
    if (isMobile) return;
    if (!isMaximized) {
      preMaximizeRef.current = { ...windowBounds };
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
      setWindowBounds(preMaximizeRef.current);
    }
  };

  const handleResetCode = () => {
    setCustomCss(effect.cssCode);
    setCustomHtml(effect.htmlCode);
    setIsCustomModified(false);
    setSelectedColor('#f59e0b');
    setScale(1);
    setSpeedMultiplier(1);
    setIsHoverSimulated(false);
    setRenderKey((k) => k + 1);
    toast.info('Studio reset to original effect styles');
  };

  const handleReplay = () => {
    setRenderKey((k) => k + 1);
    toast.success('Animation replayed');
  };

  const copyToClipboard = async (
    text: string,
    type: 'css' | 'html' | 'react' | 'vue' | 'svelte' | 'standalone'
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast.success(`${type.toUpperCase()} copied to clipboard!`);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  // Dynamic interactive sandbox handlers
  const handleSandboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // 1. Ripple Buttons
    const rippleBtn = target.closest('.ripple-btn, .fx-ripple-btn') as HTMLElement;
    if (rippleBtn) {
      const circle = document.createElement('span');
      const diameter = Math.max(rippleBtn.clientWidth, rippleBtn.clientHeight);
      const radius = diameter / 2;
      const rect = rippleBtn.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'fx-ripple-animation 600ms linear';
      circle.style.pointerEvents = 'none';

      const existingRipple = rippleBtn.querySelector('.fx-dynamic-ripple');
      if (existingRipple) existingRipple.remove();
      circle.classList.add('fx-dynamic-ripple');
      rippleBtn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
      return;
    }

    // 2. Accordions
    const accordionHeader = target.closest('.accordion-header, .fx-accordion-header');
    if (accordionHeader) {
      const item = accordionHeader.closest('.accordion-item, .fx-accordion-item');
      if (item) item.classList.toggle('open');
      return;
    }

    // 3. Tab bar items
    const tabItem = target.closest('.sliding-tab-btn, .tab-item, .fx-tab-item');
    if (tabItem) {
      const container = tabItem.closest('.sliding-tabs, .tabs-wrap, .fx-sliding-tabs');
      if (container) {
        container.querySelectorAll('.sliding-tab-btn, .tab-item, .fx-tab-item').forEach((b) => b.classList.remove('active'));
        tabItem.classList.add('active');
      }
      return;
    }

    // 4. Segmented Control items
    const segItem = target.closest('.segmented-item, .fx-segmented-item');
    if (segItem) {
      const group = segItem.closest('.segmented-control, .fx-segmented-control');
      if (group) {
        group.querySelectorAll('.segmented-item, .fx-segmented-item').forEach((b) => b.classList.remove('active'));
        segItem.classList.add('active');
      }
      return;
    }

    // 5. Star Rating
    const starBtn = target.closest('.star-btn, .fx-star-btn');
    if (starBtn) {
      const parent = starBtn.closest('.rating-stars, .fx-rating-stars');
      if (parent) {
        const stars = Array.from(parent.querySelectorAll('.star-btn, .fx-star-btn'));
        const idx = stars.indexOf(starBtn);
        stars.forEach((s, i) => {
          s.classList.toggle('active', i <= idx);
        });
      }
      return;
    }

    // 6. Toast trigger
    const toastTrigger = target.closest('.toast-trigger-btn, .fx-toast-trigger');
    if (toastTrigger) {
      const toastEl = toastTrigger.parentElement?.querySelector('.interactive-toast, .fx-interactive-toast');
      if (toastEl) {
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 3000);
      }
      return;
    }

    // 7. FAB Menu
    const fabMain = target.closest('.fab-main-btn, .fx-fab-main');
    if (fabMain) {
      const fabWrap = fabMain.closest('.fab-container, .fx-fab-container');
      if (fabWrap) fabWrap.classList.toggle('open');
      return;
    }

    // 8. Radial Action Wheel
    const radialCenter = target.closest('.radial-menu-center, .fx-radial-center');
    if (radialCenter) {
      const radialWrap = radialCenter.closest('.radial-menu-wrap, .fx-radial-menu');
      if (radialWrap) radialWrap.classList.toggle('open');
      return;
    }

    // 9. Modal Backdrop / Triggers
    const modalTrigger = target.closest('.modal-trigger-btn, .fx-modal-trigger');
    if (modalTrigger) {
      const modalEl = modalTrigger.parentElement?.querySelector('.frosted-modal-overlay, .fx-frosted-modal');
      if (modalEl) modalEl.classList.add('open');
      return;
    }
    const modalClose = target.closest('.modal-close-btn, .fx-modal-close');
    if (modalClose) {
      const modalEl = modalClose.closest('.frosted-modal-overlay, .fx-frosted-modal');
      if (modalEl) modalEl.classList.remove('open');
      return;
    }

    // 10. Audio Waveform Player Play/Pause
    const audioBtn = target.closest('.audio-play-btn, .fx-audio-play-btn');
    if (audioBtn) {
      const isPlaying = audioBtn.classList.toggle('playing');
      audioBtn.textContent = isPlaying ? '❚❚' : '▶';
      const player = audioBtn.closest('.audio-player, .fx-audio-player');
      if (player) {
        const bars = player.querySelectorAll('.waveform-bar, .fx-waveform-bar');
        bars.forEach((b) => {
          (b as HTMLElement).style.animationPlayState = isPlaying ? 'paused' : 'running';
        });
      }
      return;
    }

    // 11. Cookie Banner Actions
    const cookieAccept = target.closest('.cookie-btn-accept, .fx-cookie-btn-accept');
    if (cookieAccept) {
      const banner = cookieAccept.closest('.cookie-banner, .fx-cookie-banner');
      if (banner) {
        const textEl = banner.querySelector('.cookie-text, .fx-cookie-text');
        if (textEl) textEl.textContent = 'Preferences saved successfully!';
        cookieAccept.textContent = '✓ Saved';
      }
      return;
    }

    // 12. Dynamic Island Capsule Toggle
    const dynamicIsland = target.closest('.dynamic-island, .fx-dynamic-island');
    if (dynamicIsland) {
      dynamicIsland.classList.toggle('expanded');
      return;
    }

    // 13. Music Player Toggle
    const vinylBtn = target.closest('.music-player-card button, .fx-music-player-card button');
    if (vinylBtn) {
      const isPlay = vinylBtn.textContent === '▶';
      vinylBtn.textContent = isPlay ? '❚❚' : '▶';
      const disk = vinylBtn.closest('.music-player-card, .fx-music-player-card')?.querySelector('.vinyl-disk, .fx-vinyl-disk') as HTMLElement;
      if (disk) {
        disk.style.animationPlayState = isPlay ? 'running' : 'paused';
      }
      return;
    }

    // 14. Command Palette items
    const cmdItem = target.closest('.cmd-item, .fx-cmd-item');
    if (cmdItem) {
      cmdItem.parentElement?.querySelectorAll('.cmd-item, .fx-cmd-item').forEach((b) => b.classList.remove('active'));
      cmdItem.classList.add('active');
      return;
    }

    // 15. File Tree nodes
    const treeNode = target.closest('.tree-node, .fx-tree-node');
    if (treeNode) {
      treeNode.closest('.file-tree-wrap, .fx-file-tree-wrap')?.querySelectorAll('.tree-node, .fx-tree-node').forEach((n) => n.classList.remove('active'));
      treeNode.classList.add('active');
      return;
    }

    // 16. Multi-step Wizard
    const wizardStep = target.closest('.wizard-step, .fx-wizard-step');
    if (wizardStep) {
      const bar = wizardStep.closest('.wizard-bar, .fx-wizard-bar');
      if (bar) {
        const steps = Array.from(bar.querySelectorAll('.wizard-step, .fx-wizard-step'));
        const lines = Array.from(bar.querySelectorAll('.wizard-line, .fx-wizard-line'));
        const clickedIdx = steps.indexOf(wizardStep);
        if (clickedIdx !== -1) {
          steps.forEach((s, i) => {
            const circle = s.querySelector('.wizard-circle, .fx-wizard-circle');
            if (i < clickedIdx) {
              s.className = 'wizard-step fx-wizard-step done';
              if (circle) circle.textContent = '✓';
            } else if (i === clickedIdx) {
              s.className = 'wizard-step fx-wizard-step active';
              if (circle) circle.textContent = `${i + 1}`;
            } else {
              s.className = 'wizard-step fx-wizard-step';
              if (circle) circle.textContent = `${i + 1}`;
            }
          });
          lines.forEach((l, i) => {
            l.className = i < clickedIdx ? 'wizard-line fx-wizard-line done' : 'wizard-line fx-wizard-line';
          });
        }
      }
      return;
    }

    // 17. Color Swatch Selector
    const swatchDot = target.closest('.swatch-dot, .fx-swatch-dot');
    if (swatchDot) {
      swatchDot.parentElement?.querySelectorAll('.swatch-dot, .fx-swatch-dot').forEach((d) => d.classList.remove('selected'));
      swatchDot.classList.add('selected');
      return;
    }

    // 18. 3D Room Cube Flip
    const cubeFlip = target.closest('.cube-flip-wrap, .fx-cube-flip-wrap');
    if (cubeFlip) {
      const inner = cubeFlip.querySelector('.cube-flip-inner, .fx-cube-flip-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
      }
      return;
    }
  };

  // Interactive mouse move tracking (spotlights & 3D tilt)
  const handleSandboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const spotlightEl = (e.target as HTMLElement).closest(
      '.card-spotlight, .bento-card, .fx-card-spotlight, .fx-bento-card, [data-spotlight]'
    ) as HTMLElement;
    if (spotlightEl) {
      const rect = spotlightEl.getBoundingClientRect();
      spotlightEl.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      spotlightEl.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  // Interactive OTP / Input key handling
  const handleSandboxInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;

    // Range slider dynamic track update
    if (target.type === 'range' || target.classList?.contains('range-slider') || target.classList?.contains('fx-range-slider') || target.classList?.contains('custom-range') || target.classList?.contains('fx-custom-range')) {
      target.style.backgroundSize = `${target.value}% 100%`;
      const priceCard = target.closest('.pricing-slider-card, .fx-pricing-slider-card');
      if (priceCard) {
        const amount = priceCard.querySelector('.price-amount, .fx-price-amount');
        if (amount) amount.textContent = `$${target.value}`;
      }
    }

    // OTP box auto advance
    if (target.classList?.contains('otp-box') || target.classList?.contains('fx-otp-box')) {
      if (target.value.length >= 1) {
        const next = target.nextElementSibling as HTMLInputElement;
        if (next && next.tagName === 'INPUT') {
          next.focus();
          next.select();
        }
      }
    }
  };

  const handleSandboxKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.classList?.contains('otp-box') || target.classList?.contains('fx-otp-box')) {
      if (e.key === 'Backspace' && !target.value) {
        const prev = target.previousElementSibling as HTMLInputElement;
        if (prev && prev.tagName === 'INPUT') {
          prev.focus();
          prev.select();
        }
      }
    }
  };

  // Scoped styles for live sandbox
  const previewScopedCss = useMemo(() => {
    let code = isCustomModified ? customCss : effect.cssCode;

    if (selectedColor !== '#f59e0b') {
      const rgb = PRESET_COLORS.find((c) => c.hex === selectedColor)?.rgb || '245, 158, 11';
      code = code
        .replace(/#f59e0b/gi, selectedColor)
        .replace(/rgba\(245,\s*158,\s*11,/gi, `rgba(${rgb},`);
    }

    if (isHoverSimulated) {
      code = code.replace(/:hover\b/g, ':hover, .force-hover-mode, .force-hover-mode *');
    }

    return `
      #live-studio-canvas-root {
        --live-accent: ${selectedColor};
        box-sizing: border-box;
      }
      #live-studio-canvas-root *,
      #live-studio-canvas-root *::before,
      #live-studio-canvas-root *::after {
        box-sizing: border-box;
      }
      #live-studio-canvas-root input,
      #live-studio-canvas-root textarea,
      #live-studio-canvas-root select,
      #live-studio-canvas-root button {
        font-family: inherit;
      }
      .live-interactive-sandbox-render {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .live-interactive-sandbox-render > * {
        flex-shrink: 0;
      }
      /* Full-surface styling for background category effects in studio */
      .live-interactive-sandbox-render > .animated-gradient,
      .live-interactive-sandbox-render > .dot-matrix,
      .live-interactive-sandbox-render > .bg-stripes,
      .live-interactive-sandbox-render > .aurora-bg,
      .live-interactive-sandbox-render > .geometric-bg,
      .live-interactive-sandbox-render > .geometric-pattern,
      .live-interactive-sandbox-render > .waves-bg,
      .live-interactive-sandbox-render > .matrix-bg,
      .live-interactive-sandbox-render > .space-warp-bg,
      .live-interactive-sandbox-render > .conic-vortex,
      .live-interactive-sandbox-render > .synthwave-bg,
      .live-interactive-sandbox-render > .quantum-bg,
      .live-interactive-sandbox-render > .crt-screen,
      .live-interactive-sandbox-render > .hex-mesh-bg,
      .live-interactive-sandbox-render > .lava-bg,
      .live-interactive-sandbox-render > .nebula-bg,
      .live-interactive-sandbox-render > [class*="bg-"],
      .live-interactive-sandbox-render > [class*="-bg"] {
        width: 100% !important;
        min-width: 260px;
        max-width: 580px;
        height: 240px !important;
        min-height: 200px;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6);
      }
      @keyframes fx-ripple-animation {
        to { transform: scale(4); opacity: 0; }
      }
      ${code}
    `;
  }, [customCss, effect.cssCode, isCustomModified, isHoverSimulated, selectedColor]);

  const getCanvasBgClass = () => {
    switch (bgTheme) {
      case 'black':
        return 'bg-black text-white';
      case 'light':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100';
      case 'grid':
        return 'bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-white bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#222227_1px,transparent_1px),linear-gradient(to_bottom,#222227_1px,transparent_1px)] bg-[size:24px_24px]';
      case 'dots':
        return 'bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-white bg-[radial-gradient(rgba(0,0,0,0.18)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#2d2d34_1.5px,transparent_1.5px)] bg-[size:18px_18px]';
      case 'gradient':
        return 'bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-rose-50/80 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-950 text-slate-900 dark:text-white';
      case 'dark':
      default:
        return 'bg-slate-900 dark:bg-[#0a0a0e] text-white';
    }
  };

  // Reusable Canvas Component (Used in both Desktop Panel & Mobile Tab)
  const renderCanvasView = (isMobileCanvas: boolean) => (
    <div className="flex flex-col h-full min-h-0 bg-muted/20 dark:bg-[#0a0a0e] overflow-hidden">
      {/* Toolbar Row 1: Themes + Zoom + Speed + Replay */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-muted/50 dark:bg-[#121218] border-b border-border/50 dark:border-border/30 gap-2 overflow-x-auto scrollbar-none shrink-0">
        {/* Canvas Theme Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Canvas:</span>
          </span>
          <div className="flex items-center gap-0.5 bg-muted/80 dark:bg-black/50 p-0.5 rounded-lg border border-border/80 dark:border-white/10">
            {(['dark', 'black', 'light', 'grid', 'dots', 'gradient'] as BackgroundTheme[]).map((bg) => (
              <button
                key={bg}
                onClick={() => setBgTheme(bg)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize transition-all ${
                  bgTheme === bg
                    ? 'bg-amber-500 text-black font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Transformations: Zoom + Speed + Replay */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-muted/80 dark:bg-black/50 p-0.5 rounded-lg border border-border/80 dark:border-white/10 text-[10px]">
            <span className="text-muted-foreground pl-1.5 pr-0.5 hidden xs:inline">Zoom:</span>
            {[0.75, 1, 1.25, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  scale === s
                    ? 'bg-background dark:bg-white/20 text-foreground dark:text-white font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-muted/80 dark:bg-black/50 p-0.5 rounded-lg border border-border/80 dark:border-white/10 text-[10px]">
            <span className="text-muted-foreground pl-1.5 pr-0.5 hidden xs:inline">Speed:</span>
            {[0.5, 1, 2].map((sp) => (
              <button
                key={sp}
                onClick={() => setSpeedMultiplier(sp)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  speedMultiplier === sp
                    ? 'bg-background dark:bg-white/20 text-foreground dark:text-white font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {sp}x
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleReplay}
            className="h-7 w-7 text-muted-foreground hover:text-amber-500 hover:bg-muted dark:hover:bg-white/5"
            title="Replay Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Toolbar Row 2: Color Palette + Hover Simulator */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-muted/30 dark:bg-[#0f0f15] border-b border-border/40 dark:border-border/20 text-[11px] gap-2 overflow-x-auto scrollbar-none shrink-0">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Accent Tint:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.hex)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor === c.hex
                    ? 'scale-125 border-foreground dark:border-white shadow-xs ring-1 ring-foreground/40 dark:ring-white/50'
                    : 'border-transparent opacity-65 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsHoverSimulated(!isHoverSimulated)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              isHoverSimulated
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'border-border/80 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{isHoverSimulated ? 'Hover Locked' : 'Simulate Hover'}</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Canvas Body */}
      <div
        id="live-studio-canvas-root"
        key={`canvas-${renderKey}-${effect.id}`}
        onClick={handleSandboxClick}
        onMouseMove={handleSandboxMouseMove}
        onInput={handleSandboxInput}
        onKeyDown={handleSandboxKeyDown}
        className={`relative flex-1 flex items-center justify-center p-4 sm:p-10 overflow-auto transition-colors duration-300 min-h-[220px] ${getCanvasBgClass()}`}
      >
        {/* Injected Scoped Styles */}
        <style dangerouslySetInnerHTML={{ __html: previewScopedCss }} />

        {/* Scaling Container */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className={`relative flex items-center justify-center w-full max-w-[620px] ${
            isHoverSimulated ? 'force-hover-mode' : ''
          }`}
        >
          <div
            className="live-interactive-sandbox-render w-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: customHtml }}
          />
        </div>

        {/* Bottom Sandbox Live Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-background/80 dark:bg-black/60 backdrop-blur-md border border-border/80 dark:border-white/10 text-[10px] text-foreground/80 dark:text-muted-foreground pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Sandbox &middot; tap / click to test</span>
        </div>

        {/* Mobile Quick Action Floating Pill */}
        {isMobileCanvas && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
            <Button
              size="sm"
              onClick={() => copyToClipboard(effectiveCss, 'css')}
              className="h-7 text-[10px] font-bold bg-amber-500 hover:bg-amber-400 text-black px-2.5 rounded-lg shadow-md gap-1"
            >
              {copiedType === 'css' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy CSS</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMobileTab('frameworks')}
              className="h-7 text-[10px] font-bold bg-background/80 dark:bg-black/80 backdrop-blur-md border-white/20 text-foreground px-2.5 rounded-lg shadow-md gap-1"
            >
              <Package className="w-3 h-3 text-sky-400" />
              <span>Export</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Reusable Tabs Content for Inspector / Code Panel
  const renderTabContent = () => (
    <>
      {/* TAB 1: Overview & 1-Click Code Actions */}
      <TabsContent value="overview" className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto m-0 min-h-0">
        {/* Metadata Box */}
        <div className="p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.03] border border-border/80 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Effect Details
            </h4>
            {isCustomModified && (
              <button
                onClick={handleResetCode}
                className="text-[10px] text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Reset Code
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {effect.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="px-2.5 py-0.5 rounded-md bg-muted/70 dark:bg-white/5 border border-border/80 dark:border-white/10 text-muted-foreground">
              Category: <b className="text-amber-500 dark:text-amber-400 capitalize">{effect.category}</b>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-muted/70 dark:bg-white/5 border border-border/80 dark:border-white/10 text-muted-foreground">
              ID: <code className="text-emerald-600 dark:text-emerald-400 font-mono">{effect.id}</code>
            </span>
          </div>
        </div>

        {/* 1-Click Code Copy Cards */}
        <div className="space-y-2.5">
          {/* CSS Card */}
          <div className="p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.03] border border-border/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-xs font-bold text-amber-500 dark:text-amber-400">CSS Stylesheet Rules</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Pure CSS class definition & keyframe animations
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => copyToClipboard(effectiveCss, 'css')}
              className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs gap-1.5 shrink-0 self-start sm:self-center"
            >
              {copiedType === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'css' ? 'Copied!' : 'Copy CSS'}
            </Button>
          </div>

          {/* HTML Card */}
          <div className="p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.03] border border-border/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">HTML Element Markup</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Semantic HTML tag with corresponding classes
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(effectiveHtml, 'html')}
              className="h-8 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold gap-1.5 shrink-0 self-start sm:self-center"
            >
              {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'html' ? 'Copied!' : 'Copy HTML'}
            </Button>
          </div>
        </div>

        {/* Integration Tip */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-200/90 space-y-1">
          <div className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            💡 Multi-Framework Component Export:
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Switch to the <b>Export</b> tab above to export ready-to-use drop-in components for React (TSX), Vue 3, Svelte 5, or standalone HTML + CSS!
          </p>
        </div>
      </TabsContent>

      {/* TAB: Frameworks & Export */}
      <TabsContent value="frameworks" className="flex-1 flex flex-col min-h-0 m-0 overflow-hidden">
        {/* Framework Picker Bar */}
        <div className="p-2 sm:p-2.5 border-b border-border/50 dark:border-border/30 bg-muted/60 dark:bg-[#121218] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-muted/80 dark:bg-white/5 border border-border/80 dark:border-white/10 p-0.5 rounded-lg overflow-x-auto scrollbar-none max-w-full">
            <button
              onClick={() => setSelectedFramework('react')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                selectedFramework === 'react'
                  ? 'bg-sky-500 text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>⚛️</span> React TSX
            </button>
            <button
              onClick={() => setSelectedFramework('vue')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                selectedFramework === 'vue'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>💚</span> Vue 3
            </button>
            <button
              onClick={() => setSelectedFramework('svelte')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                selectedFramework === 'svelte'
                  ? 'bg-orange-500 text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>🧡</span> Svelte 5
            </button>
            <button
              onClick={() => setSelectedFramework('html')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                selectedFramework === 'html'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>🌐</span> HTML + CSS
            </button>
          </div>

          <Button
            size="sm"
            onClick={() => copyToClipboard(currentFrameworkCode, selectedFramework as any)}
            className="h-7 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black gap-1.5"
          >
            {copiedType === selectedFramework ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedType === selectedFramework ? 'Copied Component!' : 'Copy Component'}
          </Button>
        </div>

        {/* Framework Code Preview with Syntax Highlighter */}
        <div className="flex-1 overflow-y-auto p-3 bg-slate-950 font-mono text-xs">
          <SyntaxHighlighter
            language={selectedFramework === 'html' ? 'html' : selectedFramework === 'react' ? 'tsx' : 'html'}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '0.75rem',
              fontSize: '0.75rem',
              background: 'transparent',
            }}
            wrapLongLines
          >
            {currentFrameworkCode}
          </SyntaxHighlighter>
        </div>

        {/* Bottom Bar */}
        <div className="p-2 sm:p-2.5 border-t border-border/50 dark:border-border/30 bg-muted/40 dark:bg-[#0c0c11] flex items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">Synchronized with live CSS &amp; HTML edits</span>
          </span>
          <Button
            size="sm"
            onClick={() => copyToClipboard(currentFrameworkCode, selectedFramework as any)}
            className="h-7 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black gap-1.5 shrink-0"
          >
            {copiedType === selectedFramework ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedType === selectedFramework ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </TabsContent>

      {/* TAB 2: Live Editable CSS */}
      <TabsContent value="css-editor" className="flex-1 flex flex-col min-h-0 m-0">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/50 dark:border-border/30 bg-muted/60 dark:bg-[#121218]">
          <div className="text-[11px] text-amber-500 dark:text-amber-400 font-mono flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Realtime CSS Editor
          </div>
          <div className="flex items-center gap-2">
            {isCustomModified && (
              <button
                onClick={handleResetCode}
                className="text-[10px] text-muted-foreground hover:text-amber-500 flex items-center gap-1"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Reset
              </button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(customCss, 'css')}
              className="h-6 text-[10px] text-muted-foreground hover:text-foreground px-2"
            >
              {copiedType === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy CSS
            </Button>
          </div>
        </div>
        <textarea
          value={customCss}
          onChange={(e) => {
            setCustomCss(e.target.value);
            setIsCustomModified(true);
          }}
          spellCheck={false}
          className="flex-1 w-full bg-slate-950 text-amber-300 dark:text-amber-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-amber-500/30"
          placeholder="Type or paste CSS rules here..."
        />
      </TabsContent>

      {/* TAB 3: Live Editable HTML */}
      <TabsContent value="html-editor" className="flex-1 flex flex-col min-h-0 m-0">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/50 dark:border-border/30 bg-muted/60 dark:bg-[#121218]">
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" /> Realtime HTML Editor
          </div>
          <div className="flex items-center gap-2">
            {isCustomModified && (
              <button
                onClick={handleResetCode}
                className="text-[10px] text-muted-foreground hover:text-emerald-500 flex items-center gap-1"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Reset
              </button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(customHtml, 'html')}
              className="h-6 text-[10px] text-muted-foreground hover:text-foreground px-2"
            >
              {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy HTML
            </Button>
          </div>
        </div>
        <textarea
          value={customHtml}
          onChange={(e) => {
            setCustomHtml(e.target.value);
            setIsCustomModified(true);
          }}
          spellCheck={false}
          className="flex-1 w-full bg-slate-950 text-emerald-300 dark:text-emerald-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-emerald-500/30"
          placeholder="Type or paste HTML markup here..."
        />
      </TabsContent>

      {/* TAB 4: Syntax Highlighted Read-only View */}
      <TabsContent value="syntax" className="flex-1 flex flex-col min-h-0 m-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 font-mono">CSS Stylesheet</span>
              <button
                onClick={() => copyToClipboard(effect.cssCode, 'css')}
                className="text-[10px] text-muted-foreground hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <SyntaxHighlighter
                language="css"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: '0.875rem',
                  fontSize: '0.75rem',
                  background: '#08080c',
                }}
                wrapLongLines
              >
                {effect.cssCode}
              </SyntaxHighlighter>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">HTML Structure</span>
              <button
                onClick={() => copyToClipboard(effect.htmlCode, 'html')}
                className="text-[10px] text-muted-foreground hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <SyntaxHighlighter
                language="html"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: '0.875rem',
                  fontSize: '0.75rem',
                  background: '#08080c',
                }}
                wrapLongLines
              >
                {effect.htmlCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Studio Container */}
      <div
        style={
          isMobile
            ? {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100dvh',
                zIndex: 50,
              }
            : isMaximized
            ? {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 50,
              }
            : {
                position: 'fixed',
                top: `${windowBounds.y}px`,
                left: `${windowBounds.x}px`,
                width: `${windowBounds.width}px`,
                height: `${windowBounds.height}px`,
                zIndex: 50,
              }
        }
        className={`group/win flex flex-col bg-background dark:bg-[#0c0c11] border border-border/80 dark:border-white/15 text-foreground shadow-2xl shadow-slate-950/25 dark:shadow-black/95 select-none ${
          isMobile || isMaximized ? 'rounded-none' : 'rounded-2xl'
        } ${isDraggingOrResizing ? 'transition-none' : 'transition-[top,left,width,height] duration-75 ease-out'}`}
      >
        {/* ==================== 8 RESIZE HANDLES (Desktop Only) ==================== */}
        {!isMaximized && !isMobile && (
          <>
            {/* Top edge */}
            <div
              onPointerDown={(e) => handleStartResize('n', e)}
              className="absolute -top-2 left-3 right-3 h-3 cursor-ns-resize z-40 hover:bg-amber-500/40 transition-colors"
              title="Resize Top"
            />
            {/* Bottom edge */}
            <div
              onPointerDown={(e) => handleStartResize('s', e)}
              className="absolute -bottom-2 left-3 right-3 h-3 cursor-ns-resize z-40 hover:bg-amber-500/40 transition-colors"
              title="Resize Bottom"
            />
            {/* Left edge */}
            <div
              onPointerDown={(e) => handleStartResize('w', e)}
              className="absolute -left-2 top-3 bottom-3 w-3 cursor-ew-resize z-40 hover:bg-amber-500/40 transition-colors"
              title="Resize Left"
            />
            {/* Right edge */}
            <div
              onPointerDown={(e) => handleStartResize('e', e)}
              className="absolute -right-2 top-3 bottom-3 w-3 cursor-ew-resize z-40 hover:bg-amber-500/40 transition-colors"
              title="Resize Right"
            />
            {/* Top-Left Corner */}
            <div
              onPointerDown={(e) => handleStartResize('nw', e)}
              className="absolute -top-2 -left-2 w-5 h-5 cursor-nwse-resize z-50 hover:bg-amber-500/60 rounded-tl-lg transition-colors"
              title="Resize Top-Left"
            />
            {/* Top-Right Corner */}
            <div
              onPointerDown={(e) => handleStartResize('ne', e)}
              className="absolute -top-2 -right-2 w-5 h-5 cursor-nesw-resize z-50 hover:bg-amber-500/60 rounded-tr-lg transition-colors"
              title="Resize Top-Right"
            />
            {/* Bottom-Left Corner */}
            <div
              onPointerDown={(e) => handleStartResize('sw', e)}
              className="absolute -bottom-2 -left-2 w-5 h-5 cursor-nesw-resize z-50 hover:bg-amber-500/60 rounded-bl-lg transition-colors"
              title="Resize Bottom-Left"
            />
            {/* Bottom-Right Corner */}
            <div
              onPointerDown={(e) => handleStartResize('se', e)}
              className="absolute -bottom-2 -right-2 w-5 h-5 cursor-nwse-resize z-50 hover:bg-amber-500/60 rounded-br-lg transition-colors"
              title="Resize Bottom-Right"
            />
          </>
        )}

        {/* ==================== WINDOW HEADER ==================== */}
        <div
          onPointerDown={isMobile ? undefined : handleStartHeaderDrag}
          onDoubleClick={toggleMaximize}
          className={`flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 border-b border-border/60 dark:border-border/40 bg-muted/70 dark:bg-[#121218] shrink-0 gap-2 select-none ${
            isMobile || isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          {/* Left Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pointer-events-none">
            <Logo size={28} className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-xs sm:text-base font-bold text-foreground truncate tracking-tight">
                  {effect.name}
                </h2>
                <span className="shrink-0 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {effect.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate hidden md:block">
                Interactive Live Studio &middot; Drag header to move, drag any border to resize
              </p>
            </div>
          </div>

          {/* Right Window Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
            {/* Sequential Navigation (< 1/150 >) */}
            <div className="flex items-center gap-0.5 bg-muted/80 dark:bg-white/5 border border-border/80 dark:border-white/10 rounded-lg p-0.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateEffect(-1)}
                className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10"
                title="Previous Effect (Left Arrow)"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium text-muted-foreground px-1 sm:px-1.5 whitespace-nowrap">
                {currentIndex + 1} / {allEffects.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateEffect(1)}
                className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10"
                title="Next Effect (Right Arrow)"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>

            {/* Split Orientation Toggle (Desktop only) */}
            {!isMobile && (
              <div className="hidden sm:flex items-center bg-muted/80 dark:bg-white/5 border border-border/80 dark:border-white/10 rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSplitDirection(splitDirection === 'horizontal' ? 'vertical' : 'horizontal')}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10"
                  title={splitDirection === 'horizontal' ? 'Switch to Stacked View' : 'Switch to Side-by-Side View'}
                >
                  {splitDirection === 'horizontal' ? <Columns className="w-3.5 h-3.5" /> : <Rows className="w-3.5 h-3.5" />}
                </Button>
              </div>
            )}

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(effect.id)}
              className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-muted dark:hover:bg-white/10"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-foreground'
                }`}
              />
            </Button>

            {/* Maximize / Restore Toggle (Desktop only) */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMaximize}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10"
                title={isMaximized ? 'Restore Window' : 'Maximize Window'}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            )}

            {/* Close Studio Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10 ml-0.5"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ==================== CONTENT BODY ==================== */}
        {isMobile ? (
          /* Mobile Adaptive Layout: Segmented Full-Screen Navigation */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Mobile Segmented Navigation Tabs */}
            <div className="p-1.5 border-b border-border/50 dark:border-border/30 bg-muted/60 dark:bg-[#121218] shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none p-0.5 bg-muted/80 dark:bg-white/5 rounded-lg border border-border/80 dark:border-white/10">
                <button
                  onClick={() => setMobileTab('canvas')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'canvas'
                      ? 'bg-amber-500 text-black shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Monitor className="w-3 h-3 shrink-0" />
                  <span>Canvas</span>
                </button>
                <button
                  onClick={() => setMobileTab('overview')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'overview'
                      ? 'bg-amber-500 text-black shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sliders className="w-3 h-3 shrink-0" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => setMobileTab('frameworks')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'frameworks'
                      ? 'bg-sky-500 text-black shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Package className="w-3 h-3 shrink-0" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setMobileTab('css-editor')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'css-editor'
                      ? 'bg-amber-500 text-black shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Terminal className="w-3 h-3 shrink-0" />
                  <span>Live CSS</span>
                </button>
                <button
                  onClick={() => setMobileTab('html-editor')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'html-editor'
                      ? 'bg-emerald-500 text-black shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="w-3 h-3 shrink-0" />
                  <span>Live HTML</span>
                </button>
                <button
                  onClick={() => setMobileTab('syntax')}
                  className={`flex-1 min-w-[68px] text-[10px] py-1.5 px-2 rounded-md font-semibold flex items-center justify-center gap-1 transition-all ${
                    mobileTab === 'syntax'
                      ? 'bg-foreground/15 dark:bg-white/20 text-foreground dark:text-white shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="w-3 h-3 shrink-0" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* Mobile View Container */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {mobileTab === 'canvas' ? (
                renderCanvasView(true)
              ) : (
                <Tabs
                  value={mobileTab as any}
                  onValueChange={(v) => setMobileTab(v as MobileTab)}
                  className="flex flex-col h-full min-h-0"
                >
                  {renderTabContent()}
                </Tabs>
              )}
            </div>
          </div>
        ) : (
          /* Desktop Layout: Draggable Resizable Split Pane Group */
          <div className="flex-1 min-h-0 overflow-hidden relative">
            {isDraggingOrResizing && <div className="absolute inset-0 z-50 bg-transparent cursor-grabbing" />}

            <ResizablePanelGroup
              direction={splitDirection}
              className="h-full w-full rounded-none"
            >
              {/* Panel 1: Live Interactive Canvas */}
              <ResizablePanel defaultSize={58} minSize={25} className="flex flex-col min-h-0">
                {renderCanvasView(false)}
              </ResizablePanel>

              {/* Draggable Divider Handle */}
              <ResizableHandle
                withHandle
                className="bg-border/60 hover:bg-amber-500/60 transition-colors z-20"
              />

              {/* Panel 2: Multi-tab Inspector & Realtime Code Editor */}
              <ResizablePanel defaultSize={42} minSize={25} className="flex flex-col bg-card dark:bg-[#0c0c11] min-h-0 overflow-hidden">
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as any)}
                  className="flex flex-col h-full min-h-0"
                >
                  {/* Tabs Header */}
                  <div className="p-2 border-b border-border/50 dark:border-border/30 bg-muted/50 dark:bg-[#121218] shrink-0">
                    <TabsList className="flex items-center justify-between w-full bg-muted/80 dark:bg-white/5 border border-border/80 dark:border-white/10 h-8 p-0.5 rounded-lg overflow-x-auto scrollbar-none gap-0.5">
                      <TabsTrigger
                        value="overview"
                        className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-muted-foreground font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                      >
                        <Sliders className="w-3 h-3 shrink-0" />
                        <span className="truncate">Overview</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="frameworks"
                        className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-sky-500 data-[state=active]:text-black text-muted-foreground font-semibold flex items-center justify-center gap-1 min-w-[80px]"
                      >
                        <Package className="w-3 h-3 shrink-0" />
                        <span className="truncate">Export</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="css-editor"
                        className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-muted-foreground font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                      >
                        <Terminal className="w-3 h-3 shrink-0" />
                        <span className="truncate">Live CSS</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="html-editor"
                        className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-black text-muted-foreground font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                      >
                        <Code2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">Live HTML</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="syntax"
                        className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-foreground/15 dark:data-[state=active]:bg-white/20 data-[state=active]:text-foreground dark:data-[state=active]:text-white text-muted-foreground font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                      >
                        <Eye className="w-3 h-3 shrink-0" />
                        <span className="truncate">Full Code</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {renderTabContent()}
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </div>
    </>
  );
}

export function LiveStudioModal({
  effect,
  open,
  onClose,
  onSelectEffect,
}: LiveStudioModalProps) {
  if (!open || !effect) return null;

  return (
    <LiveStudioContent
      key={effect.id}
      effect={effect}
      onClose={onClose}
      onSelectEffect={onSelectEffect}
    />
  );
}
