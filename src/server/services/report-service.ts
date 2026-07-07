import { adminStorage } from "@/lib/firebase/admin";
import { firestoreRepository } from "@/server/repositories/firestore-repository";
import { aiWorkflowService } from "@/server/services/ai-workflow-service";
import type { SessionUser } from "@/lib/auth";

function isValidFileType(type: string) {
  return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(type);
}

export const reportService = {
  async createWithUpload(params: {
    sessionUser: SessionUser;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    category: "traffic" | "industrial" | "construction" | "waste" | "dust";
    severity: "low" | "moderate" | "high" | "critical";
    file: File;
  }) {
    const { file } = params;

    if (!isValidFileType(file.type)) {
      throw new Error("Only JPG, PNG, and WEBP images are allowed.");
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("Image must be 10MB or smaller.");
    }

    const bucket = adminStorage.bucket();
    const extension = file.name.split(".").pop() || "jpg";
    const storagePath = `reports/${params.sessionUser.uid}/${Date.now()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const storageFile = bucket.file(storagePath);
    await storageFile.save(buffer, {
      metadata: {
        contentType: file.type,
      },
      resumable: false,
    });

    const [imageUrl] = await storageFile.getSignedUrl({
      action: "read",
      expires: "2100-01-01",
    });

    const report = await firestoreRepository.createReport({
      title: params.title,
      description: params.description,
      latitude: params.latitude,
      longitude: params.longitude,
      address: params.address,
      category: params.category,
      severity: params.severity,
      imageUrl,
      storagePath,
      reporterId: params.sessionUser.uid,
      reporterName: params.sessionUser.email ?? "Citizen",
      status: "submitted",
    });

    const pipeline = await aiWorkflowService.processReport(report);
    return pipeline.report ?? report;
  },

  async deleteReport(sessionUser: SessionUser, reportId: string) {
    const report = await firestoreRepository.getReportById(reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    const isOwner = report.reporterId === sessionUser.uid;
    if (!isOwner && sessionUser.role === "citizen") {
      throw new Error("Not allowed to delete this report");
    }

    if (report.storagePath) {
      await adminStorage.bucket().file(report.storagePath).delete({ ignoreNotFound: true });
    }

    await firestoreRepository.deleteReport(reportId);
  },
};
