import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metrics/metric-card";
import { PortfolioChart } from "@/components/charts/portfolio-chart";
import { AllocationChart } from "@/components/charts/allocation-chart";
import { WetfCard } from "@/components/wetf/wetf-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  TrendingUp,
  Target,
  BarChart3,
  Plus,
} from "lucide-react";
import { Link } from "wouter";
import type { PerformanceData, AllocationData, PortfolioSummary, Investment, Wetf } from "@shared/schema";

export default function Dashboard() {
  const { data: portfolio, isLoading: portfolioLoading } = useQuery<PortfolioSummary>({
    queryKey: ["/api/portfolio/summary"],
  });

  const { data: investments, isLoading: investmentsLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  const { data: wetfs } = useQuery<Wetf[]>({
    queryKey: ["/api/wetfs"],
  });

  const portfolioData: PerformanceData[] = portfolio ? [
    { date: "Jan", value: portfolio.currentValue * 0.65 },
    { date: "Feb", value: portfolio.currentValue * 0.73 },
    { date: "Mar", value: portfolio.currentValue * 0.69 },
    { date: "Apr", value: portfolio.currentValue * 0.81 },
    { date: "May", value: portfolio.currentValue * 0.91 },
    { date: "Jun", value: portfolio.currentValue },
  ] : [];

  const allocationData: AllocationData[] = portfolio ? [
    { name: "Education", value: portfolio.totalInvested * 0.39, color: "hsl(var(--chart-1))" },
    { name: "Healthcare", value: portfolio.totalInvested * 0.31, color: "hsl(var(--chart-2))" },
    { name: "Environment", value: portfolio.totalInvested * 0.21, color: "hsl(var(--chart-3))" },
    { name: "Poverty", value: portfolio.totalInvested * 0.09, color: "hsl(var(--chart-4))" },
  ] : [];

  const getWetfName = (wetfId: string) => {
    return wetfs?.find(w => w.id === wetfId)?.name || "Unknown WETF";
  };

  const getWetfCode = (wetfId: string) => {
    return wetfs?.find(w => w.id === wetfId)?.code || "UNKN";
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2" data-testid="text-dashboard-title">
              Portfolio Dashboard
            </h1>
            <p className="text-muted-foreground" data-testid="text-dashboard-subtitle">
              Track your social investments and impact metrics
            </p>
          </div>
          <Link href="/marketplace">
            <Button className="gap-2" data-testid="button-new-investment">
              <Plus className="h-4 w-4" />
              New Investment
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </Card>
              ))}
            </>
          ) : (
            <>
              <MetricCard
                title="Total Invested"
                value={`$${portfolio?.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || "0"}`}
                subtitle={`across ${portfolio?.activeWetfs || 0} WETFs`}
                icon={DollarSign}
                trend={portfolio && portfolio.totalReturnPercentage !== 0 ? { value: portfolio.totalReturnPercentage, isPositive: portfolio.totalReturnPercentage >= 0 } : undefined}
              />
              <MetricCard
                title="Current Value"
                value={`$${portfolio?.currentValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || "0"}`}
                subtitle="portfolio value"
                icon={TrendingUp}
                trend={portfolio && portfolio.totalReturn !== 0 ? { value: (portfolio.totalReturn / portfolio.totalInvested) * 100, isPositive: portfolio.totalReturn >= 0 } : undefined}
              />
              <MetricCard
                title="Impact Score"
                value={portfolio?.impactScore.toFixed(1) || "0.0"}
                subtitle="out of 10"
                icon={Target}
              />
              <MetricCard
                title="Social ROI"
                value="4.2x"
                subtitle="lives impacted per $"
                icon={BarChart3}
              />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PortfolioChart
              data={portfolioData}
              title="Portfolio Performance (6 Months)"
            />
          </div>
          <div>
            <AllocationChart
              data={allocationData}
              title="SDG Allocation"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6" data-testid="card-recent-investments">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" data-testid="text-recent-title">Recent Investments</h3>
                <Link href="/marketplace">
                  <Button variant="ghost" size="sm" data-testid="button-view-all">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {investmentsLoading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg border">
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </>
                ) : investments && investments.length > 0 ? (
                  investments.slice(0, 5).map((investment, index) => (
                    <div
                      key={investment.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover-elevate transition-all"
                      data-testid={`investment-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium" data-testid="text-investment-name">
                            {getWetfName(investment.wetfId)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs font-mono" data-testid="badge-investment-code">
                              {getWetfCode(investment.wetfId)}
                            </Badge>
                            <span className="text-xs text-muted-foreground" data-testid="text-investment-date">
                              {formatDate(investment.investedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold" data-testid="text-investment-amount">
                        ${Number(investment.amount).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No investments yet</p>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6" data-testid="card-quick-actions">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-quick-actions">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/marketplace" className="block">
                  <Button variant="outline" className="w-full justify-start" data-testid="button-explore-wetfs">
                    Explore WETFs
                  </Button>
                </Link>
                <Link href="/transparency" className="block">
                  <Button variant="outline" className="w-full justify-start" data-testid="button-view-impact">
                    View Impact Report
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" data-testid="button-download-statement">
                  Download Statement
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
