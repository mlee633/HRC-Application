// Fall Risk Prediction Algorithm
// Based on multiple validated fall risk assessment tools

export interface FallRiskFactors {
  age: number
  medications: string[]
  medicalHistory: string[]
  functionalStatus: {
    mobilityAid: boolean
    balanceProblems: boolean
    previousFalls: boolean
    cognitiveImpairment: boolean
  }
  environmentalFactors: string[]
}

export const HIGH_RISK_MEDICATIONS = [
  "Benzodiazepines",
  "Antipsychotics",
  "Antidepressants",
  "Anticonvulsants",
  "Sedatives",
  "Hypnotics",
  "Opioids",
  "Diuretics",
  "Antihypertensives",
  "Anticholinergics"
]

export const MEDICAL_RISK_CONDITIONS = [
  "Parkinson's disease",
  "Dementia",
  "Stroke",
  "Arthritis",
  "Depression",
  "Diabetes",
  "Osteoporosis",
  "Visual impairment",
  "Hearing impairment",
  "Cardiovascular disease"
]

export function calculateFallRisk(factors: FallRiskFactors): {
  totalScore: number
  riskLevel: 'Low' | 'Moderate' | 'High'
  description: string
  riskFactors: string[]
  recommendations: string[]
} {
  let score = 0
  const identifiedRiskFactors: string[] = []
  const recommendations: string[] = []

  // Age factor
  if (factors.age >= 65) {
    score += 1
    identifiedRiskFactors.push("Age 65 or older")
  }
  if (factors.age >= 75) {
    score += 1
    identifiedRiskFactors.push("Age 75 or older")
  }
  if (factors.age >= 85) {
    score += 1
    identifiedRiskFactors.push("Age 85 or older")
  }

  // Medication factors
  const highRiskMeds = factors.medications.filter(med => 
    HIGH_RISK_MEDICATIONS.some(riskMed => 
      med.toLowerCase().includes(riskMed.toLowerCase())
    )
  )
  
  if (highRiskMeds.length > 0) {
    score += Math.min(highRiskMeds.length, 3) // Cap at 3 points
    identifiedRiskFactors.push(`High-risk medications (${highRiskMeds.length})`)
    recommendations.push("Review medications with healthcare provider")
  }

  // Medical history factors
  const riskConditions = factors.medicalHistory.filter(condition =>
    MEDICAL_RISK_CONDITIONS.some(riskCondition =>
      condition.toLowerCase().includes(riskCondition.toLowerCase())
    )
  )

  if (riskConditions.length > 0) {
    score += Math.min(riskConditions.length, 2) // Cap at 2 points
    identifiedRiskFactors.push(`Medical risk conditions (${riskConditions.length})`)
    recommendations.push("Manage underlying medical conditions")
  }

  // Functional status factors
  if (factors.functionalStatus.mobilityAid) {
    score += 2
    identifiedRiskFactors.push("Uses mobility aid")
    recommendations.push("Ensure proper use of mobility aids")
  }

  if (factors.functionalStatus.balanceProblems) {
    score += 2
    identifiedRiskFactors.push("Balance problems")
    recommendations.push("Consider balance training exercises")
  }

  if (factors.functionalStatus.previousFalls) {
    score += 3
    identifiedRiskFactors.push("History of previous falls")
    recommendations.push("Investigate causes of previous falls")
  }

  if (factors.functionalStatus.cognitiveImpairment) {
    score += 2
    identifiedRiskFactors.push("Cognitive impairment")
    recommendations.push("Provide supervision and safety measures")
  }

  // Environmental factors
  if (factors.environmentalFactors.length > 0) {
    score += 1
    identifiedRiskFactors.push("Environmental hazards present")
    recommendations.push("Address home safety hazards")
  }

  // Determine risk level
  let riskLevel: 'Low' | 'Moderate' | 'High'
  let description: string

  if (score <= 2) {
    riskLevel = 'Low'
    description = 'Low fall risk - continue routine care'
  } else if (score <= 5) {
    riskLevel = 'Moderate'
    description = 'Moderate fall risk - implement preventive measures'
    recommendations.push("Regular fall risk assessments")
  } else {
    riskLevel = 'High'
    description = 'High fall risk - immediate intervention required'
    recommendations.push("Comprehensive fall prevention program")
    recommendations.push("Consider referral to fall prevention specialist")
  }

  return {
    totalScore: score,
    riskLevel,
    description,
    riskFactors: identifiedRiskFactors,
    recommendations
  }
}
