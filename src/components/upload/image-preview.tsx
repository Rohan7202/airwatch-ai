import { Card } from "@/components/ui/card";

export function ImagePreview() {
  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-semibold">Preview</h3>
      <div className="h-48 rounded-xl bg-[linear-gradient(135deg,#93c5fd_0%,#a7f3d0_100%)] p-4 dark:bg-[linear-gradient(135deg,#1e3a8a_0%,#065f46_100%)]">
        <div className="h-full rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm" />
      </div>
    </Card>
  );
}
