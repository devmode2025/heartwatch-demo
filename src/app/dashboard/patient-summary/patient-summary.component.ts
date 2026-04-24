import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '../../core/models/patient.model';

@Component({
  selector: 'app-patient-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientSummaryComponent {
  @Input() patient: Patient | null = null;
  @Input() lastUpdated: Date | null = null;
}
