'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Code2, ChevronDown, Heart } from 'lucide-react';
import { CSSEffect } from '@/lib/effects-data';
import { EffectDemo } from './EffectDemo';
import { CodeModal } from './CodeModal';
import { useEffectsStore } from '@/lib/store';
import { toast } from 'sonner';

interface EffectCardProps {
  effect: CSSEffect;
  index: number;
}

export function EffectCard({ effect, index }: EffectCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copiedType, setCopiedType] = useState<'css' | 'html' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
        className="group relative rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-amber-500/5"
      >
        {/* Demo Preview Area */}
        <div className="relative h-44 bg-[#0a0a0a] overflow-hidden">
          <EffectDemo effectId={effect.id} />

          {/* Hover overlay with View Code + Favorite */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-between px-3 pb-3 opacity-0 group-hover:opacity-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
              className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium hover:bg-black/80 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              View Code
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); toggleFavorite(effect.id); }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </motion.button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {effect.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {effect.description}
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
              {effect.category}
            </span>
          </div>

          {/* Code Toggle + Open Modal */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${showCode ? 'rotate-180' : ''}`}
              />
              {showCode ? 'Hide' : 'Show'} Code
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs text-muted-foreground hover:text-amber-500 transition-colors ml-auto"
            >
              Full view →
            </button>
          </div>
        </div>

        {/* Inline Code Panel */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 bg-[#0d0d0d]">
                {/* CSS Code */}
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/70">CSS</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(effect.cssCode, 'css'); }}
                      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-white/5"
                    >
                      {copiedType === 'css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedType === 'css' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto max-h-48 overflow-y-auto text-[11px] leading-relaxed">
                    <code className="text-foreground/70 font-mono whitespace-pre">{effect.cssCode}</code>
                  </pre>
                </div>

                {/* HTML Code */}
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-2 border-t border-border/30">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500/70">HTML</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(effect.htmlCode, 'html'); }}
                      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-white/5"
                    >
                      {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedType === 'html' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto max-h-32 overflow-y-auto text-[11px] leading-relaxed">
                    <code className="text-foreground/70 font-mono whitespace-pre">{effect.htmlCode}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full Code Modal */}
      <CodeModal effect={effect} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
