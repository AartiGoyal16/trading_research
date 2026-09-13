import React from "react";
import { AlertTriangle, Play, Settings2 } from "lucide-react";
import { ExperimentSpec } from "../types";

interface Props {
  spec: ExperimentSpec;
  setSpec: (spec: ExperimentSpec) => void;
  onRunTest: () => void;
  isSimulating: boolean;
}

export default function SpecCard({ spec, setSpec, onRunTest, isSimulating }: Props) {
  // Check if any fields are missing
  const hasMissingData = spec.dropThreshold === null || spec.holdingPeriod === null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Experiment Parameters</h2>
          <p className="text-xs text-slate-400">Review and freely edit your strategy variables.</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${!hasMissingData ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
          {!hasMissingData ? "Ready" : "Incomplete Data"}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 font-mono">INSTRUMENT</span>
            <div className="text-base font-medium text-white mt-1">{spec.instrument}</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 font-mono">ACTION</span>
            <div className="text-base font-medium text-white mt-1">{spec.action}</div>
          </div>
        </div>

        {/* Freely Editable Drop Threshold */}
        <div className={`p-4 rounded-lg bg-slate-950 border ${spec.dropThreshold === null ? 'border-amber-500/50' : 'border-slate-800 transition-colors focus-within:border-emerald-500'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono font-semibold flex items-center gap-2 ${spec.dropThreshold === null ? 'text-amber-400' : 'text-slate-500'}`}>
              {spec.dropThreshold === null ? <AlertTriangle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
              TRIGGER: DAILY DROP (%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              value={spec.dropThreshold !== null ? (spec.dropThreshold * 100).toFixed(1) : ""}
              onChange={(e) => setSpec({ ...spec, dropThreshold: e.target.value ? parseFloat(e.target.value) / 100 : null })}
              placeholder="e.g. 1.5"
              className="bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm focus:border-emerald-500 outline-none w-32"
            />
            <span className="text-sm text-slate-400">percent decline</span>
          </div>
        </div>

        {/* Freely Editable Holding Period */}
        <div className={`p-4 rounded-lg bg-slate-950 border ${spec.holdingPeriod === null ? 'border-amber-500/50' : 'border-slate-800 transition-colors focus-within:border-emerald-500'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono font-semibold flex items-center gap-2 ${spec.holdingPeriod === null ? 'text-amber-400' : 'text-slate-500'}`}>
              {spec.holdingPeriod === null ? <AlertTriangle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
              EXIT: HOLDING PERIOD (DAYS)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="1"
              value={spec.holdingPeriod !== null ? spec.holdingPeriod : ""}
              onChange={(e) => setSpec({ ...spec, holdingPeriod: e.target.value ? parseInt(e.target.value) : null })}
              placeholder="e.g. 5"
              className="bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm focus:border-emerald-500 outline-none w-32"
            />
            <span className="text-sm text-slate-400">trading days</span>
          </div>
        </div>
      </div>

      <button
        disabled={isSimulating}
        onClick={onRunTest}
        className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition ${
          hasMissingData 
            ? "bg-amber-500 hover:bg-amber-400 text-amber-950" 
            : "bg-emerald-500 hover:bg-emerald-400 text-black"
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>
          {isSimulating 
            ? "Running Backtest..." 
            : hasMissingData 
              ? "Run Anyway (Uses System Defaults)" 
              : "Run Historical Simulation"}
        </span>
      </button>
    </div>
  );
}