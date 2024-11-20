'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import LineChartComponent from '@/components/charts/line-chart';
import type { Country } from '@/lib/api';

interface Indicator {
  label: string;
  yAxisLabel: string;
  tooltipText?: string;
}

const indicators: Record<string, Indicator> = {
  gdpPerCapita: {
    label: 'GDP per Capita',
    yAxisLabel: 'USD',
  },
  inflation: {
    label: 'Inflation Rate',
    yAxisLabel: '% per year',
  },
  unemployment: {
    label: 'Unemployment Rate',
    yAxisLabel: '% of total labor force',
  },
  tradeBalance: {
    label: 'Trade Balance',
    yAxisLabel: '% of GDP',
  },
  fdi: {
    label: 'FDI',
    yAxisLabel: '% of GDP',
    tooltipText: 'Foreign Direct Investment, net inflows as percentage of GDP',
  },
};

interface IndicatorTabsProps {
  countryData: any[];
  countries: Country[];
  selectedCountries: string[];
}

export function IndicatorTabs({
  countryData,
  countries,
  selectedCountries,
}: IndicatorTabsProps) {
  const countryNames = Object.fromEntries(
    countries.map((country) => [country.id, country.name])
  );

  const chartData = (indicator: keyof typeof indicators) =>
    countryData?.[0]?.[indicator]?.map((item: any) => {
      const dataPoint: any = { year: item.year };
      selectedCountries.forEach((countryId, index) => {
        const value = countryData[index][indicator].find(
          (d: any) => d.year === item.year
        )?.value;
        dataPoint[countryNames[countryId]] = value;
      });
      return dataPoint;
    });

  return (
    <Tabs defaultValue="gdpPerCapita" className="space-y-4">
      <TabsList className="grid grid-cols-5 h-auto bg-muted p-1 relative">
        {Object.entries(indicators).map(([key, { label }], index) => (
          <div key={key} className="relative flex items-center">
            <TabsTrigger
              value={key}
              className="data-[state=active]:bg-background data-[state=active]:text-foreground py-2 px-4 h-full w-full whitespace-normal text-center"
            >
              {label}
            </TabsTrigger>
            {index < Object.entries(indicators).length - 1 && (
              <Separator 
                orientation="vertical" 
                className="absolute right-0 h-[60%] top-1/2 -translate-y-1/2" 
              />
            )}
          </div>
        ))}
      </TabsList>

      {Object.entries(indicators).map(([key, indicator]) => (
        <TabsContent key={key} value={key}>
          <LineChartComponent
            data={chartData(key as keyof typeof indicators)}
            title={indicator.label}
            yAxisLabel={indicator.yAxisLabel}
            tooltipText={indicator.tooltipText ?? indicator.label}
            selectedCountries={selectedCountries}
            countryNames={countryNames}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}