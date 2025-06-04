import { create } from 'zustand';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  current_price: number;
}

interface CoinGeckoState {
  coins: CoinData[];
  loading: boolean;
  error: string | null;
  fetchCoins: () => Promise<void>;
  searchCoins: (query: string) => Promise<CoinData[]>;
  getCoinData: (id: string) => Promise<CoinData | null>;
}

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useCoinGeckoStore = create<CoinGeckoState>((set, get) => ({
  coins: [],
  loading: false,
  error: null,

  fetchCoins: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false`
      );
      const data = await response.json();
      set({ coins: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch coins', loading: false });
    }
  },

  searchCoins: async (query: string) => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.coins || [];
    } catch (error) {
      set({ error: 'Failed to search coins' });
      return [];
    }
  },

  getCoinData: async (id: string) => {
    try {
      const response = await fetch(`${COINGECKO_API}/coins/${id}`);
      const data = await response.json();
      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        market_cap: data.market_data.market_cap.usd,
        total_supply: data.market_data.total_supply,
        circulating_supply: data.market_data.circulating_supply,
        current_price: data.market_data.current_price.usd,
      };
    } catch (error) {
      set({ error: 'Failed to fetch coin data' });
      return null;
    }
  },
}));