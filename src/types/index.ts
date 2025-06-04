export interface TokenData {
  name: string;
  marketCap: number;
  circulatingSupply: number;
  calculatedPrice: number;
}

export interface SimulationParams {
  inflationRate: number;
  burnRate: number;
  timeframe: number; // in months
}

export interface DataPoint {
  month: number;
  price: number;
  marketCap: number;
  circulatingSupply: number;
}

export interface SimulationResult {
  baseline: DataPoint[];
  withInflation: DataPoint[];
  withBurn: DataPoint[];
  combined: DataPoint[];
}

export type SimulationType = 'baseline' | 'inflation' | 'burn' | 'combined';