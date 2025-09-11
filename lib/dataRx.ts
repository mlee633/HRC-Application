// lib/dataRx.ts
import { z } from "zod";
import { ulid } from "ulid";

export const dataRxHeaders = [
  "Patient ID",
  "Name",
  "Age",
  "Sex",
  "Ethnicity",
  "Date of Participation",
  "Overall MRCI",
  "Severity MRCI",
] as const;

export const medsHeaders = [
  "Patient ID",
  "Category",
  "Medication Name",
  "Dosage Form",
  "Strength",
  "Dose",
  "Frequency",
  "Directions",
  "ATC",
] as const;

export const PatientSchema = z.object({
  patientId: z.string().optional(),
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  sex: z.enum(["M", "F", "Other"]),
  ethnicity: z.string().optional(),
  dateOfParticipation: z.string().optional(), // "YYYY-MM-DD"
  overallMRCI: z.number().optional(),
  severityMRCI: z.string().optional(), // "Low" | "Moderate" | "High"
});

export type PatientRowInput = z.infer<typeof PatientSchema>;

export function normalizePatient(input: PatientRowInput) {
  const parsed = PatientSchema.parse(input);
  const patientId = parsed.patientId ?? ulid();
  return { ...parsed, patientId };
}

export function toDataRxRow(n: ReturnType<typeof normalizePatient>): Record<string, any> {
  return {
    "Patient ID": n.patientId,
    "Name": n.name,
    "Age": n.age,
    "Sex": n.sex,
    "Ethnicity": n.ethnicity ?? "",
    "Date of Participation": n.dateOfParticipation ?? "",
    "Overall MRCI": n.overallMRCI ?? "",
    "Severity MRCI": n.severityMRCI ?? "",
  };
}

// ---------- Medications mapping ----------

export const MedicationSchema = z.object({
  // These fields should match UI Medication shape
  name: z.string().min(1),
  dosageForm: z.string().optional(),
  frequency: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  category: z.string().optional(),
  strength: z.string().optional(),
  dose: z.string().optional(),
  atc: z.string().optional(),
})

export type MedicationRowInput = z.infer<typeof MedicationSchema>

/** Turn a meds[] array into an array of "Data_Meds" rows */
export function toMedsRows(patientId: string, meds: MedicationRowInput[]) {
  return meds.map(m => ({
    "Patient ID": patientId,
    "Category": m.category ?? "",
    "Medication Name": m.name ?? "",
    "Dosage Form": m.dosageForm ?? "",
    "Strength": m.strength ?? "",
    "Dose": m.dose ?? "",
    "Frequency": m.frequency ?? "",
    "Directions": (m.instructions ?? []).join(", "),
    "ATC": m.atc ?? "",
  }))
}
