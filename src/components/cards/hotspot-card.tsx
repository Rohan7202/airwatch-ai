"use client";

import { Flame, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useHotspots } from "@/features/hotspots/hooks/use-hotspots";

export function HotspotCard() {
  const hotspots = useHotspots(20);
  const hotspot = hotspots.data
  ?.sort((a, b) => b.riskScore - a.riskScore)[0];

  if (!hotspot) {
    return (
      <Card className="p-5">
        <p className="text-sm text-slate-600 dark:text-slate-300">Hotspot</p>
        <h3 className="mt-1 text-lg font-semibold">No active hotspots</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">New clustered reports will appear automatically after analysis.</p>
      </Card>
    );
  }

  const severityLabel = hotspot.riskScore >= 80 ? "Critical" : hotspot.riskScore >= 65 ? "High" : hotspot.riskScore >= 45 ? "Moderate" : "Low";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">Hotspot</p>
          <h3 className="mt-1 text-lg font-semibold">{hotspot.title}</h3>
        </div>
        <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">{severityLabel}</Badge>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{hotspot.recommendedAction ?? "Municipal recommendation will appear after AI processing."}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" />
          {hotspot.latitude.toFixed(3)}, {hotspot.longitude.toFixed(3)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Flame className="size-3.5" />
          {hotspot.riskScore} risk score
        </span>
      </div>
    </Card>
  );
}
