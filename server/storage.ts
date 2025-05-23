import {
  users,
  birthCharts,
  predictions,
  compatibilityAnalyses,
  subscriptions,
  transitEvents,
  type User,
  type UpsertUser,
  type BirthChart,
  type InsertBirthChart,
  type Prediction,
  type InsertPrediction,
  type CompatibilityAnalysis,
  type InsertCompatibilityAnalysis,
  type Subscription,
  type InsertSubscription,
  type TransitEvent,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Birth chart operations
  createBirthChart(chart: InsertBirthChart): Promise<BirthChart>;
  getBirthChart(id: number): Promise<BirthChart | undefined>;
  getUserBirthCharts(userId: string): Promise<BirthChart[]>;
  updateBirthChart(id: number, updates: Partial<InsertBirthChart>): Promise<BirthChart | undefined>;
  
  // Prediction operations
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getUserPredictions(userId: string, type?: string, category?: string): Promise<Prediction[]>;
  getActivePredictions(userId: string, date: Date): Promise<Prediction[]>;
  
  // Compatibility operations
  createCompatibilityAnalysis(analysis: InsertCompatibilityAnalysis): Promise<CompatibilityAnalysis>;
  getCompatibilityAnalysis(id: number): Promise<CompatibilityAnalysis | undefined>;
  getUserCompatibilityAnalyses(userId: string): Promise<CompatibilityAnalysis[]>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getUserSubscription(userId: string): Promise<Subscription | undefined>;
  updateSubscription(userId: string, updates: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  
  // Transit operations
  getUpcomingTransits(limit?: number): Promise<TransitEvent[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Birth chart operations
  async createBirthChart(chart: InsertBirthChart): Promise<BirthChart> {
    const [createdChart] = await db
      .insert(birthCharts)
      .values(chart)
      .returning();
    return createdChart;
  }

  async getBirthChart(id: number): Promise<BirthChart | undefined> {
    const [chart] = await db
      .select()
      .from(birthCharts)
      .where(eq(birthCharts.id, id));
    return chart;
  }

  async getUserBirthCharts(userId: string): Promise<BirthChart[]> {
    return await db
      .select()
      .from(birthCharts)
      .where(eq(birthCharts.userId, userId))
      .orderBy(desc(birthCharts.createdAt));
  }

  async updateBirthChart(id: number, updates: Partial<InsertBirthChart>): Promise<BirthChart | undefined> {
    const [updatedChart] = await db
      .update(birthCharts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(birthCharts.id, id))
      .returning();
    return updatedChart;
  }

  // Prediction operations
  async createPrediction(prediction: InsertPrediction): Promise<Prediction> {
    const [createdPrediction] = await db
      .insert(predictions)
      .values(prediction)
      .returning();
    return createdPrediction;
  }

  async getUserPredictions(userId: string, type?: string, category?: string): Promise<Prediction[]> {
    let query = db
      .select()
      .from(predictions)
      .where(eq(predictions.userId, userId));

    if (type) {
      query = query.where(and(eq(predictions.userId, userId), eq(predictions.predictionType, type)));
    }

    if (category) {
      query = query.where(and(eq(predictions.userId, userId), eq(predictions.category, category)));
    }

    return await query.orderBy(desc(predictions.validFrom));
  }

  async getActivePredictions(userId: string, date: Date): Promise<Prediction[]> {
    return await db
      .select()
      .from(predictions)
      .where(
        and(
          eq(predictions.userId, userId),
          lte(predictions.validFrom, date),
          gte(predictions.validTo, date)
        )
      )
      .orderBy(desc(predictions.createdAt));
  }

  // Compatibility operations
  async createCompatibilityAnalysis(analysis: InsertCompatibilityAnalysis): Promise<CompatibilityAnalysis> {
    const [createdAnalysis] = await db
      .insert(compatibilityAnalyses)
      .values(analysis)
      .returning();
    return createdAnalysis;
  }

  async getCompatibilityAnalysis(id: number): Promise<CompatibilityAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(compatibilityAnalyses)
      .where(eq(compatibilityAnalyses.id, id));
    return analysis;
  }

  async getUserCompatibilityAnalyses(userId: string): Promise<CompatibilityAnalysis[]> {
    return await db
      .select()
      .from(compatibilityAnalyses)
      .where(eq(compatibilityAnalyses.userId, userId))
      .orderBy(desc(compatibilityAnalyses.createdAt));
  }

  // Subscription operations
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [createdSubscription] = await db
      .insert(subscriptions)
      .values(subscription)
      .returning();
    return createdSubscription;
  }

  async getUserSubscription(userId: string): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
    return subscription;
  }

  async updateSubscription(userId: string, updates: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [updatedSubscription] = await db
      .update(subscriptions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId))
      .returning();
    return updatedSubscription;
  }

  // Transit operations
  async getUpcomingTransits(limit: number = 10): Promise<TransitEvent[]> {
    const today = new Date();
    return await db
      .select()
      .from(transitEvents)
      .where(gte(transitEvents.eventDate, today))
      .orderBy(transitEvents.eventDate)
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
