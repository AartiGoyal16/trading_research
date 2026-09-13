"use client";

import React, { useState } from "react";
import HypothesisInput from "@/components/HypothesisInput";
import SpecCard from "@/components/SpecCard";
import ResultsDashboard from "@/components/ResultsDashboard";
import { WorkflowState, ExperimentSpec, SimulationResults } from "@/types";

export default function ResearchPlatform() {
  const [workflow, setWorkflow] = useState<WorkflowState>("ASK");
  const [query, setQuery] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  
  const [spec, setSpec] = useState<ExperimentSpec>({
    instrument: "NIFTY 50",
    action: "BUY",
    dropThreshold: null,
    holdingPeriod: null,
  });

  const [results, setResults] = useState<SimulationResults | null>(null);

  const handleAnalyze = async () => {
    setWorkflow("ANALYZING");
    setResults(null);
    
    try {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) throw new Error("Failed to parse");
      const data = await response.json();
      
      setSpec({
        instrument: data.instrument || "NIFTY 50",
        action: data.action || "BUY",
        dropThreshold: data.dropThreshold || null,
        holdingPeriod: data.holdingPeriod || null,
      });
      setWorkflow("BUILDING_SPEC");
    } catch (error) {
      console.error(error);
      setWorkflow("ASK");
      alert("Failed to parse the query. Please ensure your API key is valid.");
    }
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Inject safe defaults if the user left the fields blank
          dropThreshold: spec.dropThreshold !== null ? spec.dropThreshold : 0.01, 
          holdingPeriod: spec.holdingPeriod !== null ? spec.holdingPeriod : 5 
        }),
      });
      
      if (!response.ok) throw new Error("Failed to run simulation");
      const data = await response.json();
      setResults(data);
      setWorkflow("LEARN");
    } catch (error) {
      console.error(error);
      alert("Simulation failed.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex justify-center font-sans">
      <div className="w-full max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-400">AlgoChowk Research</h1>
          <p className="text-sm text-slate-400 mt-1">Translate natural language into quantitative experiments.</p>
        </div>

        <HypothesisInput 
          query={query} 
          setQuery={setQuery} 
          onAnalyze={handleAnalyze} 
          isAnalyzing={workflow === "ANALYZING"} 
        />

        {workflow !== "ASK" && workflow !== "ANALYZING" && (
          <SpecCard 
            spec={spec} 
            setSpec={setSpec} 
            onRunTest={handleRunSimulation} 
            isSimulating={isSimulating}
          />
        )}

        {workflow === "LEARN" && results && (
          <ResultsDashboard 
            results={results} 
          />
        )}
      </div>
    </main>
  );
}