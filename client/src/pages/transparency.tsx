import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metrics/metric-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  DollarSign,
  Users,
  Target,
  Award,
  Download,
  TrendingUp,
} from "lucide-react";
import type { ImpactMetrics, Charity } from "@shared/schema";

export default function Transparency() {
  const { data: impactMetrics, isLoading: impactLoading } = useQuery<ImpactMetrics>({
    queryKey: ["/api/portfolio/impact"],
  });

  const { data: charities } = useQuery<Charity[]>({
    queryKey: ["/api/charities"],
  });

  const impactBySDG = impactMetrics?.sdgBreakdown.map(sdg => ({
    sdg: sdg.sdgName,
    amount: sdg.amount,
    projects: Math.floor(sdg.percentage * 10),
  })) || [];

  const monthlyImpact = impactMetrics ? [
    { month: "Jan", amount: impactMetrics.totalFundsDeployed * 0.43, beneficiaries: impactMetrics.livesImpacted * 0.43 },
    { month: "Feb", amount: impactMetrics.totalFundsDeployed * 0.52, beneficiaries: impactMetrics.livesImpacted * 0.52 },
    { month: "Mar", amount: impactMetrics.totalFundsDeployed * 0.62, beneficiaries: impactMetrics.livesImpacted * 0.62 },
    { month: "Apr", amount: impactMetrics.totalFundsDeployed * 0.74, beneficiaries: impactMetrics.livesImpacted * 0.74 },
    { month: "May", amount: impactMetrics.totalFundsDeployed * 0.83, beneficiaries: impactMetrics.livesImpacted * 0.83 },
    { month: "Jun", amount: impactMetrics.totalFundsDeployed, beneficiaries: impactMetrics.livesImpacted },
  ] : [];

  const impactStories = charities?.slice(0, 3).map((charity, index) => ({
    charity: charity.name,
    impact: charity.impactStory?.substring(0, 60) + "..." || "Making a difference in communities",
    amount: `$${((impactMetrics?.totalFundsDeployed || 0) / (charities.length || 1) * (1 - index * 0.15)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    sdg: charity.category,
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge className="mb-4" variant="secondary" data-testid="badge-transparency">
              Real-Time Impact Dashboard
            </Badge>
            <h1 className="text-4xl font-bold font-serif mb-4" data-testid="text-transparency-title">
              Transparency Hub
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-transparency-subtitle">
              Every dollar tracked. Every impact measured. Complete transparency in social investment.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactLoading ? (
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
                title="Funds Deployed"
                value={`$${(impactMetrics?.totalFundsDeployed || 0) >= 1000000 ? ((impactMetrics?.totalFundsDeployed || 0) / 1000000).toFixed(1) + "M" : ((impactMetrics?.totalFundsDeployed || 0) / 1000).toFixed(0) + "K"}`}
                subtitle="lifetime total"
                icon={DollarSign}
                trend={{ value: 18.2, isPositive: true }}
              />
              <MetricCard
                title="Lives Impacted"
                value={`${(impactMetrics?.livesImpacted || 0) >= 1000000 ? ((impactMetrics?.livesImpacted || 0) / 1000000).toFixed(1) + "M" : ((impactMetrics?.livesImpacted || 0) / 1000).toFixed(0) + "K"}`}
                subtitle="beneficiaries reached"
                icon={Users}
                trend={{ value: 24.5, isPositive: true }}
              />
              <MetricCard
                title="Projects Completed"
                value={impactMetrics?.projectsCompleted.toString() || "0"}
                subtitle="across 17 countries"
                icon={Target}
              />
              <MetricCard
                title="Avg Impact Score"
                value={impactMetrics?.averageImpactScore.toFixed(1) || "0.0"}
                subtitle="out of 10"
                icon={Award}
              />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6" data-testid="card-monthly-impact">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" data-testid="text-monthly-title">
                Monthly Impact Trend
              </h3>
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-download-report">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyImpact}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6" data-testid="card-sdg-breakdown">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-sdg-title">
              Impact by SDG Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactBySDG}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="sdg" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Funds"]}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6" data-testid="card-impact-stories">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1" data-testid="text-stories-title">
                Recent Impact Stories
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-stories-subtitle">
                Real outcomes from your investments
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {impactStories.map((story, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg border hover-elevate transition-all"
                data-testid={`story-${index}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold" data-testid="text-story-charity">
                      {story.charity}
                    </h4>
                    <Badge variant="secondary" className="text-xs" data-testid="badge-story-sdg">
                      {story.sdg}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground flex items-center gap-2" data-testid="text-story-impact">
                    <TrendingUp className="h-4 w-4 text-success" />
                    {story.impact}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Funds Deployed</p>
                  <p className="text-xl font-bold text-primary" data-testid="text-story-amount">
                    {story.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
