import { cookies } from "next/headers";
import { authSessionSchema } from "@/server/validators/auth";
import { authService } from "@/server/services/auth-service";
import { badRequest } from "@/server/security/http";
import { enforceRequestRateLimit } from "@/lib/api/guard";

export async function POST(request: Request) {
  const limited = enforceRequestRateLimit(request, 50, 60_000);
  if (limited) return limited;

  try {
    const json = await request.json();
    const parsed = authSessionSchema.parse(json);

    const { user } = await authService.ensureUserFromToken(parsed.idToken);

    const cookieStore = await cookies();
    cookieStore.set("aw_session", parsed.idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("aw_role", user.role, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ user });
  } catch (error) {
    return badRequest(error);
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("aw_session");
  cookieStore.delete("aw_role");
  return Response.json({ ok: true });
}
