'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface DataPoint {
  subject: string;
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
}

export default function RadarChartComponent({
  data,
  title,
  color = 'hsl(var(--primary))',
}: RadarChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
              name="Value"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}