import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PerformanceData } from "@shared/schema";

interface PortfolioChartProps {
  data: PerformanceData[];
  title: string;
}

export function PortfolioChart({ data, title }: PortfolioChartProps) {
  return (
    <Card className="p-6" data-testid="card-portfolio-chart">
      <h3 className="text-lg font-semibold mb-4" data-testid="text-chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickMargin={8}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickMargin={8}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            data-testid="chart-line"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
