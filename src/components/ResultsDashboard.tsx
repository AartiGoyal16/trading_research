import React from "react";
import { Layers, TrendingUp } from "lucide-react";

export default function ResultsDashboard({ results }: { results: any }) {
  if (!results) return null;

  console.log("API Results:", results);
  // Force string responses from the API into strict numbers to prevent .toFixed crashes
  const safeWinRate = Number(results.winRate) || 0;
  const safeAvgReturn = Number(results.avgReturn) || 0;

  return (
    <div className="mt-8 space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Occurrences */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Occurrences</span>
          <div className="text-xl sm:text-2xl font-bold text-white mt-1">
            {results.totalTrades} Trades
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Win Rate</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
            {safeWinRate.toFixed(1)}%
          </div>
        </div>

        {/* Avg Return */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Avg Return</span>
          <div className={`text-xl sm:text-2xl font-bold mt-1 ${safeAvgReturn >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
            {safeAvgReturn > 0 ? '+' : ''}{safeAvgReturn.toFixed(2)}%
          </div>
        </div>

        {/* Vs Buy & Hold */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-hidden">
          <span className="text-xs text-slate-500 font-mono whitespace-nowrap">Vs Buy & Hold</span>
          <div className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 tracking-tight truncate ${Number(results.avgReturn) > Number(results.buyHoldReturn) ? 'text-emerald-400' : 'text-rose-500'}`}>
            {Number(results.avgReturn) > Number(results.buyHoldReturn) ? 'Outperforms' : 'Underperforms'}
          </div>
        </div>
      </div>

      {/* Objective Fact Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-emerald-500" />
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            What the data shows (Objective Fact)
          </h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {results.factText || `Historically, the instrument triggered this event on ${results.totalTrades} separate days. Holding for the specified duration generated a net average return of ${safeAvgReturn.toFixed(2)}% per trade after friction costs.`}
        </p>
      </div>

      {/* Conclusion Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            System Interpretation (Conclusion)
          </h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {results.conclusionText || `The strategy resulted in a ${safeWinRate.toFixed(1)}% win rate. Overall, it is currently categorized as a ${results.vsBuyAndHold === 'Underperform' ? 'weak' : 'strong'} quantitative signal compared to the baseline.`}
        </p>
      </div>
    </div>
  );
}