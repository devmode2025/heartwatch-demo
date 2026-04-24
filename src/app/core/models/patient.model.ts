export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  deviceType: string;
  admissionDate: Date;
  lastUpdated: Date;
  medicalRecordNumber: string;
  assignedPhysician?: string;
}

export interface PatientSummary {
  id: string;
  fullName: string;
  age: number;
  deviceType: string;
  status: PatientStatus;
  lastUpdated: Date;
}

export type PatientStatus = 'stable' | 'warning' | 'critical' | 'offline';
