import { firestoreRepository } from "@/server/repositories";
import { reportService } from "@/server/services";
import { reportCreateSchema } from "@/server/validators/report";
import { badRequest } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request, 120);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "100");

  const items = await firestoreRepository.listReports(Math.min(Math.max(limit, 1), 200));
  return Response.json({ items });
}

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 40);
  if (limited) return limited;

  try {
    const { error, sessionUser } = await requireSession(request);
    if (error || !sessionUser) return error;

    const formData = await request.formData();
    const file = formData.get("image");
    if (!(file instanceof File)) {
      return Response.json({ error: "Image file is required." }, { status: 400 });
    }

    const parsed = reportCreateSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      address: formData.get("address"),
      category: formData.get("category"),
      severity: formData.get("severity"),
    });

    const report = await reportService.createWithUpload({
      sessionUser,
      file,
      ...parsed,
    });

    return Response.json({ report }, { status: 201 });
  } catch (error) {
    return badRequest(error);
  }
}
