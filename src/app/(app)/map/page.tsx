"use client";

import dynamic from "next/dynamic";
import { MarkerLayer } from "@/components/map/marker-layer";
import { HotspotLegend } from "@/components/map/hotspot-legend";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { MapSkeleton } from "@/components/ui/skeletons";
import { PageTransition } from "@/components/ui/page-transition";

const MapExperience = dynamic(
  () => import("@/components/map/map-experience").then((mod) => mod.MapExperience),
  { ssr: false, loading: () => <MapSkeleton /> },
);

export default function MapPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Smart Map"
          title="Geospatial pollution intelligence"
          description="Visualize hotspots, sensor health, and risk propagation across neighborhoods with live overlays."
          actions={<Button variant="secondary">Export map snapshot</Button>}
        />

        <MapExperience />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <HotspotLegend />
          </div>
          <div className="md:col-span-2">
            <MarkerLayer />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
