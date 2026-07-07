import { Card } from "@/components/ui/card";

const stages = [
  "Image uploaded and geotagged",
  "Visual pollutants extracted",
  "Satellite anomaly correlated",
  "Weather-adjusted AQI forecast computed",
  "Municipal action plan generated",
  "Risk notifications published",
];

export function InferenceTimeline() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Inference timeline</h3>
      <ol className="space-y-3">
        {stages.map((stage, index) => (
          <li key={stage} className="flex gap-3 text-sm">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white">
              {index + 1}
            </span>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
