import React from "react";
import { Layers, TrendingUp, HelpCircle } from "lucide-react";
import { SimulationResults, ExperimentSpec } from "../types";

interface Props {
  results: SimulationResults;
  spec: ExperimentSpec;
}

export default function ResultsDashboard({ results, spec }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3">Research Findings</h2>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-500">Occurrences</div>
          <div className="text-xl font-bold text-white mt-1">{results.totalTrades} Trades</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-500">Win Rate</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{results.winRate}%</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-500">Avg Return</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{Number(results.avgReturn) > 0 ? '+' : ''}{results.avgReturn}%</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-500">Vs Buy & Hold</div>
          <div className="text-xl font-bold text-rose-400 mt-1">Underperform</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            What the Data Shows (Objective Fact)
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Historically, {spec.instrument} dropped by {spec.dropThreshold ? (spec.dropThreshold * 100).toFixed(1) : "X"}% or more on {results.totalTrades} separate days. Holding for {spec.holdingPeriod} days generated a net average return of {results.avgReturn}% per trade after 0.05% friction costs.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            System Interpretation (Conclusion)
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            The data suggests a mild mean-reversion edge. However, the sample size is statistically weak, and the strategy underperformed simply buying and holding the index over the same window.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Suggested Next Steps
          </div>
          <ul className="text-sm text-slate-300 list-disc list-inside space-y-1.5">
            <li>Does extending the holding period to 15 days improve the total return?</li>
            <li>How did this strategy perform specifically during the 2020 bear market?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}