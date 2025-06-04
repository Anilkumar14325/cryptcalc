import { create } from 'zustand';
import { 
  TokenData, 
  SimulationParams, 
  SimulationResult,
  SimulationType
} from '../types';
import { 
  generateBaselineData, 
  generateInflationData,
  generateBurnData,
  generateCombinedData
} from '../utils/calculations';

interface TokenState {
  tokenData: TokenData;
  simulationParams: SimulationParams;
  simulationResults: SimulationResult;
  selectedSimulation: SimulationType;
  updateTokenData: (data: Partial<TokenData>) => void;
  updateSimulationParams: (params: Partial<SimulationParams>) => void;
  calculatePrice: () => void;
  runSimulations: () => void;
  setSelectedSimulation: (type: SimulationType) => void;
}

const defaultTokenData: TokenData = {
  name: 'My Token',
  marketCap: 10000000, // $10M
  circulatingSupply: 100000000, // 100M tokens
  calculatedPrice: 0.1, // Calculated from the above
};

const defaultSimulationParams: SimulationParams = {
  inflationRate: 5, // 5% annually
  burnRate: 2, // 2% annually
  timeframe: 24, // 24 months
};

export const useTokenStore = create<TokenState>((set, get) => ({
  tokenData: defaultTokenData,
  simulationParams: defaultSimulationParams,
  simulationResults: {
    baseline: [],
    withInflation: [],
    withBurn: [],
    combined: [],
  },
  selectedSimulation: 'baseline',

  updateTokenData: (data) => {
    set((state) => ({
      tokenData: { ...state.tokenData, ...data },
    }));
    get().calculatePrice();
  },

  updateSimulationParams: (params) => {
    set((state) => ({
      simulationParams: { ...state.simulationParams, ...params },
    }));
  },

  calculatePrice: () => {
    const { marketCap, circulatingSupply } = get().tokenData;
    const calculatedPrice = marketCap / circulatingSupply;
    
    set((state) => ({
      tokenData: { ...state.tokenData, calculatedPrice },
    }));
  },

  runSimulations: () => {
    const { tokenData, simulationParams } = get();
    
    const baseline = generateBaselineData(tokenData, simulationParams);
    const withInflation = generateInflationData(tokenData, simulationParams);
    const withBurn = generateBurnData(tokenData, simulationParams);
    const combined = generateCombinedData(tokenData, simulationParams);
    
    set({
      simulationResults: {
        baseline,
        withInflation,
        withBurn,
        combined,
      },
    });
  },

  setSelectedSimulation: (type) => {
    set({ selectedSimulation: type });
  },
}));