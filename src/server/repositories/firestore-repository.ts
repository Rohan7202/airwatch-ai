import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type {
  HotspotDoc,
  MunicipalTaskDoc,
  NotificationDoc,
  PredictionDoc,
  ReportDoc,
  SensorDoc,
  SystemSettingsDoc,
  UserDoc,
} from "@/types/firestore";
import type { UserRole } from "@/types/domain";

function nowIso() {
  return new Date().toISOString();
}

const COLLECTIONS = {
  users: "Users",
  reports: "Reports",
  hotspots: "Hotspots",
  predictions: "Predictions",
  notifications: "Notifications",
  municipalTasks: "MunicipalTasks",
  sensors: "Sensors",
  systemSettings: "SystemSettings",
};

export const firestoreRepository = {
  async getUserByUid(uid: string) {
    const doc = await adminDb.collection(COLLECTIONS.users).doc(uid).get();
    return doc.exists ? (doc.data() as UserDoc) : null;
  },

  async listUsersByRole(role: UserRole, limit = 100) {
    const snapshot = await adminDb.collection(COLLECTIONS.users).where("role", "==", role).limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as UserDoc);
  },

  async upsertUser(input: {
    uid: string;
    email: string;
    fullName: string;
    role?: UserRole;
    emailVerified?: boolean;
  }) {
    const existing = await this.getUserByUid(input.uid);
    const payload: UserDoc = {
      id: input.uid,
      firebaseUid: input.uid,
      email: input.email,
      fullName: input.fullName,
      role: input.role ?? existing?.role ?? "citizen",
      locale: existing?.locale ?? "en",
      language: existing?.language ?? "en",
      theme: existing?.theme ?? "system",
      avatarUrl: existing?.avatarUrl ?? null,
      notificationPreferences: existing?.notificationPreferences ?? { critical: true, tasks: true, digest: false },
      emailVerified: input.emailVerified ?? existing?.emailVerified ?? false,
      fcmTokens: existing?.fcmTokens ?? [],
      createdAt: existing?.createdAt ?? nowIso(),
      updatedAt: nowIso(),
    };

    await adminDb.collection(COLLECTIONS.users).doc(input.uid).set(payload, { merge: true });
    return payload;
  },

  async patchUser(
    uid: string,
    patch: Omit<Partial<UserDoc>, "notificationPreferences"> & {
      notificationPreferences?: Partial<UserDoc["notificationPreferences"]>;
    },
  ) {
    await adminDb.collection(COLLECTIONS.users).doc(uid).set({ ...patch, updatedAt: nowIso() }, { merge: true });
    return this.getUserByUid(uid);
  },

  async listUsers(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.users).limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as UserDoc);
  },

  async createReport(report: Omit<ReportDoc, "id" | "createdAt" | "updatedAt">) {
    const ref = adminDb.collection(COLLECTIONS.reports).doc();
    const payload: ReportDoc = {
      ...report,
      id: ref.id,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    await ref.set(payload);
    return payload;
  },

  async getReportById(id: string) {
    const doc = await adminDb.collection(COLLECTIONS.reports).doc(id).get();
    return doc.exists ? (doc.data() as ReportDoc) : null;
  },

  async listReports(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.reports).orderBy("createdAt", "desc").limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as ReportDoc);
  },

  async listReportsNearLocation(latitude: number, longitude: number, limit = 200) {
    const minLat = latitude - 0.03;
    const maxLat = latitude + 0.03;

    const snapshot = await adminDb
      .collection(COLLECTIONS.reports)
      .where("latitude", ">=", minLat)
      .where("latitude", "<=", maxLat)
      .limit(limit)
      .get();

    return snapshot.docs
      .map((doc) => doc.data() as ReportDoc)
      .filter((report) => Math.abs(report.longitude - longitude) <= 0.03);
  },

  async patchReport(id: string, patch: Partial<ReportDoc>) {
    await adminDb.collection(COLLECTIONS.reports).doc(id).set({ ...patch, updatedAt: nowIso() }, { merge: true });
    return this.getReportById(id);
  },

  async deleteReport(id: string) {
    await adminDb.collection(COLLECTIONS.reports).doc(id).delete();
  },

  async listHotspots(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.hotspots).orderBy("updatedAt", "desc").limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as HotspotDoc);
  },

  async getHotspotById(id: string) {
    const doc = await adminDb.collection(COLLECTIONS.hotspots).doc(id).get();
    return doc.exists ? (doc.data() as HotspotDoc) : null;
  },

  async upsertHotspot(id: string, data: Omit<HotspotDoc, "id" | "createdAt" | "updatedAt">) {
    const existing = await this.getHotspotById(id);
    const payload: HotspotDoc = {
      id,
      ...data,
      createdAt: existing?.createdAt ?? nowIso(),
      updatedAt: nowIso(),
    };
    await adminDb.collection(COLLECTIONS.hotspots).doc(id).set(payload, { merge: true });
    return payload;
  },

  async createPrediction(prediction: Omit<PredictionDoc, "id" | "createdAt">) {
    const ref = adminDb.collection(COLLECTIONS.predictions).doc();
    const payload: PredictionDoc = {
      ...prediction,
      id: ref.id,
      createdAt: nowIso(),
    };
    await ref.set(payload);
    return payload;
  },

  async listPredictions(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.predictions).orderBy("createdAt", "desc").limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as PredictionDoc);
  },

  async listNotifications(userId: string, limit = 50) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.notifications)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snapshot.docs.map((doc) => doc.data() as NotificationDoc);
  },

  async createNotification(notification: Omit<NotificationDoc, "id" | "createdAt">) {
    const ref = adminDb.collection(COLLECTIONS.notifications).doc();
    const payload: NotificationDoc = {
      ...notification,
      id: ref.id,
      createdAt: nowIso(),
    };
    await ref.set(payload);
    return payload;
  },

  async patchNotification(id: string, patch: Partial<NotificationDoc>) {
    await adminDb.collection(COLLECTIONS.notifications).doc(id).set(patch, { merge: true });
    const doc = await adminDb.collection(COLLECTIONS.notifications).doc(id).get();
    return doc.exists ? (doc.data() as NotificationDoc) : null;
  },

  async deleteNotification(id: string) {
    await adminDb.collection(COLLECTIONS.notifications).doc(id).delete();
  },

  async unreadNotificationCount(userId: string) {
    const snapshot = await adminDb
      .collection(COLLECTIONS.notifications)
      .where("userId", "==", userId)
      .where("read", "==", false)
      .count()
      .get();
    return snapshot.data().count;
  },

  async createMunicipalTask(task: Omit<MunicipalTaskDoc, "id" | "createdAt" | "updatedAt">) {
    const ref = adminDb.collection(COLLECTIONS.municipalTasks).doc();
    const payload: MunicipalTaskDoc = {
      ...task,
      id: ref.id,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    await ref.set(payload);
    return payload;
  },

  async listMunicipalTasks(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.municipalTasks).orderBy("updatedAt", "desc").limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as MunicipalTaskDoc);
  },

  async listSensors(limit = 50) {
    const snapshot = await adminDb.collection(COLLECTIONS.sensors).limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as SensorDoc);
  },

  async listSystemSettings() {
    const snapshot = await adminDb.collection(COLLECTIONS.systemSettings).get();
    return snapshot.docs.map((doc) => doc.data() as SystemSettingsDoc);
  },

  serverTimestamp: FieldValue.serverTimestamp,
};
