"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ImageUp, MapPin, Sparkles, UploadCloud, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSubmitReport } from "@/features/reports/hooks/use-reports";
import type { ReportDoc } from "@/types/firestore";

const categories = [
  { id: "traffic", label: "Traffic", icon: Wind },
  { id: "industrial", label: "Industrial", icon: ImageUp },
  { id: "construction", label: "Construction", icon: UploadCloud },
  { id: "waste", label: "Waste burning", icon: Wind },
  { id: "dust", label: "Dust", icon: Wind },
] as const;

const severityLabels = ["Minimal", "Low", "Moderate", "High", "Critical"] as const;
const severityToApi = ["low", "low", "moderate", "high", "critical"] as const;

function SeverityPill({ severity }: { severity: "low" | "moderate" | "high" | "critical" }) {
  const styles = {
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    moderate: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    high: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    critical: "bg-rose-200 text-rose-800 dark:bg-rose-500/25 dark:text-rose-200",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[severity]}`}>{severity}</span>;
}

export function UploadFlow() {
  const [file, setFile] = useState<{ value: File; preview: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<ReportDoc | null>(null);
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("industrial");
  const [severity, setSeverity] = useState(3);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(37.7749);
  const [lng, setLng] = useState(-122.4194);
  const inputRef = useRef<HTMLInputElement>(null);
  const { pushToast } = useToast();
  const submitReport = useSubmitReport();

  const handleFiles = (files: FileList | null) => {
    const selected = files?.[0];
    if (!selected) return;
    setFile({ value: selected, preview: URL.createObjectURL(selected) });
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      () => {
        // no-op fallback keeps default
      },
    );
  }, []);

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const resetState = () => {
    setSubmitted(false);
    setSubmittedReport(null);
    setFile(null);
    setProgress(0);
    setTitle("");
    setLocation("");
    setDescription("");
    setCategory("industrial");
    setSeverity(3);
  };

  const submit = async () => {
    if (!file) return;
    if (!title || !description || !location) {
      pushToast("Missing fields", "Please fill out title, location, and description.");
      return;
    }

    try {
      setProgress(8);

      const formData = new FormData();
      formData.append("image", file.value);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("latitude", String(lat));
      formData.append("longitude", String(lng));
      formData.append("address", location);
      formData.append("category", category);
      formData.append("severity", severityToApi[severity - 1]);

      const timer = setInterval(() => {
        setProgress((current) => (current >= 92 ? current : current + 7));
      }, 120);

      const report = await submitReport.mutateAsync(formData);
      clearInterval(timer);
      setProgress(100);

      setSubmittedReport(report);
      setSubmitted(true);
      pushToast("Report published", "AI workflow completed and dashboard data refreshed.");
    } catch (error) {
      setProgress(0);
      pushToast("Submission failed", error instanceof Error ? error.message : "Unable to submit report.");
    }
  };

  if (submitted) {
    return (
      <Card className="space-y-6 p-10 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
            <CheckCircle2 className="size-8" />
          </div>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold">Report submitted and analyzed</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Gemini and ADK agents completed analysis, hotspot detection, AQI prediction, and municipal recommendation.
          </p>
        </div>

        {submittedReport?.geminiAnalysis ? (
          <div className="grid gap-4 text-left md:grid-cols-2">
            <Card className="p-4">
              <p className="mb-2 inline-flex items-center gap-1 text-sm font-semibold">
                <Sparkles className="size-4 text-sky-500" /> Gemini analysis
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Pollution type:</span> {submittedReport.geminiAnalysis.pollutionType.replace(/_/g, " ")}
                </p>
                <p>
                  <span className="font-medium">Confidence:</span> {Math.round(submittedReport.geminiAnalysis.confidence * 100)}%
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="font-medium">Severity:</span>
                  <SeverityPill severity={submittedReport.geminiAnalysis.severity} />
                </p>
                <p className="text-slate-600 dark:text-slate-300">{submittedReport.geminiAnalysis.explanation}</p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="mb-2 inline-flex items-center gap-1 text-sm font-semibold">
                <AlertTriangle className="size-4 text-amber-500" /> Agent recommendation
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{submittedReport.municipalRecommendation ?? submittedReport.geminiAnalysis.suggestedMunicipalAction}</p>
              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p>Hotspot ID: {submittedReport.hotspotId ?? "Pending"}</p>
                <p>Predicted AQI (24h): {submittedReport.predictedAqi24h ?? "Pending"}</p>
                <p>Validation: {submittedReport.validation?.valid ? "Validated" : "Needs review"}</p>
              </div>
            </Card>
          </div>
        ) : null}

        <Button onClick={resetState}>Submit another report</Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <div className="space-y-4 xl:col-span-3">
        <Card className="p-6">
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => event.key === "Enter" && inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              handleFiles(event.dataTransfer.files);
            }}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition",
              dragActive
                ? "border-sky-400 bg-sky-50/70 dark:border-sky-500/60 dark:bg-sky-500/10"
                : "border-slate-300 bg-white/60 dark:border-slate-700/60 dark:bg-slate-900/50",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFiles(event.target.files)}
            />
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-white text-sky-600 shadow dark:bg-slate-900 dark:text-sky-300">
              <UploadCloud className="size-5" />
            </div>
            <p className="text-sm font-semibold">{dragActive ? "Drop to upload" : "Drag & drop pollution evidence"}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WEBP up to 10MB</p>
          </div>

          {file ? (
            <div className="mt-4 space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.preview} alt="Selected pollution evidence preview" className="h-52 w-full rounded-xl object-cover" />
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{submitReport.isPending ? `Uploading ${file.value.name}` : "Ready to upload"}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            </div>
          ) : null}
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">Incident details</h3>
          <div className="space-y-3">
            <Input placeholder="Title: Dense smoke from waste site" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Input placeholder="Address or landmark" value={location} onChange={(event) => setLocation(event.target.value)} />
            <Input placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
            <div className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900/50 dark:text-slate-300">
              <MapPin className="size-4 text-sky-500" />
              GPS captured · {lat.toFixed(4)}, {lng.toFixed(4)}
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4 xl:col-span-2">
        <Card className="p-6">
          <h3 className="mb-3 text-sm font-semibold">Pollution category</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition",
                  category === item.id
                    ? "border-sky-400/60 bg-sky-500/10 text-sky-700 dark:text-sky-200"
                    : "border-white/60 bg-white/60 text-slate-600 hover:border-slate-300 dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
          </div>

          <h3 className="mb-3 mt-5 text-sm font-semibold">Severity estimate</h3>
          <input
            type="range"
            min={1}
            max={5}
            value={severity}
            onChange={(event) => setSeverity(Number(event.target.value))}
            className="w-full accent-sky-500"
            aria-label="Severity estimate"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            {severityLabels.map((label) => (
              <span key={label} className={cn(label === severityLabels[severity - 1] && "font-semibold text-sky-600 dark:text-sky-300")}>
                {label}
              </span>
            ))}
          </div>
        </Card>

        <Button className="w-full" size="lg" disabled={!file || submitReport.isPending} onClick={submit}>
          {submitReport.isPending ? "Analyzing evidence…" : "Analyze & publish report"}
        </Button>
      </div>
    </div>
  );
}
