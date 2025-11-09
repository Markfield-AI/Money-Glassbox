import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import type { AllocationData } from '@shared/schema';

interface DonutChartProps {
  data: AllocationData[];
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
