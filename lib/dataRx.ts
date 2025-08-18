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
