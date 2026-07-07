"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { usePredictions } from "@/features/hotspots/hooks/use-hotspots";

export function AqiTrendChart() {
  const { data: predictions = [] } = usePredictions(12);

  const data =
    predictions.length > 0
      ? [...predictions].reverse().map((p) => p.predictedAqi)
      : [];

  const max = Math.max(...data, 1);
 

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">
            24-hour AQI Trend
          </h3>

          <p className="text-xs text-slate-500">
            Live AI predictions
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
          Peak {Math.max(...data, 0)}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="flex h-52 items-center justify-center text-sm text-slate-500">
          No prediction data
        </div>
      ) : (
        <div className="flex h-52 items-end gap-3">
          {data.map((value, index) => (
   <div
  key={index}
  className="flex flex-col justify-end items-center h-full"
>
  <div
  style={{
    width: "48px",
    height: `${(value / max) * 180}px`,
    background:
      value >= 150
        ? "#ef4444"
        : value >= 100
        ? "#fb923c"
        : value >= 60
        ? "#facc15"
        : "#22c55e",
    borderRadius: "8px 8px 0 0",
  }}
/>
              <span className="mt-2 text-[10px] text-slate-500">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}