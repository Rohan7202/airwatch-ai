import { firestoreRepository } from "@/server/repositories";
import { requireRole, requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  //const roleError = requireRole(sessionUser.role, "municipal_officer");
  //if (roleError) return roleError;
  
// Allow authenticated users to view tasks
// Remove role restriction for dashboard
  const items = await firestoreRepository.listMunicipalTasks(100);
  return Response.json({ items });
}

export function POST() {
  return Response.json({ error: "Not implemented in Phase 3" }, { status: 501 });
}
