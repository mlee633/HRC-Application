"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Plus } from "lucide-react"
import { MedicationForm } from "@/components/algorithms/mci/medication-form"
import { ResultsDisplay } from "@/components/algorithms/mci/results-display"
import { calculateMedicationScore } from "@/lib/algorithms/mci/scoring"
import MCIExcelActions from "@/components/excel/MCIExcelActions";
// import { AVAILABLE_ALGORITHMS, type AlgorithmId, type MCIResult } from "@/lib/algorithms"
import { 
  AVAILABLE_ALGORITHMS,
  ALGORITHM_COPY,
  type AlgorithmId,
  type MCIResult,
} from "@/lib/algorithms";

export interface Medication {
  id: string
  name: string
  dosageForm: string
  frequency: string
  instructions: string[]
}

export default function HomePage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmId>("mci")
  const current = ALGORITHM_COPY[activeAlgorithm];
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "", dosageForm: "", frequency: "", instructions: [] }
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
    deprivationScore: ""
  })

  const handleDemographicsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDemographics(prev => ({ ...prev, [name]: value }))
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
      deprivationScore: ""
    })
  }

  // ---- PDF ----
  const handleSaveAsPDF = () => {
    const doc = new jsPDF()

    // Patient demographics
    doc.setFontSize(16)
    doc.text("Patient Information", 20, 20)
    doc.setFontSize(12)
    doc.text(`Patient ID: ${demographics.patientId}`, 20, 35)
    doc.text(`Name: ${demographics.firstName} ${demographics.lastName}`, 20, 45)
    doc.text(`Age: ${demographics.age}`, 20, 55)
    doc.text(`Sex: ${demographics.sex}`, 20, 65)
    doc.text(`Medical Conditions: ${demographics.medicalConditions}`, 20, 75)

    // Medications
    doc.text("Medications", 20, 85)
    let yPos = 95
    medications.forEach((med, index) => {
      if (med.name) {
        doc.text(`${index + 1}. ${med.name}`, 20, yPos)
        doc.text(`   Form: ${med.dosageForm}`, 30, yPos + 10)
        doc.text(`   Frequency: ${med.frequency}`, 30, yPos + 20)
        if (med.instructions.length > 0) {
          doc.text(`   Instructions: ${med.instructions.join(", ")}`, 30, yPos + 30)
        }
        yPos += 45
      }
    })

    // Results
    if (results) {
      doc.text("MCI Results", 20, yPos + 10)
      doc.text(`Total Score: ${results.totalScore}`, 20, yPos + 25)
      doc.text(`Risk Level: ${results.riskLevel}`, 20, yPos + 35)
      doc.text(`Description: ${results.description}`, 20, yPos + 45)
    }

    const sanitizedName = `${demographics.firstName}_${demographics.lastName}`
      .replace(/[^a-z0-9_]/gi, "_")
      .toLowerCase()
    const sanitizedId = demographics.patientId.replace(/[^a-z0-9_]/gi, "_")
    const filename = sanitizedId
      ? `${sanitizedId}_${sanitizedName}_mci_report.pdf`
      : `${sanitizedName}_mci_report.pdf`

    doc.save(filename)
  }

  // ---- Medications ----
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosageForm: "",
      frequency: "",
      instructions: []
    }
    setMedications(prev => [...prev, newMedication])
  }

  const removeMedication = (id: string) => {
    setMedications(prev => (prev.length > 1 ? prev.filter(m => m.id !== id) : prev))
  }

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)))
  }

  const clearAllMedications = () => {
    setMedications([{ id: "1", name: "", dosageForm: "", frequency: "", instructions: [] }])
    setResults(null)
  }

  // ---- Calculation ----
  const calculateMCI = async () => {
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const medicationResults = medications
      .filter(m => m.name.trim() !== "" && m.dosageForm && m.frequency)
      .map(m => {
        const scores = calculateMedicationScore(m.dosageForm, m.frequency, m.instructions)
        return {
          id: m.id,
          name: m.name,
          score: scores.totalScore,
          breakdown: {
            dosageForm: scores.dosageFormScore,
            frequency: scores.frequencyScore,
            instructions: scores.instructionsScore
          }
        }
      })

    const totalScore = medicationResults.reduce((sum, m) => sum + m.score, 0)

    const getComplexityLevel = (score: number) => {
      if (score <= 5) return { level: "Low" as const, description: "Simple medication regimen" }
      if (score <= 10) return { level: "Moderate" as const, description: "Moderately complex regimen" }
      return { level: "High" as const, description: "Complex medication regimen" }
    }

    const complexity = getComplexityLevel(totalScore)

    setResults({
      totalScore,
      riskLevel: complexity.level,
      description: complexity.description,
      medications: medicationResults
    })

    setIsCalculating(false)
  }

  const hasValidMedications = medications.some(
    m => m.name.trim() !== "" && m.dosageForm && m.frequency
  )

  const handleAlgorithmChange = (algorithmId: AlgorithmId) => {
    const algorithm = AVAILABLE_ALGORITHMS.find(alg => alg.id === algorithmId)
    if (algorithm?.implemented) {
      setActiveAlgorithm(algorithmId)
      // keep your meds-only clear on algorithm switch
      clearAllMedications()
    }
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{current.title}</h2>
              <p className="text-gray-600 leading-relaxed">{current.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {AVAILABLE_ALGORITHMS.map(algorithm => (
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <option value="0">0 Least</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 Most</option>
                </select>
              </div>
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

              {/* Results */}
              <div>
                <ResultsDisplay results={results} isCalculating={isCalculating} />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This tool is for educational and research purposes only. Results should be interpreted by qualified
              healthcare professionals. Always consult with healthcare providers for clinical decisions and patient care.
            </p>
          </div>
        </div>

        {/* Fixed Save as PDF Button */}
        <button
          onClick={handleSaveAsPDF}
          style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
          className="bg-blue-600 text-white rounded-full px-5 py-3 font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save as PDF
        </button>
      </div>
    </div>
  )
}

