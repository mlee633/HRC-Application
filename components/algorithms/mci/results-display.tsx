"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, BarChart3, CheckCircle, TrendingUp } from 'lucide-react'
import { type MCIResult } from "@/lib/algorithms/types"

interface ResultsDisplayProps {
  results: MCIResult | null
  isCalculating: boolean
}

export function ResultsDisplay({ results, isCalculating }: ResultsDisplayProps) {
  const getComplexityColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500"
      case "Moderate": return "bg-yellow-500"
      case "High": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 5) return "text-green-600"
    if (score <= 10) return "text-yellow-600"
    return "text-red-600"
  }

  if (isCalculating) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 animate-pulse" />
            Calculating MCI Score...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Processing medication complexity...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-gray-700 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">MCI Results</h3>
              <p className="text-gray-300 text-sm">Results will appear here after calculation</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No results yet</h4>
            <p className="text-gray-500">
              Enter medication details and click "Calculate MCI Score" to see results
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">MCI Assessment Complete</h3>
              <p className="text-blue-100 text-sm">Medication Complexity Index Results</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-8">
            <div className={`text-7xl font-bold mb-4 ${getScoreColor(results.totalScore)}`}>
              {results.totalScore.toFixed(1)}
            </div>
            <Badge 
              className={`${getComplexityColor(results.riskLevel)} text-white px-6 py-3 text-lg font-semibold rounded-full`}
            >
              {results.riskLevel} Complexity
            </Badge>
            <p className="text-slate-600 mt-3 text-lg">{results.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Complexity Level</span>
                <span>{results.totalScore.toFixed(1)}/20+</span>
              </div>
              <Progress 
                value={Math.min((results.totalScore / 20) * 100, 100)} 
                className="h-3"
              />
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {results.medications.length}
                </div>
                <div className="text-sm text-slate-600">Medications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {(results.totalScore / results.medications.length).toFixed(1)}
                </div>
                <div className="text-sm text-slate-600">Avg per Med</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {results.riskLevel}
                </div>
                <div className="text-sm text-slate-600">Risk Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5" />
            Detailed Breakdown
          </CardTitle>
          <CardDescription>
            Individual medication complexity scores
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {results.medications.map((med) => (
              <div key={med.id} className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-slate-800">{med.name}</h4>
                  <Badge variant="outline" className={`${getScoreColor(med.score)} border-current px-3 py-1 font-semibold`}>
                    {med.score.toFixed(1)} points
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600">Dosage Form</div>
                    <div className="font-medium">{med.breakdown.dosageForm.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Frequency</div>
                    <div className="font-medium">{med.breakdown.frequency.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Instructions</div>
                    <div className="font-medium">{med.breakdown.instructions.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
