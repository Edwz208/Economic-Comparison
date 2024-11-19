'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card } from '@/components/ui/card';
import { RegionSelector } from '@/components/region-selector';
import { IndicatorTabs } from '@/components/indicator-tabs';
import { getIndicators, type Country } from '@/lib/api';

const fetcher = (countries: string[]) =>
  Promise.all(countries.map((countryId) => getIndicators(countryId)));

export default function CountryComparison({
  countries,
}: {
  countries: Country[];
}) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegion1, setSelectedRegion1] = useState<string>('North America');
  const [selectedRegion2, setSelectedRegion2] = useState<string>('East Asia & Pacific');

  // Set initial countries on component mount
  useEffect(() => {
    setSelectedCountries(['US', 'CN']);
  }, []);

  const { data: countryData, error } = useSWR(
    selectedCountries.length ? selectedCountries : null,
    fetcher
  );

  const filteredCountries1 = countries.filter(
    country => selectedRegion1 === 'All' || country.region === selectedRegion1
  );

  const filteredCountries2 = countries.filter(
    country => selectedRegion2 === 'All' || country.region === selectedRegion2
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Country Comparison</h2>
          <div className="flex flex-wrap gap-4">
            <RegionSelector
              region={selectedRegion1}
              setRegion={setSelectedRegion1}
              countries={filteredCountries1}
              selectedCountry={selectedCountries[0]}
              onCountryChange={(value) =>
                setSelectedCountries(prev => [value, prev[1]])
              }
              label="1"
            />
            <RegionSelector
              region={selectedRegion2}
              setRegion={setSelectedRegion2}
              countries={filteredCountries2}
              selectedCountry={selectedCountries[1]}
              onCountryChange={(value) =>
                setSelectedCountries(prev => [prev[0], value])
              }
              label="2"
            />
          </div>
        </div>

        {countryData && (
          <IndicatorTabs 
            countryData={countryData} 
            countries={countries}
            selectedCountries={selectedCountries}
          />
        )}
      </div>
    </Card>
  );
}