'use client';

import { Shuffle, Code, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface FeatureBarProps {
  effectCount: number;
  onRandomEffect: () => void;
  onExportCSS: () => void;
  onTogglePlayground: () => void;
  showPlayground: boolean;
}

export function FeatureBar({
  effectCount,
  onRandomEffect,
  onExportCSS,
  onTogglePlayground,
  showPlayground,
}: FeatureBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRandomEffect}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Random Effect</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Jump to a random effect</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePlayground}
            className={`h-8 gap-1.5 ${showPlayground ? 'text-amber-500 hover:text-amber-400 bg-amber-500/10' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">CSS Playground</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle live CSS playground</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExportCSS}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Export All CSS</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download all {effectCount} CSS effects</TooltipContent>
      </Tooltip>
    </div>
  );
}
