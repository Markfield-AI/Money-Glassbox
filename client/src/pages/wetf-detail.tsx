import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  DollarSign,
  ArrowLeft,
  Download,
} from "lucide-react";
import type { Wetf } from "@shared/schema";

export default function WetfDetail() {
  const [, params] = useRoute("/wetf/:id");
  const wetfId = params?.id;

  const { data: wetf, isLoading } = useQuery<Wetf>({
    queryKey: ["/api/wetfs", wetfId],
    enabled: !!wetfId,
  });

  const sdgs = wetf?.sdgIds.split(",").map(Number) || [];
  const charityAllocations = wetf ? JSON.parse(wetf.charityAllocations) : [];

  const performanceData = wetf ? [
    { month: "Jan", value: Number(wetf.currentValue) * 0.92 },
    { month: "Feb", value: Number(wetf.currentValue) * 0.94 },
    { month: "Mar", value: Number(wetf.currentValue) * 0.95 },
    { month: "Apr", value: Number(wetf.currentValue) * 0.97 },
    { month: "May", value: Number(wetf.currentValue) * 0.99 },
    { month: "Jun", value: Number(wetf.currentValue) },
  ] : [];

  const isPositive = wetf ? Number(wetf.yearToDateReturn) >= 0 : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-64 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!wetf) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">WETF Not Found</h2>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="mb-4 gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold font-serif" data-testid="text-wetf-name">
                {wetf.name}
              </h1>
              <Badge variant="outline" className="text-lg font-mono" data-testid="badge-wetf-code">
                {wetf.code}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-wetf-description">
              {wetf.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {wetf.sdgs.map((sdg) => (
                <Badge key={sdg.id} variant="secondary" data-testid={`badge-sdg-${sdg.id}`}>
                  SDG {sdg.id}: {sdg.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Current Value</span>
                </div>
                <p className="text-3xl font-bold font-sans" data-testid="text-current-value">
                  ${wetf.currentValue.toFixed(2)}
                </p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-success" data-testid="icon-trending-up" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" data-testid="icon-trending-down" />
                  )}
                  <span className="text-sm font-medium text-muted-foreground">YTD Return</span>
                </div>
                <p
                  className={`text-3xl font-bold font-sans ${isPositive ? "text-success" : "text-destructive"}`}
                  data-testid="text-ytd-return"
                >
                  {isPositive ? "+" : ""}{wetf.yearToDateReturn}%
                </p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Impact Score</span>
                </div>
                <p className="text-3xl font-bold font-sans text-primary" data-testid="text-impact-score">
                  {wetf.impactScore}/10
                </p>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" data-testid="text-performance-title">
                  6-Month Performance
                </h3>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-download">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-returns-title">
                Historical Returns
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">1 Year</p>
                  <p className="text-2xl font-bold text-success" data-testid="text-1yr-return">
                    +{wetf.oneYearReturn}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">3 Years</p>
                  <p className="text-2xl font-bold text-success" data-testid="text-3yr-return">
                    +{wetf.threeYearReturn}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Social ROI</p>
                  <p className="text-2xl font-bold text-primary" data-testid="text-social-roi">
                    {wetf.socialRoi}x
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2" data-testid="text-strategy-title">
                Investment Strategy
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-strategy">
                {wetf.strategy}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-allocations-title">
                Charity Allocations
              </h3>
              <div className="space-y-4">
                {charityAllocations.map((allocation: any, index: number) => {
                  const allocationPercent = (allocation.allocation || 0);
                  const allocationAmount = (Number(wetf.totalAssets) * allocationPercent / 100);
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover-elevate transition-all"
                      data-testid={`allocation-${index}`}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" data-testid="text-allocation-charity">
                          Charity #{index + 1}
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${allocationPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium min-w-12" data-testid="text-allocation-percent">
                            {allocationPercent}%
                          </span>
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <p className="text-lg font-bold" data-testid="text-allocation-amount">
                          ${allocationAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-invest-title">
                Start Investing
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Minimum Investment</p>
                  <p className="text-2xl font-bold" data-testid="text-min-investment">
                    ${wetf.minimumInvestment.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                  <p className="text-lg font-semibold" data-testid="text-total-assets">
                    ${wetf.totalAssets.toLocaleString()}
                  </p>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" data-testid="button-invest-now">
                    Invest Now
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-add-watchlist">
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4" data-testid="text-documents-title">
                Documents
              </h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2" data-testid="button-prospectus">
                  <Download className="h-4 w-4" />
                  Prospectus
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" data-testid="button-impact-report">
                  <Download className="h-4 w-4" />
                  Impact Report
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" data-testid="button-annual-report">
                  <Download className="h-4 w-4" />
                  Annual Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
