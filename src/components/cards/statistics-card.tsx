import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const accents: Record<string, string> = {
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
};

export function StatisticsCard({
  label,
  value,
  trend,
  icon: Icon,
  accent = "sky",
}: {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  accent?: "sky" | "emerald" | "violet" | "amber" | "rose";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">{trend}</p>
        </div>
        <div className={cn("rounded-xl p-2", accents[accent])}>
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}
