import { SimulationResults } from '../types';

// Mock historical prices for NIFTY to act as our simulation dataset
const MOCK_PRICES = [
  21800, 21850, 21920, 21500, 21450, 21600, 21750, 21900, 21400, 21550,
  21620, 21300, 21100, 21400, 21500, 21600, 21700, 21850, 21950, 22000,
  21600, 21400, 21550, 21700, 21800, 21900, 21450, 21500, 21700, 21850,
  22100, 22250, 21800, 21750, 21900, 22050, 21650, 21800, 21950, 22100,
  22300, 22400, 22000, 22150, 22300, 22450, 22050, 22200, 22350, 22500,
  22100, 21800, 21900, 22050, 22150, 22300, 22400, 21900, 21750, 21850
];

export function runHistoricalSimulation(dropThreshold: number, holdingPeriod: number): SimulationResults {
  const costPerTrade = 0.0005; // 0.05% slippage and brokerage
  let winningTrades = 0;
  let totalTrades = 0;
  let cumulativeReturn = 0;

  for (let i = 1; i < MOCK_PRICES.length - holdingPeriod; i++) {
    const prevClose = MOCK_PRICES[i - 1];
    const todayClose = MOCK_PRICES[i];
    
    // Check if the drop meets or exceeds our threshold
    if ((todayClose - prevClose) / prevClose <= -dropThreshold) {
      totalTrades++;
      
      const entryPrice = todayClose;
      const exitPrice = MOCK_PRICES[i + holdingPeriod];
      const netReturn = ((exitPrice - entryPrice) / entryPrice) - costPerTrade;
      
      cumulativeReturn += netReturn;
      if (netReturn > 0) winningTrades++;
      
      // Skip ahead to prevent overlapping trade logic
      i += holdingPeriod; 
    }
  }

  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const avgReturn = totalTrades > 0 ? (cumulativeReturn / totalTrades) * 100 : 0;
  const buyHoldReturn = ((MOCK_PRICES[MOCK_PRICES.length - 1] - MOCK_PRICES[0]) / MOCK_PRICES[0]) * 100;

  return {
    totalTrades,
    winRate: winRate.toFixed(1),
    avgReturn: avgReturn.toFixed(2),
    buyHoldReturn: buyHoldReturn.toFixed(2),
  };
}