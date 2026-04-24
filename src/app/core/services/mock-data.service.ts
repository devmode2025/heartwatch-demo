import { Injectable } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Vitals } from '../models/vitals.model';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
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
    assignedPhysician: 'Dr. Sarah Chen'
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
    nextMaintenanceDue: new Date('2024-06-01')
  };

  constructor() { }

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
    const baseHR = 75;
    const baseSystolic = 120;
    const baseDiastolic = 80;
    const baseTemp = 37.0;

    return {
      patientId: 'P001',
      timestamp: new Date(),
      heartRate: this.randomInRange(baseHR - 15, baseHR + 55),
      bloodPressure: {
        systolic: this.randomInRange(baseSystolic - 10, baseSystolic + 40),
        diastolic: this.randomInRange(baseDiastolic - 10, baseDiastolic + 20)
      },
      temperature: this.randomInRange(baseTemp - 0.5, baseTemp + 1.0, 1),
      oxygenSaturation: this.randomInRange(95, 99),
      respiratoryRate: this.randomInRange(12, 20)
    };
  }

  private randomInRange(min: number, max: number, decimals: number = 0): number {
    const value = Math.random() * (max - min) + min;
    return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value);
  }

  getHistoricalVitals(hours: number = 8): Vitals[] {
    const vitals: Vitals[] = [];
    const now = new Date();
    const intervalMinutes = 5;
    const dataPoints = (hours * 60) / intervalMinutes;

    for (let i = dataPoints; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
      vitals.push({
        ...this.generateRandomVitals(),
        timestamp
      });
    }

    return vitals;
  }
}
