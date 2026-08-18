'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CSSEffect } from '@/lib/effects-data';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CodeModalProps {
  effect: CSSEffect;
  open: boolean;
  onClose: () => void;
}

export function CodeModal({ effect, open, onClose }: CodeModalProps) {
  const [copiedTab, setCopiedTab] = useState<'css' | 'html' | null>(null);

  const copyToClipboard = async (text: string, type: 'css' | 'html') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(type);
      toast.success(`${type.toUpperCase()} code copied to clipboard!`);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-[#0d0d0d] border-border/50 [&>button]:hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="relative flex items-start justify-between p-6 pb-4">
                <DialogHeader className="space-y-2">
                  <div className="flex items-center gap-3">
                    <DialogTitle className="text-xl font-bold text-foreground">
                      {effect.name}
                    </DialogTitle>
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-amber-500/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      {effect.category}
                    </span>
                  </div>
                  <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                    {effect.description}
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Code Tabs */}
              <Tabs defaultValue="css" className="w-full">
                <div className="px-6 pb-0">
                  <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger
                      value="css"
                      className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 text-muted-foreground"
                    >
                      CSS
                    </TabsTrigger>
                    <TabsTrigger
                      value="html"
                      className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-muted-foreground"
                    >
                      HTML
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="css" className="mt-0">
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(effect.cssCode, 'css')}
                      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
                    >
                      {copiedTab === 'css' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <div className="rounded-b-xl overflow-hidden">
                      <SyntaxHighlighter
                        language="css"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          padding: '1.25rem',
                          fontSize: '0.8rem',
                          lineHeight: '1.7',
                          background: '#0d0d0d',
                        }}
                        showLineNumbers
                        lineNumberStyle={{
                          minWidth: '2.5em',
                          paddingRight: '1em',
                          color: '#555',
                          userSelect: 'none',
                        }}
                        wrapLongLines
                      >
                        {effect.cssCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="html" className="mt-0">
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(effect.htmlCode, 'html')}
                      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
                    >
                      {copiedTab === 'html' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <div className="rounded-b-xl overflow-hidden">
                      <SyntaxHighlighter
                        language="html"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          padding: '1.25rem',
                          fontSize: '0.8rem',
                          lineHeight: '1.7',
                          background: '#0d0d0d',
                        }}
                        showLineNumbers
                        lineNumberStyle={{
                          minWidth: '2.5em',
                          paddingRight: '1em',
                          color: '#555',
                          userSelect: 'none',
                        }}
                        wrapLongLines
                      >
                        {effect.htmlCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
