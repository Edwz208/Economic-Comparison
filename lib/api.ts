import { cache } from 'react';

const WORLD_BANK_API = 'https://api.worldbank.org/v2';

export type Indicator = {
  id: string;
  name: string;
  value: number;
  year: number;
};

export type Country = {
  id: string;
  name: string;
  region: string;
  capitalCity: string;
  longitude: string;
  latitude: string;
};

const INDICATORS = {
  gdpPerCapita: 'NY.GDP.PCAP.CD',
  inflation: 'FP.CPI.TOTL.ZG',
  unemployment: 'SL.UEM.TOTL.ZS',
  tradeBalance: 'NE.RSB.GNFS.ZS',
  fdi: 'BX.KLT.DINV.WD.GD.ZS',
};

export const getCountries = cache(async (): Promise<Country[]> => {
  try {
    const response = await fetch(
      `${WORLD_BANK_API}/country?format=json&per_page=300`
    );
    const [metadata, data] = await response.json();
    return data?.map((country: any) => ({
      id: country.id,
      name: country.name,
      region: country.region.value,
      capitalCity: country.capitalCity,
      longitude: country.longitude,
      latitude: country.latitude,
    })) || [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
});

export const getIndicator = cache(
  async (
    countryId: string,
    indicator: keyof typeof INDICATORS,
    startYear = 2015,
    endYear = 2023
  ): Promise<Indicator[]> => {
    try {
      const response = await fetch(
        `${WORLD_BANK_API}/country/${countryId}/indicator/${
          INDICATORS[indicator]
        }?format=json&date=${startYear}:${endYear}`
      );
      const [metadata, data] = await response.json();
      return (
        data
          ?.map((item: any) => ({
            id: INDICATORS[indicator],
            name: indicator,
            value: item.value,
            year: parseInt(item.date),
          }))
          .filter((item: Indicator) => item.value != null)
          .reverse() || []
      );
    } catch (error) {
      console.error('Error fetching indicator:', error);
      return [];
    }
  }
);

export const getIndicators = cache(
  async (countryId: string): Promise<Record<string, Indicator[]>> => {
    try {
      const indicators = await Promise.all(
        Object.keys(INDICATORS).map((indicator) =>
          getIndicator(countryId, indicator as keyof typeof INDICATORS)
        )
      );

      return Object.fromEntries(
        Object.keys(INDICATORS).map((key, index) => [key, indicators[index]])
      );
    } catch (error) {
      console.error('Error fetching indicators:', error);
      return {};
    }
  }
);