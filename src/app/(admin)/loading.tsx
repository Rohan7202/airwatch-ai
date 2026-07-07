import { KpiSkeleton, ListSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="glass h-20 rounded-2xl" />
      <KpiSkeleton />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <ListSkeleton />
          <ListSkeleton rows={3} />
        </div>
        <ListSkeleton />
      </div>
    </div>
  );
}
