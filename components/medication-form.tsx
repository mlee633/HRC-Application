"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Pill } from 'lucide-react'
import { Medication } from "@/app/page"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const DOSAGE_FORMS = [
  "Oral: Capsule/Tablet",
  "Oral: Gargle/Mouthwash",
  "Oral: Gum/Lozenge",
  "Oral: Liquid/Solution/Suspension",
  "Oral: Powder(granule)",
  "Oral: Sublingual spray/tab",
  "Topical: Paste",
  "Topical: Dressing",
  "Topical: Cream/Gel/Ointment/Lotion",
  "Topical: Patch/Tape",
  "Topical: Shampoo/Paint/Topical Solution",
  "Topical: Spray",
  "Ear drop/Cream/Ointment",
  "Eye Drop",
  "Eye Gel/Ointment",
  "Nasal Drop/Cream/Ointment",
  "Nasal spray",
  "Inhalation: Aerolizer",
  "Inhalation: Metered dose",
  "Inhalation: Nebulizer",
  "Inhalation: Other DPI",
  "Inhalation: Oxygen",
  "Injection: Amp/Vial",
  "Injection: prefilled",
  "Pessaries",
  "Patient controlled analgesia",
  "Enema",
  "Suppository",
  "Vaginal"
]

const FREQUENCIES = [
  "Once Daily",
  "Once Daily PRN(when required)",
  "Twice Daily",
  "Twice Daily PRN",
  "Three Times Daily",
  "Three Times Daily PRN",
  "Four Times Daily",
  "Four Times Daily PRN",
  "Q12H",
  "Q12H PRN",
  "Q8H",
  "Q8H PRN",
  "Q6H",
  "Q6H PRN",
  "Q4H",
  "Q4H PRN",
  "Q2H",
  "Q2H PRN",
  "PRN/sos (when necessary)",
  "Alternate Days/less frequently",
  "Oxygen PRN",
  "Oxygen < 15 hrs",
  "Oxygen > 15 hrs",
  "Others"
]

const INSTRUCTIONS = [
  "Break/crush tablet",
  "Dissolve tablet/powder",
  "Multiple units at once (e.g. 2 tabs, 2 puffs)",
  "Take at specific time (e.g. morning, night, 9am)",
  "Relation to food (e.g. after/before/with food)",
  "Variable dose(e.g. 1-2 caps, 2-3 puffs)",
  "Take with specific fluid",
  "Take/use as directed",
  "Tapering/increasing",
  "Alternating dose (e.g. one morning & two at night, one/two on alt days)"
]

interface MedicationFormProps {
  medications: Medication[]
  onUpdateMedication: (id: string, updates: Partial<Medication>) => void
  onRemoveMedication: (id: string) => void
}

export function MedicationForm({ 
  medications, 
  onUpdateMedication, 
  onRemoveMedication 
}: MedicationFormProps) {
  const handleInstructionChange = (medicationId: string, instruction: string, checked: boolean) => {
    const medication = medications.find(m => m.id === medicationId)
    if (!medication) return

    const updatedInstructions = checked
      ? [...medication.instructions, instruction]
      : medication.instructions.filter(i => i !== instruction)

    onUpdateMedication(medicationId, { instructions: updatedInstructions })
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {medications.map((medication, index) => (
          <Card key={medication.id} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Pill className="h-4 w-4 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    Medication {index + 1}
                  </h4>
                </div>
                {medications.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveMedication(medication.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove medication</TooltipContent>
                  </Tooltip>
                )}
              </div>

              <div className="space-y-4">
                {/* Medication Name */}
                <div className="space-y-2">
                  <Label htmlFor={`name-${medication.id}`} className="text-sm font-medium text-gray-700">
                    Medication Name *
                  </Label>
                  <Input
                    id={`name-${medication.id}`}
                    placeholder="Enter medication name (e.g., Metformin, Lisinopril)"
                    value={medication.name}
                    onChange={(e) => onUpdateMedication(medication.id, { name: e.target.value })}
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Dosage Form */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Dosage Form *</Label>
                  <Select
                    value={medication.dosageForm}
                    onValueChange={(value) => onUpdateMedication(medication.id, { dosageForm: value })}
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select dosage form" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOSAGE_FORMS.map((form) => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Frequency *</Label>
                  <Select
                    value={medication.frequency}
                    onValueChange={(value) => onUpdateMedication(medication.id, { frequency: value })}
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCIES.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Instructions - Made more compact */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Special Instructions</Label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {INSTRUCTIONS.map((instruction) => (
                        <div key={instruction} className="flex items-center space-x-3 p-2 rounded hover:bg-white transition-colors">
                          <Checkbox
                            id={`${medication.id}-${instruction}`}
                            checked={medication.instructions.includes(instruction)}
                            onCheckedChange={(checked) => 
                              handleInstructionChange(medication.id, instruction, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${medication.id}-${instruction}`}
                            className="text-sm text-gray-700 cursor-pointer leading-tight flex-1"
                          >
                            {instruction}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {medication.instructions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {medication.instructions.map((instruction) => (
                        <Badge key={instruction} variant="secondary" className="text-xs">
                          {instruction}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
