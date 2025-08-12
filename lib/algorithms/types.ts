// Common types for all algorithms
export interface BaseAlgorithmResult {
  totalScore: number
  riskLevel: 'Low' | 'Moderate' | 'High'
  description: string
}

export interface Medication {
  id: string
  name: string
  dosageForm: string
  frequency: string
  instructions: string[]
}

// MCI specific types
export interface MCIResult extends BaseAlgorithmResult {
  medications: Array<{
    id: string
    name: string
    score: number
    breakdown: {
      dosageForm: number
      frequency: number
      instructions: number
    }
  }>
}

// Future algorithm types
export interface AnticholinergicResult extends BaseAlgorithmResult {
  medications: Array<{
    id: string
    name: string
    anticholinergicScore: number
    riskCategory: string
  }>
}

export interface FallRiskResult extends BaseAlgorithmResult {
  riskFactors: string[]
  recommendations: string[]
}

export interface STOPPSTARTResult extends BaseAlgorithmResult {
  stoppCriteria: string[]
  startCriteria: string[]
}
