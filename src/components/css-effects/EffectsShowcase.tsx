'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Palette, Moon, Sun, ArrowDown, Zap, Sliders, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';
import { categories, allEffects, type CategoryId, type CSSEffect } from '@/lib/effects-data';
import { EffectCard } from './EffectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CSSPlayground } from './CSSPlayground';
import { BackToTop } from './BackToTop';
import { FeatureBar } from './FeatureBar';
import { LiveStudioModal } from './LiveStudioModal';
import { useEffectsStore } from '@/lib/store';
import { toast } from 'sonner';

export function EffectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [studioEffect, setStudioEffect] = useState<CSSEffect | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const favorites = useEffectsStore((s) => s.favorites);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-foreground">CSS Effects Lab</span>
                <span className="hidden sm:inline text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Live Interactive Studio
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
                <Zap className="w-3.5 h-3.5" />
                <span>Open Live Studio</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark/light mode"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{allEffects.length} Curated CSS Effects with Live Interactive Studio</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  CSS Effects
                </span>{' '}
                <span className="text-foreground">Library</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Click on any component to open the <b>Live Interactive Studio</b>. Customize colors, tweak speeds, edit CSS & HTML in real-time, and copy production-ready code.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => setStudioEffect(allEffects[0])}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-5 h-10 rounded-xl shadow-lg shadow-amber-500/25 gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Launch Live Studio</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPlayground(!showPlayground)}
                  className="h-10 rounded-xl border-border/60 gap-2 font-semibold"
                >
                  <Sliders className="w-4 h-4 text-amber-500" />
                  <span>{showPlayground ? 'Hide Playground' : 'Live CSS Playground'}</span>
                </Button>
              </div>

              {/* Highlights Pill Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {categories.length - 2} Categories
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Interactive Live Studio
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Realtime HTML/CSS Editor
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Instant Copy &amp; Export
                </span>
              </div>

              <button
                onClick={scrollToEffects}
                className="mt-10 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-xs font-medium">Browse All Effects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Search, Categories & Grid Section */}
        <section id="effects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-xl py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-border/30">
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
                onTogglePlayground={() => setShowPlayground(!showPlayground)}
                showPlayground={showPlayground}
              />
            </div>

            {/* Category Filter Pills */}
            <div ref={categoryScrollRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
              {categories.map((cat) => {
                const active = activeCategory === cat.id;
                const cnt = getCount(cat.id);
                const fav = cat.id === 'favorites';
                let cls =
                  'shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ';
                if (active) cls += 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 font-bold';
                else if (fav) cls += 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20';
                else cls += 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50';
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cls}>
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
          </div>

          {/* Standalone Live Playground Drawer */}
          <AnimatePresence>
            {showPlayground && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden my-6"
              >
                <CSSPlayground />
              </motion.div>
            )}
          </AnimatePresence>

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
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Palette className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">CSS Effects Lab</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {allEffects.length} pure CSS effects &middot; Interactive Live Studio &middot; Realtime Playground &middot; Export CSS
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
