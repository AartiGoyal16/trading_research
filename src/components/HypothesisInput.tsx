import React from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function HypothesisInput({ query, setQuery, onAnalyze, isAnalyzing }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
        Market Hypothesis
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Does buying NIFTY after a 2% fall and holding for 5 days work?"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
        />
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !query.trim()}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg text-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? "Parsing..." : "Parse Intent"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Tip: Try specifying exact parameters like &quot;2% fall&quot; to bypass the clarification step.
      </p>
    </div>
  );
}