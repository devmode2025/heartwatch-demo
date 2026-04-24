import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../core/services/mock-data.service';
import * as DeviceActions from './device.actions';
import * as AlertActions from '../alerts/alerts.actions';
import { DEFAULT_DEVICE_THRESHOLDS } from '../../core/models/device.model';

@Injectable()
export class DeviceEffects {
  loadDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.loadDevice),
      switchMap(() => {
        const device = this.mockDataService.getDevice();
        return of(DeviceActions.loadDeviceSuccess({ device }));
      }),
      catchError((error) =>
        of(DeviceActions.loadDeviceFailure({ error: error.message }))
      )
    )
  );

  checkDeviceThresholds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.checkDeviceThresholds),
      map(({ device }) => {
        const alerts = [];

        if (
          device.batteryLevel < DEFAULT_DEVICE_THRESHOLDS.batteryLevelCritical
        ) {
          alerts.push({
            type: 'device_battery_critical' as const,
            severity: 'critical' as const,
            title: 'Critical Battery Level',
            message: `Device battery at ${device.batteryLevel}%`,
          });
        }

        return alerts.length > 0
          ? AlertActions.addAlerts({
              alerts: alerts.map((a) => ({
                ...a,
                patientId: device.patientId,
              })),
            })
          : { type: '[Device] No Alerts' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private mockDataService: MockDataService
  ) {}
}
