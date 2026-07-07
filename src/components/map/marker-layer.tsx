import { Card } from "@/components/ui/card";

const data = [
  { area: "North Yard", reports: 28, risk: "High" },
  { area: "Riverfront", reports: 16, risk: "Moderate" },
  { area: "University District", reports: 9, risk: "Low" },
];

export function MarkerLayer() {
  return (
    <Card className="p-5">
      <h3 className="mb-3 text-sm font-semibold">Active marker clusters</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.area} className="flex items-center justify-between rounded-lg bg-white/65 px-3 py-2 text-sm dark:bg-slate-900/60">
            <span>{item.area}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {item.reports} reports · {item.risk}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
