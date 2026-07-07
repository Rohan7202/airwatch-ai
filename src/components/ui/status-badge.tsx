import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  warning: "bg-amber-100/80 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  danger: "bg-rose-100/80 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  info: "bg-sky-100/80 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  neutral: "bg-slate-100/80 text-slate-600 dark:bg-slate-700/40 dark:text-slate-300",
};

const dotTones: Record<Tone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
  info: "bg-sky-500",
  neutral: "bg-slate-400",
};

export function StatusBadge({ status, tone = "neutral" }: { status: string; tone?: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>
      <span className={cn("size-1.5 rounded-full", dotTones[tone])} />
      {status}
    </span>
  );
}
