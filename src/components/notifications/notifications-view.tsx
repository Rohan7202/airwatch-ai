"use client";

import { useMemo, useState } from "react";
import { BellRing, CheckCheck, Trash2 } from "lucide-react";
import { NotificationCard } from "@/components/cards/notification-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteNotification, useMarkNotificationRead, useNotifications } from "@/features/notifications/hooks/use-notifications";
import { useFcmRegistration } from "@/features/notifications/hooks/use-fcm-registration";

type Category = "all" | "alerts" | "updates";

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "alerts", label: "Alerts" },
  { id: "updates", label: "Updates" },
];

export function NotificationsView() {
  const [category, setCategory] = useState<Category>("all");
  const notificationsQuery = useNotifications();
  const markRead = useMarkNotificationRead();
  const deleteNotification = useDeleteNotification();
  useFcmRegistration(true);

  const unread = notificationsQuery.data?.unread ?? 0;

  const filtered = useMemo(() => {
    const items = notificationsQuery.data?.items ?? [];
    if (category === "all") return items;
    return items.filter((item) => {
      if (category === "alerts") return item.severity !== "Low";
      return item.severity === "Low";
    });
  }, [category, notificationsQuery.data?.items]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              aria-pressed={category === tab.id}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                category === tab.id
                  ? "border-sky-400/60 bg-sky-500/15 text-sky-700 dark:text-sky-200"
                  : "border-white/60 bg-white/70 text-slate-600 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
          {unread} unread
        </span>
      </div>

      {notificationsQuery.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="glass h-44 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="space-y-2">
              <NotificationCard title={item.title} message={item.message} severity={item.severity} time={new Date(item.createdAt).toLocaleString()} />
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => markRead.mutate(item.id)} disabled={item.read || markRead.isPending}>
                  <CheckCheck className="mr-1 size-3.5" />
                  {item.read ? "Read" : "Mark read"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deleteNotification.mutate(item.id)}>
                  <Trash2 className="mr-1 size-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState variant="notifications" />
      )}

      <div className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-600 shadow-sm dark:bg-slate-900/70 dark:text-slate-300">
        <BellRing className="size-4" />
        Real-time updates are currently enabled for this workspace.
      </div>
    </div>
  );
}
