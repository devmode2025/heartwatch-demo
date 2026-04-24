import { createAction, props } from '@ngrx/store';
import { Device } from '../../core/models/device.model';

// Load device
export const loadDevice = createAction(
  '[Device] Load Device'
);

export const loadDeviceSuccess = createAction(
  '[Device] Load Device Success',
  props<{ device: Device }>()
);

export const loadDeviceFailure = createAction(
  '[Device] Load Device Failure',
  props<{ error: string }>()
);

// Update device telemetry
export const updateDeviceTelemetry = createAction(
  '[Device] Update Telemetry',
  props<{ device: Device }>()
);

// Device alerts
export const checkDeviceThresholds = createAction(
  '[Device] Check Thresholds',
  props<{ device: Device }>()
);
