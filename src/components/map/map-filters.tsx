"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";

export function MapFilters() {
  const [severity, setSeverity] = useState("all");
  const [source, setSource] = useState("all");

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select
        label="Severity filter"
        value={severity}
        onChange={setSeverity}
        options={[
          { value: "all", label: "All severities" },
          { value: "high", label: "High risk only" },
          { value: "moderate", label: "Moderate and above" },
        ]}
      />
      <Select
        label="Source filter"
        value={source}
        onChange={setSource}
        options={[
          { value: "all", label: "All sources" },
          { value: "traffic", label: "Traffic" },
          { value: "industrial", label: "Industrial" },
          { value: "construction", label: "Construction" },
        ]}
      />
    </div>
  );
}
