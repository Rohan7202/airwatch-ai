"use client";
import dynamic from "next/dynamic";
import { Building2, MapPinned, Siren } from "lucide-react";
import { NotificationCard } from "@/components/cards/notification-card";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { TaskQueue } from "@/components/dashboard/task-queue";
import { PageHeader } from "@/components/layout/page-header";
const MapShell = dynamic(
  () => import("@/components/map/map-shell").then((m) => m.MapShell),
  { ssr: false }
);
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { PageTransition } from "@/components/ui/page-transition";

const incidents = [
  { id: "INC-2041", zone: "Riverside Industrial Belt", progress: 72, tone: "danger" as const },
  { id: "INC-2038", zone: "East Loop Corridor", progress: 45, tone: "warning" as const },
  { id: "INC-2033", zone: "North Freight Yard", progress: 90, tone: "success" as const },
  { id: "INC-2029", zone: "University District", progress: 30, tone: "warning" as const },
];

export default function MunicipalDashboardPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Municipal Operations"
          title="Municipal response dashboard"
          description="Coordinate cleanup response, allocate field teams, and track incident resolution progress citywide."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatisticsCard label="Open municipal tasks" value="42" trend="+3 since yesterday" icon={Building2} accent="sky" />
          <StatisticsCard label="Critical zones" value="7" trend="No change" icon={Siren} accent="rose" />
          <StatisticsCard label="Teams deployed" value="18" trend="+2 this shift" icon={MapPinned} accent="emerald" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <MapShell />
          </div>
          <TaskQueue />
        </div>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">Active incident resolution</h3>
          <Table>
            <THead>
              <TR>
                <TH>Incident</TH>
                <TH>Zone</TH>
                <TH>Progress</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {incidents.map((incident) => (
                <TR key={incident.id}>
                  <TD className="font-medium">{incident.id}</TD>
                  <TD>{incident.zone}</TD>
                  <TD className="w-48">
                    <div className="flex items-center gap-2">
                      <Progress value={incident.progress} className="flex-1" />
                      <span className="tabular-nums text-xs text-slate-500 dark:text-slate-400">{incident.progress}%</span>
                    </div>
                  </TD>
                  <TD>
                    <StatusBadge status={incident.progress >= 80 ? "Resolving" : incident.progress >= 50 ? "In progress" : "Dispatched"} tone={incident.tone} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <NotificationCard
            title="Priority inspection route generated"
            message="AI routing suggests dispatch sequence: Zone B2 → C4 → East Loop to cut average response by 21%."
            severity="High"
            time="9 minutes ago"
          />
          <NotificationCard
            title="Resource bottleneck warning"
            message="Protective gear inventory in District 3 is below threshold for overnight operations."
            severity="Moderate"
            time="27 minutes ago"
          />
        </div>
      </section>
    </PageTransition>
  );
}
