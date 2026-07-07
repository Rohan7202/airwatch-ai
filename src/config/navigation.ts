import type { UserRole } from "@/types/domain";

export interface NavItem {
  title: string;
  href: string;
  roles: UserRole[];
}

export const primaryNavigation: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Map", href: "/map", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Upload", href: "/upload", roles: ["citizen", "administrator"] },
  { title: "Analytics", href: "/analytics", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Notifications", href: "/notifications", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Settings", href: "/settings", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Profile", href: "/profile", roles: ["citizen", "municipal_officer", "administrator"] },
  { title: "Municipal Dashboard", href: "/municipal-dashboard", roles: ["municipal_officer", "administrator"] },
  { title: "Admin", href: "/admin", roles: ["administrator"] },
];
