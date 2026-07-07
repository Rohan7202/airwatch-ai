"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { SensorDoc } from "@/types/firestore";

export function useSensors(limit = 20) {
  return useQuery({
    queryKey: ["sensors", limit],
    queryFn: async () => {
      const response = await apiFetch<{ items: SensorDoc[] }>(
        `/api/v1/sensors?limit=${limit}`
      );

      return response.items;
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
}