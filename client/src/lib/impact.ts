export const IMPACT_RATES = {
  mealGBP: 0.25,       // £0.25 = 1 meal
  classroomGBP: 12500, // £12,500 = 1 classroom
  wellGBP: 2500        // £2,500 = 1 well
};

export interface Equivalencies {
  meals: number;
  classrooms: number;
  wells: number;
}

export function calculateEquivalencies(totalGBP: number): Equivalencies {
  return {
    meals: Math.floor(totalGBP / IMPACT_RATES.mealGBP),
    classrooms: +(totalGBP / IMPACT_RATES.classroomGBP).toFixed(2),
    wells: +(totalGBP / IMPACT_RATES.wellGBP).toFixed(2)
  };
}
