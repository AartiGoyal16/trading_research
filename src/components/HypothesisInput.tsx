import React from "react";
import { ArrowRight, Lightbulb } from "lucide-react";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function HypothesisInput({ query, setQuery, onAnalyze, isAnalyzing }: Props) {
  const suggestions = [
    "Does buying NIFTY after a 2% fall and holding for 5 days work?",
    "What happens if I sell BankNifty after a 3% rally for 10 days?",
    "Buy Reliance after a 1.5% drop, exit in 3 days."
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
        Market Hypothesis
      </label>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your trading idea here..."
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

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Try an example:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(suggestion)}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition text-left"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}