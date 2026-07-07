import crypto from "node:crypto";
import { adminStorage } from "@/lib/firebase/admin";
import { analyzePollutionImageWithGemini } from "@/lib/google/gemini";
import { runAdkWorkflow } from "@/lib/google/adk";
import { firestoreRepository } from "@/server/repositories/firestore-repository";
import type { ReportDoc } from "@/types/firestore";

function severityToTaskPriority(severity: ReportDoc["severity"]) {
  return severity;
}

export const aiWorkflowService = {
  async processReport(report: ReportDoc) {
    const storageFile = adminStorage.bucket().file(report.storagePath);
    const [buffer] = await storageFile.download();

    const mimeType = report.imageUrl.includes(".png")
      ? "image/png"
      : report.imageUrl.includes(".webp")
        ? "image/webp"
        : "image/jpeg";

    const gemini = await analyzePollutionImageWithGemini({
      imageBytes: buffer,
      mimeType,
      reportContext: {
        title: report.title,
        description: report.description,
        category: report.category,
        severity: report.severity,
      },
    });

    const nearbyReports = await firestoreRepository.listReportsNearLocation(report.latitude, report.longitude, 80);
    const sensors = await firestoreRepository.listSensors(80);
    const avgPm25 = sensors.length ? sensors.reduce((sum, sensor) => sum + (sensor.pm25 ?? 0), 0) / sensors.length : 25;

    const workflow = await runAdkWorkflow({
      report,
      gemini,
      nearbyReports,
      averagePm25: avgPm25,
      weatherFactor: 6,
    });

    const hotspotId = crypto
      .createHash("sha1")
      .update(`${workflow.hotspot.latitude.toFixed(4)}:${workflow.hotspot.longitude.toFixed(4)}`)
      .digest("hex")
      .slice(0, 16);

    const hotspot = await firestoreRepository.upsertHotspot(hotspotId, workflow.hotspot);

    const prediction = await firestoreRepository.createPrediction({
      ...workflow.prediction,
      hotspotId: hotspot.id,
    });

    await firestoreRepository.patchReport(report.id, {
      geminiAnalysis: gemini,
      validation: workflow.reportValidation,
      hotspotId: hotspot.id,
      predictedAqi24h: prediction.predictedAqi,
      municipalRecommendation: workflow.municipalRecommendation,
      status: workflow.reportValidation.valid ? "validated" : "submitted",
      severity: gemini.severity,
    });

    await firestoreRepository.createMunicipalTask({
      title: `Investigate ${hotspot.title}`,
      description: workflow.municipalRecommendation,
      hotspotId: hotspot.id,
      status: "pending",
      priority: severityToTaskPriority(gemini.severity),
      dueAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    });

    const municipalUsers = await firestoreRepository.listUsersByRole("municipal_officer", 50);
    const adminUsers = await firestoreRepository.listUsersByRole("administrator", 20);

    const recipients = new Set<string>([report.reporterId, ...municipalUsers.map((u) => u.id), ...adminUsers.map((u) => u.id)]);

    for (const userId of recipients) {
      for (const alert of workflow.alerts) {
        await firestoreRepository.createNotification({
          userId,
          title: alert.title,
          message: alert.message,
          severity: alert.severity,
          read: false,
        });
      }
    }

    const patched = await firestoreRepository.getReportById(report.id);

    return {
      report: patched,
      hotspot,
      prediction,
      workflow,
    };
  },
};
