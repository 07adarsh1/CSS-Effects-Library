'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULT_CSS = `.my-element {
  padding: 20px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 12px;
  color: white;
  font-weight: bold;
  transition: transform 0.3s ease;
}
.my-element:hover {
  transform: scale(1.05);
}
`;

export function CSSPlayground() {
  const [css, setCss] = useState(DEFAULT_CSS);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-foreground">CSS Playground</h3>
      </div>

      {/* Split View */}
      <div className="flex flex-col md:flex-row">
        {/* Preview - top on mobile, left on desktop */}
        <div className="md:w-1/2 h-48 md:h-auto md:min-h-[280px] flex items-center justify-center p-6 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-border/30">
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className="my-element text-center">
            Hover me!
          </div>
        </div>

        {/* Editor - bottom on mobile, right on desktop */}
        <div className="md:w-1/2 relative">
          <div className="absolute top-2 right-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50 bg-muted/50 px-2 py-0.5 rounded">
            Editor
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            spellCheck={false}
            className="w-full h-48 md:h-full md:min-h-[280px] bg-[#0d0d0d] text-foreground/80 p-4 pt-8 font-mono text-sm leading-relaxed resize-none focus:outline-none border-none"
            placeholder="Type your CSS here..."
          />
        </div>
      </div>
    </div>
  );
}
