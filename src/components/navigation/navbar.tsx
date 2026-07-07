import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { WorkspaceMenu } from "@/components/navigation/workspace-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/55 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/55">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="AirWatch AI home">
            <span className="rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-2 text-white shadow-lg shadow-sky-500/30">
              <Sparkles className="size-4" />
            </span>
            <span className="font-heading text-base font-bold tracking-tight sm:text-lg">AirWatch AI</span>
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/notifications" className="gap-2">
              <Bell className="size-4" />
              Alerts
            </Link>
          </Button>
          <WorkspaceMenu />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
