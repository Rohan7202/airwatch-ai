import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-rose-100 p-2 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
          <AlertTriangle className="size-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
          <Button variant="secondary" size="sm">
            Try again
          </Button>
        </div>
      </div>
    </Card>
  );
}
