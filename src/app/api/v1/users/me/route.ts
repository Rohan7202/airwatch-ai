import { firestoreRepository } from "@/server/repositories";
import { badRequest } from "@/server/security/http";
import { profilePatchSchema } from "@/server/validators/profile";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request, 120);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const user = await firestoreRepository.getUserByUid(sessionUser.uid);
  return Response.json({ user });
}

export async function PATCH(request: Request) {
  const limited = enforceRequestRateLimit(request, 100);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const payload = profilePatchSchema.parse(await request.json());
    const user = await firestoreRepository.patchUser(sessionUser.uid, payload);
    return Response.json({ user });
  } catch (error) {
    return badRequest(error);
  }
}
