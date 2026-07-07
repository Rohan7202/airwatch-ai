import type { AppTheme, UserRole } from "@/types/domain";

export type FirestoreTimestamp = string;

export interface UserDoc {
  id: string;
  firebaseUid: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  locale: string;
  language: string;
  theme: AppTheme;
  notificationPreferences: {
    critical: boolean;
    tasks: boolean;
    digest: boolean;
  };
  emailVerified: boolean;
  fcmTokens?: string[];
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface GeminiAnalysis {
  pollutionType: "smoke" | "dust" | "garbage_burning" | "industrial_emissions" | "construction_dust" | "fire" | "unknown";
  confidence: number;
  severity: "low" | "moderate" | "high" | "critical";
  explanation: string;
  suggestedMunicipalAction: string;
}

export interface ReportDoc {
  id: string;
  reporterId: string;
  reporterName: string;
  imageUrl: string;
  storagePath: string;
  latitude: number;
  longitude: number;
  address: string;
  category: "traffic" | "industrial" | "construction" | "waste" | "dust";
  severity: "low" | "moderate" | "high" | "critical";
  description: string;
  title: string;
  status: "submitted" | "validated" | "resolved";
  geminiAnalysis?: GeminiAnalysis;
  validation?: {
    valid: boolean;
    reason: string;
  };
  hotspotId?: string;
  predictedAqi24h?: number;
  municipalRecommendation?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface HotspotDoc {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  riskScore: number;
  latestAqi: number;
  status: "active" | "monitoring" | "mitigated";
  sourceReportIds: string[];
  recommendedAction?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface PredictionDoc {
  id: string;
  hotspotId?: string;
  predictedAqi: number;
  confidence: number;
  windowHours: number;
  modelVersion: string;
  explanation?: string;
  createdAt: FirestoreTimestamp;
}

export interface NotificationDoc {
  id: string;
  userId: string;
  title: string;
  message: string;
  severity: "High" | "Moderate" | "Low";
  read: boolean;
  createdAt: FirestoreTimestamp;
}

export interface MunicipalTaskDoc {
  id: string;
  title: string;
  description: string;
  assignedToUserId?: string;
  hotspotId?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "moderate" | "high" | "critical";
  dueAt?: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface SensorDoc {
  id: string;
  sensorCode: string;
  latitude: number;
  longitude: number;
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
  online: boolean;
  lastSeenAt?: FirestoreTimestamp;
}

export interface SystemSettingsDoc {
  id: string;
  key: string;
  value: unknown;
  updatedAt: FirestoreTimestamp;
}
