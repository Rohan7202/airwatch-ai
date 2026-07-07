import type { NextRequest } from "next/server";
import type { UserRole } from "@/types/domain";
import { getSessionUserFromRequest } from "@/lib/auth";
import { hasRequiredRole } from "@/lib/rbac";
import { enforceRateLimit } from "@/server/security/rate-limit";
import { forbidden, unauthorized } from "@/server/security/http";

export async function requireSession(request: Request | NextRequest) {
  const sessionUser = await getSessionUserFromRequest(request);
  if (!sessionUser) {
    return { error: unauthorized(), sessionUser: null };
  }
  return { error: null, sessionUser };
}

export function requireRole(role: UserRole, requiredRole: UserRole) {
  if (!hasRequiredRole(role, requiredRole)) {
    return forbidden("Insufficient permissions");
  }
  return null;
}

export function enforceRequestRateLimit(request: Request | NextRequest, limit = 120, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const key = `${request.method}:${new URL(request.url).pathname}:${ip}`;
  const result = enforceRateLimit(key, limit, windowMs);
  if (!result.allowed) {
    return Response.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((result.retryAfterMs ?? 0) / 1000).toString(),
        },
      },
    );
  }
  return null;
}
