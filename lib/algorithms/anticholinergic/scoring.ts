// Anticholinergic Burden Algorithm
// Based on the Anticholinergic Cognitive Burden (ACB) Scale

export const ANTICHOLINERGIC_MEDICATIONS: Record<string, number> = {
  // ACB Score 1 - Possible anticholinergic effects
  "Alverine": 1,
  "Atenolol": 1,
  "Captopril": 1,
  "Cimetidine": 1,
  "Codeine": 1,
  "Colchicine": 1,
  "Digoxin": 1,
  "Dipyridamole": 1,
  "Disopyramide": 1,
  "Fentanyl": 1,
  "Furosemide": 1,
  "Haloperidol": 1,
  "Hydrocortisone": 1,
  "Loperamide": 1,
  "Metoprolol": 1,
  "Morphine": 1,
  "Nifedipine": 1,
  "Prednisolone": 1,
  "Quinidine": 1,
  "Ranitidine": 1,
  "Theophylline": 1,
  "Tramadol": 1,
  "Triamterene": 1,
  "Warfarin": 1,

  // ACB Score 2 - Moderate anticholinergic effects
  "Amantadine": 2,
  "Belladonna": 2,
  "Carbamazepine": 2,
  "Cyclobenzaprine": 2,
  "Cyproheptadine": 2,
  "Loxapine": 2,
  "Meperidine": 2,
  "Methotrimeprazine": 2,
  "Molindone": 2,
  "Oxcarbazepine": 2,
  "Pimozide": 2,

  // ACB Score 3 - Severe anticholinergic effects
  "Amitriptyline": 3,
  "Atropine": 3,
  "Benztropine": 3,
  "Brompheniramine": 3,
  "Carbinoxamine": 3,
  "Chlorpheniramine": 3,
  "Chlorpromazine": 3,
  "Clemastine": 3,
  "Clomipramine": 3,
  "Clozapine": 3,
  "Darifenacin": 3,
  "Desipramine": 3,
  "Dicyclomine": 3,
  "Dimenhydrinate": 3,
  "Diphenhydramine": 3,
  "Doxepin": 3,
  "Fesoterodine": 3,
  "Flavoxate": 3,
  "Hydroxyzine": 3,
  "Hyoscyamine": 3,
  "Imipramine": 3,
  "Meclizine": 3,
  "Nortriptyline": 3,
  "Olanzapine": 3,
  "Orphenadrine": 3,
  "Oxybutynin": 3,
  "Paroxetine": 3,
  "Perphenazine": 3,
  "Promethazine": 3,
  "Propantheline": 3,
  "Pyrilamine": 3,
  "Quetiapine": 3,
  "Scopolamine": 3,
  "Solifenacin": 3,
  "Thioridazine": 3,
  "Tolterodine": 3,
  "Trifluoperazine": 3,
  "Trihexyphenidyl": 3,
  "Trimipramine": 3,
  "Triprolidine": 3,
  "Trospium": 3
}

export function calculateAnticholinergicBurden(medications: string[]): {
  totalScore: number
  riskLevel: 'Low' | 'Moderate' | 'High'
  description: string
  medicationScores: Array<{ name: string; score: number }>
} {
  const medicationScores = medications.map(med => ({
    name: med,
    score: ANTICHOLINERGIC_MEDICATIONS[med] || 0
  }))

  const totalScore = medicationScores.reduce((sum, med) => sum + med.score, 0)

  let riskLevel: 'Low' | 'Moderate' | 'High'
  let description: string

  if (totalScore === 0) {
    riskLevel = 'Low'
    description = 'No significant anticholinergic burden'
  } else if (totalScore <= 2) {
    riskLevel = 'Low'
    description = 'Low anticholinergic burden - minimal risk'
  } else if (totalScore <= 4) {
    riskLevel = 'Moderate'
    description = 'Moderate anticholinergic burden - consider medication review'
  } else {
    riskLevel = 'High'
    description = 'High anticholinergic burden - medication review recommended'
  }

  return {
    totalScore,
    riskLevel,
    description,
    medicationScores
  }
}
