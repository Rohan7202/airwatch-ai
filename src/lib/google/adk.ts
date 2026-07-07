import crypto from "node:crypto";
import type { GeminiAnalysis, HotspotDoc, PredictionDoc, ReportDoc } from "@/types/firestore";

export interface AdkWorkflowResult {
  reportValidation: { valid: boolean; reason: string };
  hotspot: Omit<HotspotDoc, "id" | "createdAt" | "updatedAt">;
  prediction: Omit<PredictionDoc, "id" | "createdAt">;
  municipalRecommendation: string;
  alerts: Array<{ title: string; message: string; severity: "High" | "Moderate" | "Low" }>;
}

function toRiskScore(analysis: GeminiAnalysis) {
  const severityScore = { low: 30, moderate: 55, high: 78, critical: 92 }[analysis.severity];
  return Math.round(severityScore * (0.65 + analysis.confidence * 0.35));
}

function predictAqi(analysis: GeminiAnalysis, sensorPm25: number, weatherFactor: number) {
  const base = { low: 45, moderate: 75, high: 110, critical: 160 }[analysis.severity];
  const confidenceAdj = Math.round((analysis.confidence - 0.5) * 24);
  return Math.max(20, Math.round(base + sensorPm25 * 0.35 + weatherFactor + confidenceAdj));
}

function severityToAlert(severity: GeminiAnalysis["severity"]): "High" | "Moderate" | "Low" {
  if (severity === "critical" || severity === "high") return "High";
  if (severity === "moderate") return "Moderate";
  return "Low";
}

export async function runAdkWorkflow(input: {
  report: ReportDoc;
  gemini: GeminiAnalysis;
  nearbyReports: ReportDoc[];
  averagePm25: number;
  weatherFactor?: number;
}): Promise<AdkWorkflowResult> {
  const remoteAdkEndpoint = process.env.GOOGLE_ADK_ENDPOINT;

  if (remoteAdkEndpoint) {
    try {
      const response = await fetch(remoteAdkEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (response.ok) {
        return (await response.json()) as AdkWorkflowResult;
      }
    } catch {
      // fallback to local orchestration below
    }
  }

  // 1) Report Analysis Agent
  const reportValidation = {
    valid: input.gemini.confidence >= 0.42,
    reason: input.gemini.confidence >= 0.42 ? "Gemini confidence passed threshold." : "Low confidence; requires manual review.",
  };

  // 2) Hotspot Detection Agent
  const neighborhoodReports = [...input.nearbyReports, input.report];
  const centroidLat = neighborhoodReports.reduce((sum, r) => sum + r.latitude, 0) / neighborhoodReports.length;
  const centroidLng = neighborhoodReports.reduce((sum, r) => sum + r.longitude, 0) / neighborhoodReports.length;

  const riskScore = toRiskScore(input.gemini);
  const latestAqi = predictAqi(input.gemini, input.averagePm25, input.weatherFactor ?? 0);

  const hotspot: Omit<HotspotDoc, "id" | "createdAt" | "updatedAt"> = {
    title: `${input.report.address} Cluster`,
    latitude: Number(centroidLat.toFixed(6)),
    longitude: Number(centroidLng.toFixed(6)),
    riskScore,
    latestAqi,
    status: riskScore >= 70 ? "active" : "monitoring",
    sourceReportIds: neighborhoodReports.map((r) => r.id),
    recommendedAction: input.gemini.suggestedMunicipalAction,
  };

  // 3) AQI Prediction Agent
  const prediction: Omit<PredictionDoc, "id" | "createdAt"> = {
    hotspotId: crypto.createHash("sha1").update(`${hotspot.latitude}:${hotspot.longitude}`).digest("hex").slice(0, 16),
    predictedAqi: latestAqi,
    confidence: Number(Math.max(0.5, Math.min(0.98, input.gemini.confidence + 0.08)).toFixed(2)),
    windowHours: 24,
    modelVersion: "adk-v1",
    explanation: `Forecast derived from ${neighborhoodReports.length} nearby reports, PM2.5 baseline, and Gemini severity signal.`,
  };

  // 4) Municipal Response Agent
  const municipalRecommendation =
    latestAqi >= 140
      ? "Deploy emergency inspection, dispatch water mist cannons, and issue immediate public advisory."
      : latestAqi >= 90
        ? "Dispatch cleanup crew and inspection unit within 2 hours; monitor spread with mobile sensors."
        : "Schedule routine inspection and continue monitoring through existing sensors.";

  // 5) Alert Agent
  const alerts = [
    {
      title: `Pollution alert: ${hotspot.title}`,
      message: `${input.gemini.explanation} Predicted AQI in 24h: ${prediction.predictedAqi}.`,
      severity: severityToAlert(input.gemini.severity),
    },
    {
      title: "Municipal action recommendation",
      message: municipalRecommendation,
      severity: severityToAlert(input.gemini.severity),
    },
  ];

  return {
    reportValidation,
    hotspot,
    prediction,
    municipalRecommendation,
    alerts,
  };
}
