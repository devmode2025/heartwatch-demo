import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../store';
import { Patient } from '../core/models/patient.model';
import { Vitals } from '../core/models/vitals.model';
import { Device } from '../core/models/device.model';
import { MockDataService } from '../core/services/mock-data.service';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { VitalsPanelComponent } from './vitals-panel/vitals-panel.component';
import * as PatientActions from '../store/patient/patient.actions';
import * as DeviceActions from '../store/device/device.actions';
import { selectPatient, selectCurrentVitals } from '../store/patient/patient.selectors';
import { selectDevice } from '../store/device/device.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PatientSummaryComponent,
    DeviceStatusComponent,
    VitalsPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  patient$: Observable<Patient | null>;
  vitals$: Observable<Vitals | null>;
  device$: Observable<Device | null>;
  
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private mockDataService: MockDataService
  ) {
    this.patient$ = this.store.select(selectPatient);
    this.vitals$ = this.store.select(selectCurrentVitals);
    this.device$ = this.store.select(selectDevice);
  }

  ngOnInit(): void {
    // Load initial data
    this.store.dispatch(PatientActions.loadPatient());
    this.store.dispatch(DeviceActions.loadDevice());

    // Subscribe to real-time vitals stream
    this.mockDataService.getVitalsStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe(vitals => {
        this.store.dispatch(PatientActions.updateVitals({ vitals }));
        this.store.dispatch(PatientActions.checkVitalsThresholds({ vitals }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
