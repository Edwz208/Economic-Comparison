'use client';

import {
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  XAxisProps as RechartsXAxisProps,
  YAxisProps as RechartsYAxisProps,
} from 'recharts';

interface XAxisProps extends Omit<RechartsXAxisProps, 'ref'> {
  label?: {
    value: string;
    position?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'insideBottom' | 'insideTop';
    offset?: number;
  };
}

interface YAxisProps extends Omit<RechartsYAxisProps, 'ref'> {
  label?: {
    value: string;
    angle?: number;
    position?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'insideLeft' | 'insideRight';
    offset?: number;
  };
}

export function XAxis({ label, ...props }: XAxisProps) {
  return (
    <RechartsXAxis
      {...props}
      label={{
        value: label?.value ?? '',
        position: label?.position ?? 'bottom',
        offset: label?.offset ?? 15,
      }}
    />
  );
}

export function YAxis({ label, ...props }: YAxisProps) {
  return (
    <RechartsYAxis
      {...props}
      label={{
        value: label?.value ?? '',
        angle: label?.angle ?? -90,
        position: label?.position ?? 'insideLeft',
        offset: label?.offset ?? 0,
      }}
    />
  );
}