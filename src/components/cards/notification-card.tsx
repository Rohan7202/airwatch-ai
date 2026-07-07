import { Bell, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function NotificationCard({
  title,
  message,
  severity,
  time,
}: {
  title: string;
  message: string;
  severity: "High" | "Moderate" | "Low";
  time: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
          <Bell className="size-4" />
        </div>
        <Badge>{severity}</Badge>
      </div>
      <h3 className="mt-4 text-sm font-semibold md:text-base">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{message}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <Clock3 className="size-3.5" />
        {time}
      </p>
    </Card>
  );
}
