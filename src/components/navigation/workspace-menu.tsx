"use client";

import { ChevronDown, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function WorkspaceMenu() {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  return (
    <div className="relative">
      <Button variant="secondary" size="sm" className="gap-2" onClick={() => setOpen((prev) => !prev)} aria-haspopup="menu" aria-expanded={open}>
        Workspace
        <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
      </Button>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-52 rounded-xl border border-white/60 bg-white/90 p-1.5 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/90" role="menu">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-sky-50 dark:text-slate-200 dark:hover:bg-slate-800"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-sky-50 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={async () => {
              try {
                await signOut();
                pushToast("Signed out", "Your session has ended.");
                router.push("/login");
                router.refresh();
              } catch (error) {
                pushToast("Sign out failed", error instanceof Error ? error.message : "Unable to sign out.");
              } finally {
                setOpen(false);
              }
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
