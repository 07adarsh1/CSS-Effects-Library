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
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CSSEffect, allEffects } from '@/lib/effects-data';
import { useEffectsStore } from '@/lib/store';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { Logo } from './Logo';

interface LiveStudioModalProps {
  effect: CSSEffect | null;
  open: boolean;
  onClose: () => void;
  onSelectEffect?: (effect: CSSEffect) => void;
}

type BackgroundTheme = 'dark' | 'black' | 'light' | 'grid' | 'dots' | 'gradient';
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'css-editor' | 'html-editor' | 'syntax'>('overview');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('dark');
  const [scale, setScale] = useState<number>(1);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('#f59e0b');
  const [customCss, setCustomCss] = useState<string>(effect.cssCode);
  const [customHtml, setCustomHtml] = useState<string>(effect.htmlCode);
  const [isCustomModified, setIsCustomModified] = useState<boolean>(false);
  const [isHoverSimulated, setIsHoverSimulated] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'css' | 'html' | 'react' | null>(null);
  const [splitDirection, setSplitDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [renderKey, setRenderKey] = useState<number>(0);

  // 8-Direction Window Resizing & Dragging State
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
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleStartResize = (direction: ResizeDirection, e: React.PointerEvent) => {
    if (isMaximized) return;
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

  const handleStartHeaderDrag = (e: React.PointerEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, input, textarea, select, a, [role="tab"]')) return;
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

  const toggleMaximize = () => {
    if (!isMaximized) {
      preMaximizeRef.current = windowBounds;
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
      setWindowBounds(preMaximizeRef.current);
    }
  };

  const copyToClipboard = async (text: string, type: 'css' | 'html' | 'react') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast.success(`${type.toUpperCase()} copied to clipboard!`);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  const handleResetCode = () => {
    setCustomCss(effect.cssCode);
    setCustomHtml(effect.htmlCode);
    setIsCustomModified(false);
    setIsHoverSimulated(false);
    setScale(1);
    setSpeedMultiplier(1);
    setSelectedColor('#f59e0b');
    setRenderKey((prev) => prev + 1);
    toast.info('Reset code and settings to defaults');
  };

  const handleReplay = () => {
    setRenderKey((prev) => prev + 1);
  };

  // Interactive sandbox click handler
  const handleSandboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // 1. Toggle switch simulation (card or direct switch)
    const toggleCard = target.closest('.toggle-card, .fx-toggle-card');
    if (toggleCard) {
      const sw = toggleCard.querySelector('.toggle-switch, .fx-toggle-switch');
      if (sw) sw.classList.toggle('active');
      return;
    }

    const toggleEl = target.closest('.toggle-switch, .switch-toggle, .custom-toggle, .fx-toggle-switch');
    if (toggleEl) {
      toggleEl.classList.toggle('active');
      return;
    }

    // 2. Accordion expand / collapse
    const accordionEl = target.closest('.accordion-item, .fx-accordion-item, .accordion-header');
    if (accordionEl) {
      const item = accordionEl.classList.contains('accordion-item') || accordionEl.classList.contains('fx-accordion-item')
        ? accordionEl
        : accordionEl.closest('.accordion-item, .fx-accordion-item');
      if (item) {
        item.classList.toggle('open');
      }
      return;
    }

    // 3. Sliding tabs selection
    const tabEl = target.closest('.tab-item, .fx-tab-item, .sliding-tabs button, .fx-sliding-tabs button');
    if (tabEl) {
      const parent = tabEl.parentElement;
      if (parent) {
        parent.querySelectorAll('.tab-item, .fx-tab-item, button').forEach((btn) => {
          btn.classList.remove('active');
        });
        tabEl.classList.add('active');
      }
      return;
    }

    // 4. Rating stars
    const starBtn = target.closest('.star-btn, .fx-star-btn, .star, .rating-star');
    if (starBtn) {
      const parent = starBtn.parentElement;
      if (parent) {
        const stars = Array.from(parent.querySelectorAll('.star-btn, .fx-star-btn, .star, .rating-star'));
        const idx = stars.indexOf(starBtn);
        if (idx !== -1) {
          stars.forEach((s, i) => {
            if (i <= idx) {
              s.classList.add('filled', 'active');
            } else {
              s.classList.remove('filled', 'active');
            }
          });
        }
      }
      return;
    }

    // 5. Step progress tracker nodes
    const stepNode = target.closest('.step-node, .fx-step-node');
    if (stepNode) {
      const tracker = stepNode.closest('.step-tracker, .fx-step-tracker');
      if (tracker) {
        const nodes = Array.from(tracker.querySelectorAll('.step-node, .fx-step-node'));
        const lines = Array.from(tracker.querySelectorAll('.step-line, .fx-step-line'));
        const clickedIdx = nodes.indexOf(stepNode);
        if (clickedIdx !== -1) {
          nodes.forEach((n, i) => {
            if (i < clickedIdx) {
              n.className = 'step-node completed';
              n.textContent = '✓';
            } else if (i === clickedIdx) {
              n.className = 'step-node active';
              n.textContent = `${i + 1}`;
            } else {
              n.className = 'step-node';
              n.textContent = `${i + 1}`;
            }
          });
          lines.forEach((l, i) => {
            if (i < clickedIdx) {
              l.className = 'step-line filled';
            } else {
              l.className = 'step-line';
            }
          });
        }
      }
      return;
    }

    // 6. Checkbox auto-toggle (labels handle native toggle; only handle non-label wrappers)
    const checkboxWrap = target.closest('.checkbox-card, .checkbox-anim, .fx-checkbox-anim');
    if (checkboxWrap) {
      if (!target.closest('label')) {
        const input = checkboxWrap.querySelector('input[type="checkbox"]') as HTMLInputElement;
        if (input && target !== input) {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      return;
    }

    // 7. 3D Flip Card toggle
    const flipCard = target.closest('.perspective-card, .flip-card, .fx-flip-card');
    if (flipCard) {
      flipCard.classList.toggle('flipped');
      return;
    }

    // 8. Ripple effect simulation
    const rippleBtn = target.closest('.ripple-btn, .fx-ripple-btn, .fill-slide-up, button');
    if (rippleBtn && effect.id.includes('ripple')) {
      const rect = rippleBtn.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'fx-ripple ripple-effect';
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.background = 'rgba(255,255,255,0.7)';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'fx-ripple-animation 0.6s linear';
      circle.style.pointerEvents = 'none';
      rippleBtn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
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
    if (target.type === 'range' || target.classList?.contains('range-slider') || target.classList?.contains('fx-range-slider')) {
      target.style.backgroundSize = `${target.value}% 100%`;
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
        --live-speed: ${speedMultiplier};
        box-sizing: border-box;
      }
      #live-studio-canvas-root *,
      #live-studio-canvas-root *::before,
      #live-studio-canvas-root *::after {
        box-sizing: border-box;
        animation-duration: calc(var(--base-duration, 1s) / ${speedMultiplier});
        transition-duration: calc(var(--base-transition, 0.35s) / ${speedMultiplier});
      }
      #live-studio-canvas-root input,
      #live-studio-canvas-root textarea,
      #live-studio-canvas-root select,
      #live-studio-canvas-root button {
        font-family: inherit;
      }
      .live-interactive-sandbox-render > * {
        flex-shrink: 0;
      }
      @keyframes fx-ripple-animation {
        to { transform: scale(4); opacity: 0; }
      }
      ${code}
    `;
  }, [customCss, effect.cssCode, isCustomModified, isHoverSimulated, selectedColor, speedMultiplier]);

  const getCanvasBgClass = () => {
    switch (bgTheme) {
      case 'black':
        return 'bg-black text-white';
      case 'light':
        return 'bg-slate-100 text-slate-900';
      case 'grid':
        return 'bg-[#09090b] text-white bg-[linear-gradient(to_right,#222227_1px,transparent_1px),linear-gradient(to_bottom,#222227_1px,transparent_1px)] bg-[size:24px_24px]';
      case 'dots':
        return 'bg-[#09090b] text-white bg-[radial-gradient(#2d2d34_1.5px,transparent_1.5px)] bg-[size:18px_18px]';
      case 'gradient':
        return 'bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-white';
      case 'dark':
      default:
        return 'bg-[#0a0a0e] text-white';
    }
  };

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 8-Direction Resizable Window Container */}
      <div
        style={
          isMaximized
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
        className={`group/win flex flex-col bg-[#0c0c11] border border-white/15 text-foreground shadow-2xl shadow-black/95 select-none ${
          isMaximized ? 'rounded-none' : 'rounded-2xl'
        } ${isDraggingOrResizing ? 'transition-none' : 'transition-[top,left,width,height] duration-75 ease-out'}`}
      >
        {/* ==================== 8 RESIZE HANDLES ==================== */}
        {!isMaximized && (
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

        {/* ==================== WINDOW HEADER (Draggable) ==================== */}
        <div
          onPointerDown={handleStartHeaderDrag}
          onDoubleClick={toggleMaximize}
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-border/40 bg-[#121218] shrink-0 gap-3 select-none ${
            isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          {/* Left Title */}
          <div className="flex items-center gap-3 min-w-0 pointer-events-none">
            <Logo size={32} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-foreground truncate tracking-tight">
                  {effect.name}
                </h2>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  {effect.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate hidden md:block">
                Interactive Live Studio &middot; Drag header to move, drag any border to resize
              </p>
            </div>
          </div>

          {/* Right Window Controls */}
          <div className="flex items-center gap-1.5 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
            {/* Sequential Navigation (< 1/64 >) */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateEffect(-1)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
                title="Previous Effect (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-[11px] font-mono font-medium text-muted-foreground px-1.5 whitespace-nowrap">
                {currentIndex + 1} / {allEffects.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateEffect(1)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
                title="Next Effect (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Split Orientation Toggle */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSplitDirection(splitDirection === 'horizontal' ? 'vertical' : 'horizontal')}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
                title={splitDirection === 'horizontal' ? 'Switch to Stacked View' : 'Switch to Side-by-Side View'}
              >
                {splitDirection === 'horizontal' ? <Columns className="w-3.5 h-3.5" /> : <Rows className="w-3.5 h-3.5" />}
              </Button>
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(effect.id)}
              className="h-8 w-8 hover:bg-white/10"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-foreground'
                }`}
              />
            </Button>

            {/* Maximize / Restore Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMaximize}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10"
              title={isMaximized ? 'Restore Window' : 'Maximize Window'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            {/* Close Studio Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10 ml-0.5"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ==================== RESIZABLE SPLIT PANELS ==================== */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* Resizing overlay to block iframe pointer trap */}
          {isDraggingOrResizing && <div className="absolute inset-0 z-50 bg-transparent cursor-grabbing" />}

          <ResizablePanelGroup
            direction={splitDirection}
            className="h-full w-full rounded-none"
          >
            {/* Panel 1: Live Interactive Canvas */}
            <ResizablePanel defaultSize={58} minSize={25} className="flex flex-col min-h-0 bg-[#0a0a0e]">
              {/* Toolbar Row 1: Themes + Zoom + Speed + Replay */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#121218] border-b border-border/30 gap-2 overflow-x-auto scrollbar-none shrink-0">
                {/* Canvas Theme Selector */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-500" /> Canvas:
                  </span>
                  <div className="flex items-center gap-0.5 bg-black/50 p-0.5 rounded-lg border border-white/10">
                    {(['dark', 'black', 'light', 'grid', 'dots', 'gradient'] as BackgroundTheme[]).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBgTheme(bg)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize transition-all ${
                          bgTheme === bg
                            ? 'bg-amber-500 text-black font-semibold shadow-sm'
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
                  <div className="flex items-center gap-1 bg-black/50 p-0.5 rounded-lg border border-white/10 text-[10px]">
                    <span className="text-muted-foreground pl-1.5 pr-0.5 hidden xs:inline">Zoom:</span>
                    {[0.75, 1, 1.25, 1.5].map((s) => (
                      <button
                        key={s}
                        onClick={() => setScale(s)}
                        className={`px-1.5 py-0.5 rounded transition-all ${
                          scale === s ? 'bg-white/20 text-white font-semibold' : 'text-muted-foreground hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 p-0.5 rounded-lg border border-white/10 text-[10px]">
                    <span className="text-muted-foreground pl-1.5 pr-0.5 hidden xs:inline">Speed:</span>
                    {[0.5, 1, 2].map((sp) => (
                      <button
                        key={sp}
                        onClick={() => setSpeedMultiplier(sp)}
                        className={`px-1.5 py-0.5 rounded transition-all ${
                          speedMultiplier === sp ? 'bg-white/20 text-white font-semibold' : 'text-muted-foreground hover:text-white'
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
                    className="h-7 w-7 text-muted-foreground hover:text-amber-400 hover:bg-white/5"
                    title="Replay Animation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Toolbar Row 2: Color Palette + Hover Simulator */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#0f0f15] border-b border-border/20 text-[11px] gap-2 overflow-x-auto scrollbar-none shrink-0">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
                    <Palette className="w-3.5 h-3.5 text-amber-500" /> Accent Tint:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          selectedColor === c.hex
                            ? 'scale-125 border-white shadow-sm ring-1 ring-white/50'
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
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-400 shadow-sm shadow-amber-500/10'
                        : 'border-white/10 text-muted-foreground hover:text-white hover:bg-white/5'
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
                className={`relative flex-1 flex items-center justify-center p-6 sm:p-10 overflow-auto transition-colors duration-300 min-h-[220px] ${getCanvasBgClass()}`}
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
                  className={`relative flex items-center justify-center ${
                    isHoverSimulated ? 'force-hover-mode' : ''
                  }`}
                >
                  <div
                    className="live-interactive-sandbox-render flex items-center justify-center max-w-full"
                    dangerouslySetInnerHTML={{ __html: customHtml }}
                  />
                </div>

                {/* Bottom Sandbox Live Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-muted-foreground pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Sandbox &middot; click / hover to test</span>
                </div>
              </div>
            </ResizablePanel>

            {/* Draggable Divider Handle */}
            <ResizableHandle
              withHandle
              className="bg-border/60 hover:bg-amber-500/60 transition-colors z-20"
            />

            {/* Panel 2: Multi-tab Inspector & Realtime Code Editor */}
            <ResizablePanel defaultSize={42} minSize={25} className="flex flex-col bg-[#0c0c11] min-h-0 overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as any)}
                className="flex flex-col h-full min-h-0"
              >
                {/* Tabs Header with Responsive Flow */}
                <div className="p-2 border-b border-border/30 bg-[#121218] shrink-0">
                  <TabsList className="flex items-center justify-between w-full bg-white/5 border border-white/10 h-8 p-0.5 rounded-lg overflow-x-auto scrollbar-none gap-0.5">
                    <TabsTrigger
                      value="overview"
                      className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                    >
                      <Sliders className="w-3 h-3 shrink-0" />
                      <span className="truncate">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="css-editor"
                      className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                    >
                      <Terminal className="w-3 h-3 shrink-0" />
                      <span className="truncate">Live CSS</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="html-editor"
                      className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                    >
                      <Code2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">Live HTML</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="syntax"
                      className="flex-1 text-[11px] h-7 px-2 data-[state=active]:bg-white/20 data-[state=active]:text-white font-semibold flex items-center justify-center gap-1 min-w-[70px]"
                    >
                      <Eye className="w-3 h-3 shrink-0" />
                      <span className="truncate">Full Code</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* TAB 1: Overview & 1-Click Code Actions */}
                <TabsContent value="overview" className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto m-0 min-h-0">
                  {/* Metadata Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Effect Details
                      </h4>
                      {isCustomModified && (
                        <button
                          onClick={handleResetCode}
                          className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                        >
                          <RotateCcw className="w-2.5 h-2.5" /> Reset Code
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {effect.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                        Category: <b className="text-amber-400 capitalize">{effect.category}</b>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                        ID: <code className="text-emerald-400 font-mono">{effect.id}</code>
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Code Copy Cards */}
                  <div className="space-y-2.5">
                    {/* CSS Card */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-amber-400">CSS Stylesheet Rules</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          Pure CSS class definition & keyframe animations
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(customCss, 'css')}
                        className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs gap-1.5 shrink-0 self-start sm:self-center"
                      >
                        {copiedType === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedType === 'css' ? 'Copied!' : 'Copy CSS'}
                      </Button>
                    </div>

                    {/* HTML Card */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-emerald-400">HTML Element Markup</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          Semantic HTML tag with corresponding classes
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(customHtml, 'html')}
                        className="h-8 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold gap-1.5 shrink-0 self-start sm:self-center"
                      >
                        {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedType === 'html' ? 'Copied!' : 'Copy HTML'}
                      </Button>
                    </div>
                  </div>

                  {/* Integration Tip */}
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
                    <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                      💡 8-Direction Resizing & Dragging:
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Grab any window border/corner to resize freely. Drag the top header to move the window anywhere on screen, or double-click the header to maximize!
                    </p>
                  </div>
                </TabsContent>

                {/* TAB 2: Live Editable CSS */}
                <TabsContent value="css-editor" className="flex-1 flex flex-col min-h-0 m-0">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121218]">
                    <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Realtime CSS Editor
                    </div>
                    <div className="flex items-center gap-2">
                      {isCustomModified && (
                        <button
                          onClick={handleResetCode}
                          className="text-[10px] text-muted-foreground hover:text-amber-400 flex items-center gap-1"
                        >
                          <RotateCcw className="w-2.5 h-2.5" /> Reset
                        </button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(customCss, 'css')}
                        className="h-6 text-[10px] text-muted-foreground hover:text-white px-2"
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
                    className="flex-1 w-full bg-[#08080c] text-amber-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-amber-500/30"
                    placeholder="Type or paste CSS rules here..."
                  />
                </TabsContent>

                {/* TAB 3: Live Editable HTML */}
                <TabsContent value="html-editor" className="flex-1 flex flex-col min-h-0 m-0">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121218]">
                    <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" /> Realtime HTML Editor
                    </div>
                    <div className="flex items-center gap-2">
                      {isCustomModified && (
                        <button
                          onClick={handleResetCode}
                          className="text-[10px] text-muted-foreground hover:text-emerald-400 flex items-center gap-1"
                        >
                          <RotateCcw className="w-2.5 h-2.5" /> Reset
                        </button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(customHtml, 'html')}
                        className="h-6 text-[10px] text-muted-foreground hover:text-white px-2"
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
                    className="flex-1 w-full bg-[#08080c] text-emerald-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-emerald-500/30"
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
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
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
