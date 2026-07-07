import Link from "next/link";
import { Globe, Mail, MessageSquare, Sparkles } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Smart Map", href: "/map" },
      { label: "Analytics", href: "/analytics" },
      { label: "Upload Report", href: "/upload" },
    ],
  },
  {
    title: "Operations",
    links: [
      { label: "Municipal", href: "/municipal-dashboard" },
      { label: "Admin", href: "/admin" },
      { label: "Notifications", href: "/notifications" },
      { label: "Settings", href: "/settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/dashboard" },
      { label: "Privacy", href: "/settings" },
      { label: "Security", href: "/admin" },
      { label: "Contact", href: "/profile" },
    ],
  },
];

const socials = [
  { icon: Globe, href: "/dashboard", label: "Website" },
  { icon: Mail, href: "/dashboard", label: "Email" },
  { icon: MessageSquare, href: "/dashboard", label: "Community" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/50 bg-white/45 py-12 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/45">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-2 text-white shadow-lg shadow-sky-500/30">
                <Sparkles className="size-4" />
              </span>
              <span className="font-heading text-lg font-semibold">AirWatch AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-300">
              Neighborhood Pollution Intelligence Platform. Detect hidden pollution hotspots and coordinate cleaner, safer cities.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-xl border border-white/60 bg-white/60 p-2 text-slate-600 transition hover:text-sky-600 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-sky-300"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{column.title}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-600 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/50 pt-6 text-xs text-slate-500 dark:border-slate-800/70 dark:text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} AirWatch AI. Built for the Google Build with AI Hackathon.</p>
          <p>Designed for clarity, speed, and environmental impact.</p>
        </div>
      </div>
    </footer>
  );
}
