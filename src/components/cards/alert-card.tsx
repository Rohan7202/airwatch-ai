import { BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AlertCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
          <BellRing className="size-5" />
        </div>
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">Urgent</Badge>
      </div>
      <h3 className="mt-4 font-semibold">Dust surge near East Loop</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Wind shift is spreading construction dust toward School District 9. Advisory sent to nearby residents.
      </p>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">12 minutes ago</p>
    </Card>
  );
}
