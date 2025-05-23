import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBirthChartSchema, insertCompatibilityAnalysisSchema, insertSubscriptionSchema } from "@shared/schema";
import { generateAstrologyPredictions, calculateCompatibility, calculateAstrologyData } from "../client/src/lib/astrologyCalculations";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Birth chart routes
  app.post('/api/birth-charts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const chartData = insertBirthChartSchema.parse({ ...req.body, userId });
      
      // Calculate astrological data
      const astrologyData = await calculateAstrologyData(chartData);
      const chartWithCalculations = { ...chartData, ...astrologyData };
      
      const chart = await storage.createBirthChart(chartWithCalculations);
      
      // Generate initial predictions
      await generateAstrologyPredictions(userId, chart.id);
      
      res.json(chart);
    } catch (error) {
      console.error("Error creating birth chart:", error);
      res.status(400).json({ message: "Failed to create birth chart" });
    }
  });

  app.get('/api/birth-charts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const charts = await storage.getUserBirthCharts(userId);
      res.json(charts);
    } catch (error) {
      console.error("Error fetching birth charts:", error);
      res.status(500).json({ message: "Failed to fetch birth charts" });
    }
  });

  app.get('/api/birth-charts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const chartId = parseInt(req.params.id);
      const chart = await storage.getBirthChart(chartId);
      
      if (!chart) {
        return res.status(404).json({ message: "Birth chart not found" });
      }
      
      // Check if user owns this chart
      if (chart.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(chart);
    } catch (error) {
      console.error("Error fetching birth chart:", error);
      res.status(500).json({ message: "Failed to fetch birth chart" });
    }
  });

  // Prediction routes
  app.get('/api/predictions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { type, category } = req.query;
      
      const predictions = await storage.getUserPredictions(
        userId, 
        type as string, 
        category as string
      );
      
      res.json(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  app.get('/api/predictions/active', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = new Date();
      
      const predictions = await storage.getActivePredictions(userId, today);
      res.json(predictions);
    } catch (error) {
      console.error("Error fetching active predictions:", error);
      res.status(500).json({ message: "Failed to fetch active predictions" });
    }
  });

  // Compatibility routes
  app.post('/api/compatibility', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { person1Data, person2Data } = req.body;
      
      // Create birth charts for both people
      const person1Chart = await storage.createBirthChart({
        ...person1Data,
        userId,
      });
      
      const person2Chart = await storage.createBirthChart({
        ...person2Data,
        userId,
      });
      
      // Calculate compatibility
      const compatibilityData = await calculateCompatibility(person1Chart, person2Chart);
      
      const analysis = await storage.createCompatibilityAnalysis({
        userId,
        person1ChartId: person1Chart.id,
        person2ChartId: person2Chart.id,
        ...compatibilityData,
      });
      
      res.json(analysis);
    } catch (error) {
      console.error("Error creating compatibility analysis:", error);
      res.status(400).json({ message: "Failed to create compatibility analysis" });
    }
  });

  app.get('/api/compatibility', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const analyses = await storage.getUserCompatibilityAnalyses(userId);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching compatibility analyses:", error);
      res.status(500).json({ message: "Failed to fetch compatibility analyses" });
    }
  });

  // Subscription routes
  app.get('/api/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscription = await storage.getUserSubscription(userId);
      res.json(subscription || { plan: 'basic', status: 'active' });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });

  app.post('/api/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscriptionData = insertSubscriptionSchema.parse({ ...req.body, userId });
      
      const subscription = await storage.createSubscription(subscriptionData);
      res.json(subscription);
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(400).json({ message: "Failed to create subscription" });
    }
  });

  // Transit routes
  app.get('/api/transits', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const transits = await storage.getUpcomingTransits(limit);
      res.json(transits);
    } catch (error) {
      console.error("Error fetching transits:", error);
      res.status(500).json({ message: "Failed to fetch transits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
