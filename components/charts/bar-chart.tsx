'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
}

export default function BarChartComponent({
  data,
  title,
  xAxisLabel = '',
  yAxisLabel = '',
  color = 'hsl(var(--primary))',
}: BarChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxisLabel,
                position: 'bottom',
                offset: 15,
              }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: 0,
              }}
            />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}