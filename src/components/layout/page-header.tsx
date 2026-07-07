import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function PageHeader({
  title,
  description,
  actions,
  badge,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  badge?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        {badge ? <Badge>{badge}</Badge> : null}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 md:text-base">{description}</p>
      </div>
      {actions}
    </div>
  );
}
