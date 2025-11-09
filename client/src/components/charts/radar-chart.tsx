import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: number[];
  labels: string[];
}

export function ImpactRadarChart({ data, labels }: RadarChartProps) {
  const chartData = labels.map((label, index) => ({
    subject: label,
    value: data[index] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
        <Radar
          name="Impact Profile"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
