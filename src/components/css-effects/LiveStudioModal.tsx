'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  Share2,
  Layers,
  Palette,
  Terminal,
  Zap,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CSSEffect, allEffects } from '@/lib/effects-data';
import { useEffectsStore } from '@/lib/store';
import { EffectDemo } from './EffectDemo';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface LiveStudioModalProps {
  effect: CSSEffect | null;
  open: boolean;
  onClose: () => void;
  onSelectEffect?: (effect: CSSEffect) => void;
}

type BackgroundTheme = 'dark' | 'black' | 'light' | 'grid' | 'dots' | 'gradient';

const PRESET_COLORS = [
  { name: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11' },
  { name: 'Cyan', hex: '#06b6d4', rgb: '6, 182, 212' },
  { name: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'Purple', hex: '#a855f7', rgb: '168, 85, 247' },
  { name: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94' },
  { name: 'Orange', hex: '#f97316', rgb: '249, 115, 22' },
];

export function LiveStudioModal({
  effect,
  open,
  onClose,
  onSelectEffect,
}: LiveStudioModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'css-editor' | 'html-editor' | 'syntax' | 'docs'>('preview');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('dark');
  const [scale, setScale] = useState<number>(1);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('#f59e0b');
  const [customCss, setCustomCss] = useState<string>('');
  const [customHtml, setCustomHtml] = useState<string>('');
  const [isCustomModified, setIsCustomModified] = useState<boolean>(false);
  const [isHoverSimulated, setIsHoverSimulated] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'css' | 'html' | 'full' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderKey, setRenderKey] = useState<number>(0);

  const favorites = useEffectsStore((s) => s.favorites);
  const toggleFavorite = useEffectsStore((s) => s.toggleFavorite);

  // Sync custom code when effect changes
  useEffect(() => {
    if (effect) {
      setCustomCss(effect.cssCode);
      setCustomHtml(effect.htmlCode);
      setIsCustomModified(false);
      setIsHoverSimulated(false);
      setRenderKey((prev) => prev + 1);
    }
  }, [effect]);

  // Keyboard navigation for ← and →
  useEffect(() => {
    if (!open || !effect) return;

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
  }, [open, effect]);

  if (!effect) return null;

  const currentIndex = allEffects.findIndex((e) => e.id === effect.id);
  const isFavorite = favorites.includes(effect.id);

  const navigateEffect = (delta: number) => {
    const total = allEffects.length;
    const nextIdx = (currentIndex + delta + total) % total;
    const nextEffect = allEffects[nextIdx];
    if (onSelectEffect && nextEffect) {
      onSelectEffect(nextEffect);
    }
  };

  const copyToClipboard = async (text: string, type: 'css' | 'html' | 'full') => {
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
    setScale(1);
    setSpeedMultiplier(1);
    setSelectedColor('#f59e0b');
    setRenderKey((prev) => prev + 1);
    toast.info('Reset code and settings to defaults');
  };

  const handleReplay = () => {
    setRenderKey((prev) => prev + 1);
  };

  // Generate scoped styles for live preview with speed & color overrides
  const previewScopedCss = useMemo(() => {
    const baseCode = isCustomModified ? customCss : effect.cssCode;
    // Replace default accent colors with selectedColor dynamically if changed
    let processed = baseCode;
    if (selectedColor !== '#f59e0b') {
      processed = processed
        .replace(/#f59e0b/gi, selectedColor)
        .replace(/rgba\(245,\s*158,\s*11,/gi, `rgba(${PRESET_COLORS.find(c => c.hex === selectedColor)?.rgb || '245, 158, 11'},`);
    }

    return `
      #live-studio-canvas {
        --live-accent: ${selectedColor};
        --live-speed-mult: ${speedMultiplier};
      }
      #live-studio-canvas * {
        animation-duration: calc(var(--base-duration, 1s) / ${speedMultiplier}) !important;
        transition-duration: calc(var(--base-transition, 0.3s) / ${speedMultiplier}) !important;
      }
      ${processed}
    `;
  }, [customCss, effect.cssCode, isCustomModified, selectedColor, speedMultiplier]);

  // Background styling classes
  const getCanvasBgClass = () => {
    switch (bgTheme) {
      case 'black':
        return 'bg-black text-white';
      case 'light':
        return 'bg-slate-100 text-slate-900';
      case 'grid':
        return 'bg-[#09090b] text-white bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:24px_24px]';
      case 'dots':
        return 'bg-[#09090b] text-white bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:16px_16px]';
      case 'gradient':
        return 'bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-white';
      case 'dark':
      default:
        return 'bg-[#0c0c0e] text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <DialogContent
            showCloseButton={false}
            className={`p-0 gap-0 overflow-hidden bg-[#0d0d11] border-border/60 text-foreground transition-all duration-300 ${
              isFullscreen
                ? 'w-[98vw] max-w-[98vw] h-[95vh] max-h-[95vh] rounded-xl'
                : 'w-[95vw] max-w-5xl h-[88vh] max-h-[850px] rounded-2xl shadow-2xl shadow-black/80'
            }`}
          >
            <DialogTitle className="sr-only">{effect.name} - Live Studio</DialogTitle>
            <DialogDescription className="sr-only">{effect.description}</DialogDescription>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Top Studio Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-[#121217] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-black font-bold shadow-md shadow-amber-500/20 shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-foreground truncate tracking-tight">
                        {effect.name}
                      </h2>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {effect.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                      Interactive Live Studio &middot; {effect.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Prev / Next navigation */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 mr-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateEffect(-1)}
                      className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
                      title="Previous Effect (Left Arrow)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-[11px] font-mono text-muted-foreground px-1.5">
                      {currentIndex + 1}/{allEffects.length}
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

                  {/* Fullscreen Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Expand Studio'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>

                  {/* Close Studio Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Main Content Area: Split View (Interactive Canvas + Live Editor/Inspector) */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
                {/* Left / Top: Interactive Live Canvas (7 cols on large) */}
                <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-border/40 min-h-0">
                  {/* Canvas Toolbar Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#121217] border-b border-border/30 text-xs">
                    {/* Background selector */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <Layers className="w-3 h-3 text-amber-500" /> Canvas:
                      </span>
                      <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-md border border-white/5">
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

                    {/* Scale & Speed Controls */}
                    <div className="flex items-center gap-3">
                      {/* Zoom Scale */}
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-muted-foreground">Zoom:</span>
                        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-md border border-white/5">
                          {[0.75, 1, 1.25, 1.5].map((s) => (
                            <button
                              key={s}
                              onClick={() => setScale(s)}
                              className={`px-1.5 py-0.5 rounded text-[10px] ${
                                scale === s ? 'bg-white/20 text-white font-semibold' : 'text-muted-foreground hover:text-white'
                              }`}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Speed */}
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-muted-foreground">Speed:</span>
                        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-md border border-white/5">
                          {[0.5, 1, 2].map((sp) => (
                            <button
                              key={sp}
                              onClick={() => setSpeedMultiplier(sp)}
                              className={`px-1.5 py-0.5 rounded text-[10px] ${
                                speedMultiplier === sp ? 'bg-white/20 text-white font-semibold' : 'text-muted-foreground hover:text-white'
                              }`}
                            >
                              {sp}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Replay */}
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

                  {/* Accent Color Palette Selector */}
                  <div className="flex items-center justify-between px-4 py-1.5 bg-[#0f0f14] border-b border-border/20 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Palette className="w-3 h-3 text-amber-500" /> Color Accent:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {PRESET_COLORS.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.hex)}
                            className={`w-4 h-4 rounded-full border transition-all ${
                              selectedColor === c.hex
                                ? 'scale-125 border-white shadow-sm ring-1 ring-white/50'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsHoverSimulated(!isHoverSimulated)}
                        className={`px-2 py-0.5 rounded border text-[10px] transition-all flex items-center gap-1 ${
                          isHoverSimulated
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'border-white/10 text-muted-foreground hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {isHoverSimulated ? 'Hover Locked' : 'Simulate Hover'}
                      </button>
                    </div>
                  </div>

                  {/* LIVE INTERACTIVE CANVAS */}
                  <div
                    id="live-studio-canvas"
                    key={`canvas-${renderKey}-${effect.id}`}
                    className={`relative flex-1 flex items-center justify-center p-8 overflow-auto transition-colors duration-300 ${getCanvasBgClass()}`}
                  >
                    {/* Live Scoped Dynamic Style */}
                    <style dangerouslySetInnerHTML={{ __html: previewScopedCss }} />

                    {/* Scale transform wrapper */}
                    <div
                      style={{
                        transform: `scale(${scale})`,
                        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      className={`relative flex items-center justify-center transition-all ${
                        isHoverSimulated ? 'force-hover-mode' : ''
                      }`}
                    >
                      {/* Render either customized HTML if user edited code or default React Effect Demo */}
                      {isCustomModified ? (
                        <div
                          className="live-custom-html-render"
                          dangerouslySetInnerHTML={{ __html: customHtml }}
                        />
                      ) : (
                        <div className="live-preset-render">
                          <EffectDemo effectId={effect.id} />
                        </div>
                      )}
                    </div>

                    {/* Interactive Hint Indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-muted-foreground pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Interactive Sandbox — click / hover to test</span>
                    </div>
                  </div>
                </div>

                {/* Right / Bottom: Live Code Editor, Syntax Inspector & Integration (5 cols) */}
                <div className="lg:col-span-5 flex flex-col bg-[#0d0d11] min-h-0">
                  <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as any)}
                    className="flex flex-col h-full min-h-0"
                  >
                    {/* Tabs Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-[#121217] shrink-0">
                      <TabsList className="bg-white/5 border border-white/10 h-8 p-0.5">
                        <TabsTrigger
                          value="preview"
                          className="text-[11px] h-7 px-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-black font-medium"
                        >
                          <Sliders className="w-3 h-3 mr-1" /> Quick Controls
                        </TabsTrigger>
                        <TabsTrigger
                          value="css-editor"
                          className="text-[11px] h-7 px-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-black font-medium"
                        >
                          <Terminal className="w-3 h-3 mr-1" /> Live CSS
                        </TabsTrigger>
                        <TabsTrigger
                          value="html-editor"
                          className="text-[11px] h-7 px-2.5 data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-medium"
                        >
                          <Code2 className="w-3 h-3 mr-1" /> Live HTML
                        </TabsTrigger>
                        <TabsTrigger
                          value="syntax"
                          className="text-[11px] h-7 px-2.5 data-[state=active]:bg-white/20 data-[state=active]:text-white font-medium"
                        >
                          <Eye className="w-3 h-3 mr-1" /> Full Code
                        </TabsTrigger>
                      </TabsList>

                      {isCustomModified && (
                        <button
                          onClick={handleResetCode}
                          className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20"
                        >
                          <RotateCcw className="w-2.5 h-2.5" /> Reset Code
                        </button>
                      )}
                    </div>

                    {/* TAB 1: Quick Controls & Quick Copy */}
                    <TabsContent value="preview" className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto m-0 min-h-0">
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                        <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> About This Effect
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {effect.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                            Category: <b className="text-amber-400 capitalize">{effect.category}</b>
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                            ID: <code className="text-emerald-400">{effect.id}</code>
                          </span>
                        </div>
                      </div>

                      {/* 1-Click Code Copy Cards */}
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-amber-400">CSS Stylesheet Rules</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              Ready-to-use pure CSS class definition & keyframes
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => copyToClipboard(customCss || effect.cssCode, 'css')}
                            className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs gap-1.5"
                          >
                            {copiedType === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedType === 'css' ? 'Copied' : 'Copy CSS'}
                          </Button>
                        </div>

                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-emerald-400">HTML Element Markup</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              Semantic HTML structure with proper CSS classes
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(customHtml || effect.htmlCode, 'html')}
                            className="h-8 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs gap-1.5"
                          >
                            {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedType === 'html' ? 'Copied' : 'Copy HTML'}
                          </Button>
                        </div>
                      </div>

                      {/* Pro Tip Callout */}
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                        💡 <b>Pro-tip</b>: Switch to the <b>Live CSS</b> or <b>Live HTML</b> tabs above to edit properties live and preview changes in real time!
                      </div>
                    </TabsContent>

                    {/* TAB 2: Live Editable CSS */}
                    <TabsContent value="css-editor" className="flex-1 flex flex-col min-h-0 m-0">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121217]">
                        <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
                          <Terminal className="w-3 h-3" /> Live CSS Editor (Realtime Preview)
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(customCss, 'css')}
                          className="h-6 text-[10px] text-muted-foreground hover:text-white px-2"
                        >
                          {copiedType === 'css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy CSS
                        </Button>
                      </div>
                      <textarea
                        value={customCss}
                        onChange={(e) => {
                          setCustomCss(e.target.value);
                          setIsCustomModified(true);
                        }}
                        spellCheck={false}
                        className="flex-1 w-full bg-[#0a0a0e] text-amber-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-amber-500/30"
                        placeholder="Edit CSS here in real-time..."
                      />
                    </TabsContent>

                    {/* TAB 3: Live Editable HTML */}
                    <TabsContent value="html-editor" className="flex-1 flex flex-col min-h-0 m-0">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121217]">
                        <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                          <Code2 className="w-3 h-3" /> Live HTML Markup Editor
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(customHtml, 'html')}
                          className="h-6 text-[10px] text-muted-foreground hover:text-white px-2"
                        >
                          {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy HTML
                        </Button>
                      </div>
                      <textarea
                        value={customHtml}
                        onChange={(e) => {
                          setCustomHtml(e.target.value);
                          setIsCustomModified(true);
                        }}
                        spellCheck={false}
                        className="flex-1 w-full bg-[#0a0a0e] text-emerald-200/90 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none border-none overflow-y-auto selection:bg-emerald-500/30"
                        placeholder="Edit HTML markup here in real-time..."
                      />
                    </TabsContent>

                    {/* TAB 4: Syntax Highlighted Readonly View */}
                    <TabsContent value="syntax" className="flex-1 flex flex-col min-h-0 m-0 overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-amber-400 font-mono">CSS Styles</span>
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
                                background: '#0a0a0d',
                              }}
                              wrapLongLines
                            >
                              {effect.cssCode}
                            </SyntaxHighlighter>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-emerald-400 font-mono">HTML Structure</span>
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
                                background: '#0a0a0d',
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
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
