// MCI Scoring System based on the provided table

export const DOSAGE_FORM_SCORES: Record<string, number> = {
  "Oral: Capsule/Tablet": 1,
  "Oral: Gargle/Mouthwash": 2,
  "Oral: Gum/Lozenge": 2,
  "Oral: Liquid/Solution/Suspension": 2,
  "Oral: Powder(granule)": 2,
  "Oral: Sublingual spray/tab": 2,
  "Topical: Paste": 3,
  "Topical: Dressing": 3,
  "Topical: Cream/Gel/Ointment/Lotion": 2,
  "Topical: Patch/Tape": 2,
  "Topical: Shampoo/Paint/Topical Solution": 2,
  "Topical: Spray": 1,
  "Ear drop/Cream/Ointment": 3,
  "Eye Drop": 3,
  "Eye Gel/Ointment": 3,
  "Nasal Drop/Cream/Ointment": 3,
  "Nasal spray": 2,
  "Inhalation: Aerolizer": 3,
  "Inhalation: Metered dose": 4,
  "Inhalation: Nebulizer": 5,
  "Inhalation: Other DPI": 3,
  "Inhalation: Oxygen": 3,
  "Injection: Amp/Vial": 4,
  "Injection: prefilled": 3,
  "Pessaries": 3,
  "Patient controlled analgesia": 2,
  "Enema": 2,
  "Suppository": 2,
  "Vaginal": 2
}

export const FREQUENCY_SCORES: Record<string, number> = {
  "Once Daily": 1,
  "Once Daily PRN(when required)": 0.5,
  "Twice Daily": 2,
  "Twice Daily PRN": 1,
  "Three Times Daily": 3,
  "Three Times Daily PRN": 1.5,
  "Four Times Daily": 4,
  "Four Times Daily PRN": 2,
  "Q12H": 2.5,
  "Q12H PRN": 1.5,
  "Q8H": 3.5,
  "Q8H PRN": 2,
  "Q6H": 4.5,
  "Q6H PRN": 2.5,
  "Q4H": 6.5,
  "Q4H PRN": 3.5,
  "Q2H": 12.5,
  "Q2H PRN": 6.5,
  "PRN/sos (when necessary)": 0.5,
  "Alternate Days/less frequently": 2,
  "Oxygen PRN": 1,
  "Oxygen < 15 hrs": 2,
  "Oxygen > 15 hrs": 3,
  "Others": 1
}

export const INSTRUCTION_SCORES: Record<string, number> = {
  "Break/crush tablet": 1,
  "Dissolve tablet/powder": 1,
  "Multiple units at once (e.g. 2 tabs, 2 puffs)": 1,
  "Take at specific time (e.g. morning, night, 9am)": 1,
  "Relation to food (e.g. after/before/with food)": 1,
  "Variable dose(e.g. 1-2 caps, 2-3 puffs)": 1,
  "Take with specific fluid": 1,
  "Take/use as directed": 2,
  "Tapering/increasing": 2,
  "Alternating dose (e.g. one morning & two at night, one/two on alt days)": 2
}

export function calculateMedicationScore(
  dosageForm: string,
  frequency: string,
  instructions: string[]
): {
  dosageFormScore: number
  frequencyScore: number
  instructionsScore: number
  totalScore: number
} {
  const dosageFormScore = DOSAGE_FORM_SCORES[dosageForm] || 0
  const frequencyScore = FREQUENCY_SCORES[frequency] || 0
  const instructionsScore = instructions.reduce((sum, instruction) => {
    return sum + (INSTRUCTION_SCORES[instruction] || 0)
  }, 0)

  return {
    dosageFormScore,
    frequencyScore,
    instructionsScore,
    totalScore: dosageFormScore + frequencyScore + instructionsScore
  }
}
