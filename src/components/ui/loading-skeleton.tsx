import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70", className)} aria-hidden="true" />;
}
