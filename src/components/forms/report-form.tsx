import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ReportForm() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Incident details</h3>
      <div className="space-y-3">
        <Input placeholder="Title: Dense smoke from waste site" />
        <Input placeholder="Address or landmark" />
        <Input placeholder="Suspected source" />
        <Input placeholder="Time observed" />
      </div>
      <Button className="mt-4">Submit report</Button>
    </Card>
  );
}
