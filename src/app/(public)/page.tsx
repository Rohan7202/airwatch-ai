import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Bot, Building2, Globe2, Sparkles, Star, UploadCloud, Wind } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/layout/hero-section";
import { Navbar } from "@/components/navigation/navbar";
import { Accordion } from "@/components/ui/accordion";
import { Counter } from "@/components/ui/counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";

const features = [
  { title: "Hyper-local intelligence", description: "Merge citizen uploads, street-level sensors, and weather to uncover pollution events city systems miss.", icon: Globe2 },
  { title: "AI-assisted prioritization", description: "Automatically rank hotspots by severity, spread risk, and municipal impact for faster decisions.", icon: Bot },
  { title: "Operational readiness", description: "Convert pollution insight into field tasks, alerts, and resource routing in one workspace.", icon: Building2 },
];

const workflow = [
  { title: "Citizen capture", description: "Geotagged photo and observation submitted from the neighborhood.", icon: UploadCloud },
  { title: "AI validation", description: "Vision and language agents extract pollutants and correlate satellite layers.", icon: Bot },
  { title: "Risk prediction", description: "24-hour AQI forecast generated per zone with confidence scoring.", icon: Wind },
  { title: "Municipal action", description: "Task plans and targeted alerts dispatched to the right teams.", icon: Building2 },
];

const stats = [
  { value: 124000, suffix: "+", label: "Citizen reports processed" },
  { value: 4.8, suffix: "M", decimals: 1, label: "Sensor streams ingested daily" },
  { value: 38, suffix: " min", label: "Average alert lead-time" },
  { value: 2.7, suffix: "x", decimals: 1, label: "Municipal response acceleration" },
];

const testimonials = [
  { quote: "AirWatch helped us identify illegal nighttime burning hotspots that legacy systems never flagged.", name: "Maya Torres", role: "Environmental Operations Director" },
  { quote: "The city now gets clear risk maps and action-ready plans instead of fragmented reports.", name: "Daniel Seo", role: "Municipal Incident Commander" },
  { quote: "Residents trust the platform because they can see local alerts tied to real evidence.", name: "Priya Anand", role: "Community Program Lead" },
];

const faqs = [
  { question: "How is AirWatch different from city AQI dashboards?", answer: "Traditional dashboards are often sparse and regional. AirWatch fuses community media, IoT, weather, and geospatial layers for neighborhood-level insight." },
  { question: "Can municipal teams use this for operational planning?", answer: "Yes. The municipal dashboard is designed for dispatch prioritization, field assignments, and monitoring closure outcomes." },
  { question: "Does the platform support multilingual communities?", answer: "Yes. The architecture includes internationalization support with scalable language packs and localization controls." },
  { question: "How are citizen reports validated?", answer: "Submitted media is analyzed by AI agents that extract visual signals, cross-check satellite and sensor context, then assign a confidence-weighted risk score." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AirWatch AI",
  applicationCategory: "EnvironmentalApplication",
  operatingSystem: "Web",
  description: "Neighborhood Pollution Intelligence Platform that detects hidden pollution hotspots and coordinates municipal response.",
  url: "https://airwatch.ai",
};

export const metadata: Metadata = {
  title: "AirWatch AI — Neighborhood Pollution Intelligence",
  description:
    "AirWatch AI turns citizen evidence, IoT streams, weather, and satellite signals into actionable pollution intelligence for faster city action.",
  keywords: ["air quality", "pollution", "AQI", "environmental intelligence", "smart city", "Google Build with AI"],
  openGraph: {
    title: "AirWatch AI — Neighborhood Pollution Intelligence",
    description: "Detect hidden pollution hotspots and coordinate municipal response with AI.",
    type: "website",
    url: "https://airwatch.ai",
    siteName: "AirWatch AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirWatch AI — Neighborhood Pollution Intelligence",
    description: "Detect hidden pollution hotspots and coordinate municipal response with AI.",
  },
};

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main id="main-content" className="relative overflow-hidden">
        <AnimatedBackground />

        <section className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
          <HeroSection />

          <ScrollReveal delay={0.15} className="relative">
            <Card className="relative overflow-hidden p-6">
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-sky-400/25 blur-3xl" />
              <div className="absolute -bottom-12 -left-6 size-44 rounded-full bg-emerald-400/20 blur-3xl" />
              <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">Interactive pollution map preview</p>
              <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/50 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.35),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.25),transparent_30%),linear-gradient(140deg,#bfdbfe_0%,#dcfce7_100%)] dark:border-slate-700/60 dark:bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.25),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.25),transparent_30%),linear-gradient(140deg,#0f172a_0%,#022c22_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:36px_36px]" />
                <span className="absolute left-[22%] top-[28%] size-3 rounded-full bg-rose-500 shadow-[0_0_0_10px_rgba(244,63,94,0.25)]" />
                <span className="absolute left-[58%] top-[46%] size-3 rounded-full bg-amber-500 shadow-[0_0_0_10px_rgba(245,158,11,0.25)]" />
                <span className="absolute left-[70%] top-[30%] size-3 rounded-full bg-rose-500 shadow-[0_0_0_10px_rgba(244,63,94,0.25)]" />
                <span className="absolute left-[40%] top-[66%] size-3 rounded-full bg-emerald-500 shadow-[0_0_0_10px_rgba(16,185,129,0.25)]" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { value: "12", label: "Active hotspots" },
                  { value: "318", label: "Live sensors" },
                  { value: "93%", label: "Forecast confidence" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/70 p-2 dark:bg-slate-900/70">
                    <p className="font-semibold">{item.value}</p>
                    <p className="text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.08}>
                <Card interactive className="h-full p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
          <ScrollReveal>
            <div className="rounded-3xl border border-white/50 bg-white/50 p-8 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/40 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">Impact at a glance</h2>
                  <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    AirWatch scales from a single neighborhood report to citywide coordination, helping teams act before pollution spreads.
                  </p>
                  <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline dark:text-sky-300">
                    Explore the dashboard
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/70 p-5 dark:bg-slate-900/70">
                      <p className="text-3xl font-bold tracking-tight">
                        <Counter value={item.value} suffix={item.suffix} decimals={item.decimals ?? 0} />
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A four-stage pipeline that moves communities from evidence to action.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {workflow.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <Card interactive className="h-full p-5">
                    <div className="flex items-center justify-between">
                      <item.icon className="size-5 text-sky-600 dark:text-sky-300" />
                      <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight">AI workflow orchestration</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Five specialized agents collaborate to produce trusted, explainable decisions.</p>
            <div className="relative mt-8 space-y-4 border-l-2 border-sky-300/60 pl-6 dark:border-sky-500/40">
              {["Citizen Report Agent", "Satellite Analysis Agent", "Prediction Agent", "Municipal Planning Agent", "Notification Agent"].map((agent, index) => (
                <Card key={agent} interactive className="flex items-center gap-4 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{agent}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous agent · streaming</p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <Sparkles className="size-3" /> Active
                  </span>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight">Trusted by response teams</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.name} interactive className="p-6">
                  <div className="mb-3 flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200">“{item.quote}”</p>
                  <p className="mt-4 font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
            <div className="mt-6">
              <Accordion items={faqs} />
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-emerald-500/15 p-10 text-center backdrop-blur-xl">
              <h2 className="text-3xl font-semibold tracking-tight">Start monitoring your neighborhood today</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Join cities using AirWatch AI to detect hidden pollution and respond faster.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/register" className="inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 px-6 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110">
                  Start free trial
                </Link>
                <Link href="/login" className="inline-flex h-11 items-center rounded-xl border border-white/60 bg-white/70 px-6 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200">
                  Sign in
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />

      <Script id="airwatch-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
    </div>
  );
}
