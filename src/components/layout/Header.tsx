import React from 'react';
import { Coins } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-accent-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="h-8 w-8 text-secondary-300" />
          <div>
            <h1 className="text-2xl font-bold">CryptoCalc</h1>
            <p className="text-xs text-secondary-200">Token Price Simulator</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#calculator" className="text-white hover:text-secondary-200 transition-colors">
            Calculator
          </a>
          <a href="#simulation" className="text-white hover:text-secondary-200 transition-colors">
            Simulation
          </a>
          <a href="#charts" className="text-white hover:text-secondary-200 transition-colors">
            Charts
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;