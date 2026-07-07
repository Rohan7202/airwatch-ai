import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/50 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 transition dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  );
}
