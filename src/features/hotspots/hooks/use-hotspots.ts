"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { HotspotDoc, PredictionDoc } from "@/types/firestore";

export function useHotspots(limit = 200) {
  return useQuery({
    queryKey: ["hotspots", limit],
    queryFn: async () => {
      const response = await apiFetch<{ items: HotspotDoc[] }>(`/api/v1/hotspots?limit=${limit}`);
      return response.items;
    },
    staleTime: 20_000,
    refetchInterval: 20_000,
  });
}

export function usePredictions(limit = 200) {
  return useQuery({
    queryKey: ["predictions", limit],
    queryFn: async () => {
      const response = await apiFetch<{ items: PredictionDoc[] }>(`/api/v1/predictions?limit=${limit}`);
      return response.items;
    },
    staleTime: 20_000,
    refetchInterval: 20_000,
  });
}
