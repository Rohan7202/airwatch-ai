import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-white/60 bg-white/70 p-2 shadow-2xl shadow-slate-900/20 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80 lg:hidden"
    >
      <div className="grid grid-cols-4 gap-1.5">
        {primaryNavigation.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-2 py-2 text-center text-xs font-medium text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800/70"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
