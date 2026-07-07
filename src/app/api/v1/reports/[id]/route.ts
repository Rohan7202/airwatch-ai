import { firestoreRepository } from "@/server/repositories";
import { reportService } from "@/server/services";
import { badRequest, notFound } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const { id } = await params;
  const report = await firestoreRepository.getReportById(id);
  if (!report) return notFound("Report not found");

  return Response.json({ report });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request, 60);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  try {
    const { id } = await params;
    const payload = (await request.json()) as { status?: "submitted" | "validated" | "resolved"; title?: string; description?: string };

    const report = await firestoreRepository.getReportById(id);
    if (!report) return notFound("Report not found");

    if (sessionUser.role === "citizen" && report.reporterId !== sessionUser.uid) {
      return Response.json({ error: "Cannot update this report." }, { status: 403 });
    }

    const updated = await firestoreRepository.patchReport(id, payload);
    return Response.json({ report: updated });
  } catch (error) {
    return badRequest(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request, 40);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const { id } = await params;
    await reportService.deleteReport(sessionUser, id);
    return Response.json({ ok: true });
  } catch (error) {
    return badRequest(error);
  }
}
