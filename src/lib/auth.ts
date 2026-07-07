import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import type { UserRole } from "@/types/domain";
import { adminAuth } from "@/lib/firebase/admin";

export interface SessionUser {
  uid: string;
  email?: string;
  role: UserRole;
}

export async function verifySessionToken(token: string) {
  try {
    return await adminAuth.verifyIdToken(token, true);
  } catch (err) {
    console.error("VERIFY TOKEN FAILED:", err);
    throw err;
  }
}

export async function getSessionUserFromRequest(request: Request | NextRequest): Promise<SessionUser | null> {
  const cookieStore = request.headers.get("cookie");
  if (!cookieStore) return null;

  const sessionMatch = cookieStore.match(/(?:^|; )aw_session=([^;]+)/);
  const roleMatch = cookieStore.match(/(?:^|; )aw_role=([^;]+)/);
  const session = sessionMatch?.[1] ? decodeURIComponent(sessionMatch[1]) : null;

  if (!session) return null;

  try {
    const decoded = await verifySessionToken(session);
    const role = (roleMatch?.[1] as UserRole | undefined) ?? "citizen";
    return { uid: decoded.uid, email: decoded.email, role };
  } catch {
    return null;
  }
}

export async function getServerSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("aw_session")?.value;
  const role = (cookieStore.get("aw_role")?.value as UserRole | undefined) ?? "citizen";

  if (!session) return null;

  try {
    const decoded = await verifySessionToken(session);
    return { uid: decoded.uid, email: decoded.email, role };
  } catch {
    return null;
  }
}
