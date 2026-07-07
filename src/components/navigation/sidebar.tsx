"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  Map as MapIcon,
  Bell,
  Settings,
  UploadCloud,
  UserRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { primaryNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof LayoutDashboard> = {
  "/dashboard": LayoutDashboard,
  "/map": MapIcon,
  "/upload": UploadCloud,
  "/analytics": BarChart3,
  "/notifications": Bell,
  "/settings": Settings,
  "/profile": UserRound,
  "/municipal-dashboard": ShieldCheck,
  "/admin": Sparkles,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-white/40 bg-white/40 p-4 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/40 lg:block">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Workspace</p>
      <nav aria-label="Primary" className="space-y-1">
        {primaryNavigation.map((item) => {
          const Icon = iconMap[item.href] ?? LayoutDashboard;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-sky-500/15 to-emerald-500/10 text-slate-900 shadow-sm dark:text-white"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white",
              )}
            >
              <Icon className={cn("size-4 transition", isActive ? "text-sky-600 dark:text-sky-300" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200")} />
              <span>{item.title}</span>
              {isActive ? <span className="ml-auto size-1.5 rounded-full bg-sky-500" /> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
