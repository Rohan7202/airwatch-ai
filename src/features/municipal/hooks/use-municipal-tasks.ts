"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { MunicipalTaskDoc } from "@/types/firestore";

export function useMunicipalTasks(limit = 50) {
  return useQuery({
    queryKey: ["municipalTasks", limit],
    queryFn: async () => {
      const response = await apiFetch<{ items: MunicipalTaskDoc[] }>(
  `/api/v1/municipal-tasks?limit=${limit}`
);
      return response.items ?? [];
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
}