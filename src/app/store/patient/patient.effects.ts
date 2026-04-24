import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../core/services/mock-data.service';
import * as PatientActions from './patient.actions';
import * as AlertActions from '../alerts/alerts.actions';
import { DEFAULT_VITALS_THRESHOLDS } from '../../core/models/vitals.model';

@Injectable()
export class PatientEffects {
  loadPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatient),
      switchMap(() => {
        const patient = this.mockDataService.getPatient();
        return of(PatientActions.loadPatientSuccess({ patient }));
      }),
      catchError((error) =>
        of(PatientActions.loadPatientFailure({ error: error.message }))
      )
    )
  );

  checkVitalsThresholds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.checkVitalsThresholds),
      map(({ vitals }) => {
        const alerts = [];
        const thresholds = DEFAULT_VITALS_THRESHOLDS;

        // Check heart rate
        if (vitals.heartRate > thresholds.heartRate.criticalMax) {
          alerts.push({
            type: 'vitals_hr_high' as const,
            severity: 'critical' as const,
            title: 'Critical Heart Rate',
            message: `Heart rate at ${vitals.heartRate} bpm`,
          });
        } else if (vitals.heartRate > thresholds.heartRate.max) {
          alerts.push({
            type: 'vitals_hr_high' as const,
            severity: 'warning' as const,
            title: 'Elevated Heart Rate',
            message: `Heart rate at ${vitals.heartRate} bpm`,
          });
        } else if (vitals.heartRate < thresholds.heartRate.criticalMin) {
          alerts.push({
            type: 'vitals_hr_low' as const,
            severity: 'critical' as const,
            title: 'Critical Low Heart Rate',
            message: `Heart rate at ${vitals.heartRate} bpm`,
          });
        } else if (vitals.heartRate < thresholds.heartRate.min) {
          alerts.push({
            type: 'vitals_hr_low' as const,
            severity: 'warning' as const,
            title: 'Low Heart Rate',
            message: `Heart rate at ${vitals.heartRate} bpm`,
          });
        }

        // Check blood pressure
        if (
          vitals.bloodPressure.systolic >
            thresholds.bloodPressure.systolicCritical ||
          vitals.bloodPressure.diastolic >
            thresholds.bloodPressure.diastolicCritical
        ) {
          alerts.push({
            type: 'vitals_bp_high' as const,
            severity: 'critical' as const,
            title: 'Critical Blood Pressure',
            message: `BP at ${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`,
          });
        } else if (
          vitals.bloodPressure.systolic >
            thresholds.bloodPressure.systolicMax ||
          vitals.bloodPressure.diastolic > thresholds.bloodPressure.diastolicMax
        ) {
          alerts.push({
            type: 'vitals_bp_high' as const,
            severity: 'warning' as const,
            title: 'Elevated Blood Pressure',
            message: `BP at ${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`,
          });
        }

        return alerts.length > 0
          ? AlertActions.addAlerts({
              alerts: alerts.map((a) => ({
                ...a,
                patientId: vitals.patientId,
              })),
            })
          : { type: '[Patient] No Alerts' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private mockDataService: MockDataService
  ) {}
}
