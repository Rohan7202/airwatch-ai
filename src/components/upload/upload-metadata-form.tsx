import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UploadMetadataForm() {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold">Report metadata</h3>
      <div className="space-y-3">
        <Input placeholder="Incident title" />
        <Input placeholder="Location (street, landmark)" />
        <Input placeholder="Suspected source (traffic, burn, industrial, dust)" />
        <Button className="w-full">Save metadata</Button>
      </div>
    </Card>
  );
}
