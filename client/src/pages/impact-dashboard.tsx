import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { loadState } from "@/lib/state";
import { calculateEquivalencies } from "@/lib/impact";
import { DonutChart } from "@/components/charts/donut-chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { UserState } from "@shared/schema";
import { Utensils, School, Droplet, TrendingUp, Home } from "lucide-react";

export default function ImpactDashboard() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Loading your impact...</p>
        </div>
      </div>
    );
  }

  const equivalencies = calculateEquivalencies(state.totalInvestedGBP);

  // Generate investment timeline data
  const timelineData = state.investments.length > 0
    ? state.investments.map((inv, index) => ({
        date: new Date(inv.timestamp).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        value: state.investments.slice(0, index + 1).reduce((sum, i) => sum + i.amountGBP, 0)
      }))
    : [{ date: 'Start', value: 0 }];

  // Portfolio allocation data
  const allocationData = state.investments.length > 0
    ? [
        {
          name: 'Health & Wellbeing',
          value: state.totalInvestedGBP,
          color: 'hsl(var(--primary))'
        }
      ]
    : [];

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-dashboard-title">
            {copy.dashboardH1}
          </h1>
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="button-home">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg text-muted-foreground font-normal">
              {copy.dashboardKPI}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold" data-testid="text-total-invested">
              £{state.totalInvestedGBP.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>{state.investments.length} investment{state.investments.length !== 1 ? 's' : ''}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card data-testid="card-meals">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{copy.eqMeals}</CardTitle>
              <Utensils className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-meals-count">
                {equivalencies.meals.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {equivalencies.meals > 0 
                  ? `£${(state.totalInvestedGBP / equivalencies.meals).toFixed(2)} per meal`
                  : '£0.25 per meal'}
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-classrooms">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{copy.eqClassrooms}</CardTitle>
              <School className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-classrooms-count">
                {equivalencies.classrooms.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                £12,500 per classroom
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-wells">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{copy.eqWells}</CardTitle>
              <Droplet className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-wells-count">
                {equivalencies.wells.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                £2,500 per well
              </p>
            </CardContent>
          </Card>
        </div>

        {state.investments.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={allocationData} />
              </CardContent>
            </Card>
          </div>
        )}

        {state.investments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No investments yet. Start investing to see your impact!
              </p>
              <Link href="/discover">
                <Button className="mt-4">
                  Browse Funds
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
