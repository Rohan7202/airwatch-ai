import { z } from "zod";
import { geocodeAddress } from "@/lib/google/maps";
import { badRequest } from "@/server/security/http";
import { requireSession, enforceRequestRateLimit } from "@/lib/api/guard";

const schema = z.object({ query: z.string().min(2) });

export async function GET(request: Request) {
  const limited = enforceRequestRateLimit(request, 80);
  if (limited) return limited;

  const { error } = await requireSession(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = schema.parse({ query: searchParams.get("query") ?? "" });
    const result = await geocodeAddress({ address: parsed.query });
    return Response.json({ result });
  } catch (error) {
    return badRequest(error);
  }
}
