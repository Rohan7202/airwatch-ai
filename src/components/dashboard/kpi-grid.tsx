import { Activity, CloudSun, Waves } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";

const stats = [
  { label: "Active reports", value: 1284, trend: "+8.1% vs yesterday", icon: Activity, accent: "sky" as const },
  { label: "Forecast confidence", value: 93.4, suffix: "%", decimals: 1, trend: "+1.3% vs yesterday", icon: CloudSun, accent: "emerald" as const },
  { label: "Sensors online", value: 318, trend: "-0.6% vs yesterday", trendUp: false, icon: Waves, accent: "violet" as const },
];

export function KpiGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <KpiCard key={item.label} {...item} trendUp={item.trendUp ?? true} />
      ))}
    </div>
  );
}
