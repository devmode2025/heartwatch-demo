import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vitals, DEFAULT_VITALS_THRESHOLDS } from '../../core/models/vitals.model';

@Component({
  selector: 'app-vitals-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitals-panel.component.html',
  styleUrls: ['./vitals-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VitalsPanelComponent {
  @Input() vitals: Vitals | null = null;
  thresholds = DEFAULT_VITALS_THRESHOLDS;

  getHRStatus(hr: number): string {
    if (hr > this.thresholds.heartRate.criticalMax || hr < this.thresholds.heartRate.criticalMin) return 'critical';
    if (hr > this.thresholds.heartRate.max || hr < this.thresholds.heartRate.min) return 'warning';
    return 'normal';
  }

  getBPStatus(systolic: number, diastolic: number): string {
    if (systolic > this.thresholds.bloodPressure.systolicCritical || diastolic > this.thresholds.bloodPressure.diastolicCritical) return 'critical';
    if (systolic > this.thresholds.bloodPressure.systolicMax || diastolic > this.thresholds.bloodPressure.diastolicMax) return 'warning';
    return 'normal';
  }
}
