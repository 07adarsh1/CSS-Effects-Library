'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Palette,
  Moon,
  Sun,
  ArrowDown,
  Zap,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  Maximize2,
  Code2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { categories, allEffects, type CategoryId, type CSSEffect } from '@/lib/effects-data';
import { EffectCard } from './EffectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackToTop } from './BackToTop';
import { FeatureBar } from './FeatureBar';
import { LiveStudioModal } from './LiveStudioModal';
import { Logo } from './Logo';
import { useEffectsStore } from '@/lib/store';
import { toast } from 'sonner';

export function EffectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [studioEffect, setStudioEffect] = useState<CSSEffect | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const favorites = useEffectsStore((s) => s.favorites);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 6);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
    }
  }, []);

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredEffects = useMemo(() => {
    return allEffects.filter((effect) => {
      if (activeCategory === 'favorites') {
        if (!favorites.includes(effect.id)) return false;
      } else {
        if (activeCategory !== 'all' && effect.category !== activeCategory) return false;
      }
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        effect.name.toLowerCase().includes(q) ||
        effect.description.toLowerCase().includes(q) ||
        effect.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery, favorites]);

  const scrollToEffects = () => {
    document.getElementById('effects-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRandomEffect = useCallback(() => {
    const pool =
      activeCategory === 'all'
        ? allEffects
        : activeCategory === 'favorites'
        ? allEffects.filter((e) => favorites.includes(e.id))
        : allEffects.filter((e) => e.category === activeCategory);
    if (!pool.length) {
      toast.info('No effects in this category');
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setStudioEffect(pick);
    toast.success(`Opened random effect: ${pick.name}`);
  }, [activeCategory, favorites]);

  const handleExportCSS = useCallback(async () => {
    const allCSS = allEffects.map((e) => `/* === ${e.name} (${e.category}) === */\n${e.cssCode}\n`).join('\n');
    try {
      await navigator.clipboard.writeText(allCSS);
      toast.success(`All ${allEffects.length} CSS effect styles copied!`);
    } catch {
      const blob = new Blob([allCSS], { type: 'text/css' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'css-effects-library.css';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSS file downloaded!');
    }
  }, []);

  const getCount = useCallback(
    (id: string) => {
      if (id === 'all') return allEffects.length;
      if (id === 'favorites') return favorites.length;
      return allEffects.filter((e) => e.category === id).length;
    },
    [favorites]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-foreground">CSSHUB</span>
                <span className="hidden sm:inline text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Live Studio
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStudioEffect(allEffects[0])}
                className="hidden md:flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                <span>Open Live Studio</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark/light mode"
              >
                {mounted ? (
                  theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 block" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Aesthetic Modern Hero Section */}
        <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24">
          {/* Ambient Lighting & Cyber Grid Backdrop */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-b from-amber-500/20 via-orange-600/15 to-transparent rounded-full blur-3xl opacity-75" />
            <div className="absolute top-1/3 left-[-10%] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-[-10%] w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-25" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Radiant Headline with Logo */}
              <div className="relative">
                <div className="flex justify-center mb-5">
                  <Logo size={68} className="drop-shadow-[0_12px_32px_rgba(0,166,255,0.45)]" />
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none select-none">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(245,158,11,0.45)]">
                    CSSHUB
                  </span>
                </h1>
                <div className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-muted-foreground/80 mt-2 font-medium">
                  The Ultimate Interactive CSS &amp; UI Lab
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Click on any component to launch the <b>Live Interactive Studio</b>. Tweak colors, speeds, zoom scales, live-edit CSS &amp; HTML in real-time, and copy production-ready snippets.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  onClick={() => setStudioEffect(allEffects[0])}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-300 text-black font-extrabold px-7 h-11 sm:h-12 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] hover:scale-105 active:scale-95 gap-2.5"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Launch Live Studio</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRandomEffect}
                  className="h-11 sm:h-12 px-6 rounded-xl border border-border/80 bg-background/50 hover:bg-background/90 hover:border-amber-500/40 text-foreground font-semibold backdrop-blur-md shadow-sm gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Shuffle className="w-4 h-4 text-amber-500" />
                  <span>Random Effect</span>
                </Button>
              </div>

              {/* Sleek Feature Highlights Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground backdrop-blur-sm shadow-sm hover:border-amber-500/30 transition-colors">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>64+ Effects</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground backdrop-blur-sm shadow-sm hover:border-amber-500/30 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-orange-400" />
                  <span>10 Categories</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground backdrop-blur-sm shadow-sm hover:border-amber-500/30 transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>8-Way Resizable Window</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground backdrop-blur-sm shadow-sm hover:border-amber-500/30 transition-colors">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Realtime Editors</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground backdrop-blur-sm shadow-sm hover:border-amber-500/30 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Pure CSS &bull; Zero Deps</span>
                </div>
              </div>

              {/* Scroll down trigger */}
              <div className="pt-6">
                <button
                  onClick={scrollToEffects}
                  className="inline-flex flex-col items-center gap-1.5 text-muted-foreground hover:text-amber-400 transition-colors group cursor-pointer"
                >
                  <span className="text-xs font-mono font-medium tracking-wider uppercase opacity-70 group-hover:opacity-100">
                    Explore Library
                  </span>
                  <ArrowDown className="w-4 h-4 animate-bounce text-amber-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search, Categories & Grid Section */}
        <section id="effects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="sticky top-14 z-30 bg-background/80 backdrop-blur-xl py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-border/30">
            <div className="flex items-center gap-3 max-w-md mx-auto mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search effects or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-muted/50 border-border/50 focus-visible:ring-amber-500/30 rounded-xl"
                />
              </div>
              <FeatureBar
                effectCount={allEffects.length}
                onRandomEffect={handleRandomEffect}
                onExportCSS={handleExportCSS}
                onOpenStudio={() => setStudioEffect(allEffects[0])}
              />
            </div>

            {/* Category Filter Pills with Infused Arrow Controls */}
            <div className="relative flex items-center group/cat-nav">
              {/* Left Arrow Button */}
              <button
                onClick={() => scrollCategories('left')}
                disabled={!canScrollLeft}
                className={`hidden sm:flex items-center justify-center absolute -left-3 z-10 w-8 h-8 rounded-full bg-background/95 hover:bg-background border border-border/80 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 ${
                  canScrollLeft
                    ? 'opacity-100 cursor-pointer hover:scale-110 hover:border-amber-500/60 hover:text-amber-400'
                    : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Gradient fade mask left */}
              {canScrollLeft && (
                <div className="hidden sm:block absolute left-0 top-0 bottom-1 w-10 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
              )}

              {/* Scrollable Category Pills Container */}
              <div
                ref={categoryScrollRef}
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-none px-1 w-full scroll-smooth"
              >
                {categories.map((cat) => {
                  const active = activeCategory === cat.id;
                  const cnt = getCount(cat.id);
                  const fav = cat.id === 'favorites';
                  let cls =
                    'shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ';
                  if (active) cls += 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 font-bold scale-[1.02]';
                  else if (fav) cls += 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20';
                  else cls += 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50';
                  return (
                    <button
                      key={cat.id}
                      onClick={(e) => {
                        setActiveCategory(cat.id);
                        (e.currentTarget as HTMLElement).scrollIntoView({
                          behavior: 'smooth',
                          inline: 'center',
                          block: 'nearest',
                        });
                      }}
                      className={cls}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span
                        className={
                          active
                            ? 'text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-black/15 text-black/80'
                            : fav
                            ? 'text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-red-500/20 text-red-400'
                            : 'text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-muted text-muted-foreground/70'
                        }
                      >
                        {cnt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Gradient fade mask right */}
              {canScrollRight && (
                <div className="hidden sm:block absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />
              )}

              {/* Right Arrow Button */}
              <button
                onClick={() => scrollCategories('right')}
                disabled={!canScrollRight}
                className={`hidden sm:flex items-center justify-center absolute -right-3 z-10 w-8 h-8 rounded-full bg-background/95 hover:bg-background border border-border/80 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 ${
                  canScrollRight
                    ? 'opacity-100 cursor-pointer hover:scale-110 hover:border-amber-500/60 hover:text-amber-400'
                    : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Scroll categories right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results info */}
          <div className="mt-6 mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredEffects.length}</span>{' '}
              {filteredEffects.length === 1 ? 'effect' : 'effects'}
              {activeCategory !== 'all' && activeCategory !== 'favorites' && (
                <>
                  {' '}
                  in <span className="font-semibold text-amber-500">{categories.find((c) => c.id === activeCategory)?.name}</span>
                </>
              )}
              {activeCategory === 'favorites' && (
                <>
                  {' '}
                  in <span className="font-semibold text-red-400">Favorites</span>
                </>
              )}
              {searchQuery && (
                <>
                  {' '}
                  matching &quot;<span className="font-semibold text-amber-500">{searchQuery}</span>&quot;
                </>
              )}
            </p>

            <span className="text-xs text-muted-foreground/70 hidden sm:inline">
              Tip: Click any card to interact live in Studio
            </span>
          </div>

          {/* Effects Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}-${favorites.length}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredEffects.map((effect, i) => (
                <div key={effect.id} id={`effect-card-${effect.id}`}>
                  <EffectCard
                    effect={effect}
                    index={i}
                    onOpenStudio={(selected) => setStudioEffect(selected)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredEffects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground/50" />
              </div>
              <h3 className="font-semibold text-lg">No effects found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {activeCategory === 'favorites'
                  ? 'Click the heart icon on any effect to save it here'
                  : 'Try adjusting your search or category filter'}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo size={24} />
              <span className="text-sm font-semibold">CSSHUB</span>
            </div>
            <p className="text-xs text-muted-foreground">
              CSSHUB &middot; {allEffects.length} pure CSS effects &middot; 8-Way Resizable Studio &middot; Export CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Live Interactive Studio Modal */}
      <LiveStudioModal
        effect={studioEffect}
        open={!!studioEffect}
        onClose={() => setStudioEffect(null)}
        onSelectEffect={(nextEffect) => setStudioEffect(nextEffect)}
      />

      <BackToTop />
    </div>
  );
}
