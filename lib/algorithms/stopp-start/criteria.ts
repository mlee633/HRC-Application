// STOPP/START Algorithm
// Screening Tool of Older Persons' Prescriptions / Screening Tool to Alert to Right Treatment

export const STOPP_CRITERIA = [
  {
    category: "Cardiovascular System",
    criteria: [
      "Digoxin for heart failure with normal systolic ventricular function",
      "Verapamil or diltiazem with NYHA Class III or IV heart failure",
      "Beta-blocker in combination with verapamil or diltiazem",
      "Use of diltiazem or verapamil with heart block grade 2 or 3",
      "Beta-blocker with bradycardia, heart block or provoked bronchospasm",
      "Amiodarone as first-line antiarrhythmic therapy in supraventricular tachyarrhythmias"
    ]
  },
  {
    category: "Antiplatelet/Anticoagulant",
    criteria: [
      "Long-term aspirin at doses greater than 160mg daily",
      "Aspirin with a past history of peptic ulcer disease without PPI",
      "Aspirin, clopidogrel, dipyridamole or warfarin with concurrent bleeding disorder",
      "Aspirin plus clopidogrel as secondary stroke prevention",
      "Aspirin with no history of coronary, cerebral or peripheral vascular symptoms"
    ]
  },
  {
    category: "Central Nervous System",
    criteria: [
      "Tricyclic antidepressants with dementia, narrow angle glaucoma, cardiac conduction abnormalities, prostatism, or prior history of urinary retention",
      "Neuroleptics with moderate-marked antimuscarinic effects with a history of prostatism or previous urinary retention",
      "Benzodiazepines for ≥4 weeks",
      "Anticholinergics to treat extrapyramidal side-effects of neuroleptic medications",
      "Selective serotonin re-uptake inhibitors with a history of clinically significant hyponatraemia"
    ]
  },
  {
    category: "Gastrointestinal System",
    criteria: [
      "PPI for peptic ulcer disease at full therapeutic dosage for >8 weeks",
      "Drugs likely to cause constipation with chronic constipation where non-constipating alternatives are available",
      "Oral elemental iron doses greater than 200mg daily"
    ]
  }
]

export const START_CRITERIA = [
  {
    category: "Cardiovascular System",
    criteria: [
      "Warfarin or novel oral anticoagulant in the presence of chronic atrial fibrillation",
      "Antiplatelet therapy in diabetes mellitus if one or more major cardiovascular risk factor is present",
      "Antihypertensive therapy if systolic blood pressure consistently >160 mmHg",
      "Statin therapy in diabetes mellitus if one or more major cardiovascular risk factor is present",
      "ACE inhibitor with systolic heart failure and/or documented coronary artery disease"
    ]
  },
  {
    category: "Respiratory System",
    criteria: [
      "Regular inhaled β2 agonist or antimuscarinic bronchodilator for mild to moderate asthma or COPD",
      "Regular inhaled corticosteroid for moderate-severe asthma or COPD, where FEV1 <50% of predicted value and repeated exacerbations requiring treatment with oral corticosteroids",
      "Home continuous oxygen with documented chronic type 1 respiratory failure"
    ]
  },
  {
    category: "Central Nervous System",
    criteria: [
      "L-DOPA or a dopamine agonist in idiopathic Parkinson's disease with functional impairment and resultant disability",
      "Non-TCA antidepressant in the presence of persistent major depressive symptoms",
      "Acetylcholinesterase inhibitor for mild-moderate Alzheimer's dementia",
      "Topical prostaglandin, prostamide or beta-blocker for primary open-angle glaucoma",
      "SSRI or SNRI antidepressant for persistent severe anxiety that interferes with independent functioning"
    ]
  },
  {
    category: "Gastrointestinal System",
    criteria: [
      "PPI with severe gastro-oesophageal acid reflux disease or peptic stricture requiring dilatation",
      "Fibre supplement for diverticulosis with a history of constipation"
    ]
  },
  {
    category: "Musculoskeletal System",
    criteria: [
      "Disease-modifying anti-rheumatic drug with active moderate-severe rheumatoid arthritis lasting >12 weeks",
      "Bisphosphonates in patients taking maintenance oral corticosteroid therapy",
      "Calcium and vitamin D supplement in patients with known osteoporosis"
    ]
  },
  {
    category: "Endocrine System",
    criteria: [
      "ACE inhibitor or ARB in diabetes with nephropathy",
      "Antiplatelet therapy in diabetes mellitus with one or more major cardiovascular risk factor",
      "Statin therapy in diabetes with one or more major cardiovascular risk factor"
    ]
  }
]

export function evaluateSTOPPSTART(
  medications: string[], 
  conditions: string[],
  patientAge: number
): {
  totalScore: number
  riskLevel: 'Low' | 'Moderate' | 'High'
  description: string
  stoppViolations: Array<{ category: string; criterion: string }>
  startRecommendations: Array<{ category: string; criterion: string }>
} {
  const stoppViolations: Array<{ category: string; criterion: string }> = []
  const startRecommendations: Array<{ category: string; criterion: string }> = []

  // This is a simplified implementation
  // In a real application, you would need more sophisticated logic to match
  // medications and conditions to specific STOPP/START criteria

  // Example STOPP violations (simplified)
  if (medications.some(med => med.toLowerCase().includes('benzodiazepine'))) {
    stoppViolations.push({
      category: "Central Nervous System",
      criterion: "Benzodiazepines for ≥4 weeks"
    })
  }

  if (medications.some(med => med.toLowerCase().includes('ppi')) && 
      !conditions.some(cond => cond.toLowerCase().includes('peptic ulcer'))) {
    stoppViolations.push({
      category: "Gastrointestinal System",
      criterion: "PPI for peptic ulcer disease at full therapeutic dosage for >8 weeks"
    })
  }

  // Example START recommendations (simplified)
  if (conditions.some(cond => cond.toLowerCase().includes('atrial fibrillation')) &&
      !medications.some(med => med.toLowerCase().includes('warfarin') || med.toLowerCase().includes('anticoagulant'))) {
    startRecommendations.push({
      category: "Cardiovascular System",
      criterion: "Warfarin or novel oral anticoagulant in the presence of chronic atrial fibrillation"
    })
  }

  if (conditions.some(cond => cond.toLowerCase().includes('diabetes')) &&
      !medications.some(med => med.toLowerCase().includes('statin'))) {
    startRecommendations.push({
      category: "Cardiovascular System",
      criterion: "Statin therapy in diabetes mellitus if one or more major cardiovascular risk factor is present"
    })
  }

  const totalScore = stoppViolations.length + startRecommendations.length

  let riskLevel: 'Low' | 'Moderate' | 'High'
  let description: string

  if (totalScore === 0) {
    riskLevel = 'Low'
    description = 'No STOPP/START criteria identified'
  } else if (totalScore <= 2) {
    riskLevel = 'Moderate'
    description = 'Some potentially inappropriate prescribing identified'
  } else {
    riskLevel = 'High'
    description = 'Multiple potentially inappropriate prescribing issues identified'
  }

  return {
    totalScore,
    riskLevel,
    description,
    stoppViolations,
    startRecommendations
  }
}
