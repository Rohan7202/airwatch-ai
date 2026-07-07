"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/hooks/use-toast";

export function DashboardActions() {
  const [open, setOpen] = useState(false);
  const { pushToast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Generate report</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Generate executive summary"
        description="Prepare a polished incident summary for municipal leadership and stakeholders."
      >
        <div className="space-y-3">
          <Input defaultValue="District 4 pollution pulse report" aria-label="Report name" />
          <Input defaultValue="Last 24 hours" aria-label="Time range" />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                pushToast("Report queued", "Your executive summary is being prepared.");
                setOpen(false);
              }}
            >
              Generate
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
