import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useCoinGeckoStore } from '../../store/coinGeckoStore';
import { useTokenStore } from '../../store/tokenStore';

const CoinSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { searchCoins, getCoinData } = useCoinGeckoStore();
  const { updateTokenData } = useTokenStore();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        const results = await searchCoins(searchQuery);
        setSearchResults(results.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, searchCoins]);

  const handleCoinSelect = async (coinId: string) => {
    const coinData = await getCoinData(coinId);
    if (coinData) {
      updateTokenData({
        name: coinData.name,
        marketCap: coinData.market_cap,
        circulatingSupply: coinData.circulating_supply,
      });
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a cryptocurrency..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
          {searchResults.map((coin) => (
            <button
              key={coin.id}
              onClick={() => handleCoinSelect(coin.id)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center"
            >
              {coin.thumb && (
                <img
                  src={coin.thumb}
                  alt={coin.name}
                  className="w-6 h-6 mr-2 rounded-full"
                />
              )}
              <div>
                <div className="font-medium dark:text-white">{coin.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {coin.symbol.toUpperCase()}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinSearch;