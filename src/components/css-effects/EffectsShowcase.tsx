'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Palette, Moon, Sun, ArrowDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { categories, effects, type CategoryId } from '@/lib/effects-data';
import { EffectCard } from './EffectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EffectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredEffects = useMemo(() => {
    return effects.filter((effect) => {
      const matchesCategory = activeCategory === 'all' || effect.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        effect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        effect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        effect.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollToEffects = () => {
    document.getElementById('effects-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">CSS Effects Lab</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-red-500/3 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{effects.length} Curated CSS Effects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  CSS Effects
                </span>{' '}
                <span className="text-foreground">Library</span>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive collection of beautiful, production-ready CSS effects.
                Browse, preview, and copy the code to use in your projects instantly.
              </p>

              <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {categories.length - 1} Categories
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Pure CSS
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Copy & Paste
                </span>
              </div>

              <button
                onClick={scrollToEffects}
                className="mt-10 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="text-xs">Explore Effects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Search & Category Section */}
        <section id="effects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-xl py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-border/30">
            {/* Search */}
            <div className="relative max-w-md mx-auto mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search effects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-muted/50 border-border/50 focus-visible:ring-amber-500/30"
              />
            </div>

            {/* Category Pills */}
            <div
              ref={categoryScrollRef}
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = cat.id === 'all'
                  ? effects.length
                  : effects.filter((e) => e.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200
                      ${
                        isActive
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                      }
                    `}
                  >
                    <span className={`${isActive ? 'text-black/70' : ''}`}>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span
                      className={`
                        text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                        ${
                          isActive
                            ? 'bg-black/15 text-black/80'
                            : 'bg-muted text-muted-foreground/70'
                        }
                      `}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{' '}
              <span className="font-semibold text-foreground">{filteredEffects.length}</span>{' '}
              {filteredEffects.length === 1 ? 'effect' : 'effects'}
              {activeCategory !== 'all' && (
                <>
                  {' '}in{' '}
                  <span className="font-semibold text-amber-500">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </span>
                </>
              )}
              {searchQuery && (
                <>
                  {' '}matching &quot;<span className="font-semibold text-amber-500">{searchQuery}</span>&quot;
                </>
              )}
            </p>
          </div>

          {/* Effects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredEffects.map((effect, i) => (
                <EffectCard key={effect.id} effect={effect} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredEffects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground/50" />
              </div>
              <h3 className="font-semibold text-lg">No effects found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or category filter
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
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
              {effects.length} pure CSS effects · Copy & paste ready · No dependencies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
