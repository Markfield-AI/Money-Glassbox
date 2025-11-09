import type { SDG, WETF } from "@shared/schema";

export const SDGS: SDG[] = [
  { id: "health", name: "Health & Wellbeing", icon: "🩺" },
  { id: "education", name: "Quality Education", icon: "📚" },
  { id: "water", name: "Clean Water & Sanitation", icon: "💧" },
  { id: "poverty", name: "No Poverty & Zero Hunger", icon: "🍽️" },
  { id: "consumption", name: "Responsible Consumption", icon: "♻️" },
  { id: "infrastructure", name: "Industry & Infrastructure", icon: "🏗️" },
  { id: "energy", name: "Affordable Clean Energy", icon: "⚡" },
  { id: "waste", name: "Climate Action & Waste", icon: "🌍" }
];

export const WETFS: WETF[] = [
  {
    slug: "health-wellbeing",
    title: "Health & Wellbeing Fund",
    description: "Scale vaccinations, primary care, and mental health access.",
    icon: "🩺",
    raisedDisplay: "£2.4m raised",
    livesImpactedDisplay: "150,000+ lives impacted",
    growthDisplay: "↑ 23% since June",
    sdgs: ["Health & Wellbeing", "Clean Water & Sanitation"],
    vetting: {
      financialHealth: true,
      governance: true,
      impactTracking: true
    },
    mission: "Our mission is to ensure universal access to quality healthcare services, including vaccinations, primary care, and mental health support. We work with vetted partners across 15 countries to deliver measurable health outcomes.",
    impact: "Since launch, we've facilitated over 500,000 vaccinations, established 45 primary care clinics, and provided mental health support to 12,000+ individuals. Our impact is tracked through independent audits and reported quarterly."
  },
  {
    slug: "education-access",
    title: "Education Access Fund",
    description: "Build schools, train teachers, and provide learning materials globally.",
    icon: "📚",
    raisedDisplay: "£1.8m raised",
    livesImpactedDisplay: "95,000+ students reached",
    growthDisplay: "↑ 31% since June",
    sdgs: ["Quality Education", "No Poverty & Zero Hunger"],
    vetting: {
      financialHealth: true,
      governance: true,
      impactTracking: true
    },
    mission: "We believe every child deserves access to quality education. Our fund supports school construction, teacher training programs, and educational materials in underserved communities across Asia, Africa, and Latin America.",
    impact: "To date, we've built 28 schools, trained 1,200 teachers, and provided educational materials to 95,000 students. Student literacy rates in our programs improved by an average of 45% within 18 months."
  },
  {
    slug: "clean-water",
    title: "Clean Water Fund",
    description: "Provide sustainable water solutions and sanitation infrastructure.",
    icon: "💧",
    raisedDisplay: "£1.5m raised",
    livesImpactedDisplay: "80,000+ people served",
    growthDisplay: "↑ 19% since June",
    sdgs: ["Clean Water & Sanitation", "Health & Wellbeing"],
    vetting: {
      financialHealth: true,
      governance: true,
      impactTracking: true
    },
    mission: "Access to clean water is a fundamental human right. We fund well drilling, water filtration systems, and community water management training to ensure lasting access to safe water.",
    impact: "Our initiatives have provided clean water access to 80,000 people across 45 communities. Water-borne disease rates decreased by 73% in areas we serve, and school attendance increased by 28% as children no longer spend hours fetching water."
  },
  {
    slug: "climate-action",
    title: "Climate Action Fund",
    description: "Combat climate change through reforestation and renewable energy.",
    icon: "🌍",
    raisedDisplay: "£3.1m raised",
    livesImpactedDisplay: "200,000+ trees planted",
    growthDisplay: "↑ 42% since June",
    sdgs: ["Climate Action & Waste", "Affordable Clean Energy"],
    vetting: {
      financialHealth: true,
      governance: true,
      impactTracking: true
    },
    mission: "We're fighting climate change through scalable reforestation projects and renewable energy deployment. Our fund supports communities transitioning to sustainable practices while sequestering carbon.",
    impact: "We've planted over 200,000 trees, installed solar panels for 1,500 households, and reduced CO2 emissions by an estimated 45,000 tons annually. Communities report 60% reduction in energy costs."
  }
];
