'use client';

import { useState } from 'react';
import { Sparkles, RotateCcw, Copy, Check, Terminal, Code2, Layers } from 'lucide-react';
import { allEffects } from '@/lib/effects-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const DEFAULT_CSS = `.my-element {
  padding: 16px 32px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.my-element:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 20px 35px -5px rgba(245, 158, 11, 0.6);
}
`;

const DEFAULT_HTML = `<button class="my-element">
  Interactive Button ✨
</button>`;

export function CSSPlayground() {
  const [css, setCss] = useState(DEFAULT_CSS);
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [selectedEffectId, setSelectedEffectId] = useState<string>('custom');
  const [bgTheme, setBgTheme] = useState<'dark' | 'black' | 'light' | 'grid'>('dark');
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (effectId: string) => {
    setSelectedEffectId(effectId);
    if (effectId === 'custom') {
      setCss(DEFAULT_CSS);
      setHtml(DEFAULT_HTML);
      return;
    }
    const found = allEffects.find((e) => e.id === effectId);
    if (found) {
      setCss(found.cssCode);
      setHtml(found.htmlCode);
      toast.success(`Loaded "${found.name}" into playground!`);
    }
  };

  const handleReset = () => {
    handleSelectPreset(selectedEffectId);
    toast.info('Reset playground to default');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(`/* CSS */\n${css}\n\n<!-- HTML -->\n${html}`);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const getBgClass = () => {
    switch (bgTheme) {
      case 'black':
        return 'bg-black text-white';
      case 'light':
        return 'bg-slate-100 text-slate-900';
      case 'grid':
        return 'bg-[#09090b] text-white bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'dark':
      default:
        return 'bg-[#0a0a0e] text-white';
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-2xl shadow-black/40">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-border/40 bg-[#121217]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Interactive CSS Studio Playground</h3>
            <p className="text-[11px] text-muted-foreground">Edit CSS and HTML live with instant rendering</p>
          </div>
        </div>

        {/* Controls: Preset selector, Canvas style, Reset, Copy */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Selector */}
          <select
            value={selectedEffectId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="text-xs bg-muted/60 text-foreground border border-border/60 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="custom">⚡ Starter Custom Button</option>
            <optgroup label="Library Effects (64)">
              {allEffects.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.category})
                </option>
              ))}
            </optgroup>
          </select>

          {/* Background Toggle */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[10px]">
            {(['dark', 'black', 'light', 'grid'] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setBgTheme(bg)}
                className={`px-2 py-1 rounded capitalize transition-all ${
                  bgTheme === bg ? 'bg-amber-500 text-black font-semibold' : 'text-muted-foreground hover:text-white'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button
            size="sm"
            onClick={copyCode}
            className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy All'}
          </Button>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
        {/* Live Preview Area (6 cols) */}
        <div
          className={`lg:col-span-6 min-h-[260px] lg:min-h-[360px] flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-border/40 relative overflow-hidden transition-colors ${getBgClass()}`}
        >
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div
            className="live-interactive-preview-sandbox relative flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/60 bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Preview
          </div>
        </div>

        {/* Live Editors (6 cols - CSS + HTML) */}
        <div className="lg:col-span-6 flex flex-col divide-y divide-border/40 bg-[#0d0d11]">
          {/* CSS Editor */}
          <div className="flex-1 flex flex-col min-h-[180px]">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#121217] border-b border-border/20">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> CSS Rules
              </span>
              <span className="text-[10px] text-muted-foreground/50">Live auto-updates</span>
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-[#0a0a0e] text-amber-200/90 font-mono text-xs leading-relaxed resize-none focus:outline-none selection:bg-amber-500/30"
              placeholder="Edit CSS..."
            />
          </div>

          {/* HTML Editor */}
          <div className="h-36 flex flex-col">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#121217] border-b border-border/20">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Code2 className="w-3 h-3" /> HTML Markup
              </span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-[#0a0a0e] text-emerald-200/90 font-mono text-xs leading-relaxed resize-none focus:outline-none selection:bg-emerald-500/30"
              placeholder="Edit HTML..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
