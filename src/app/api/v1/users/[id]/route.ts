import { firestoreRepository } from "@/server/repositories";
import { profilePatchSchema } from "@/server/validators/profile";
import { badRequest, notFound } from "@/server/security/http";
import { requireRole, requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const { id } = await params;
  if (id !== sessionUser.uid) {
    const roleError = requireRole(sessionUser.role, "administrator");
    if (roleError) return roleError;
  }

  const user = await firestoreRepository.getUserByUid(id);
  if (!user) return notFound("User not found");
  return Response.json({ user });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request, 90);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const { id } = await params;
    if (id !== sessionUser.uid) {
      const roleError = requireRole(sessionUser.role, "administrator");
      if (roleError) return roleError;
    }

    const patch = profilePatchSchema.parse(await request.json());
    const user = await firestoreRepository.patchUser(id, patch);
    return Response.json({ user });
  } catch (error) {
    return badRequest(error);
  }
}

export async function DELETE(request: Request) {
  const limited = enforceRequestRateLimit(request, 20);
  if (limited) return limited;
  return Response.json({ error: "User deletion is disabled in Phase 3." }, { status: 405 });
}
