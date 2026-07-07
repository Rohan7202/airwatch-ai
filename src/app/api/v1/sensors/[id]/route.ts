import { firestoreRepository } from "@/server/repositories";
import { notFound } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const { id } = await params;
  const items = await firestoreRepository.listSensors(200);
  const sensor = items.find((item) => item.id === id);
  if (!sensor) return notFound("Sensor not found");
  return Response.json({ sensor });
}

export function PATCH() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}

export function DELETE() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}
