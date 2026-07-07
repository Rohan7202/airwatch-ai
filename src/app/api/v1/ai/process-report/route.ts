import { z } from "zod";
import { firestoreRepository } from "@/server/repositories";
import { aiWorkflowService } from "@/server/services";
import { badRequest, notFound } from "@/server/security/http";
import { requireRole, requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

const schema = z.object({ reportId: z.string().min(1) });

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 40);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const roleError = requireRole(sessionUser.role, "municipal_officer");
    if (roleError) return roleError;

    const parsed = schema.parse(await request.json());
    const report = await firestoreRepository.getReportById(parsed.reportId);
    if (!report) return notFound("Report not found");

    const result = await aiWorkflowService.processReport(report);
    return Response.json(result);
  } catch (error) {
    return badRequest(error);
  }
}
