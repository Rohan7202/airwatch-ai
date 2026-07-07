"use client";

import { useMemo } from "react";
import {
  GoogleMap,
  HeatmapLayerF,
  Marker,
  MarkerClustererF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import type { HotspotDoc, ReportDoc } from "@/types/firestore";

const fallbackCenter = { lat: 37.7749, lng: -122.4194 };
const libraries: ("places" | "visualization")[] = ["places", "visualization"];

interface MapShellProps {
  heatmap?: boolean;
  showHotspots?: boolean;
  reports?: ReportDoc[];
  hotspots?: HotspotDoc[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapShell({
  heatmap = false,
  showHotspots = true,
  reports = [],
  hotspots = [],
  center = fallbackCenter,
  zoom = 12,
  onMapReady,
}: MapShellProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? "",
    libraries,
  });

  const hotspotMarkers = useMemo(() => hotspots.map((h) => ({ lat: h.latitude, lng: h.longitude, title: h.title, risk: h.riskScore })), [hotspots]);
  const reportMarkers = useMemo(() => reports.map((r) => ({ lat: r.latitude, lng: r.longitude, title: r.title, severity: r.severity })), [reports]);

  if (!apiKey || !isLoaded) {
    return (
      <Card className="relative overflow-hidden p-0">
        <div className="relative h-[520px] bg-[radial-gradient(circle_at_20%_25%,rgba(14,165,233,0.25),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.2),transparent_30%),linear-gradient(140deg,#c7d2fe_0%,#dbeafe_35%,#dcfce7_100%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(14,165,233,0.2),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.2),transparent_30%),linear-gradient(140deg,#0f172a_0%,#111827_35%,#022c22_100%)]">
          <div className="absolute inset-0 grid place-items-center text-center">
            <div className="glass rounded-2xl p-5 text-sm text-slate-600 dark:text-slate-300">
              Google Maps key not configured. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable live map visualization.
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden p-0">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "520px" }}
        center={center}
        zoom={zoom}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          clickableIcons: false,
          disableDefaultUI: true,
          zoomControl: false,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        }}
        onLoad={(map) => onMapReady?.(map)}
      >
        {showHotspots ? (
          <MarkerClustererF>
            {(clusterer) => (
              <>
                {hotspotMarkers.map((marker, index) => (
                  <Marker
                    key={`hotspot-${index}`}
                    clusterer={clusterer}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={`${marker.title} · Risk ${marker.risk}`}
                  />
                ))}
              </>
            )}
          </MarkerClustererF>
        ) : null}

        <MarkerClustererF>
          {(clusterer) => (
            <>
              {reportMarkers.map((marker, index) => (
                <Marker
                  key={`report-${index}`}
                  clusterer={clusterer}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={`${marker.title} · ${marker.severity}`}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 6,
                    fillColor:
                      marker.severity === "critical" || marker.severity === "high"
                        ? "#f43f5e"
                        : marker.severity === "moderate"
                          ? "#f59e0b"
                          : "#10b981",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 1,
                  }}
                />
              ))}
            </>
          )}
        </MarkerClustererF>

        {heatmap ? (
          <HeatmapLayerF
            data={reportMarkers.map((marker) => new google.maps.LatLng(marker.lat, marker.lng))}
            options={{ radius: 35, opacity: 0.7 }}
          />
        ) : null}
      </GoogleMap>
    </Card>
  );
}
