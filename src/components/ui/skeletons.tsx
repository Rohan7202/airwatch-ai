import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export function KpiSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="space-y-3 p-5">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-8 w-20" />
          <LoadingSkeleton className="h-3 w-16" />
        </Card>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="space-y-4 p-6">
      <LoadingSkeleton className="h-5 w-44" />
      <LoadingSkeleton className="h-44 w-full" />
    </Card>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <Card className="space-y-3 p-6">
      <LoadingSkeleton className="h-5 w-44" />
      {Array.from({ length: rows }).map((_, index) => (
        <LoadingSkeleton key={index} className="h-12 w-full" />
      ))}
    </Card>
  );
}

export function MapSkeleton() {
  return (
    <Card className="h-[520px]">
      <LoadingSkeleton className="h-full w-full rounded-2xl" />
    </Card>
  );
}
