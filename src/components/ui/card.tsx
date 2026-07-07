import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, interactive = false, ...props }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "glass rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/30",
        interactive && "card-hover hover:border-sky-300/60 dark:hover:border-sky-500/40",
        className,
      )}
      {...props}
    />
  );
}
