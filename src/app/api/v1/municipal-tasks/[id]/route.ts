import { firestoreRepository } from "@/server/repositories";
import { notFound } from "@/server/security/http";
import { requireRole, requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const roleError = requireRole(sessionUser.role, "municipal_officer");
  if (roleError) return roleError;

  const { id } = await params;
  const items = await firestoreRepository.listMunicipalTasks(200);
  const task = items.find((item) => item.id === id);
  if (!task) return notFound("Task not found");
  return Response.json({ task });
}

export function PATCH() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}

export function DELETE() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}
