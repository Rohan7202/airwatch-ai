import { KpiSkeleton, ChartSkeleton, ListSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="glass h-20 rounded-2xl" />
      <KpiSkeleton />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <ListSkeleton />
      </div>
    </div>
  );
}
