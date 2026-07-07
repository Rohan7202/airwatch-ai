"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const data = [48, 56, 62, 58, 66, 72, 86, 79, 74, 70, 65, 61];

export function AqiTrendChart() {
  const max = Math.max(...data);
  const peak = data.indexOf(max);

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">24-hour AQI trend</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Neighborhood composite index · updated 5 min ago</p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          Peak {max} at {peak * 2}:00
        </span>
      </div>

      <div className="flex h-52 items-end gap-2">
        {data.map((value, index) => (
          <motion.div
            key={index}
            className="group relative flex-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(value / max) * 100}%`, opacity: 1 }}
            transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`h-full w-full rounded-t-lg bg-gradient-to-t ${
                value > 80 ? "from-rose-500 to-amber-400" : value > 60 ? "from-amber-400 to-sky-400" : "from-sky-500 to-emerald-400"
              } transition group-hover:brightness-110`}
            />
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-700">
              {value}
            </span>
            <span className="mt-2 block text-center text-[10px] text-slate-500 dark:text-slate-400">{index * 2}h</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
