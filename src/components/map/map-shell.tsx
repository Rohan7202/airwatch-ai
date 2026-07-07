"use client";

import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import type { DivIcon, Map as LeafletMap } from "leaflet";
import { useEffect, useMemo } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Card } from "@/components/ui/card";
import type { HotspotDoc, ReportDoc } from "@/types/firestore";

const fallbackCenter = { lat: 37.7749, lng: -122.4194 };

interface MapShellProps {
  heatmap?: boolean;
  showHotspots?: boolean;
  reports?: ReportDoc[];
  hotspots?: HotspotDoc[];
  center?: { lat: number; lng: number };
  zoom?: number;
  userLocation?: { lat: number; lng: number } | null;
  onMapReady?: (map: LeafletMap) => void;
}

type ClusterLike = {
  getChildCount: () => number;
};

function MapReady({ onMapReady }: { onMapReady?: (map: LeafletMap) => void }) {
  const map = useMap();

  useEffect(() => {
    onMapReady?.(map);
  }, [map, onMapReady]);

  return null;
}

function MapViewUpdater({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    const currentCenter = map.getCenter();
    const centerChanged = Math.abs(currentCenter.lat - center.lat) > 0.000001 || Math.abs(currentCenter.lng - center.lng) > 0.000001;
    const zoomChanged = map.getZoom() !== zoom;

    if (centerChanged || zoomChanged) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [center.lat, center.lng, map, zoom]);

  return null;
}

function reportColor(severity: ReportDoc["severity"]) {
  if (severity === "critical" || severity === "high") return "#f43f5e";
  if (severity === "moderate") return "#f59e0b";
  return "#10b981";
}

function hotspotColor(risk: HotspotDoc["riskScore"]) {
  if (risk >= 75) return "#ef4444";
  if (risk >= 45) return "#f59e0b";
  return "#0ea5e9";
}

function markerIcon(color: string, size = 18): DivIcon {
  return divIcon({
    className: "",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid #ffffff;box-shadow:0 8px 18px rgba(15,23,42,0.28);"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function clusterIcon(cluster: ClusterLike): DivIcon {
  const count = cluster.getChildCount();

  return divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:42px;height:42px;border-radius:9999px;background:#0f172a;color:#ffffff;border:2px solid #ffffff;box-shadow:0 10px 24px rgba(15,23,42,0.32);font-size:13px;font-weight:700;">${count}</span>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}
function userLocationIcon(): DivIcon {
  return divIcon({
    className: "",
    html: `
      <div style="
        width:18px;
        height:18px;
        background:#2563eb;
        border:3px solid white;
        border-radius:50%;
        box-shadow:0 0 12px rgba(37,99,235,.6);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function MapShell({
  heatmap = false,
  showHotspots = true,
  reports = [],
  hotspots = [],
  center = fallbackCenter,
  zoom = 12,
  userLocation,
  onMapReady,
}: MapShellProps)  {
  
  const hotspotMarkers = useMemo(
    () => hotspots.map((h) => ({ lat: h.latitude, lng: h.longitude, title: h.title, risk: h.riskScore })),
    [hotspots],
  );

  const reportMarkers = useMemo(
    () => reports.map((r) => ({ lat: r.latitude, lng: r.longitude, title: r.title, severity: r.severity })),
    [reports],
  );

  return (
    <Card className="relative overflow-hidden p-0">
      
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        zoomControl={false}
        className="h-[520px] w-full z-0"
        preferCanvas
      >
        <MapReady onMapReady={onMapReady} />
        <MapViewUpdater center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showHotspots ? (
          <MarkerClusterGroup chunkedLoading showCoverageOnHover={false} iconCreateFunction={clusterIcon}>
            {hotspotMarkers.map((marker, index) => (
              <Marker
                key={`hotspot-${index}`}
                position={[marker.lat, marker.lng]}
                icon={markerIcon(hotspotColor(marker.risk), 20)}
                title={`${marker.title} · Risk ${marker.risk}`}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{marker.title}</p>
                    <p className="text-xs text-slate-600">Risk score: {marker.risk}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : null}

        <>
          {reportMarkers.map((marker, index) => (
            <Marker
              key={`report-${index}`}
              position={[marker.lat, marker.lng]}
              icon={markerIcon(reportColor(marker.severity))}
              title={`${marker.title} · ${marker.severity}`}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">{marker.title}</p>
                  <p className="text-xs capitalize text-slate-600">Severity: {marker.severity}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </>

        {heatmap
          ? reportMarkers.map((marker, index) => (
              <CircleMarker
                key={`heatmap-${index}`}
                center={[marker.lat, marker.lng]}
                radius={28}
                pathOptions={{
                  color: reportColor(marker.severity),
                  fillColor: reportColor(marker.severity),
                  fillOpacity: 0.18,
                  opacity: 0.35,
                  weight: 1,
                }}
              />
            ))
          : null}
          {userLocation && (
  <Marker
  position={[userLocation.lat, userLocation.lng]}
  icon={userLocationIcon()}
>
    <Popup>Your Current Location</Popup>
  </Marker>
)}
      </MapContainer>
    </Card>
  );
}