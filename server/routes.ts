import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCharitySchema, insertWetfSchema, insertInvestmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // SDG Routes
  app.get("/api/sdgs", async (_req, res) => {
    try {
      const sdgs = await storage.getAllSDGs();
      res.json(sdgs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SDGs" });
    }
  });

  app.get("/api/sdgs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sdg = await storage.getSDGById(id);
      if (!sdg) {
        return res.status(404).json({ error: "SDG not found" });
      }
      res.json(sdg);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SDG" });
    }
  });

  // Charity Routes
  app.get("/api/charities", async (req, res) => {
    try {
      let charities = await storage.getAllCharities();
      
      const query = req.query.q as string | undefined;
      const sdgFilter = req.query.sdg as string | undefined;
      const sortBy = req.query.sort as string | undefined;
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        charities = charities.filter(c =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.description.toLowerCase().includes(lowerQuery) ||
          c.category.toLowerCase().includes(lowerQuery)
        );
      }
      
      if (sdgFilter && sdgFilter !== "all") {
        charities = charities.filter(c => c.sdgIds.split(",").includes(sdgFilter));
      }
      
      if (sortBy === "rating") {
        charities.sort((a, b) => Number(b.overallRating) - Number(a.overallRating));
      } else if (sortBy === "impact") {
        charities.sort((a, b) => Number(b.impactScore) - Number(a.impactScore));
      } else if (sortBy === "beneficiaries") {
        charities.sort((a, b) => b.beneficiaries - a.beneficiaries);
      }
      
      res.json(charities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch charities" });
    }
  });

  app.get("/api/charities/:id", async (req, res) => {
    try {
      const charity = await storage.getCharityById(req.params.id);
      if (!charity) {
        return res.status(404).json({ error: "Charity not found" });
      }
      res.json(charity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch charity" });
    }
  });

  app.post("/api/charities", async (req, res) => {
    try {
      const data = insertCharitySchema.parse(req.body);
      const charity = await storage.createCharity(data);
      res.status(201).json(charity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid charity data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create charity" });
    }
  });

  // WETF Routes
  app.get("/api/wetfs", async (req, res) => {
    try {
      let wetfs = await storage.getAllWETFs();
      
      const query = req.query.q as string | undefined;
      const sdgFilter = req.query.sdg as string | undefined;
      const sortBy = req.query.sort as string | undefined;
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        wetfs = wetfs.filter(w =>
          w.name.toLowerCase().includes(lowerQuery) ||
          w.description.toLowerCase().includes(lowerQuery) ||
          w.code.toLowerCase().includes(lowerQuery)
        );
      }
      
      if (sdgFilter && sdgFilter !== "all") {
        wetfs = wetfs.filter(w => w.sdgIds.split(",").includes(sdgFilter));
      }
      
      if (sortBy === "return") {
        wetfs.sort((a, b) => Number(b.yearToDateReturn) - Number(a.yearToDateReturn));
      } else if (sortBy === "impact") {
        wetfs.sort((a, b) => Number(b.impactScore) - Number(a.impactScore));
      }
      
      res.json(wetfs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch WETFs" });
    }
  });

  app.get("/api/wetfs/:id", async (req, res) => {
    try {
      const wetf = await storage.getWETFById(req.params.id);
      if (!wetf) {
        return res.status(404).json({ error: "WETF not found" });
      }
      res.json(wetf);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch WETF" });
    }
  });

  app.post("/api/wetfs", async (req, res) => {
    try {
      const data = insertWetfSchema.parse(req.body);
      const wetf = await storage.createWETF(data);
      res.status(201).json(wetf);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid WETF data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create WETF" });
    }
  });

  // Investment Routes
  app.get("/api/investments", async (_req, res) => {
    try {
      const investments = await storage.getAllInvestments();
      res.json(investments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investments" });
    }
  });

  app.get("/api/investments/:id", async (req, res) => {
    try {
      const investment = await storage.getInvestmentById(req.params.id);
      if (!investment) {
        return res.status(404).json({ error: "Investment not found" });
      }
      res.json(investment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investment" });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const data = insertInvestmentSchema.parse(req.body);
      const investment = await storage.createInvestment(data);
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid investment data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create investment" });
    }
  });

  // Portfolio Routes
  app.get("/api/portfolio/summary", async (_req, res) => {
    try {
      const summary = await storage.getPortfolioSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio summary" });
    }
  });

  app.get("/api/portfolio/impact", async (_req, res) => {
    try {
      const impact = await storage.getImpactMetrics();
      res.json(impact);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch impact metrics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
