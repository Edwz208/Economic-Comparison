'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface DataPoint {
  year: number;
  [key: string]: number | string;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  tooltipText?: string;
  selectedCountries: string[];
  countryNames: { [key: string]: string };
}

export default function LineChartComponent({
  data,
  title,
  xAxisLabel = 'Year',
  yAxisLabel,
  tooltipText,
  selectedCountries,
  countryNames,
}: LineChartProps) {
  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {tooltipText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{
                value: xAxisLabel,
                position: 'bottom',
                offset: 0,
              }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -10,
              }}
            />
            <RechartsTooltip />
            <Legend verticalAlign="top" height={36} />
            {selectedCountries.map((countryId, index) => (
              <Line
                key={countryId}
                type="monotone"
                dataKey={countryNames[countryId]}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ fill: colors[index] }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}