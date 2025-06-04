import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Card from '../ui/Card';
import { useTokenStore } from '../../store/tokenStore';
import { formatNumber } from '../../utils/calculations';

const SupplyChart: React.FC = () => {
  const { 
    simulationResults, 
    selectedSimulation 
  } = useTokenStore();
  
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
  
  const chartData = getChartData();
  
  const getColor = () => {
    switch (selectedSimulation) {
      case 'baseline':
        return '#6366f1';
      case 'inflation':
        return '#ef4444';
      case 'burn':
        return '#22c55e';
      case 'combined':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  };
  
  const supplyFormatter = (value: number) => {
    return formatNumber(value);
  };
  
  return (
    <Card 
      title="Circulating Supply Over Time"
      className="mb-8 transform hover:translate-y-[-2px] transition-transform"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              tickFormatter={supplyFormatter}
              label={{ 
                value: 'Circulating Supply', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value: number) => [formatNumber(value), 'Supply']}
              labelFormatter={(value) => `Month ${value}`}
            />
            <Area 
              type="monotone" 
              dataKey="circulatingSupply" 
              stroke={getColor()} 
              fill={getColor()} 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SupplyChart;