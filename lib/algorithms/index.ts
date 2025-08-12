// Central export for all algorithms
export * from './types'
export * from './mci/scoring'
export * from './mci/constants'
export * from './anticholinergic/scoring'
export * from './fall-risk/scoring'
export * from './stopp-start/criteria'

// Algorithm registry for dynamic loading
export const AVAILABLE_ALGORITHMS = [
  {
    id: 'mci',
    name: 'Medication Complexity (MCI)',
    description: 'Assess medication regimen complexity',
    implemented: true
  },
  {
    id: 'anticholinergic',
    name: 'Anticholinergic Burden',
    description: 'Evaluate anticholinergic medication burden',
    implemented: true
  },
  {
    id: 'fall-risk',
    name: 'Fall Risk Prediction',
    description: 'Predict fall risk based on multiple factors',
    implemented: true
  },
  {
    id: 'stopp-start',
    name: 'STOPP/START',
    description: 'Screening tool for potentially inappropriate prescribing',
    implemented: true
  }
] as const

export type AlgorithmId = typeof AVAILABLE_ALGORITHMS[number]['id']
