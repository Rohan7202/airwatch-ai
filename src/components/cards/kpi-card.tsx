import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  trend,
  trendUp = true,
  icon: Icon,
  accent = "sky",
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend: string;
  trendUp?: boolean;
  icon: LucideIcon;
  accent?: "sky" | "emerald" | "violet" | "amber" | "rose";
}) {
  const accents: Record<string, string> = {
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  };

  return (
    <Card interactive className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
          <p className="text-3xl font-bold tracking-tight">
            <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </p>
          <p
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              trendUp ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300",
            )}
          >
            {trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {trend}
          </p>
        </div>
        <div className={cn("rounded-xl p-2", accents[accent])}>
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}
