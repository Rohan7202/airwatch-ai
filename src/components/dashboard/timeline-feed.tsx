import { Card } from "@/components/ui/card";

const events = [
  { time: "08:12", title: "Citizen report validated", detail: "Smoke plume identified near North Freight Corridor." },
  { time: "09:05", title: "Prediction updated", detail: "AQI expected to peak at 112 by 14:00." },
  { time: "10:42", title: "Municipal task assigned", detail: "Rapid response team deployed to zone B2." },
];

export function TimelineFeed() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Activity timeline</h3>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.time} className="flex gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{event.time}</p>
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
