import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import Card from '../ui/Card';
import { useTokenStore } from '../../store/tokenStore';
import { SimulationType } from '../../types';
import { formatPrice } from '../../utils/calculations';

const PriceChart: React.FC = () => {
  const { 
    simulationResults, 
    selectedSimulation, 
    setSelectedSimulation,
    tokenData 
  } = useTokenStore();
  
  const [hoverData, setHoverData] = useState<{
    month: number;
    price: number;
    percentChange: number;
  } | null>(null);
  
  const handleMouseMove = (data: any) => {
    if (data && data.activePayload && data.activePayload.length) {
      const payload = data.activePayload[0].payload;
      const initialPrice = simulationResults.baseline[0]?.price || tokenData.calculatedPrice;
      const percentChange = ((payload.price - initialPrice) / initialPrice) * 100;
      
      setHoverData({
        month: payload.month,
        price: payload.price,
        percentChange,
      });
    }
  };
  
  const handleMouseLeave = () => {
    setHoverData(null);
  };
  
  const simulationTypes: { id: SimulationType; label: string; color: string }[] = [
    { id: 'baseline', label: 'Baseline', color: '#6366f1' },
    { id: 'inflation', label: 'With Inflation', color: '#ef4444' },
    { id: 'burn', label: 'With Burns', color: '#22c55e' },
    { id: 'combined', label: 'Combined Effect', color: '#f59e0b' },
  ];
  
  const getChartData = () => {
    switch (selectedSimulation) {
      case 'baseline':
        return simulationResults.baseline;
      case 'inflation':
        return simulationResults.withInflation;
      case 'burn':
        return simulationResults.withBurn;
      case 'combined':
        return simulationResults.combined;
      default:
        return simulationResults.baseline;
    }
  };
  
  const getCurrentSimulation = () => {
    return simulationTypes.find(s => s.id === selectedSimulation) || simulationTypes[0];
  };
  
  const currentSim = getCurrentSimulation();
  const chartData = getChartData();
  
  const initialPrice = simulationResults.baseline[0]?.price || tokenData.calculatedPrice;
  const finalPrice = chartData[chartData.length - 1]?.price || initialPrice;
  const totalPercentChange = ((finalPrice - initialPrice) / initialPrice) * 100;
  
  const priceFormatter = (value: number) => {
    return formatPrice(value);
  };
  
  return (
    <Card 
      title="Price Projection Chart"
      className="mb-8 transform hover:translate-y-[-2px] transition-transform"
    >
      <div className="flex flex-wrap gap-2 mb-6">
        {simulationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedSimulation(type.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedSimulation === type.id 
                ? `bg-${type.color} text-white` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            style={{
              backgroundColor: selectedSimulation === type.id ? type.color : undefined,
            }}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            {currentSim.label} Projection
          </h3>
          <p className="text-sm text-gray-500">
            {tokenData.name} price over time
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg px-4 py-2 mt-2 sm:mt-0">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Total Change:</span>
            <span className={`text-sm font-bold ${totalPercentChange >= 0 ? 'text-success-600' : 'text-error-600'}`}>
              {totalPercentChange >= 0 ? '+' : ''}{totalPercentChange.toFixed(2)}%
            </span>
          </div>
          {hoverData && (
            <div className="text-xs text-gray-500 mt-1">
              Month {hoverData.month}: {formatPrice(hoverData.price)} 
              ({hoverData.percentChange >= 0 ? '+' : ''}{hoverData.percentChange.toFixed(2)}%)
            </div>
          )}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              label={{ 
                value: 'Months', 
                position: 'insideBottomRight', 
                offset: -10 
              }}
            />
            <YAxis
              tickFormatter={priceFormatter}
              label={{ 
                value: 'Price (USD)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value: number) => [formatPrice(value), 'Price']}
              labelFormatter={(value) => `Month ${value}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name={currentSim.label}
              stroke={currentSim.color}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PriceChart;