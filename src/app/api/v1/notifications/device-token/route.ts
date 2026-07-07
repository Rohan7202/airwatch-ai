import { z } from "zod";
import { firestoreRepository } from "@/server/repositories";
import { badRequest } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

const schema = z.object({ token: z.string().min(10) });

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 40);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const payload = schema.parse(await request.json());
    const user = await firestoreRepository.getUserByUid(sessionUser.uid);
    const currentTokens = user?.fcmTokens ?? [];

    const nextTokens = Array.from(new Set([...currentTokens, payload.token]));
    await firestoreRepository.patchUser(sessionUser.uid, { fcmTokens: nextTokens });

    return Response.json({ ok: true });
  } catch (error) {
    return badRequest(error);
  }
}
