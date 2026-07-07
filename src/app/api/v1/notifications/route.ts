import { firestoreRepository } from "@/server/repositories";
import { notificationService } from "@/server/services";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";
import { badRequest } from "@/server/security/http";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request, 180);
  if (limited) return limited;

  const { error, sessionUser } = await requireSession(request);
  if (error || !sessionUser) return error;

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "50");

  const data = await notificationService.listForUser(sessionUser.uid, Math.min(Math.max(limit, 1), 200));
  return Response.json(data);
}

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 100);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const body = (await request.json()) as {
      title: string;
      message: string;
      severity: "High" | "Moderate" | "Low";
    };

    const notification = await firestoreRepository.createNotification({
      userId: sessionUser.uid,
      title: body.title,
      message: body.message,
      severity: body.severity,
      read: false,
    });

    return Response.json({ notification }, { status: 201 });
  } catch (error) {
    return badRequest(error);
  }
}
