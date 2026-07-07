"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const sources = [
  { label: "Traffic", value: 34, color: "bg-sky-500" },
  { label: "Industrial", value: 29, color: "bg-violet-500" },
  { label: "Construction", value: 21, color: "bg-amber-500" },
  { label: "Waste burning", value: 16, color: "bg-rose-500" },
];

export function SourceContributionChart() {
  return (
    <Card className="p-6">
      <h3 className="mb-5 text-base font-semibold">Pollution source contribution</h3>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={source.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2 font-medium">
                <span className={`size-2.5 rounded-full ${source.color}`} />
                {source.label}
              </span>
              <span className="tabular-nums text-slate-500 dark:text-slate-400">{source.value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <motion.div
                className={`h-full rounded-full ${source.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${source.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
