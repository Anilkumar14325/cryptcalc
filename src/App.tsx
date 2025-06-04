import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/hero/Hero';
import TokenCalculator from './components/calculator/TokenCalculator';
import SimulationControls from './components/simulator/SimulationControls';
import PriceChart from './components/charts/PriceChart';
import SupplyChart from './components/charts/SupplyChart';
import ResultsTable from './components/simulator/ResultsTable';
import BlogPost from './components/blog/BlogPost';
import { useTokenStore } from './store/tokenStore';
import { useThemeStore } from './store/themeStore';

function App() {
  const { runSimulations, tokenData, simulationParams } = useTokenStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Run initial simulations on app load
    runSimulations();
  }, [runSimulations]);

  useEffect(() => {
    // Update theme class on body
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <Layout>
      <Hero />
      
      <section id="calculator" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Token Price Calculator</h2>
        <TokenCalculator />
      </section>
      
      <section id="simulation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Price Simulation</h2>
        <SimulationControls />
      </section>
      
      <section id="charts" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Price Projections</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PriceChart />
          <SupplyChart />
        </div>
        <ResultsTable />
      </section>

      <section id="blog" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Analysis & Insights</h2>
        <BlogPost
          title="Token Price Analysis"
          content={`Based on the current market cap of $${tokenData.marketCap.toLocaleString()} and circulating supply of ${tokenData.circulatingSupply.toLocaleString()} tokens, we project various scenarios over ${simulationParams.timeframe} months. The simulation includes an inflation rate of ${simulationParams.inflationRate}% and a burn rate of ${simulationParams.burnRate}%.`}
          data={{
            initialPrice: tokenData.calculatedPrice,
            marketCap: tokenData.marketCap,
            circulatingSupply: tokenData.circulatingSupply,
            timeframe: simulationParams.timeframe,
            inflationRate: simulationParams.inflationRate,
            burnRate: simulationParams.burnRate,
          }}
        />
      </section>
    </Layout>
  );
}

export default App;