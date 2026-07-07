import { Activity, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PollutionSummaryCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">Current neighborhood AQI</p>
          <p className="mt-1 text-3xl font-bold">86</p>
          <p className="mt-1 text-sm text-amber-600">Moderate risk</p>
        </div>
        <div className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
          <Wind className="size-5" />
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Activity className="size-3.5" />
        6-hour trend indicates improving PM2.5 conditions.
      </div>
    </Card>
  );
}
