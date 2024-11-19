'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import type { Country } from '@/lib/api';

// Using a more detailed TopoJSON source
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const regions = [
  'All',
  'East Asia & Pacific',
  'Europe & Central Asia',
  'Latin America & Caribbean',
  'Middle East & North Africa',
  'North America',
  'South Asia',
  'Sub-Saharan Africa',
];

const defaultMapConfig = {
  scale: 147,
  center: [0, 0],
};

// ISO3 to ISO2 mapping for country codes
const iso3ToIso2: { [key: string]: string } = {
  USA: "US", GBR: "GB", DEU: "DE", FRA: "FR", ITA: "IT", JPN: "JP", CHN: "CN", IND: "IN", BRA: "BR", CAN: "CA", 
  AUS: "AU", RUS: "RU", KOR: "KR", MEX: "MX", IDN: "ID", TUR: "TR", SAU: "SA", ZAF: "ZA", ARG: "AR", THA: "TH",
  EGY: "EG", PAK: "PK", POL: "PL", PHL: "PH", IRN: "IR", MYS: "MY", NGA: "NG", NLD: "NL", ESP: "ES", COL: "CO",
  // Add more mappings as needed
};

export default function WorldMap({ countries }: { countries: Country[] }) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [position, setPosition] = useState(defaultMapConfig);

  const filteredCountries = selectedRegion === 'All' 
    ? countries 
    : countries.filter(country => country.region === selectedRegion);

  const handleCountryClick = (geo: any) => {
    const iso2Code = iso3ToIso2[geo.properties.ISO_A3];
    const country = iso2Code ? filteredCountries.find(c => c.id === iso2Code) : null;
    
    if (country) {
      setSelectedCountries(prev =>
        prev.includes(country.id)
          ? prev.filter(id => id !== country.id)
          : [...prev, country.id]
      );
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Interactive World Map</h2>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden bg-background aspect-[2/1]">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: position.scale,
            }}
          >
            <ZoomableGroup
              center={position.center as [number, number]}
              onMoveEnd={setPosition}
              zoom={1}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso2Code = iso3ToIso2[geo.properties.ISO_A3];
                    const country = iso2Code ? filteredCountries.find(
                      (c) => c.id === iso2Code
                    ) : null;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(geo)}
                        style={{
                          default: {
                            fill: country
                              ? selectedCountries.includes(country.id)
                                ? 'hsl(var(--primary))'
                                : 'hsl(var(--muted))'
                              : 'hsl(var(--muted-foreground) / 0.2)',
                            stroke: 'hsl(var(--border))',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: country
                              ? 'hsl(var(--primary))'
                              : 'hsl(var(--muted-foreground) / 0.2)',
                            stroke: 'hsl(var(--border))',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: country ? 'pointer' : 'default',
                          },
                          pressed: {
                            fill: 'hsl(var(--primary))',
                            stroke: 'hsl(var(--border))',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div className="text-sm text-muted-foreground">
          {selectedCountries.length > 0 ? (
            <p>
              Selected countries:{' '}
              {selectedCountries
                .map(
                  (id) => countries.find((country) => country.id === id)?.name
                )
                .filter(Boolean)
                .join(', ')}
            </p>
          ) : (
            <p>Click on countries to select them</p>
          )}
        </div>
      </div>
    </Card>
  );
}