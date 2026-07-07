"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (!mounted) return;

    if (theme === "light") {
      setTheme("dark");
      return;
    }
    if (theme === "dark") {
      setTheme("system");
      return;
    }
    setTheme("light");
  };

  const label = useMemo(() => {
    if (!mounted) return "System";
    if (theme === "system") return "System";
    return resolvedTheme === "dark" ? "Dark" : "Light";
  }, [mounted, theme, resolvedTheme]);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <Button variant="secondary" size="sm" onClick={cycleTheme} aria-label="Toggle theme mode" className="gap-2">
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
