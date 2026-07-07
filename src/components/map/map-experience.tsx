"use client";

import { useMemo, useRef, useState } from "react";
import { MapControls } from "@/components/map/map-controls";
import { MapLayerToggles, type MapLayer } from "@/components/map/map-layer-toggles";
import { MapSearch } from "@/components/map/map-search";
import { MapShell } from "@/components/map/map-shell";
import { HotspotLegend } from "@/components/map/hotspot-legend";
import { useToast } from "@/hooks/use-toast";
import { useReports } from "@/features/reports/hooks/use-reports";
import { useHotspots } from "@/features/hotspots/hooks/use-hotspots";
import { apiFetch } from "@/lib/api/client";

export function MapExperience() {
  const [heatmap, setHeatmap] = useState(false);
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [zoom, setZoom] = useState(12);
  const [layers, setLayers] = useState<Record<MapLayer, boolean>>({
    hotspots: true,
    sensors: true,
    satellite: false,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const { pushToast } = useToast();
  const reports = useReports(500);
  const hotspots = useHotspots(300);

  const reportItems = reports.data ?? [];
  const hotspotItems = useMemo(() => (layers.hotspots ? hotspots.data ?? [] : []), [hotspots.data, layers.hotspots]);

  const toggleLayer = (layer: MapLayer) => setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));

  return (
    <div className="relative">
      <div className="absolute left-4 top-4 z-20">
        <MapSearch
          value={search}
          onChange={setSearch}
          onSearch={async () => {
            if (!search.trim()) return;
            try {
              const response = await apiFetch<{ result: { latitude: number; longitude: number; formattedAddress: string } | null }>(
                `/api/v1/maps/geocode?query=${encodeURIComponent(search)}`,
              );
              if (!response.result) {
                pushToast("No match", "Could not locate the entered address.");
                return;
              }
              const nextCenter = { lat: response.result.latitude, lng: response.result.longitude };
              setCenter(nextCenter);
              setZoom(14);
              mapRef.current?.panTo(nextCenter);
              pushToast("Location found", response.result.formattedAddress);
            } catch (error) {
              pushToast("Search failed", error instanceof Error ? error.message : "Unable to search location.");
            }
          }}
        />
      </div>

      <div className="absolute right-4 top-4 z-20">
        <MapControls
          heatmap={heatmap}
          onToggleHeatmap={() => setHeatmap((prev) => !prev)}
          onLocate={() => {
            if (!navigator.geolocation) {
              pushToast("Geolocation unavailable", "Your browser does not support geolocation.");
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const nextCenter = { lat: position.coords.latitude, lng: position.coords.longitude };
                setCenter(nextCenter);
                setZoom(14);
                mapRef.current?.panTo(nextCenter);
                pushToast("Location updated", "Map centered on your current location.");
              },
              () => {
                pushToast("Location denied", "Location permission is required to center the map.");
              },
            );
          }}
          onZoomIn={() => {
            const next = Math.min(zoom + 1, 19);
            setZoom(next);
            mapRef.current?.setZoom(next);
          }}
          onZoomOut={() => {
            const next = Math.max(zoom - 1, 3);
            setZoom(next);
            mapRef.current?.setZoom(next);
          }}
        />
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        <MapLayerToggles active={layers} onToggle={toggleLayer} />
      </div>

      <MapShell
        heatmap={heatmap}
        showHotspots={layers.hotspots}
        reports={reportItems}
        hotspots={hotspotItems}
        center={center}
        zoom={zoom}
        onMapReady={(map) => {
          mapRef.current = map;
        }}
      />

      <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden md:block">
        <HotspotLegend />
      </div>
    </div>
  );
}
