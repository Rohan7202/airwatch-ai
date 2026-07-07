"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = options.find((option) => option.value === value)?.label ?? options[0]?.label ?? "Select";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-xl border border-white/60 bg-white/70 px-3 text-left text-sm transition hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-900/70 dark:hover:bg-slate-900"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeLabel}
        <ChevronDown className={cn("size-4 text-slate-500 transition", isOpen && "rotate-180")} />
      </button>
      {isOpen ? (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-xl border border-white/60 bg-white/90 p-1 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/90"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-sky-50 dark:hover:bg-sky-500/20"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
