import { Database, ShieldCheck, Users } from "lucide-react";
import { AgentStatusPanel } from "@/components/ai/agent-status-panel";
import { StatisticsCard } from "@/components/cards/statistics-card";
import { TimelineFeed } from "@/components/dashboard/timeline-feed";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { PageTransition } from "@/components/ui/page-transition";

const organizations = [
  { name: "City Air Response Unit", plan: "Enterprise", users: 64, tone: "success" as const },
  { name: "North Bay Environmental", plan: "Pro", users: 22, tone: "success" as const },
  { name: "Coastal Monitoring Co", plan: "Trial", users: 8, tone: "warning" as const },
  { name: "Metro Sustainability", plan: "Enterprise", users: 91, tone: "success" as const },
];

const health = [
  { label: "API success rate", value: 99.98 },
  { label: "Ingestion pipeline", value: 96.4 },
  { label: "Storage utilization", value: 71.2 },
];

export default function AdminPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Administrator"
          title="Platform control center"
          description="Manage system governance, data quality monitoring, AI orchestration visibility, and role access policies."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatisticsCard label="Active organizations" value="26" trend="+2 this quarter" icon={Users} accent="sky" />
          <StatisticsCard label="Protected API requests" value="1.2M" trend="99.98% success" icon={ShieldCheck} accent="emerald" />
          <StatisticsCard label="Ingestion throughput" value="4.8M/day" trend="+11% capacity" icon={Database} accent="violet" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <TimelineFeed />
            <Card className="p-6">
              <h3 className="mb-4 text-base font-semibold">System health</h3>
              <div className="space-y-4">
                {health.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="tabular-nums text-slate-500 dark:text-slate-400">{item.value}%</span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <AgentStatusPanel />
        </div>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">Organization governance</h3>
          <Table>
            <THead>
              <TR>
                <TH>Organization</TH>
                <TH>Plan</TH>
                <TH>Users</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {organizations.map((organization) => (
                <TR key={organization.name}>
                  <TD className="font-medium">{organization.name}</TD>
                  <TD>{organization.plan}</TD>
                  <TD className="tabular-nums">{organization.users}</TD>
                  <TD>
                    <StatusBadge status="Active" tone={organization.tone} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>

        <div className="max-w-xl">
          <ErrorState
            title="Webhook ingestion latency detected"
            description="A subset of satellite webhook payloads exceeded threshold latency. Monitoring policy has escalated this incident for review."
          />
        </div>
      </section>
    </PageTransition>
  );
}
