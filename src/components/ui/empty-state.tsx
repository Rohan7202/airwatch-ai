import { BellOff, FileSearch, LineChart, ShieldAlert, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type EmptyVariant = "reports" | "notifications" | "predictions" | "alerts" | "default";

const variants: Record<EmptyVariant, { icon: LucideIcon; title: string; description: string }> = {
  reports: {
    icon: FileSearch,
    title: "No reports yet",
    description: "When citizens submit pollution evidence, validated reports will appear here with AI risk scoring.",
  },
  notifications: {
    icon: BellOff,
    title: "You're all caught up",
    description: "New alerts about air quality advisories and municipal updates will appear in this center.",
  },
  predictions: {
    icon: LineChart,
    title: "No forecasts generated",
    description: "24-hour AQI predictions will be produced automatically once live sensor feeds are connected.",
  },
  alerts: {
    icon: ShieldAlert,
    title: "No active alerts",
    description: "Critical pollution advisories for your monitored neighborhoods will surface here in real time.",
  },
  default: {
    icon: FileSearch,
    title: "Nothing here yet",
    description: "Content for this section will appear once data is available.",
  },
};

export function EmptyState({
  title,
  description,
  variant = "default",
}: {
  title?: string;
  description?: string;
  variant?: EmptyVariant;
}) {
  const config = variants[variant];
  const heading = title ?? config.title;
  const body = description ?? config.description;

  return (
    <Card className="flex flex-col items-center p-10 text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 animate-ping rounded-full bg-sky-400/20" />
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 to-emerald-500/15 text-sky-600 dark:text-sky-300">
          <config.icon className="size-6" />
        </div>
      </div>
      <h3 className="text-base font-semibold">{heading}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">{body}</p>
    </Card>
  );
}
