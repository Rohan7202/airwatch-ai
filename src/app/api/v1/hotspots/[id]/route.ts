import { firestoreRepository } from "@/server/repositories";
import { notFound } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const { id } = await params;
  const items = await firestoreRepository.listHotspots(200);
  const hotspot = items.find((item) => item.id === id);
  if (!hotspot) return notFound("Hotspot not found");
  return Response.json({ hotspot });
}

export function PATCH() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}

export function DELETE() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}
