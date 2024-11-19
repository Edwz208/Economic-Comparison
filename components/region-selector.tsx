'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Country } from '@/lib/api';

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

interface RegionSelectorProps {
  region: string;
  setRegion: (value: string) => void;
  countries: Country[];
  selectedCountry: string | undefined;
  onCountryChange: (value: string) => void;
  label: string;
}

export function RegionSelector({
  region,
  setRegion,
  countries,
  selectedCountry,
  onCountryChange,
  label,
}: RegionSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label>Region {label}</Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Country {label}</Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}