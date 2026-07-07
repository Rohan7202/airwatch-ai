"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { primaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button variant="secondary" size="icon" aria-label="Open navigation menu" onClick={() => setOpen(true)} className="lg:hidden">
        <Menu className="size-4" />
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[120] bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          >
            <motion.nav
              className="glass-strong absolute right-4 top-4 w-72 rounded-2xl p-3 shadow-2xl"
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-heading font-semibold">Menu</span>
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-500 hover:bg-white/70 dark:hover:bg-slate-800">
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {primaryNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        isActive ? "bg-sky-500/15 text-sky-700 dark:text-sky-200" : "text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
