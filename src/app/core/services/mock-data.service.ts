import { Injectable } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Vitals } from '../models/vitals.model';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockPatient: Patient = {
    id: 'P001',
    firstName: 'John',
    lastName: 'Smith',
    age: 62,
    gender: 'M',
    deviceType: 'HeartMate 3 LVAD',
    admissionDate: new Date('2024-01-15'),
    lastUpdated: new Date(),
    medicalRecordNumber: 'MRN-789456',
    assignedPhysician: 'Dr. Sarah Chen',
  };

  private mockDevice: Device = {
    id: 'D001',
    patientId: 'P001',
    deviceType: 'LVAD',
    serialNumber: 'HM3-2024-789',
    installDate: new Date('2024-01-15'),
    status: 'online',
    batteryLevel: 85,
    pumpSpeed: 5200,
    flowRate: 4.5,
    powerSource: 'battery',
    lastMaintenance: new Date('2024-03-01'),
    nextMaintenanceDue: new Date('2024-06-01'),
  };

  private updateCounter = 0;

  getPatient(): Patient {
    return { ...this.mockPatient, lastUpdated: new Date() };
  }

  getDevice(): Device {
    return { ...this.mockDevice };
  }

  getVitalsStream(): Observable<Vitals> {
    return interval(5000).pipe(
      startWith(0),
      map(() => this.generateRandomVitals())
    );
  }

  private generateRandomVitals(): Vitals {
    this.updateCounter++;

    // Every 3rd update, generate concerning vitals to trigger alerts
    const shouldGenerateAlert = this.updateCounter % 3 === 0;

    let heartRate: number;
    let systolic: number;
    let diastolic: number;

    if (shouldGenerateAlert) {
      // Generate out-of-range values to trigger alerts
      const alertType = Math.floor(Math.random() * 4);

      switch (alertType) {
        case 0: // High heart rate (warning)
          heartRate = this.randomInRange(135, 145);
          systolic = this.randomInRange(110, 130);
          diastolic = this.randomInRange(70, 90);
          break;
        case 1: // Very high heart rate (critical)
          heartRate = this.randomInRange(155, 165);
          systolic = this.randomInRange(110, 130);
          diastolic = this.randomInRange(70, 90);
          break;
        case 2: // High blood pressure (warning)
          heartRate = this.randomInRange(70, 90);
          systolic = this.randomInRange(165, 175);
          diastolic = this.randomInRange(105, 115);
          break;
        case 3: // Low heart rate (warning)
          heartRate = this.randomInRange(45, 48);
          systolic = this.randomInRange(110, 130);
          diastolic = this.randomInRange(70, 90);
          break;
        default:
          heartRate = this.randomInRange(60, 130);
          systolic = this.randomInRange(110, 140);
          diastolic = this.randomInRange(70, 90);
      }
    } else {
      // Normal values
      heartRate = this.randomInRange(65, 95);
      systolic = this.randomInRange(110, 140);
      diastolic = this.randomInRange(70, 90);
    }

    return {
      patientId: 'P001',
      timestamp: new Date(),
      heartRate: heartRate,
      bloodPressure: {
        systolic: systolic,
        diastolic: diastolic,
      },
      temperature: this.randomInRange(36.5, 37.5, 1),
      oxygenSaturation: this.randomInRange(96, 99),
      respiratoryRate: this.randomInRange(14, 18),
    };
  }

  private randomInRange(min: number, max: number, decimals = 0): number {
    const value = Math.random() * (max - min) + min;
    return decimals > 0
      ? parseFloat(value.toFixed(decimals))
      : Math.round(value);
  }

  getHistoricalVitals(hours = 8): Vitals[] {
    const vitals: Vitals[] = [];
    const now = new Date();
    const intervalMinutes = 5;
    const dataPoints = (hours * 60) / intervalMinutes;

    for (let i = dataPoints; i >= 0; i--) {
      const timestamp = new Date(
        now.getTime() - i * intervalMinutes * 60 * 1000
      );
      vitals.push({
        ...this.generateRandomVitals(),
        timestamp,
      });
    }

    return vitals;
  }
}
