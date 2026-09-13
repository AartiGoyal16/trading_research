import React from "react";
import { CheckCircle2, AlertTriangle, Play } from "lucide-react";
import { ExperimentSpec } from "../types";

interface Props {
  spec: ExperimentSpec;
  setSpec: (spec: ExperimentSpec) => void;
  onRunTest: () => void;
  isSimulating: boolean;
}

export default function SpecCard({ spec, setSpec, onRunTest, isSimulating }: Props) {
  const isReady = spec.dropThreshold !== null && spec.holdingPeriod !== null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Experiment Specification</h2>
          <p className="text-xs text-slate-400">Verify parameters before running historical test.</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${isReady ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
          {isReady ? "Ready for Backtest" : "Missing Parameters"}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 font-mono">INSTRUMENT</span>
            <div className="text-base font-medium text-white flex items-center gap-2 mt-1">
              {spec.instrument} <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 font-mono">ACTION INTENT</span>
            <div className="text-base font-medium text-white flex items-center gap-2 mt-1">
              {spec.action} <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg bg-slate-950 border ${spec.dropThreshold === null ? 'border-amber-500/50' : 'border-slate-800'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono font-semibold flex items-center gap-2 ${spec.dropThreshold === null ? 'text-amber-400' : 'text-slate-500'}`}>
              {spec.dropThreshold === null && <AlertTriangle className="w-4 h-4" />}
              TRIGGER CONDITION
            </span>
          </div>
          {spec.dropThreshold === null ? (
            <select
              className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm focus:border-emerald-500 outline-none"
              onChange={(e) => setSpec({ ...spec, dropThreshold: parseFloat(e.target.value) })}
              defaultValue=""
            >
              <option value="" disabled>Select drop threshold...</option>
              <option value="0.01">Daily drop ≥ 1.0%</option>
              <option value="0.015">Daily drop ≥ 1.5%</option>
              <option value="0.02">Daily drop ≥ 2.0%</option>
            </select>
          ) : (
             <div className="text-sm text-white">Daily drop ≥ {(spec.dropThreshold * 100).toFixed(1)}%</div>
          )}
        </div>

        <div className={`p-4 rounded-lg bg-slate-950 border ${spec.holdingPeriod === null ? 'border-amber-500/50' : 'border-slate-800'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono font-semibold flex items-center gap-2 ${spec.holdingPeriod === null ? 'text-amber-400' : 'text-slate-500'}`}>
              {spec.holdingPeriod === null && <AlertTriangle className="w-4 h-4" />}
              EXIT STRATEGY
            </span>
          </div>
          {spec.holdingPeriod === null ? (
            <select
              className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm focus:border-emerald-500 outline-none"
              onChange={(e) => setSpec({ ...spec, holdingPeriod: parseInt(e.target.value) })}
              defaultValue=""
            >
              <option value="" disabled>Select hold duration...</option>
              <option value="3">3 Trading Days</option>
              <option value="5">5 Trading Days</option>
              <option value="10">10 Trading Days</option>
            </select>
          ) : (
            <div className="text-sm text-white">Hold position for {spec.holdingPeriod} Trading Days</div>
          )}
        </div>
      </div>

      <button
        disabled={!isReady || isSimulating}
        onClick={onRunTest}
        className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition ${
          isReady && !isSimulating ? "bg-emerald-500 hover:bg-emerald-400 text-black" : "bg-slate-800 text-slate-500 cursor-not-allowed"
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>{isSimulating ? "Running Backtest..." : isReady ? "Run Historical Simulation" : "Resolve Missing Parameters"}</span>
      </button>
    </div>
  );
}