import { firestoreRepository } from "@/server/repositories";
import { badRequest, notFound } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const { id } = await params;
  const items = await firestoreRepository.listNotifications(sessionUser.uid, 200);
  const notification = items.find((item) => item.id === id);
  if (!notification) return notFound("Notification not found");

  return Response.json({ notification });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request, 140);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const { id } = await params;
    const payload = (await request.json()) as { read?: boolean };

    const items = await firestoreRepository.listNotifications(sessionUser.uid, 200);
    const notification = items.find((item) => item.id === id);
    if (!notification) return notFound("Notification not found");

    const updated = await firestoreRepository.patchNotification(id, { read: payload.read ?? true });
    return Response.json({ notification: updated });
  } catch (error) {
    return badRequest(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = enforceRequestRateLimit(request, 120);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const { id } = await params;
  const items = await firestoreRepository.listNotifications(sessionUser.uid, 200);
  const notification = items.find((item) => item.id === id);
  if (!notification) return notFound("Notification not found");

  await firestoreRepository.deleteNotification(id);
  return Response.json({ ok: true });
}
