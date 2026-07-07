import { AgentStatusPanel } from "@/components/ai/agent-status-panel";
import { InferenceTimeline } from "@/components/ai/inference-timeline";
import { AqiTrendChart } from "@/components/charts/aqi-trend-chart";
import { SourceContributionChart } from "@/components/charts/source-contribution-chart";
import { AiInsightCard } from "@/components/cards/ai-insight-card";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { PageTransition } from "@/components/ui/page-transition";

const predictions = [
  { zone: "Riverside Industrial Belt", aqi: 112, confidence: 94, window: "Next 6h", tone: "danger" as const },
  { zone: "East Loop Corridor", aqi: 98, confidence: 89, window: "Next 12h", tone: "warning" as const },
  { zone: "University District", aqi: 54, confidence: 91, window: "Next 24h", tone: "success" as const },
  { zone: "North Freight Yard", aqi: 87, confidence: 86, window: "Next 8h", tone: "warning" as const },
];

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Analytics"
          title="Predictive pollution analytics"
          description="Understand pollutant sources, evaluate AI confidence, and forecast 24-hour AQI behavior with transparent signal traces."
        />

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            <AqiTrendChart />
            <SourceContributionChart />
          </div>
          <AgentStatusPanel />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <InferenceTimeline />
          <div className="space-y-4">
            <AiInsightCard
              title="Anomaly explanation"
              insight="Industrial NO₂ spikes correlate with humidity inversion windows between 06:00 and 08:00 local time."
              confidence="91%"
            />
            <AiInsightCard
              title="Forecast confidence note"
              insight="Prediction stability increased after integrating 17 newly calibrated roadside sensor feeds this week."
              confidence="94%"
            />
          </div>
        </div>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">24-hour AQI forecasts by zone</h3>
          <Table>
            <THead>
              <TR>
                <TH>Zone</TH>
                <TH>Forecast AQI</TH>
                <TH>Confidence</TH>
                <TH>Window</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {predictions.map((prediction) => (
                <TR key={prediction.zone}>
                  <TD className="font-medium">{prediction.zone}</TD>
                  <TD className="tabular-nums font-semibold">{prediction.aqi}</TD>
                  <TD className="w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={prediction.confidence} className="flex-1" />
                      <span className="tabular-nums text-xs text-slate-500 dark:text-slate-400">{prediction.confidence}%</span>
                    </div>
                  </TD>
                  <TD>{prediction.window}</TD>
                  <TD>
                    <StatusBadge status="Forecasted" tone={prediction.tone} />
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
