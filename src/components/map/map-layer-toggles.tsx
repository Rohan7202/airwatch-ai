"use client";

import { cn } from "@/lib/utils";

const layers = [
  { key: "hotspots", label: "Hotspots" },
  { key: "sensors", label: "Sensors" },
  { key: "satellite", label: "Satellite" },
] as const;

export type MapLayer = (typeof layers)[number]["key"];

export function MapLayerToggles({
  active,
  onToggle,
}: {
  active: Record<MapLayer, boolean>;
  onToggle: (layer: MapLayer) => void;
}) {
  return (
    <div className="pointer-events-auto flex flex-wrap gap-2">
      {layers.map((layer) => (
        <button
          key={layer.key}
          type="button"
          onClick={() => onToggle(layer.key)}
          aria-pressed={active[layer.key]}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur transition",
            active[layer.key]
              ? "border-sky-400/60 bg-sky-500/20 text-sky-700 dark:text-sky-200"
              : "border-white/60 bg-white/80 text-slate-600 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-white",
          )}
        >
          {layer.label}
        </button>
      ))}
    </div>
  );
}
