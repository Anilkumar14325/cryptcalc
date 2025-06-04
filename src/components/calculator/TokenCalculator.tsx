import React, { useEffect } from 'react';
import { DollarSign, Coins, BarChart3 } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CoinSearch from './CoinSearch';
import { useTokenStore } from '../../store/tokenStore';
import { formatNumber, formatPrice } from '../../utils/calculations';

const TokenCalculator: React.FC = () => {
  const { 
    tokenData, 
    updateTokenData, 
    calculatePrice,
    runSimulations
  } = useTokenStore();

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleCalculate = () => {
    calculatePrice();
    runSimulations();
  };

  return (
    <Card 
      title="Token Price Calculator" 
      className="mb-8 transform hover:translate-y-[-2px] transition-transform dark:bg-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CoinSearch />
          
          <Input
            id="tokenName"
            label="Token Name"
            value={tokenData.name}
            onChange={(e) => updateTokenData({ name: e.target.value })}
            placeholder="e.g., Bitcoin, Ethereum, My Token"
            leftIcon={<Coins className="h-5 w-5 text-gray-400" />}
          />

          <Input
            id="marketCap"
            type="number"
            label="Market Cap (USD)"
            value={tokenData.marketCap.toString()}
            onChange={(e) => updateTokenData({ marketCap: Number(e.target.value) })}
            placeholder="e.g., 10000000"
            helperText="Total market capitalization in USD"
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
          />

          <Input
            id="circulatingSupply"
            type="number"
            label="Circulating Supply"
            value={tokenData.circulatingSupply.toString()}
            onChange={(e) => updateTokenData({ circulatingSupply: Number(e.target.value) })}
            placeholder="e.g., 21000000"
            helperText="Total number of tokens in circulation"
            leftIcon={<BarChart3 className="h-5 w-5 text-gray-400" />}
          />

          <div className="mt-6">
            <Button 
              onClick={handleCalculate}
              fullWidth
              className="mt-2"
            >
              Calculate Price
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Current Token Price</h3>
          
          <div className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-2 animate-pulse-slow">
            {formatPrice(tokenData.calculatedPrice)}
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            Based on a market cap of {formatNumber(tokenData.marketCap)} USD
            <br />
            and circulating supply of {formatNumber(tokenData.circulatingSupply)} tokens
          </div>
          
          <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
            <p>Price = Market Cap ÷ Circulating Supply</p>
            <p className="mt-1">{formatPrice(tokenData.calculatedPrice)} = {formatNumber(tokenData.marketCap)} ÷ {formatNumber(tokenData.circulatingSupply)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TokenCalculator;