export type UserRole = "citizen" | "municipal_officer" | "administrator";

export type AppTheme = "light" | "dark" | "system";

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Report {
  id: string;
  userId: string;
  title: string;
  description: string;
  mediaUrl?: string;
  location: GeoPoint;
  status: "submitted" | "validated" | "resolved";
  severity: "low" | "moderate" | "high" | "critical";
  createdAt: string;
}
