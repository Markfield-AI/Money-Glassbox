import type { UserState, Investment } from "@shared/schema";

const STORAGE_KEY = "glassbox_user_state";

const DEFAULT_STATE: UserState = {
  selectedSDGs: [],
  impactProfile: [0, 0, 0, 0, 0, 0, 0, 0],
  totalInvestedGBP: 0,
  investments: []
};

export function loadState(): UserState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load state:", error);
    return DEFAULT_STATE;
  }
}

export function saveState(state: UserState): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state:", error);
  }
}

export function setSDGs(sdgs: string[]): UserState {
  const state = loadState();
  const newState = { ...state, selectedSDGs: sdgs };
  saveState(newState);
  return newState;
}

export function buildImpactProfile(sdgs: string[]): UserState {
  const state = loadState();
  
  // Create a radar profile based on selected SDGs
  // Each SDG contributes to its corresponding dimension
  const sdgMap: Record<string, number> = {
    "Health & Wellbeing": 0,
    "Quality Education": 1,
    "Clean Water & Sanitation": 2,
    "No Poverty & Zero Hunger": 3,
    "Responsible Consumption": 4,
    "Industry & Infrastructure": 5,
    "Affordable Clean Energy": 6,
    "Climate Action & Waste": 7
  };
  
  const profile = [0, 0, 0, 0, 0, 0, 0, 0];
  
  sdgs.forEach(sdg => {
    const index = sdgMap[sdg];
    if (index !== undefined) {
      profile[index] = 100;
    }
  });
  
  const newState = { ...state, selectedSDGs: sdgs, impactProfile: profile };
  saveState(newState);
  return newState;
}

export function fakeInvest(fundSlug: string, amountGBP: number): UserState {
  const state = loadState();
  
  const investment: Investment = {
    id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fundSlug,
    amountGBP,
    timestamp: Date.now()
  };
  
  const newState = {
    ...state,
    totalInvestedGBP: state.totalInvestedGBP + amountGBP,
    investments: [...state.investments, investment]
  };
  
  saveState(newState);
  return newState;
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
