import React from 'react';
import { Coins } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="glass-effect backdrop-blur-md shadow-lg z-50 sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-secondary-300" />
            <div>
              <h1 className="text-2xl font-bold text-white">CryptoCalc</h1>
              <p className="text-xs text-secondary-200">Token Price Simulator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;