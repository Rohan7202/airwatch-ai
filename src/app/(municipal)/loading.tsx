import { ChartSkeleton, ListSkeleton } from "@/components/ui/skeletons";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="glass h-20 rounded-2xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="space-y-3 p-5">
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-8 w-20" />
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
