"use client";
import { Activity, Gauge, Radar, Cpu } from "lucide-react";
import { AqiTrendChart } from "@/components/charts/aqi-trend-chart";
import { SourceContributionChart } from "@/components/charts/source-contribution-chart";
import { AiInsightCard } from "@/components/cards/ai-insight-card";
import { HotspotCard } from "@/components/cards/hotspot-card";
import { PollutionSummaryCard } from "@/components/cards/pollution-summary-card";
import { SensorCard } from "@/components/cards/sensor-card";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { TaskQueue } from "@/components/dashboard/task-queue";
import { TimelineFeed } from "@/components/dashboard/timeline-feed";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { PageTransition } from "@/components/ui/page-transition";
import { useReports } from "@/features/reports/hooks/use-reports";
import { useHotspots, usePredictions } from "@/features/hotspots/hooks/use-hotspots";

const sensors = [
  { id: "Node A-17", pm: "42 µg/m³", no2: "31 ppb", status: "Online", tone: "success" as const },
  { id: "Node B-09", pm: "58 µg/m³", no2: "44 ppb", status: "Online", tone: "success" as const },
  { id: "Node C-22", pm: "—", no2: "—", status: "Maintenance", tone: "warning" as const },
  { id: "Node D-04", pm: "36 µg/m³", no2: "28 ppb", status: "Online", tone: "success" as const },
];

export default function DashboardPage() {
  const { data: reports = [] } = useReports(500);
const { data: hotspots = [] } = useHotspots(500);
const { data: predictions = [] } = usePredictions(500);

const totalReports = reports.length;

const activeHotspots = hotspots.filter(
  (h) => h.status === "active"
).length;

const avgAQI =
  hotspots.length > 0
    ? Math.round(
        hotspots.reduce((sum, h) => sum + h.latestAqi, 0) /
          hotspots.length
      )
    : 0;

const highSeverity = reports.filter(
  (r) => r.severity === "high" || r.severity === "critical"
).length;
const zones = hotspots.slice(0, 4).map((h) => ({
  name: h.title,
  value: h.riskScore,
}));
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Citizen Workspace"
          title="Command dashboard"
          description="Track active pollution signals, AI forecasts, and municipal readiness from a single premium workspace."
          actions={<DashboardActions />}
        />

       <div className="grid gap-4 md:grid-cols-4">
  <StatisticsCard
    label="Total Reports"
    value={totalReports.toString()}
    trend={`${highSeverity} High Risk`}
    icon={Activity}
  />

  <StatisticsCard
    label="Active Hotspots"
    value={activeHotspots.toString()}
    trend="Live"
    icon={Radar}
  />

  <StatisticsCard
    label="Average AQI"
    value={avgAQI.toString()}
    trend="Realtime"
    icon={Gauge}
  />

  <StatisticsCard
    label="AI Predictions"
    value={predictions.length.toString()}
    trend="Generated"
    icon={Cpu}
  />
</div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatisticsCard
  label="Forecasted AQI Peak"
  value={predictions[0]?.predictedAqi?.toString() ?? "--"}
  trend="Latest AI Prediction"
  icon={Radar}
/>
          <StatisticsCard
  label="Latest Prediction"
value={predictions[0]?.predictedAqi?.toString() ?? "--"}
trend="AI Forecast"
icon={Radar}
/>
          <StatisticsCard
  label="High Severity Reports"
  value={highSeverity.toString()}
  trend="Realtime"
  icon={Activity}
/>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            <AqiTrendChart />
            <SourceContributionChart />
          </div>
          <div className="space-y-4">
            <PollutionSummaryCard />
            <HotspotCard />
            <SensorCard />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TimelineFeed />
          </div>
          <TaskQueue />
        </div>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">Neighborhood risk distribution</h3>
          <div className="space-y-4">
            {zones.map((zone) => (
              <div key={zone.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{zone.name}</span>
                  <span className="tabular-nums text-slate-500 dark:text-slate-400">{zone.value}/100</span>
                </div>
                <Progress value={zone.value} />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <AiInsightCard
  title="Dispersion outlook"
  insight={predictions[0]?.explanation ?? "No prediction available"}
  confidence={`${Math.round((predictions[0]?.confidence ?? 0) * 100)}%`}
/>
          <AiInsightCard
  title="Recommended action"
  insight={hotspots[0]?.recommendedAction ?? "No recommendation available"}
  confidence={`${hotspots[0]?.riskScore ?? 0}%`}
/>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold">Sensor network</h3>
          </div>
          <Table>
            <THead>
              <TR>
                <TH>Node</TH>
                <TH>PM2.5</TH>
                <TH>NO₂</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {sensors.map((sensor) => (
                <TR key={sensor.id}>
                  <TD className="font-medium">{sensor.id}</TD>
                  <TD>{sensor.pm}</TD>
                  <TD>{sensor.no2}</TD>
                  <TD>
                    <StatusBadge status={sensor.status} tone={sensor.tone} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      </section>
    </PageTransition>
  );
}
