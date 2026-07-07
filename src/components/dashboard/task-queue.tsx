"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { useMunicipalTasks } from "@/features/municipal/hooks/use-municipal-tasks";
export function TaskQueue() {
  const { data: tasks = [] } = useMunicipalTasks(5);

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">
        Municipal task queue
      </h3>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">
            No pending tasks.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-white/50 bg-white/55 px-3 py-2 dark:border-slate-700/60 dark:bg-slate-900/60"
            >
              <div>
                <p className="text-sm font-medium">
                  {task.title}
                </p>

                <p className="text-xs text-slate-500">
  Created: {new Date(task.createdAt).toLocaleDateString()}
</p>
              </div>

              <Badge>{task.status}</Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}