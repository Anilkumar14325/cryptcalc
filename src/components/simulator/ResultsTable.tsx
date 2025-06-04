import React from 'react';
import Card from '../ui/Card';
import { useTokenStore } from '../../store/tokenStore';
import { formatPrice, formatNumber } from '../../utils/calculations';

const ResultsTable: React.FC = () => {
  const { 
    simulationResults, 
    simulationParams,
    tokenData 
  } = useTokenStore();
  
  // If there are no simulation results yet, return nothing
  if (simulationResults.baseline.length === 0) {
    return null;
  }
  
  // Get specific time points to display
  const timePoints = [
    0, // Initial
    Math.floor(simulationParams.timeframe / 4), // 25%
    Math.floor(simulationParams.timeframe / 2), // 50%
    Math.floor(simulationParams.timeframe * 3 / 4), // 75%
    simulationParams.timeframe // 100%
  ];
  
  const getDataPoint = (array: any[], index: number) => {
    return array[index] || array[array.length - 1];
  };
  
  const calculateChange = (currentPrice: number, initialPrice: number) => {
    const change = ((currentPrice - initialPrice) / initialPrice) * 100;
    return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
  };
  
  return (
    <Card 
      title="Simulation Results Summary"
      className="mb-8 transform hover:translate-y-[-2px] transition-transform"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeframe
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Baseline Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                With Inflation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                With Burns
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Combined Effect
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timePoints.map((time, index) => {
              const baseline = getDataPoint(simulationResults.baseline, time);
              const withInflation = getDataPoint(simulationResults.withInflation, time);
              const withBurn = getDataPoint(simulationResults.withBurn, time);
              const combined = getDataPoint(simulationResults.combined, time);
              const initialPrice = simulationResults.baseline[0]?.price || tokenData.calculatedPrice;
              
              const timeLabel = time === 0 
                ? 'Initial' 
                : time === simulationParams.timeframe 
                  ? 'Final' 
                  : `Month ${time}`;
              
              return (
                <tr key={time} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {timeLabel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatPrice(baseline.price)}</div>
                    {time > 0 && (
                      <div className={`text-xs ${
                        baseline.price >= initialPrice ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {calculateChange(baseline.price, initialPrice)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatPrice(withInflation.price)}</div>
                    {time > 0 && (
                      <div className={`text-xs ${
                        withInflation.price >= initialPrice ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {calculateChange(withInflation.price, initialPrice)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatPrice(withBurn.price)}</div>
                    {time > 0 && (
                      <div className={`text-xs ${
                        withBurn.price >= initialPrice ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {calculateChange(withBurn.price, initialPrice)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatPrice(combined.price)}</div>
                    {time > 0 && (
                      <div className={`text-xs ${
                        combined.price >= initialPrice ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {calculateChange(combined.price, initialPrice)}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 italic">
        <p>* Calculations assume market cap remains constant while circulating supply changes</p>
        <p>* Inflation Rate: {simulationParams.inflationRate}% annually, Burn Rate: {simulationParams.burnRate}% annually</p>
      </div>
    </Card>
  );
};

export default ResultsTable;