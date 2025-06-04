import React from 'react';
import { Coins, TrendingUp, BarChart2 } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-accent-900 text-white rounded-2xl mb-12 p-8 sm:p-12">
      <div className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Crypto Token Price Calculator & Simulator
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-8">
            Calculate token prices based on market cap and circulating supply. Simulate inflation, burns, and project prices over time with interactive charts.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              variant="secondary"
              size="lg"
              leftIcon={<Coins className="h-5 w-5" />}
            >
              Calculate Now
            </Button>
            <Button 
              onClick={() => document.getElementById('simulation')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="bg-white bg-opacity-10 text-white border-white border-opacity-20 hover:bg-opacity-20"
              leftIcon={<TrendingUp className="h-5 w-5" />}
            >
              Run Simulation
            </Button>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Coins className="h-6 w-6 text-secondary-300" />}
            title="Price Calculation"
            description="Calculate token price based on market cap and circulating supply with real-time updates."
          />
          <FeatureCard 
            icon={<TrendingUp className="h-6 w-6 text-secondary-300" />}
            title="Price Projections"
            description="Project token prices over time with adjustable inflation and burn rates."
          />
          <FeatureCard 
            icon={<BarChart2 className="h-6 w-6 text-secondary-300" />}
            title="Visual Charts"
            description="Visualize price trends and supply changes with interactive charts."
          />
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-white" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-white" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
        </svg>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 transform transition-transform hover:translate-y-[-4px]">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default Hero;