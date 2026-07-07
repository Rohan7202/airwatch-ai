import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const tasks = [
  { id: "MT-4412", title: "Inspect illegal waste burn", status: "In progress" },
  { id: "MT-4406", title: "Deploy mobile sensor van", status: "Pending" },
  { id: "MT-4399", title: "Issue school zone advisory", status: "Completed" },
];

export function TaskQueue() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Municipal task queue</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between rounded-xl border border-white/50 bg-white/55 px-3 py-2 dark:border-slate-700/60 dark:bg-slate-900/60">
            <div>
              <p className="text-sm font-medium">{task.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{task.id}</p>
            </div>
            <Badge>{task.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
