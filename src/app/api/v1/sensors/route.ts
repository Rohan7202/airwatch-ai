import { firestoreRepository } from "@/server/repositories";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const items = await firestoreRepository.listSensors(200);
  return Response.json({ items });
}
