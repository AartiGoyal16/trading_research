import React from "react";
import { Layers, TrendingUp, Beaker } from "lucide-react";

export default function ResultsDashboard({ results, spec }: { results: any, spec: any }) {
  if (!results) return null;

  const safeWinRate = Number(results.winRate) || 0;
  const safeAvgReturn = Number(results.avgReturn) || 0;
  const displayDrop = spec.dropThreshold !== null ? (spec.dropThreshold * 100).toFixed(1) : "1.0";
  const displayHold = spec.holdingPeriod !== null ? spec.holdingPeriod : "5";

  return (
    <div className="mt-8 space-y-6">
      
      {/* 1. DEFINE: Structured Experiment Block */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="w-5 h-5 text-blue-400" />
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Structured Experiment Definition
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-500 text-xs font-mono">MARKET</span>
            <div className="text-white font-medium mt-1">{spec.instrument}</div>
          </div>
          <div>
            <span className="text-slate-500 text-xs font-mono">ACTION</span>
            <div className="text-white font-medium mt-1">{spec.action}</div>
          </div>
          <div>
            <span className="text-slate-500 text-xs font-mono">ENTRY CONDITION</span>
            <div className="text-white font-medium mt-1">Daily Drop &ge; {displayDrop}%</div>
          </div>
          <div>
            <span className="text-slate-500 text-xs font-mono">EXIT CONDITION</span>
            <div className="text-white font-medium mt-1">Hold {displayHold} Days</div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Occurrences</span>
          <div className="text-xl sm:text-2xl font-bold text-white mt-1">{results.totalTrades} Trades</div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Win Rate</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{safeWinRate.toFixed(1)}%</div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <span className="text-xs text-slate-500 font-mono">Avg Return</span>
          <div className={`text-xl sm:text-2xl font-bold mt-1 ${safeAvgReturn >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
            {safeAvgReturn > 0 ? '+' : ''}{safeAvgReturn.toFixed(2)}%
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-hidden">
          <span className="text-xs text-slate-500 font-mono whitespace-nowrap">Vs Buy & Hold</span>
          <div className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 tracking-tight truncate ${Number(results.avgReturn) > Number(results.buyHoldReturn) ? 'text-emerald-400' : 'text-rose-500'}`}>
            {Number(results.avgReturn) > Number(results.buyHoldReturn) ? 'Outperforms' : 'Underperforms'}
          </div>
        </div>
      </div>

      {/* Interpretation Blocks */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What the data shows</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Historically, {spec.instrument} dropped by {displayDrop}% or more on {results.totalTrades} separate days. {spec.action === "BUY" ? "Buying" : "Selling"} and holding for {displayHold} days generated a net average return of {safeAvgReturn.toFixed(2)}% per trade.
          </p>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Conclusion</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            The strategy resulted in a {safeWinRate.toFixed(1)}% win rate. It currently {Number(results.avgReturn) > Number(results.buyHoldReturn) ? 'outperforms' : 'underperforms'} simply buying and holding the index over the same window.
          </p>
        </div>
      </div>
    </div>
  );
}