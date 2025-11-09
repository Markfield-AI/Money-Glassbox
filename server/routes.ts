import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Glass Box MVP - All state is client-side with localStorage
  // No backend API routes needed
  
  const httpServer = createServer(app);
  return httpServer;
}
