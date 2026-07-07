"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const locales = ["en", "es"];
  const nextLocale = locales[(locales.indexOf(i18n.language) + 1) % locales.length] ?? "en";

  return (
    <Button variant="secondary" size="sm" onClick={() => void i18n.changeLanguage(nextLocale)} className="gap-2" aria-label="Switch language">
      <Languages className="size-4" />
      <span className="hidden sm:inline">{nextLocale.toUpperCase()}</span>
    </Button>
  );
}
