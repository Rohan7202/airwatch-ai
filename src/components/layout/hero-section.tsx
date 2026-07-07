"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Sparkles, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const trustPoints = [
  "Real-time signals",
  "Multi-agent AI orchestration",
  "Municipal workflow ready",
];

export function HeroSection() {
  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-sky-200"
      >
        <Sparkles className="size-3.5" />
        Built for high-impact environmental response
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        Neighborhood pollution intelligence for <span className="gradient-text">faster city action</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg"
      >
        AirWatch AI turns citizen evidence, IoT streams, weather intelligence, and satellite signals into actionable insights
        for cleaner, safer neighborhoods.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="flex flex-wrap gap-3"
      >
        <Button asChild size="lg" className="shadow-lg shadow-sky-500/25">
          <Link href="/register" className="gap-2">
            Start free trial
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/dashboard">View platform demo</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300"
      >
        {trustPoints.map((point) => (
          <span key={point} className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-500" />
            {point}
          </span>
        ))}
      </motion.div>

      <div className="grid grid-cols-2 gap-3 pt-2 sm:max-w-md">
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
            <Wind className="size-4" />
          </span>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live AQI</p>
            <p className="font-semibold">86 · Moderate</p>
          </div>
        </div>
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <span className="rounded-xl bg-rose-100 p-2 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
            <MapPin className="size-4" />
          </span>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active hotspots</p>
            <p className="font-semibold">12 monitored</p>
          </div>
        </div>
      </div>
    </div>
  );
}
