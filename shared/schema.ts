import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// SDG (Sustainable Development Goals) reference data
export const sdgs = pgTable("sdgs", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export type SDG = typeof sdgs.$inferSelect;

// Charities that investors can support
export const charities = pgTable("charities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  mission: text("mission").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  website: text("website"),
  // Scorecard metrics
  impactScore: decimal("impact_score", { precision: 3, scale: 1 }).notNull(),
  transparencyScore: decimal("transparency_score", { precision: 3, scale: 1 }).notNull(),
  efficiencyScore: decimal("efficiency_score", { precision: 3, scale: 1 }).notNull(),
  overallRating: decimal("overall_rating", { precision: 3, scale: 1 }).notNull(),
  // Impact metrics
  beneficiaries: integer("beneficiaries").notNull(),
  projectsCompleted: integer("projects_completed").notNull(),
  yearsActive: integer("years_active").notNull(),
  // Financial transparency
  adminCostPercentage: decimal("admin_cost_percentage", { precision: 4, scale: 1 }).notNull(),
  // SDG alignment (stored as comma-separated IDs)
  sdgIds: text("sdg_ids").notNull(),
  // Impact stories
  impactStory: text("impact_story").notNull(),
  impactStoryImageUrl: text("impact_story_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCharitySchema = createInsertSchema(charities).omit({
  id: true,
  createdAt: true,
});

export type InsertCharity = z.infer<typeof insertCharitySchema>;
export type Charity = typeof charities.$inferSelect;

// WETFs (Wa'ad/Waqf ETFs) - Investment vehicles
export const wetfs = pgTable("wetfs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description").notNull(),
  strategy: text("strategy").notNull(),
  minimumInvestment: decimal("minimum_investment", { precision: 10, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).notNull(),
  totalAssets: decimal("total_assets", { precision: 12, scale: 2 }).notNull(),
  // Performance metrics
  yearToDateReturn: decimal("year_to_date_return", { precision: 5, scale: 2 }).notNull(),
  oneYearReturn: decimal("one_year_return", { precision: 5, scale: 2 }).notNull(),
  threeYearReturn: decimal("three_year_return", { precision: 5, scale: 2 }).notNull(),
  socialRoi: decimal("social_roi", { precision: 5, scale: 2 }).notNull(),
  impactScore: decimal("impact_score", { precision: 3, scale: 1 }).notNull(),
  // Charity composition (stored as JSON string)
  charityAllocations: text("charity_allocations").notNull(),
  // SDG focus areas
  sdgIds: text("sdg_ids").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWetfSchema = createInsertSchema(wetfs).omit({
  id: true,
  createdAt: true,
});

export type InsertWetf = z.infer<typeof insertWetfSchema>;
export type Wetf = typeof wetfs.$inferSelect;

// User portfolio investments
export const investments = pgTable("investments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  wetfId: varchar("wetf_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  shares: decimal("shares", { precision: 10, scale: 4 }).notNull(),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).notNull(),
  investedAt: timestamp("invested_at").defaultNow(),
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  investedAt: true,
});

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;

// Portfolio summary (computed from investments)
export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercentage: number;
  activeWetfs: number;
  impactScore: number;
  beneficiariesReached: number;
  investmentCount: number;
}

// Impact metrics for transparency hub
export interface ImpactMetrics {
  totalFundsDeployed: number;
  charitiesFunded: number;
  livesImpacted: number;
  projectsCompleted: number;
  averageImpactScore: number;
  sdgBreakdown: {
    sdgId: number;
    sdgName: string;
    percentage: number;
    amount: number;
  }[];
}

// Chart data types
export interface PerformanceData {
  date: string;
  value: number;
}

export interface AllocationData {
  name: string;
  value: number;
  color: string;
}
