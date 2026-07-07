"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MapSearch({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="pointer-events-auto w-full max-w-xs">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSearch();
              }
            }}
            placeholder="Search neighborhood or address"
            aria-label="Search map"
            className="glass-strong h-11 pl-9 text-sm shadow-lg"
          />
        </div>
        <Button size="sm" variant="secondary" onClick={onSearch}>
          Go
        </Button>
      </div>
    </div>
  );
}
