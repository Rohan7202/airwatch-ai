import { firestoreRepository } from "@/server/repositories";
import { badRequest } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit, requireRole } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const roleError = requireRole(sessionUser.role, "administrator");
  if (roleError) return roleError;

  const users = await firestoreRepository.listUsers(100);
  return Response.json({ items: users });
}

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 60);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const body = (await request.json()) as { fullName: string; email: string; role?: "citizen" | "municipal_officer" | "administrator" };

    const user = await firestoreRepository.upsertUser({
      uid: sessionUser.uid,
      fullName: body.fullName,
      email: body.email,
      role: body.role,
    });

    return Response.json({ user });
  } catch (error) {
    return badRequest(error);
  }
}
