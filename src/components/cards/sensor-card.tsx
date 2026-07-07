import { Cpu, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SensorCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">Sensor Node</p>
          <h3 className="mt-1 font-semibold">Node A-17</h3>
        </div>
        <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
          <Cpu className="size-5" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500 dark:text-slate-400">PM2.5</p>
          <p className="font-semibold">42 µg/m³</p>
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400">NO₂</p>
          <p className="font-semibold">31 ppb</p>
        </div>
      </div>
      <p className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <Gauge className="size-3.5" />
        Last heartbeat 2 min ago
      </p>
    </Card>
  );
}
