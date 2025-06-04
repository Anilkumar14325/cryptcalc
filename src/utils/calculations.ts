import { DataPoint, SimulationParams, TokenData } from '../types';

// Calculate token price from market cap and circulating supply
export const calculateTokenPrice = (marketCap: number, circulatingSupply: number): number => {
  if (circulatingSupply <= 0) return 0;
  return marketCap / circulatingSupply;
};

// Generate baseline data points (no inflation or burn)
export const generateBaselineData = (
  tokenData: TokenData,
  params: SimulationParams
): DataPoint[] => {
  const { marketCap, circulatingSupply } = tokenData;
  const { timeframe } = params;
  
  const dataPoints: DataPoint[] = [];
  
  for (let month = 0; month <= timeframe; month++) {
    dataPoints.push({
      month,
      price: calculateTokenPrice(marketCap, circulatingSupply),
      marketCap,
      circulatingSupply,
    });
  }
  
  return dataPoints;
};

// Generate data with inflation applied
export const generateInflationData = (
  tokenData: TokenData,
  params: SimulationParams
): DataPoint[] => {
  const { marketCap: initialMarketCap, circulatingSupply: initialSupply } = tokenData;
  const { inflationRate, timeframe } = params;
  
  const dataPoints: DataPoint[] = [];
  let currentSupply = initialSupply;
  
  for (let month = 0; month <= timeframe; month++) {
    // Monthly inflation rate (annual rate divided by 12)
    const monthlyInflation = inflationRate / 12 / 100;
    
    if (month > 0) {
      // Apply monthly inflation to the supply
      currentSupply = currentSupply * (1 + monthlyInflation);
    }
    
    const price = calculateTokenPrice(initialMarketCap, currentSupply);
    
    dataPoints.push({
      month,
      price,
      marketCap: initialMarketCap,
      circulatingSupply: currentSupply,
    });
  }
  
  return dataPoints;
};

// Generate data with burn applied
export const generateBurnData = (
  tokenData: TokenData,
  params: SimulationParams
): DataPoint[] => {
  const { marketCap: initialMarketCap, circulatingSupply: initialSupply } = tokenData;
  const { burnRate, timeframe } = params;
  
  const dataPoints: DataPoint[] = [];
  let currentSupply = initialSupply;
  
  for (let month = 0; month <= timeframe; month++) {
    // Monthly burn rate (annual rate divided by 12)
    const monthlyBurn = burnRate / 12 / 100;
    
    if (month > 0) {
      // Apply monthly burn to the supply
      currentSupply = currentSupply * (1 - monthlyBurn);
    }
    
    const price = calculateTokenPrice(initialMarketCap, currentSupply);
    
    dataPoints.push({
      month,
      price,
      marketCap: initialMarketCap,
      circulatingSupply: currentSupply,
    });
  }
  
  return dataPoints;
};

// Generate data with both inflation and burn applied
export const generateCombinedData = (
  tokenData: TokenData,
  params: SimulationParams
): DataPoint[] => {
  const { marketCap: initialMarketCap, circulatingSupply: initialSupply } = tokenData;
  const { inflationRate, burnRate, timeframe } = params;
  
  const dataPoints: DataPoint[] = [];
  let currentSupply = initialSupply;
  
  for (let month = 0; month <= timeframe; month++) {
    // Monthly rates (annual rate divided by 12)
    const monthlyInflation = inflationRate / 12 / 100;
    const monthlyBurn = burnRate / 12 / 100;
    
    if (month > 0) {
      // Apply monthly inflation and burn to the supply
      const netRate = monthlyInflation - monthlyBurn;
      currentSupply = currentSupply * (1 + netRate);
    }
    
    const price = calculateTokenPrice(initialMarketCap, currentSupply);
    
    dataPoints.push({
      month,
      price,
      marketCap: initialMarketCap,
      circulatingSupply: currentSupply,
    });
  }
  
  return dataPoints;
};

// Format large numbers to be more readable
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toFixed(2);
};

// Format price with appropriate decimal places based on magnitude
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  } else if (price >= 1) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 4 })}`;
  } else if (price >= 0.01) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
  } else {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 8 })}`;
  }
};