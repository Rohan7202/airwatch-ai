import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const agents = [
  { name: "Citizen Report Agent", status: "Running", latency: "1.4s" },
  { name: "Satellite Analysis Agent", status: "Running", latency: "3.1s" },
  { name: "Prediction Agent", status: "Queued", latency: "-" },
  { name: "Municipal Planning Agent", status: "Running", latency: "2.2s" },
  { name: "Notification Agent", status: "Idle", latency: "-" },
];

export function AgentStatusPanel() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">AI orchestration status</h3>
        <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
          <Bot className="size-4" />
        </div>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.name} className="flex items-center justify-between rounded-xl border border-white/50 bg-white/55 px-3 py-2 dark:border-slate-700/60 dark:bg-slate-900/60">
            <div>
              <p className="text-sm font-medium">{agent.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Latency: {agent.latency}</p>
            </div>
            <Badge>{agent.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
