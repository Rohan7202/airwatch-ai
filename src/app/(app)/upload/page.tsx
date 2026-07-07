"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { PageTransition } from "@/components/ui/page-transition";

const UploadFlow = dynamic(
  () => import("@/components/upload/upload-flow").then((mod) => mod.UploadFlow),
  {
    ssr: false,
    loading: () => (
      <Card className="space-y-4 p-6">
        <LoadingSkeleton className="h-52 w-full" />
        <LoadingSkeleton className="h-10 w-full" />
        <LoadingSkeleton className="h-10 w-full" />
      </Card>
    ),
  },
);

export default function UploadPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Citizen Reports"
          title="Upload pollution evidence"
          description="Submit geotagged media and structured details to power automated pollution detection and validation."
        />
        <UploadFlow />
      </section>
    </PageTransition>
  );
}
