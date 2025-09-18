"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Plus } from "lucide-react"
import { MedicationForm } from "@/components/algorithms/mci/medication-form"
import { ResultsDisplay } from "@/components/algorithms/mci/results-display"
import { calculateMedicationScore } from "@/lib/algorithms/mci/scoring"
import FloatingSaveModal from "@/components/excel/FloatingSaveModal";
import FloatingChatbot from "@/components/chat/FloatingChatbot";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  AVAILABLE_ALGORITHMS,
  ALGORITHM_COPY,
  type AlgorithmId,
  type MCIResult,
} from "@/lib/algorithms"

export interface Medication {
  id: string
  name: string
  dosageForm: string
  frequency: string
  instructions: string[]
  category?: string         // e.g., "Cardiovascular", "Diabetes", "Pain", etc.
  strength?: string         // e.g., "500 mg"
  dose?: string             // e.g., "1 tablet"         
}

export default function HomePage() {
  const [warningOpen, setWarningOpen] = useState(false)
  const mapSex = (s: string): "M" | "F" | "Other" =>
    s === "Male" ? "M" : s === "Female" ? "F" : "Other"

  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmId>("mci")
  const current = ALGORITHM_COPY[activeAlgorithm]

  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "", dosageForm: "", frequency: "", instructions: [] },
  ])
  const [results, setResults] = useState<MCIResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // ---- Demographics ----
  const [demographics, setDemographics] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    ethnicity: "",
    medicalConditions: "",
    deprivationScore: "",
    caregiverEmail: "",
    gpEmail: "",
    consentToNotify: false,
  })


  const handleDemographicsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDemographics((prev) => ({ ...prev, [name]: value }))
  }

  const clearDemographics = () => {
    setDemographics({
      patientId: "",
      firstName: "",
      lastName: "",
      age: "",
      sex: "",
      ethnicity: "",
      medicalConditions: "",
      deprivationScore: "",
      caregiverEmail: "",
      gpEmail: "",
      consentToNotify: false,
    })
  }

  // ---- PDF ----
const handleSaveAsPDF = () => {
  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // Helper to safely add text with wrapping + auto new page
  const addText = (text: string, x: number, yStep = 10) => {
    const wrapped = doc.splitTextToSize(text, pageWidth - margin * 2);
    wrapped.forEach((line: string) => {
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(line, x, yPos);
      yPos += yStep;
    });
  }

  // Patient demographics
  doc.setFontSize(16);
  addText("Patient Information", margin, 12);

  doc.setFontSize(12);
  addText(`Patient ID: ${demographics.patientId}`, margin);
  addText(`Name: ${demographics.firstName} ${demographics.lastName}`, margin);
  addText(`Age: ${demographics.age}`, margin);
  addText(`Sex: ${demographics.sex}`, margin);
  addText(`Medical Conditions: ${demographics.medicalConditions}`, margin);

  // Medications
  doc.setFontSize(14);
  addText("Medications", margin, 12);
  doc.setFontSize(12);

  medications.forEach((med, index) => {
    if (med.name) {
      addText(`${index + 1}. ${med.name}`, margin);
      if (med.dosageForm) addText(`Form: ${med.dosageForm}`, margin + 10);
      if (med.frequency) addText(`Frequency: ${med.frequency}`, margin + 10);
      if (med.instructions.length > 0) {
        addText(`Instructions: ${med.instructions.join(", ")}`, margin + 10);
      }
    }
  });

  // Results
  if (results) {
    doc.setFontSize(14);
    addText("MCI Results", margin, 12);
    doc.setFontSize(12);
    addText(`Total Score: ${results.totalScore}`, margin);
    addText(`Risk Level: ${results.riskLevel}`, margin);
    addText(`Description: ${results.description}`, margin);
  }

  // Filename sanitization
  const sanitizedName = `${demographics.firstName}_${demographics.lastName}`
    .replace(/[^a-z0-9_]/gi, "_")
    .toLowerCase();
  const sanitizedId = demographics.patientId.replace(/[^a-z0-9_]/gi, "_");
  const filename = sanitizedId
    ? `${sanitizedId}_${sanitizedName}_mci_report.pdf`
    : `${sanitizedName}_mci_report.pdf`;

  doc.save(filename);
};

  // ---- Medications ----
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosageForm: "",
      frequency: "",
      instructions: [],
    }
    setMedications((prev) => [...prev, newMedication])
  }

  const removeMedication = (id: string) => {
    setMedications((prev) =>
      prev.length > 1 ? prev.filter((m) => m.id !== id) : prev
    )
  }

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }

  const clearAllMedications = () => {
    setMedications([{ id: "1", name: "", dosageForm: "", frequency: "", instructions: [] }])
    setResults(null)
  }

  // ---- Calculation ----
  const calculateMCI = async () => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const medicationResults = medications
      .filter((m) => m.name.trim() !== "" && m.dosageForm && m.frequency)
      .map((m) => {
        const scores = calculateMedicationScore(
          m.dosageForm,
          m.frequency,
          m.instructions
        )
        return {
          id: m.id,
          name: m.name,
          score: scores.totalScore,
          breakdown: {
            dosageForm: scores.dosageFormScore,
            frequency: scores.frequencyScore,
            instructions: scores.instructionsScore,
          },
        }
      })

    const totalScore = medicationResults.reduce((sum, m) => sum + m.score, 0)

    const getComplexityLevel = (score: number) => {
      if (score <= 5)
        return { level: "Low" as const, description: "Simple medication regimen" }
      if (score <= 10)
        return { level: "Moderate" as const, description: "Moderately complex regimen" }
      return { level: "High" as const, description: "Complex medication regimen" }
    }

    const complexity = getComplexityLevel(totalScore)

    setResults({
      totalScore,
      riskLevel: complexity.level,
      description: complexity.description,
      medications: medicationResults,
    })

    setIsCalculating(false)

    // Show warning if high MRCI and no consent
    if (totalScore >= 10 && !demographics.consentToNotify) {
      setWarningOpen(true)
    }
  }

  const hasValidMedications = medications.some(
    (m) => m.name.trim() !== "" && m.dosageForm && m.frequency
  )

  const handleAlgorithmChange = (algorithmId: AlgorithmId) => {
    const algorithm = AVAILABLE_ALGORITHMS.find((alg) => alg.id === algorithmId)
    if (algorithm?.implemented) {
      setActiveAlgorithm(algorithmId)
      clearAllMedications()
    }
  }

  // ---- Build patient object for Excel ----
  const currentPatient = {
    patientId: demographics.patientId || "",
    name: [demographics.firstName, demographics.lastName].filter(Boolean).join(" "),
    age: demographics.age ? Number(demographics.age) : 0,   // fallback to 0
    sex: mapSex(demographics.sex),
    ethnicity: demographics.ethnicity || "",
    dateOfParticipation: new Date().toISOString().split("T")[0],
    overallMRCI: results?.totalScore ?? 0,                 // fallback to 0
    severityMRCI: results?.riskLevel ?? "Low",             // fallback to Low
    caregiverEmail: demographics.caregiverEmail || "",
    gpEmail: demographics.gpEmail || "",
    consentToNotify: demographics.consentToNotify || false,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Healthcare Algorithms</h1>
              <p className="text-lg text-gray-600">Clinical Decision Support Tools</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {current.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{current.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {AVAILABLE_ALGORITHMS.map((algorithm) => (
              <Badge
                key={algorithm.id}
                className={`w-full px-4 py-3 font-medium text-center justify-center cursor-pointer transition-colors ${
                  activeAlgorithm === algorithm.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : algorithm.implemented
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                    : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
                onClick={() => handleAlgorithmChange(algorithm.id)}
              >
                {algorithm.name}
                {!algorithm.implemented && " (Coming Soon)"}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Demographics Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Patient Demographics</h3>
              <Button
                onClick={clearDemographics}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                Clear Demographics
              </Button>
            </div>

            {/* First row: ID, First/Last Name, Age */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={demographics.patientId}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={demographics.firstName}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={demographics.lastName}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  value={demographics.age}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Second row: Sex, Ethnicity, Medical Conditions, Deprivation Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <select
                  name="sex"
                  value={demographics.sex}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ethnicity</label>
                <input
                  type="text"
                  name="ethnicity"
                  value={demographics.ethnicity}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                <input
                  type="text"
                  name="medicalConditions"
                  placeholder="e.g., Diabetes, Hypertension"
                  value={demographics.medicalConditions}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deprivation Score</label>
                <select
                  name="deprivationScore"
                  value={demographics.deprivationScore}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="0">0 None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 Most</option>
                </select>
              </div>
            </div>

            {/* Third row: Caregiver + GP Emails */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caregiver Email</label>
                <input
                  type="email"
                  name="caregiverEmail"
                  value={demographics.caregiverEmail}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GP Email</label>
                <input
                  type="email"
                  name="gpEmail"
                  value={demographics.gpEmail}
                  onChange={handleDemographicsChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                id="consentToNotify"
                type="checkbox"
                name="consentToNotify"
                checked={demographics.consentToNotify}
                onChange={(e) =>
                  setDemographics((prev) => ({
                    ...prev,
                    consentToNotify: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="consentToNotify" className="text-sm text-gray-700">
                I consent to sending alerts to my caregiver and GP
              </label>
            </div>
          </div>
        </div>

        {/* Algorithm Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {activeAlgorithm === "mci" && (
            <>
              {/* Medication Entry */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5" />
                      <div>
                        <h3 className="text-lg font-semibold">Patient Medications</h3>
                        <p className="text-blue-100 text-sm">
                          Enter all current medications for complexity assessment
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <MedicationForm
                      medications={medications}
                      onUpdateMedication={updateMedication}
                      onRemoveMedication={removeMedication}
                    />

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-3">
                        <Button
                          onClick={clearAllMedications}
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-3"
                        >
                          Clear Medications
                        </Button>

                        <Button
                          onClick={addMedication}
                          variant="outline"
                          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 py-3"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another Medication
                        </Button>

                        <Button
                          onClick={calculateMCI}
                          disabled={!hasValidMedications || isCalculating}
                          className="w-full bg-blue-600 hover:bg-blue-700 py-3 font-medium"
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          {isCalculating ? "Calculating..." : "Calculate MCI Score"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results + Excel Actions */}
              <div>
                <ResultsDisplay results={results} isCalculating={isCalculating} />
                <FloatingSaveModal
                  currentPatient={currentPatient}
                  meds={medications}
                  onSavePdf={handleSaveAsPDF}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer + Save option */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This tool is for educational and research
              purposes only. Results should be interpreted by qualified healthcare
              professionals. Always consult with healthcare providers for clinical
              decisions and patient care.
            </p>
          </div>
        </div>
      </div>
      {/* ⚠️ High MRCI Warning Dialog */}
      <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>⚠️ High MRCI – No Notification Sent</DialogTitle>
            <DialogDescription>
              This patient’s MRCI score is <strong>High</strong>, but no caregiver/GP
              notification will be sent because consent was not given. Please follow up manually.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setWarningOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <FloatingChatbot />
    </div>
  )
}