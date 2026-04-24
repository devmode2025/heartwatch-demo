export interface Vitals {
  patientId: string;
  timestamp: Date;
  heartRate: number; // bpm
  bloodPressure: BloodPressure;
  temperature: number; // Celsius
  oxygenSaturation?: number; // percentage
  respiratoryRate?: number; // breaths per minute
}

export interface BloodPressure {
  systolic: number; // mmHg
  diastolic: number; // mmHg
}

export interface VitalsThresholds {
  heartRate: {
    min: number;
    max: number;
    criticalMin: number;
    criticalMax: number;
  };
  bloodPressure: {
    systolicMax: number;
    systolicCritical: number;
    diastolicMax: number;
    diastolicCritical: number;
  };
  temperature: {
    min: number;
    max: number;
  };
}

export interface VitalsStatus {
  heartRate: ThresholdStatus;
  bloodPressure: ThresholdStatus;
  temperature: ThresholdStatus;
  overall: ThresholdStatus;
}

export type ThresholdStatus = 'normal' | 'warning' | 'critical';

// Default thresholds (for demonstration only - not clinically validated)
export const DEFAULT_VITALS_THRESHOLDS: VitalsThresholds = {
  heartRate: {
    min: 50,
    max: 130,
    criticalMin: 40,
    criticalMax: 150,
  },
  bloodPressure: {
    systolicMax: 160,
    systolicCritical: 180,
    diastolicMax: 100,
    diastolicCritical: 110,
  },
  temperature: {
    min: 36.0,
    max: 38.0,
  },
};
