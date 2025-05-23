import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  date,
  time,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Birth charts table
export const birthCharts = pgTable("birth_charts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  fullName: varchar("full_name").notNull(),
  birthDate: date("birth_date").notNull(),
  birthTime: time("birth_time"),
  isTimeUnknown: boolean("is_time_unknown").default(false),
  birthLocation: varchar("birth_location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  timezone: varchar("timezone"),
  gender: varchar("gender"),
  chartSystem: varchar("chart_system").default("vedic"),
  houseSystem: varchar("house_system").default("whole_sign"),
  // Calculated astrological data
  sunSign: varchar("sun_sign"),
  moonSign: varchar("moon_sign"),
  ascendant: varchar("ascendant"),
  nakshatra: varchar("nakshatra"),
  pada: integer("pada"),
  currentMahadasha: varchar("current_mahadasha"),
  planetaryPositions: jsonb("planetary_positions"),
  housePositions: jsonb("house_positions"),
  aspectData: jsonb("aspect_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Predictions table
export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  chartId: integer("chart_id").references(() => birthCharts.id),
  category: varchar("category").notNull(), // career, love, finance, health, education, family
  predictionType: varchar("prediction_type").notNull(), // daily, weekly, monthly
  validFrom: date("valid_from").notNull(),
  validTo: date("valid_to").notNull(),
  content: text("content").notNull(),
  intensity: varchar("intensity"), // favorable, mixed, caution, excellent
  confidence: integer("confidence"), // 0-100
  luckyNumber: integer("lucky_number"),
  luckyColor: varchar("lucky_color"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Compatibility analyses table
export const compatibilityAnalyses = pgTable("compatibility_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  person1ChartId: integer("person1_chart_id").references(() => birthCharts.id),
  person2ChartId: integer("person2_chart_id").references(() => birthCharts.id),
  overallScore: integer("overall_score"), // 0-100
  emotionalScore: integer("emotional_score"),
  communicationScore: integer("communication_score"),
  spiritualScore: integer("spiritual_score"),
  analysis: text("analysis"),
  keyInsights: jsonb("key_insights"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  plan: varchar("plan").notNull(), // basic, premium, professional
  status: varchar("status").notNull(), // active, inactive, cancelled
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transit events table
export const transitEvents = pgTable("transit_events", {
  id: serial("id").primaryKey(),
  planet: varchar("planet").notNull(),
  fromSign: varchar("from_sign"),
  toSign: varchar("to_sign").notNull(),
  eventDate: date("event_date").notNull(),
  description: text("description"),
  impact: varchar("impact"), // high, medium, low
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertBirthChartSchema = createInsertSchema(birthCharts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  createdAt: true,
});

export const insertCompatibilityAnalysisSchema = createInsertSchema(compatibilityAnalyses).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type BirthChart = typeof birthCharts.$inferSelect;
export type InsertBirthChart = z.infer<typeof insertBirthChartSchema>;
export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type CompatibilityAnalysis = typeof compatibilityAnalyses.$inferSelect;
export type InsertCompatibilityAnalysis = z.infer<typeof insertCompatibilityAnalysisSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type TransitEvent = typeof transitEvents.$inferSelect;
