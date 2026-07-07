"use client";

import { Cpu, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSensors } from "@/features/sensors/hooks/use-sensors";

export function SensorCard() {
  const { data: sensors = [] } = useSensors(1);

  const sensor = sensors[0];

  if (!sensor) {
    return (
      <Card className="p-5">
        <p className="text-sm text-slate-500">
          No sensors available.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Sensor Node
          </p>

          <h3 className="mt-1 font-semibold">
            {sensor.sensorCode}
          </h3>
        </div>

        <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
          <Cpu className="size-5" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">PM2.5</p>
          <p className="font-semibold">
            {sensor.pm25 ?? "--"} µg/m³
          </p>
        </div>

        <div>
          <p className="text-slate-500">NO₂</p>
          <p className="font-semibold">
            {sensor.no2 ?? "--"} ppb
          </p>
        </div>
      </div>

      <p className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500">
        <Gauge className="size-3.5" />
        {sensor.online ? "Online" : "Offline"}
      </p>
    </Card>
  );
}