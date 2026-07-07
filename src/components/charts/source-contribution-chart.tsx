"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useReports } from "@/features/reports/hooks/use-reports";

export function SourceContributionChart() {
  const { data: reports = [] } = useReports(500);

  const total = Math.max(reports.length, 1);

  const categories = [
    { label: "Traffic", key: "traffic", color: "bg-sky-500" },
    { label: "Industrial", key: "industrial", color: "bg-violet-500" },
    { label: "Construction", key: "construction", color: "bg-amber-500" },
    { label: "Waste", key: "waste", color: "bg-rose-500" },
    { label: "Dust", key: "dust", color: "bg-emerald-500" },
  ].map((item) => ({
    ...item,
    value: Math.round(
      (reports.filter((r) => r.category === item.key).length / total) * 100
    ),
  }));

  return (
    <Card className="p-6">
      <h3 className="mb-5 text-base font-semibold">
        Pollution Source Contribution
      </h3>

      <div className="space-y-4">
        {categories.map((source, index) => (
          <div key={source.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2 font-medium">
                <span className={`size-2.5 rounded-full ${source.color}`} />
                {source.label}
              </span>

              <span className="tabular-nums text-slate-500">
                {source.value}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                className={`h-full rounded-full ${source.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${source.value}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}