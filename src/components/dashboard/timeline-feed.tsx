"use client";

import { Card } from "@/components/ui/card";
import { useReports } from "@/features/reports/hooks/use-reports";

export function TimelineFeed() {
  const { data: reports = [] } = useReports(5);

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Activity timeline</h3>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <p className="text-sm text-slate-500">No recent activity.</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="flex gap-3">
              <div
                className={`mt-1 h-2 w-2 rounded-full ${
                  report.severity === "critical"
                    ? "bg-red-500"
                    : report.severity === "high"
                    ? "bg-orange-500"
                    : report.severity === "moderate"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />

              <div>
                <p className="text-xs text-slate-500">
                  {new Date(report.createdAt).toLocaleString()}
                </p>

                <p className="text-sm font-medium">
                  {report.title}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {report.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}