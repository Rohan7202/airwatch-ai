import { z } from "zod";
import { adminStorage } from "@/lib/firebase/admin";
import { analyzePollutionImageWithGemini } from "@/lib/google/gemini";
import { firestoreRepository } from "@/server/repositories";
import { badRequest, notFound } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

const schema = z.object({ reportId: z.string().min(1) });

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 50);
  if (limited) return limited;

  try {
    const { error } = await requireSession(request);
    if (error) return error;

    const parsed = schema.parse(await request.json());
    const report = await firestoreRepository.getReportById(parsed.reportId);
    if (!report) return notFound("Report not found");

    const storageFile = adminStorage.bucket().file(report.storagePath);
    const [buffer] = await storageFile.download();

    const analysis = await analyzePollutionImageWithGemini({
      imageBytes: buffer,
      mimeType: "image/jpeg",
      reportContext: {
        title: report.title,
        description: report.description,
        category: report.category,
        severity: report.severity,
      },
    });

    return Response.json({ analysis });
  } catch (error) {
    return badRequest(error);
  }
}
