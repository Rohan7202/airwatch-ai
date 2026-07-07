import type { UserRole } from "@/types/domain";

const roleRank: Record<UserRole, number> = {
  citizen: 1,
  municipal_officer: 2,
  administrator: 3,
};

export function hasRequiredRole(userRole: UserRole, minimumRole: UserRole) {
  return roleRank[userRole] >= roleRank[minimumRole];
}

export function canAccessRoute(pathname: string, role: UserRole) {
  if (pathname.startsWith("/admin")) return hasRequiredRole(role, "administrator");
  if (pathname.startsWith("/municipal-dashboard")) return hasRequiredRole(role, "municipal_officer");
  if (pathname.startsWith("/upload")) return role === "citizen" || role === "administrator";
  return true;
}
