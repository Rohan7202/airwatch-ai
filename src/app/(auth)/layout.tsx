import type { ReactNode } from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/animated-background";

const benefits = [
  "Detect hidden pollution hotspots in real time",
  "Coordinate municipal response with AI workflows",
  "Trusted by city environmental teams",
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-500 via-indigo-500 to-emerald-500 p-12 text-white lg:flex">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center gap-2">
          <span className="rounded-xl bg-white/15 p-2 backdrop-blur">
            <Sparkles className="size-4" />
          </span>
          <span className="font-heading text-lg font-bold">AirWatch AI</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold leading-tight">Cleaner, safer neighborhoods start with better signals.</h2>
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/90">
                <CheckCircle2 className="size-5 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="size-4" />
          SOC 2 ready · Encrypted by design
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">{children}</div>
    </div>
  );
}
