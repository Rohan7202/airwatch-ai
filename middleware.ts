import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canAccessRoute } from "@/lib/rbac";
import type { UserRole } from "@/types/domain";

const protectedPrefixes = [
  "/dashboard",
  "/map",
  "/upload",
  "/analytics",
  "/notifications",
  "/settings",
  "/profile",
  "/municipal-dashboard",
  "/admin",
];

function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  if (!payload) return null;

  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return JSON.parse(atob(padded)) as { exp?: number };
}

function isJwtExpired(token: string) {
  try {
    const decoded = decodeJwtPayload(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const sessionToken = request.cookies.get("aw_session")?.value;
  if (!sessionToken || isJwtExpired(sessionToken)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("aw_session");
    response.cookies.delete("aw_role");
    return response;
  }

  const role = (request.cookies.get("aw_role")?.value as UserRole | undefined) ?? "citizen";
  if (!canAccessRoute(pathname, role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/map/:path*",
    "/upload/:path*",
    "/analytics/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/municipal-dashboard/:path*",
    "/admin/:path*",
  ],
};
