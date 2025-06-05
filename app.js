// State Management
const state = {
    tokenData: {
        name: 'My Token',
        marketCap: 10000000,
        circulatingSupply: 100000000,
        calculatedPrice: 0.1
    },
    simulationParams: {
        inflationRate: 5,
        burnRate: 2,
        timeframe: 24
    },
    simulationResults: {
        baseline: [],
        withInflation: [],
        withBurn: [],
        combined: []
    }
};

// Utility Functions
const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
        return `${(num / 1_000).toFixed(2)}K`;
    }
    return num.toFixed(2);
};

const formatPrice = (price) => {
    if (price >= 1000) {
        return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
        return `$${price.toLocaleString('en-US', { maximumFractionDigits: 4 })}`;
    } else if (price >= 0.01) {
        return `$${price.toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
    }
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 8 })}`;
};

// Calculator Functions
const calculatePrice = () => {
    const { marketCap, circulatingSupply } = state.tokenData;
    state.tokenData.calculatedPrice = marketCap / circulatingSupply;
    updatePriceDisplay();
};

const updatePriceDisplay = () => {
    const priceElement = document.getElementById('calculatedPrice');
    const detailsElement = document.getElementById('priceDetails');
    
    priceElement.textContent = formatPrice(state.tokenData.calculatedPrice);
    detailsElement.innerHTML = `
        Based on a market cap of ${formatNumber(state.tokenData.marketCap)} USD
        <br>
        and circulating supply of ${formatNumber(state.tokenData.circulatingSupply)} tokens
    `;
};

// Simulation Functions
const runSimulations = () => {
    const { tokenData, simulationParams } = state;
    
    state.simulationResults = {
        baseline: generateBaselineData(tokenData, simulationParams),
        withInflation: generateInflationData(tokenData, simulationParams),
        withBurn: generateBurnData(tokenData, simulationParams),
        combined: generateCombinedData(tokenData, simulationParams)
    };
    
    updateCharts();
};

// Chart Configuration
let priceChart, supplyChart;

const initializeCharts = () => {
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    const supplyCtx = document.getElementById('supplyChart').getContext('2d');
    
    priceChart = new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Token Price',
                data: [],
                borderColor: '#6366f1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Price Projection'
                }
            }
        }
    });
    
    supplyChart = new Chart(supplyCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Token Supply',
                data: [],
                borderColor: '#14b8a6',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Supply Projection'
                }
            }
        }
    });
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
    
    // Calculator
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculatePrice);
    
    // Simulation
    const simulateBtn = document.getElementById('simulateBtn');
    simulateBtn.addEventListener('click', runSimulations);
    
    // Initialize displays
    updatePriceDisplay();
    
    // Range input listeners
    ['inflationRate', 'burnRate', 'timeframe'].forEach(param => {
        const input = document.getElementById(param);
        const value = document.getElementById(`${param}Value`);
        
        input.value = state.simulationParams[param];
        value.textContent = `${state.simulationParams[param]}${param.includes('Rate') ? '%' : ' months'}`;
        
        input.addEventListener('input', (e) => {
            state.simulationParams[param] = parseFloat(e.target.value);
            value.textContent = `${e.target.value}${param.includes('Rate') ? '%' : ' months'}`;
        });
    });
});

// Smooth scroll function
const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};