import {
  type Charity,
  type InsertCharity,
  type Wetf,
  type InsertWetf,
  type Investment,
  type InsertInvestment,
  type SDG,
  type PortfolioSummary,
  type ImpactMetrics,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // SDG operations
  getAllSDGs(): Promise<SDG[]>;
  getSDGById(id: number): Promise<SDG | undefined>;

  // Charity operations
  getAllCharities(): Promise<Charity[]>;
  getCharityById(id: string): Promise<Charity | undefined>;
  createCharity(charity: InsertCharity): Promise<Charity>;
  searchCharities(query: string, sdgFilter?: string): Promise<Charity[]>;

  // WETF operations
  getAllWETFs(): Promise<Wetf[]>;
  getWETFById(id: string): Promise<Wetf | undefined>;
  createWETF(wetf: InsertWetf): Promise<Wetf>;
  searchWETFs(query: string, sdgFilter?: string): Promise<Wetf[]>;

  // Investment operations
  getAllInvestments(): Promise<Investment[]>;
  getInvestmentById(id: string): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  
  // Portfolio operations
  getPortfolioSummary(): Promise<PortfolioSummary>;
  getImpactMetrics(): Promise<ImpactMetrics>;
}

export class MemStorage implements IStorage {
  private sdgs: Map<number, SDG>;
  private charities: Map<string, Charity>;
  private wetfs: Map<string, Wetf>;
  private investments: Map<string, Investment>;

  constructor() {
    this.sdgs = new Map();
    this.charities = new Map();
    this.wetfs = new Map();
    this.investments = new Map();
    this.seedData();
  }

  private seedData() {
    this.seedSDGs();
    this.seedCharities();
    this.seedWETFs();
    this.seedInvestments();
  }

  private seedSDGs() {
    const sdgs: SDG[] = [
      { id: 1, name: "No Poverty", description: "End poverty in all its forms everywhere", icon: "🏘️" },
      { id: 2, name: "Zero Hunger", description: "End hunger, achieve food security", icon: "🌾" },
      { id: 3, name: "Good Health", description: "Ensure healthy lives and promote well-being", icon: "⚕️" },
      { id: 4, name: "Quality Education", description: "Ensure inclusive and equitable quality education", icon: "📚" },
      { id: 5, name: "Gender Equality", description: "Achieve gender equality and empower all women and girls", icon: "⚖️" },
      { id: 6, name: "Clean Water", description: "Ensure availability of water and sanitation for all", icon: "💧" },
      { id: 7, name: "Affordable Energy", description: "Ensure access to affordable, reliable, sustainable energy", icon: "⚡" },
      { id: 8, name: "Decent Work", description: "Promote sustained, inclusive economic growth", icon: "💼" },
      { id: 9, name: "Industry Innovation", description: "Build resilient infrastructure, promote innovation", icon: "🏗️" },
      { id: 10, name: "Reduced Inequalities", description: "Reduce inequality within and among countries", icon: "⚖️" },
      { id: 11, name: "Sustainable Cities", description: "Make cities and human settlements inclusive and sustainable", icon: "🏙️" },
      { id: 12, name: "Responsible Consumption", description: "Ensure sustainable consumption and production patterns", icon: "♻️" },
      { id: 13, name: "Climate Action", description: "Take urgent action to combat climate change", icon: "🌍" },
      { id: 14, name: "Life Below Water", description: "Conserve and sustainably use oceans and marine resources", icon: "🌊" },
      { id: 15, name: "Life on Land", description: "Protect, restore and promote sustainable use of ecosystems", icon: "🌳" },
      { id: 16, name: "Peace and Justice", description: "Promote peaceful and inclusive societies", icon: "⚖️" },
      { id: 17, name: "Partnerships", description: "Strengthen means of implementation and revitalize partnerships", icon: "🤝" },
    ];

    sdgs.forEach(sdg => this.sdgs.set(sdg.id, sdg));
  }

  private seedCharities() {
    const charities: Charity[] = [
      {
        id: randomUUID(),
        name: "Education For All Foundation",
        description: "Providing quality education to underserved communities worldwide",
        mission: "Our mission is to ensure every child has access to quality education regardless of their economic background. We build schools, train teachers, and provide learning materials to communities in need.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
        category: "Education",
        location: "Global (15 countries)",
        website: "https://educationforall.org",
        impactScore: "9.5",
        transparencyScore: "9.0",
        efficiencyScore: "8.9",
        overallRating: "9.2",
        beneficiaries: 125000,
        projectsCompleted: 45,
        yearsActive: 12,
        adminCostPercentage: "8.5",
        sdgIds: "4,1,10",
        impactStory: "In 2024, Education For All built 12 new schools in rural Kenya, providing education to over 3,000 students who previously had no access to formal schooling. Our teacher training program has empowered 150 local educators with modern teaching methodologies.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Clean Water Initiative",
        description: "Bringing safe, clean water to communities in need",
        mission: "We provide sustainable water solutions to communities without access to clean water. Through well drilling, filtration systems, and water management education, we ensure lasting access to this vital resource.",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
        category: "Water & Sanitation",
        location: "Africa & Southeast Asia",
        website: "https://cleanwaterinitiative.org",
        impactScore: "9.3",
        transparencyScore: "9.5",
        efficiencyScore: "9.0",
        overallRating: "9.3",
        beneficiaries: 85000,
        projectsCompleted: 32,
        yearsActive: 8,
        adminCostPercentage: "7.2",
        sdgIds: "6,3,11",
        impactStory: "Provided clean water access to 15,000 people across 8 villages in Tanzania by installing community water systems and training local maintenance teams. Water-borne diseases decreased by 78% in served communities.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Healthcare Access Fund",
        description: "Making quality healthcare accessible to rural and underserved populations",
        mission: "We establish mobile health clinics, train community health workers, and provide essential medicines to regions with limited healthcare infrastructure.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
        category: "Healthcare",
        location: "Sub-Saharan Africa",
        website: "https://healthcareaccessfund.org",
        impactScore: "9.0",
        transparencyScore: "8.8",
        efficiencyScore: "9.2",
        overallRating: "9.0",
        beneficiaries: 95000,
        projectsCompleted: 28,
        yearsActive: 10,
        adminCostPercentage: "9.1",
        sdgIds: "3,1,10",
        impactStory: "Funded 5,000 medical consultations through mobile clinics in remote regions. Trained 200 community health workers who now serve populations 50+ miles from the nearest hospital.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Global Learning Initiative",
        description: "Digital education solutions for remote learning",
        mission: "We bring technology-enabled education to remote areas through solar-powered learning centers, tablets loaded with educational content, and teacher training programs.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
        category: "Education & Technology",
        location: "Latin America & Asia",
        website: "https://globallearning.org",
        impactScore: "8.8",
        transparencyScore: "9.2",
        efficiencyScore: "8.5",
        overallRating: "8.8",
        beneficiaries: 68000,
        projectsCompleted: 38,
        yearsActive: 6,
        adminCostPercentage: "10.5",
        sdgIds: "4,9,10",
        impactStory: "Established 25 digital learning centers in rural Peru, providing 2,500 students with access to online educational resources. Students showed 35% improvement in standardized test scores.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Climate Action Network",
        description: "Fighting climate change through reforestation and renewable energy",
        mission: "We combat climate change by planting trees, installing solar panels in communities, and educating populations about sustainable practices.",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
        category: "Environment & Climate",
        location: "Global",
        website: "https://climateactionnetwork.org",
        impactScore: "9.1",
        transparencyScore: "8.9",
        efficiencyScore: "8.7",
        overallRating: "8.9",
        beneficiaries: 45000,
        projectsCompleted: 52,
        yearsActive: 9,
        adminCostPercentage: "8.8",
        sdgIds: "13,7,15",
        impactStory: "Planted 500,000 trees across degraded landscapes in 6 countries, sequestering an estimated 75,000 tons of CO2. Installed 1,200 solar panels providing clean energy to 800 households.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Women Empowerment Foundation",
        description: "Empowering women through education, skills training, and microfinance",
        mission: "We provide women with the tools, education, and resources they need to become economically independent and leaders in their communities.",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=400&fit=crop",
        category: "Gender Equality & Economic Development",
        location: "South Asia & Middle East",
        website: "https://womenempowerment.org",
        impactScore: "9.4",
        transparencyScore: "9.3",
        efficiencyScore: "9.1",
        overallRating: "9.3",
        beneficiaries: 52000,
        projectsCompleted: 35,
        yearsActive: 11,
        adminCostPercentage: "7.8",
        sdgIds: "5,1,8",
        impactStory: "Trained 3,200 women in vocational skills and provided microloans to 1,800 women entrepreneurs. 85% of participants increased their household income by at least 40%.",
        impactStoryImageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop",
        createdAt: new Date(),
      },
    ];

    charities.forEach(charity => this.charities.set(charity.id, charity));
  }

  private seedWETFs() {
    const wetfs: Wetf[] = [
      {
        id: randomUUID(),
        name: "Global Education WETF",
        code: "GEDU",
        description: "Diversified investment vehicle focused on education initiatives worldwide",
        strategy: "This WETF allocates capital across high-impact education charities, prioritizing literacy programs, school infrastructure, and teacher training initiatives in underserved regions.",
        minimumInvestment: "1000.00",
        currentValue: "125.50",
        totalAssets: "4500000.00",
        yearToDateReturn: "8.5",
        oneYearReturn: "12.3",
        threeYearReturn: "28.7",
        socialRoi: "4.8",
        impactScore: "9.2",
        charityAllocations: JSON.stringify([
          { charityId: Array.from(this.charities.values())[0].id, allocation: 35 },
          { charityId: Array.from(this.charities.values())[3].id, allocation: 30 },
          { charityId: Array.from(this.charities.values())[0].id, allocation: 20 },
          { charityId: Array.from(this.charities.values())[3].id, allocation: 15 },
        ]),
        sdgIds: "4,1,10",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Clean Water & Health WETF",
        code: "CWTR",
        description: "Investment fund focused on water, sanitation, and healthcare access",
        strategy: "Combines water infrastructure projects with healthcare initiatives to create holistic community health improvements in underserved regions.",
        minimumInvestment: "1500.00",
        currentValue: "138.75",
        totalAssets: "3200000.00",
        yearToDateReturn: "10.2",
        oneYearReturn: "15.8",
        threeYearReturn: "32.4",
        socialRoi: "5.2",
        impactScore: "9.4",
        charityAllocations: JSON.stringify([
          { charityId: Array.from(this.charities.values())[1].id, allocation: 45 },
          { charityId: Array.from(this.charities.values())[2].id, allocation: 35 },
          { charityId: Array.from(this.charities.values())[1].id, allocation: 20 },
        ]),
        sdgIds: "6,3,11",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Climate Action WETF",
        code: "CLMT",
        description: "Environmental sustainability and climate change mitigation fund",
        strategy: "Focuses on reforestation, renewable energy deployment, and climate resilience projects in vulnerable communities worldwide.",
        minimumInvestment: "2000.00",
        currentValue: "142.30",
        totalAssets: "5800000.00",
        yearToDateReturn: "11.5",
        oneYearReturn: "18.2",
        threeYearReturn: "35.6",
        socialRoi: "3.9",
        impactScore: "8.9",
        charityAllocations: JSON.stringify([
          { charityId: Array.from(this.charities.values())[4].id, allocation: 60 },
          { charityId: Array.from(this.charities.values())[4].id, allocation: 40 },
        ]),
        sdgIds: "13,7,15",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Women's Empowerment WETF",
        code: "WEMP",
        description: "Investment vehicle supporting women's economic independence and leadership",
        strategy: "Allocates funds to organizations providing skills training, microfinance, and educational opportunities for women in developing regions.",
        minimumInvestment: "1200.00",
        currentValue: "131.20",
        totalAssets: "2900000.00",
        yearToDateReturn: "9.8",
        oneYearReturn: "14.5",
        threeYearReturn: "30.2",
        socialRoi: "5.5",
        impactScore: "9.5",
        charityAllocations: JSON.stringify([
          { charityId: Array.from(this.charities.values())[5].id, allocation: 55 },
          { charityId: Array.from(this.charities.values())[0].id, allocation: 25 },
          { charityId: Array.from(this.charities.values())[2].id, allocation: 20 },
        ]),
        sdgIds: "5,1,8",
        createdAt: new Date(),
      },
    ];

    wetfs.forEach(wetf => this.wetfs.set(wetf.id, wetf));
  }

  private seedInvestments() {
    const wetfIds = Array.from(this.wetfs.keys());
    const investments: Investment[] = [
      {
        id: randomUUID(),
        wetfId: wetfIds[0],
        amount: "5000.00",
        shares: "39.84",
        purchasePrice: "125.50",
        currentValue: "5250.00",
        investedAt: new Date("2024-12-01"),
      },
      {
        id: randomUUID(),
        wetfId: wetfIds[1],
        amount: "3000.00",
        purchasePrice: "138.75",
        shares: "21.62",
        currentValue: "3300.00",
        investedAt: new Date("2024-11-15"),
      },
      {
        id: randomUUID(),
        wetfId: wetfIds[2],
        amount: "4000.00",
        shares: "28.12",
        purchasePrice: "142.30",
        currentValue: "4400.00",
        investedAt: new Date("2024-10-20"),
      },
    ];

    investments.forEach(investment => this.investments.set(investment.id, investment));
  }

  // SDG methods
  async getAllSDGs(): Promise<SDG[]> {
    return Array.from(this.sdgs.values());
  }

  async getSDGById(id: number): Promise<SDG | undefined> {
    return this.sdgs.get(id);
  }

  // Charity methods
  async getAllCharities(): Promise<Charity[]> {
    return Array.from(this.charities.values());
  }

  async getCharityById(id: string): Promise<Charity | undefined> {
    return this.charities.get(id);
  }

  async createCharity(insertCharity: InsertCharity): Promise<Charity> {
    const id = randomUUID();
    const charity: Charity = { ...insertCharity, id, createdAt: new Date() };
    this.charities.set(id, charity);
    return charity;
  }

  async searchCharities(query: string, sdgFilter?: string): Promise<Charity[]> {
    let charities = Array.from(this.charities.values());

    if (query) {
      const lowerQuery = query.toLowerCase();
      charities = charities.filter(
        c =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.description.toLowerCase().includes(lowerQuery) ||
          c.category.toLowerCase().includes(lowerQuery)
      );
    }

    if (sdgFilter && sdgFilter !== "all") {
      charities = charities.filter(c => c.sdgIds.split(",").includes(sdgFilter));
    }

    return charities;
  }

  // WETF methods
  async getAllWETFs(): Promise<Wetf[]> {
    return Array.from(this.wetfs.values());
  }

  async getWETFById(id: string): Promise<Wetf | undefined> {
    return this.wetfs.get(id);
  }

  async createWETF(insertWetf: InsertWetf): Promise<Wetf> {
    const id = randomUUID();
    const wetf: Wetf = { ...insertWetf, id, createdAt: new Date() };
    this.wetfs.set(id, wetf);
    return wetf;
  }

  async searchWETFs(query: string, sdgFilter?: string): Promise<Wetf[]> {
    let wetfs = Array.from(this.wetfs.values());

    if (query) {
      const lowerQuery = query.toLowerCase();
      wetfs = wetfs.filter(
        w =>
          w.name.toLowerCase().includes(lowerQuery) ||
          w.description.toLowerCase().includes(lowerQuery) ||
          w.code.toLowerCase().includes(lowerQuery)
      );
    }

    if (sdgFilter && sdgFilter !== "all") {
      wetfs = wetfs.filter(w => w.sdgIds.split(",").includes(sdgFilter));
    }

    return wetfs;
  }

  // Investment methods
  async getAllInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }

  async getInvestmentById(id: string): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = randomUUID();
    const investment: Investment = { ...insertInvestment, id, investedAt: new Date() };
    this.investments.set(id, investment);
    return investment;
  }

  // Portfolio methods
  async getPortfolioSummary(): Promise<PortfolioSummary> {
    const investments = Array.from(this.investments.values());
    
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const currentValue = investments.reduce((sum, inv) => sum + Number(inv.currentValue), 0);
    const totalReturn = currentValue - totalInvested;
    const totalReturnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
    
    const uniqueWetfs = new Set(investments.map(inv => inv.wetfId));
    const activeWetfs = uniqueWetfs.size;

    const wetfs = await this.getAllWETFs();
    const investedWetfs = wetfs.filter(w => uniqueWetfs.has(w.id));
    const avgImpactScore = investedWetfs.reduce((sum, w) => sum + Number(w.impactScore), 0) / (investedWetfs.length || 1);

    const charities = await this.getAllCharities();
    const beneficiariesReached = charities.reduce((sum, c) => sum + c.beneficiaries, 0);

    return {
      totalInvested,
      currentValue,
      totalReturn,
      totalReturnPercentage,
      activeWetfs,
      impactScore: avgImpactScore,
      beneficiariesReached,
      investmentCount: investments.length,
    };
  }

  async getImpactMetrics(): Promise<ImpactMetrics> {
    const charities = await this.getAllCharities();
    const investments = await this.getAllInvestments();
    
    const totalFundsDeployed = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const charitiesFunded = charities.length;
    const livesImpacted = charities.reduce((sum, c) => sum + c.beneficiaries, 0);
    const projectsCompleted = charities.reduce((sum, c) => sum + c.projectsCompleted, 0);
    const averageImpactScore = charities.reduce((sum, c) => sum + Number(c.impactScore), 0) / (charities.length || 1);

    const sdgBreakdown: ImpactMetrics["sdgBreakdown"] = [];
    const sdgMap = new Map<number, { amount: number; count: number }>();

    charities.forEach(charity => {
      const sdgIds = charity.sdgIds.split(",").map(Number);
      const charityFunding = totalFundsDeployed / charitiesFunded;
      
      sdgIds.forEach(sdgId => {
        const current = sdgMap.get(sdgId) || { amount: 0, count: 0 };
        sdgMap.set(sdgId, {
          amount: current.amount + charityFunding,
          count: current.count + 1,
        });
      });
    });

    const sdgs = await this.getAllSDGs();
    for (const [sdgId, data] of sdgMap.entries()) {
      const sdg = sdgs.find(s => s.id === sdgId);
      if (sdg) {
        sdgBreakdown.push({
          sdgId,
          sdgName: sdg.name,
          percentage: (data.amount / totalFundsDeployed) * 100,
          amount: data.amount,
        });
      }
    }

    return {
      totalFundsDeployed,
      charitiesFunded,
      livesImpacted,
      projectsCompleted,
      averageImpactScore,
      sdgBreakdown: sdgBreakdown.sort((a, b) => b.amount - a.amount),
    };
  }
}

export const storage = new MemStorage();
