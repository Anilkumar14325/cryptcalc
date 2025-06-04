import React from 'react';
import { Percent, Calendar, Flame, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Slider from '../ui/Slider';
import { useTokenStore } from '../../store/tokenStore';

const SimulationControls: React.FC = () => {
  const { 
    simulationParams, 
    updateSimulationParams,
    runSimulations 
  } = useTokenStore();

  const handleRunSimulation = () => {
    runSimulations();
  };

  return (
    <Card 
      title="Simulation Parameters" 
      className="mb-8 transform hover:translate-y-[-2px] transition-transform"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inflation Rate (% per year)
          </label>
          <div className="flex items-center">
            <Slider
              min={0}
              max={50}
              step={0.1}
              value={simulationParams.inflationRate}
              onChange={(value) => updateSimulationParams({ inflationRate: value })}
              formatValue={(value) => `${value}%`}
              className="flex-grow mr-4"
            />
            <Input
              type="number"
              value={simulationParams.inflationRate.toString()}
              onChange={(e) => updateSimulationParams({ inflationRate: Number(e.target.value) })}
              className="w-20"
              min={0}
              step={0.1}
              leftIcon={<Percent className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            The annual rate at which new tokens are created
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Burn Rate (% per year)
          </label>
          <div className="flex items-center">
            <Slider
              min={0}
              max={25}
              step={0.1}
              value={simulationParams.burnRate}
              onChange={(value) => updateSimulationParams({ burnRate: value })}
              formatValue={(value) => `${value}%`}
              className="flex-grow mr-4"
            />
            <Input
              type="number"
              value={simulationParams.burnRate.toString()}
              onChange={(e) => updateSimulationParams({ burnRate: Number(e.target.value) })}
              className="w-20"
              min={0}
              step={0.1}
              leftIcon={<Flame className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            The annual rate at which tokens are permanently removed from circulation
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projection Timeframe (months)
          </label>
          <div className="flex items-center">
            <Slider
              min={1}
              max={60}
              step={1}
              value={simulationParams.timeframe}
              onChange={(value) => updateSimulationParams({ timeframe: value })}
              formatValue={(value) => `${value} months`}
              className="flex-grow mr-4"
            />
            <Input
              type="number"
              value={simulationParams.timeframe.toString()}
              onChange={(e) => updateSimulationParams({ timeframe: Number(e.target.value) })}
              className="w-20"
              min={1}
              max={60}
              leftIcon={<Calendar className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            How far into the future to project token prices
          </p>
        </div>

        <Button 
          onClick={handleRunSimulation}
          variant="primary"
          fullWidth
          leftIcon={<TrendingUp className="h-5 w-5" />}
        >
          Run Simulation
        </Button>
      </div>
    </Card>
  );
};

export default SimulationControls;