import { BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AiInsightCard({
  title,
  insight,
  confidence,
}: {
  title: string;
  insight: string;
  confidence: string;
}) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold md:text-base">{title}</h3>
        <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
          <BrainCircuit className="size-4" />
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{insight}</p>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Confidence: {confidence}</p>
    </Card>
  );
}
