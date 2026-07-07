"use client";

import { Activity, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHotspots } from "@/features/hotspots/hooks/use-hotspots";

export function PollutionSummaryCard() {
  const { data: hotspots = [] } = useHotspots(100);

  const avgAQI =
    hotspots.length > 0
      ? Math.round(
          hotspots.reduce((sum, h) => sum + h.latestAqi, 0) /
            hotspots.length
        )
      : 0;

  const risk =
    avgAQI >= 150
      ? "Very High"
      : avgAQI >= 100
      ? "High"
      : avgAQI >= 60
      ? "Moderate"
      : "Low";

  const progress = Math.min(avgAQI, 200) / 2;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Current Neighborhood AQI
          </p>

          <p className="mt-1 text-3xl font-bold">
            {avgAQI}
          </p>

          <p className="mt-1 text-sm text-amber-600">
            {risk} Risk
          </p>
        </div>

        <div className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
          <Wind className="size-5" />
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-red-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Activity className="size-3.5" />
        Live AQI calculated from {hotspots.length} hotspot(s).
      </div>
    </Card>
  );
}