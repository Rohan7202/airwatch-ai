import { firestoreRepository } from "@/server/repositories";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "100");

  const items = await firestoreRepository.listPredictions(Math.min(Math.max(limit, 1), 200));
  return Response.json({ items });
}
