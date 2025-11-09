import { z } from "zod";

// SDG (Sustainable Development Goal) schema
export const sdgSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export type SDG = z.infer<typeof sdgSchema>;

// WETF (Wellbeing, Education, Transformation Fund) schema
export const wetfSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  raisedDisplay: z.string(),
  livesImpactedDisplay: z.string(),
  growthDisplay: z.string(),
  sdgs: z.array(z.string()),
  vetting: z.object({
    financialHealth: z.boolean(),
    governance: z.boolean(),
    impactTracking: z.boolean(),
  }),
  mission: z.string(),
  impact: z.string(),
});

export type WETF = z.infer<typeof wetfSchema>;

// Investment record schema
export const investmentSchema = z.object({
  id: z.string(),
  fundSlug: z.string(),
  amountGBP: z.number(),
  timestamp: z.number(),
});

export type Investment = z.infer<typeof investmentSchema>;

// User state schema (for localStorage)
export const userStateSchema = z.object({
  selectedSDGs: z.array(z.string()),
  impactProfile: z.array(z.number()), // 8-dimensional radar values 0-100
  totalInvestedGBP: z.number(),
  investments: z.array(investmentSchema),
});

export type UserState = z.infer<typeof userStateSchema>;

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
