'use client';

import { Shuffle, Download, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface FeatureBarProps {
  effectCount: number;
  onRandomEffect: () => void;
  onExportCSS: () => void;
  onOpenStudio: () => void;
}

export function FeatureBar({
  effectCount,
  onRandomEffect,
  onExportCSS,
  onOpenStudio,
}: FeatureBarProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-card p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRandomEffect}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground px-2.5"
          >
            <Shuffle className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline text-xs font-medium">Random</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Open a random effect in Studio</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenStudio}
            className="h-8 gap-1.5 text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 px-2.5 font-semibold"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            <span className="hidden sm:inline text-xs">Live Studio</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Open interactive Live Studio</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExportCSS}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground px-2.5"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Export</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download all {effectCount} CSS rules</TooltipContent>
      </Tooltip>
    </div>
  );
}
