import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["citizen", "municipal_officer", "administrator"]);
export const reportStatusEnum = pgEnum("report_status", ["submitted", "validated", "resolved"]);
export const severityEnum = pgEnum("severity", ["low", "moderate", "high", "critical"]);
export const hotspotStatusEnum = pgEnum("hotspot_status", ["active", "monitoring", "mitigated"]);
export const taskStatusEnum = pgEnum("task_status", ["pending", "in_progress", "completed", "cancelled"]);
export const notificationChannelEnum = pgEnum("notification_channel", ["in_app", "fcm", "email"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firebaseUid: varchar("firebase_uid", { length: 128 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    role: userRoleEnum("role").notNull().default("citizen"),
    locale: varchar("locale", { length: 12 }).notNull().default("en"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("users_email_idx").on(table.email)],
);

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    status: reportStatusEnum("status").notNull().default("submitted"),
    severity: severityEnum("severity").notNull().default("moderate"),
    sourceMetadata: jsonb("source_metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("reports_user_id_idx").on(table.userId)],
);

export const hotspots = pgTable(
  "hotspots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 180 }).notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    riskScore: real("risk_score").notNull().default(0),
    status: hotspotStatusEnum("status").notNull().default("active"),
    latestAqi: integer("latest_aqi"),
    geojson: jsonb("geojson"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("hotspots_status_idx").on(table.status)],
);

export const sensors = pgTable(
  "sensors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sensorCode: varchar("sensor_code", { length: 64 }).notNull().unique(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    latestPm25: real("latest_pm25"),
    latestPm10: real("latest_pm10"),
    latestNo2: real("latest_no2"),
    latestO3: real("latest_o3"),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("sensors_sensor_code_idx").on(table.sensorCode)],
);

export const predictions = pgTable(
  "predictions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotspotId: uuid("hotspot_id").references(() => hotspots.id, { onDelete: "set null" }),
    predictedAqi: integer("predicted_aqi").notNull(),
    confidence: real("confidence").notNull().default(0),
    forecastWindowHours: integer("forecast_window_hours").notNull().default(24),
    modelVersion: varchar("model_version", { length: 64 }).notNull().default("v1"),
    features: jsonb("features"),
    generatedAt: timestamp("generated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("predictions_hotspot_id_idx").on(table.hotspotId)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    body: text("body").notNull(),
    channel: notificationChannelEnum("channel").notNull().default("in_app"),
    isRead: boolean("is_read").notNull().default(false),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("notifications_user_id_idx").on(table.userId)],
);

export const municipalTasks = pgTable(
  "municipal_tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotspotId: uuid("hotspot_id").references(() => hotspots.id, { onDelete: "set null" }),
    assignedToUserId: uuid("assigned_to_user_id").references(() => users.id, { onDelete: "set null" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    status: taskStatusEnum("status").notNull().default("pending"),
    priority: severityEnum("priority").notNull().default("moderate"),
    dueAt: timestamp("due_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("municipal_tasks_hotspot_id_idx").on(table.hotspotId)],
);

export const settings = pgTable(
  "settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    theme: varchar("theme", { length: 16 }).notNull().default("system"),
    language: varchar("language", { length: 12 }).notNull().default("en"),
    notificationsEnabled: boolean("notifications_enabled").notNull().default(true),
    preferences: jsonb("preferences"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("settings_user_id_idx").on(table.userId)],
);

export const languages = pgTable(
  "languages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 12 }).notNull().unique(),
    name: varchar("name", { length: 80 }).notNull(),
    nativeName: varchar("native_name", { length: 80 }).notNull(),
    isDefault: boolean("is_default").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("languages_code_idx").on(table.code)],
);
