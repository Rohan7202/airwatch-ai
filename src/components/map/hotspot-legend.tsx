import { Card } from "@/components/ui/card";

const legend = [
  { label: "High risk", color: "bg-rose-500" },
  { label: "Moderate risk", color: "bg-amber-500" },
  { label: "Low risk", color: "bg-emerald-500" },
];

export function HotspotLegend() {
  return (
    <Card className="p-5">
      <h3 className="mb-3 text-sm font-semibold">Risk legend</h3>
      <div className="space-y-2 text-sm">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`size-3 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
