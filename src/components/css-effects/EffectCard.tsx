'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Code2, ChevronDown, Heart, Zap, Sparkles } from 'lucide-react';
import { CSSEffect } from '@/lib/effects-data';
import { EffectDemo } from './EffectDemo';
import { useEffectsStore } from '@/lib/store';
import { toast } from 'sonner';

interface EffectCardProps {
  effect: CSSEffect;
  index: number;
  onOpenStudio: (effect: CSSEffect) => void;
}

export function EffectCard({ effect, index, onOpenStudio }: EffectCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copiedType, setCopiedType] = useState<'css' | 'html' | null>(null);
  const isFavorite = useEffectsStore((s) => s.favorites.includes(effect.id));
  const toggleFavorite = useEffectsStore((s) => s.toggleFavorite);

  const copyToClipboard = async (text: string, type: 'css' | 'html') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast.success(`${type.toUpperCase()} copied to clipboard!`);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.3) }}
      className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
    >
      {/* Demo Preview Area - Clickable to open Live Studio */}
      <div
        onClick={() => onOpenStudio(effect)}
        className="relative h-48 bg-[#09090c] overflow-hidden cursor-pointer flex items-center justify-center select-none"
        title="Click to open in Live Interactive Studio"
      >
        <EffectDemo effectId={effect.id} />

        {/* Top Badges: Category & Live Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full shadow-sm">
            {effect.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(effect.id);
          }}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 transition-colors z-10"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white/80'
            }`}
          />
        </motion.button>

        {/* Hover Cue / Live Studio Button Bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-200 opacity-0 group-hover:opacity-100 flex items-end justify-between p-3.5">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenStudio(effect);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-amber-500/25 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Open Live Studio</span>
          </motion.button>

          <span className="text-[11px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
            Click to interact & edit
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3
              onClick={() => onOpenStudio(effect)}
              className="font-bold text-sm text-foreground hover:text-amber-500 transition-colors cursor-pointer truncate"
            >
              {effect.name}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {effect.description}
          </p>
        </div>

        {/* Action Buttons: Show Code, Open Studio, Copy */}
        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${showCode ? 'rotate-180' : ''}`}
            />
            {showCode ? 'Hide' : 'Quick'} Code
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenStudio(effect)}
              className="text-xs text-amber-500 hover:text-amber-400 font-semibold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Live Studio →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Inline Code Drawer */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border/50 bg-[#0c0c10]"
          >
            {/* CSS Code */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121217]">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-amber-400">
                  CSS Rules
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(effect.cssCode, 'css');
                  }}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                >
                  {copiedType === 'css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedType === 'css' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto max-h-40 overflow-y-auto text-[11px] leading-relaxed font-mono text-amber-200/80">
                <code>{effect.cssCode}</code>
              </pre>
            </div>

            {/* HTML Code */}
            <div className="relative border-t border-border/30">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#121217]">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400">
                  HTML Markup
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(effect.htmlCode, 'html');
                  }}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                >
                  {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedType === 'html' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto max-h-28 overflow-y-auto text-[11px] leading-relaxed font-mono text-emerald-200/80">
                <code>{effect.htmlCode}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
