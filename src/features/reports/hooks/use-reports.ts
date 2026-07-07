"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { ReportDoc } from "@/types/firestore";

export function useReports(limit = 100) {
  return useQuery({
    queryKey: ["reports", limit],
    queryFn: async () => {
      const response = await apiFetch<{ items: ReportDoc[] }>(`/api/v1/reports?limit=${limit}`);
      return response.items;
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

export function useSubmitReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/v1/reports", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error ?? "Unable to submit report");
      }
      return body.report as ReportDoc;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["reports"] });
      const previous = queryClient.getQueryData<ReportDoc[]>(["reports", 100]);
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["reports", 100], context.previous);
      }
    },
    onSuccess: (report) => {
      queryClient.setQueryData<ReportDoc[]>(["reports", 100], (current = []) => [report, ...current]);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["reports"] });
      void queryClient.invalidateQueries({ queryKey: ["hotspots"] });
      void queryClient.invalidateQueries({ queryKey: ["predictions"] });
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
