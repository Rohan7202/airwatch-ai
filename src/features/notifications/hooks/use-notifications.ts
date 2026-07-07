"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { NotificationDoc } from "@/types/firestore";

interface NotificationsResponse {
  items: NotificationDoc[];
  unread: number;
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiFetch<NotificationsResponse>("/api/v1/notifications"),
    staleTime: 15_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch<{ notification: NotificationDoc }>(`/api/v1/notifications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ read: true }),
        headers: { "Content-Type": "application/json" },
      });
      return response.notification;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData<NotificationsResponse>(["notifications"]);

      queryClient.setQueryData<NotificationsResponse | undefined>(["notifications"], (current) => {
        if (!current) return current;
        const items = current.items.map((item) => (item.id === id ? { ...item, read: true } : item));
        return { ...current, items, unread: Math.max(0, items.filter((item) => !item.read).length) };
      });

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(["notifications"], context.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch<{ ok: boolean }>(`/api/v1/notifications/${id}`, { method: "DELETE" });
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData<NotificationsResponse>(["notifications"]);
      queryClient.setQueryData<NotificationsResponse | undefined>(["notifications"], (current) => {
        if (!current) return current;
        const items = current.items.filter((item) => item.id !== id);
        return { ...current, items, unread: items.filter((item) => !item.read).length };
      });
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(["notifications"], context.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
