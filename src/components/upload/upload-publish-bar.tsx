"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";

export function UploadPublishBar() {
  const [open, setOpen] = useState(false);
  const { pushToast } = useToast();

  return (
    <>
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
        <div>
          <p className="text-sm font-semibold">Report ready for submission</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">Validate metadata and publish to the response queue.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => pushToast("Draft saved", "Your report draft has been saved locally.")}
          >
            Save draft
          </Button>
          <Button onClick={() => setOpen(true)}>Publish report</Button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Publish pollution report"
        description="This will notify validation agents and update municipal monitoring feeds."
      >
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">Report title: Dense smoke near Riverside transfer station</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Location confidence: 96% · Severity: High</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Back
            </Button>
            <Button
              onClick={() => {
                pushToast("Report published", "The incident is now available to monitoring workflows.");
                setOpen(false);
              }}
            >
              Confirm publish
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
