import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";

export function UploadDropzone() {
  return (
    <Card className="p-6">
      <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/60 p-8 text-center dark:border-sky-500/40 dark:bg-sky-500/10">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-sky-600 shadow dark:bg-slate-900 dark:text-sky-300">
          <UploadCloud className="size-5" />
        </div>
        <h3 className="text-base font-semibold">Upload pollution evidence</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Drag and drop image or video evidence, or click to browse files.</p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">PNG, JPG, MP4 up to 25MB</p>
      </div>
    </Card>
  );
}
