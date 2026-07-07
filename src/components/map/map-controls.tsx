"use client";

import type { ReactNode } from "react";
import { Crosshair, Flame, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function ControlButton({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex size-10 items-center justify-center rounded-xl border shadow-lg backdrop-blur transition",
        active
          ? "border-rose-400/60 bg-rose-500/20 text-rose-600 dark:text-rose-300"
          : "border-white/60 bg-white/80 text-slate-700 hover:text-sky-600 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:text-sky-300",
      )}
    >
      {children}
    </button>
  );
}

export function MapControls({
  heatmap,
  onToggleHeatmap,
  onLocate,
  onZoomIn,
  onZoomOut,
}: {
  heatmap: boolean;
  onToggleHeatmap: () => void;
  onLocate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  return (
    <div className="pointer-events-auto flex flex-col gap-2">
      <ControlButton label="Zoom in" onClick={onZoomIn}>
        <Plus className="size-4" />
      </ControlButton>
      <ControlButton label="Zoom out" onClick={onZoomOut}>
        <Minus className="size-4" />
      </ControlButton>
      <ControlButton label="Toggle heatmap" active={heatmap} onClick={onToggleHeatmap}>
        <Flame className="size-4" />
      </ControlButton>
      <ControlButton label="Use current location" onClick={onLocate}>
        <Crosshair className="size-4" />
      </ControlButton>
    </div>
  );
}
