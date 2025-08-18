"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Pill } from 'lucide-react'
import { type Medication } from "@/lib/algorithms/types"
import { DOSAGE_FORMS, FREQUENCIES, INSTRUCTIONS } from "@/lib/algorithms/mci/constants"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-gray-700">Dosage Form *</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <div className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                            i
                          </div>
                        </div>
                      </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="max-w-sm rounded-lg bg-white p-4 shadow-lg border text-sm leading-relaxed"
                        >
                          <p className="font-semibold text-gray-900 mb-2">Dosage form</p>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Each dosage form is assigned a weight</li>
                            <li>The weight contributes to the dosage form complexity score</li>
                          </ul>
                        </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={medication.dosageForm}
                    onValueChange={(value) => onUpdateMedication(medication.id, { dosageForm: value })}
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select dosage form" />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false}>
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
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-gray-700">Frequency *</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <div className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                            i
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="max-w-sm rounded-lg bg-white p-4 shadow-lg border text-sm leading-relaxed"
                      >
                        <p className="font-semibold text-gray-900 mb-2">Dosing frequency</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>Each frequency value is multiplied by its weight</li>
                          <li>Score contributes to overall complexity</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={medication.frequency}
                    onValueChange={(value) => onUpdateMedication(medication.id, { frequency: value })}
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false}>
                      {FREQUENCIES.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Instructions */}
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
