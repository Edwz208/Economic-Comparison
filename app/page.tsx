import { Suspense } from 'react';
import { getCountries } from '@/lib/api';
import CountryComparison from '@/components/country-comparison';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className="container py-6">
      <Suspense fallback={
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </Card>
      }>
        <CountryComparison countries={countries} />
      </Suspense>
    </div>
  );
}