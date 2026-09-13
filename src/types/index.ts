export type WorkflowState = "ASK" | "ANALYZING" | "BUILDING_SPEC" | "LEARN";

export interface ExperimentSpec {
  instrument: string;
  action: string;
  dropThreshold: number | null;
  holdingPeriod: number | null;
}

export interface SimulationResults {
  totalTrades: number;
  winRate: string;
  avgReturn: string;
  buyHoldReturn: string;
}