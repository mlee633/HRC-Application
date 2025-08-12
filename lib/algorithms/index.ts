// lib/algorithms/index.ts
// Central export + registry + copy for headers

// Re‑export algorithm internals
export * from "./types";
export * from "./mci/scoring";
export * from "./mci/constants";
export * from "./anticholinergic/scoring";
export * from "./fall-risk/scoring";
export * from "./stopp-start/criteria";

// ---------- Registry ----------
export type AlgorithmEntry = {
  id: "mci" | "anticholinergic" | "fall-risk" | "stopp-start";
  name: string;
  description: string;
  implemented: boolean;
};

export const AVAILABLE_ALGORITHMS = [
  {
    id: "mci",
    name: "Medication Complexity (MCI)",
    description: "Assess medication regimen complexity",
    implemented: true,
  },
  {
    id: "anticholinergic",
    name: "Anticholinergic Burden",
    description: "Evaluate anticholinergic medication burden",
    implemented: true,
  },
  {
    id: "fall-risk",
    name: "Fall Risk Prediction",
    description: "Predict fall risk based on multiple factors",
    implemented: true,
  },
  {
    id: "stopp-start",
    name: "STOPP/START",
    description:
      "Screening tool for potentially inappropriate prescribing",
    implemented: true,
  },
] as const satisfies readonly AlgorithmEntry[];

export type AlgorithmId = (typeof AVAILABLE_ALGORITHMS)[number]["id"];

// Helpful getters
export const getAlgorithmById = (id: AlgorithmId) =>
  AVAILABLE_ALGORITHMS.find((a) => a.id === id)!;

export const isAlgorithmImplemented = (id: AlgorithmId) =>
  getAlgorithmById(id).implemented;

// ---------- Copy for page header / context ----------
export const ALGORITHM_COPY: Record<
  AlgorithmId,
  { title: string; description: string }
> = {
  "mci": {
    title: "Medication Complexity Index (MCI)",
    description:
      "Assess medication regimen complexity to support clinical decision-making.",
  },
  "anticholinergic": {
    title: "Anticholinergic Burden",
    description:
      "Estimate cumulative anticholinergic effects to flag cognitive and functional risk, particularly in older adults.",
  },
  "fall-risk": {
    title: "Fall Risk Prediction",
    description:
      "Combine medications, demographics, and clinical factors to estimate short‑term fall risk and prompt mitigation.",
  },
  "stopp-start": {
    title: "STOPP/START",
    description:
      "Screen for potentially inappropriate prescriptions and omissions using STOPP/START criteria.",
  },
} as const;

// Optional: stable order for tabs if needed elsewhere
export const ALGORITHM_ORDER: readonly AlgorithmId[] = [
  "mci",
  "anticholinergic",
  "fall-risk",
  "stopp-start",
] as const;
