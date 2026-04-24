import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState } from './device.reducer';

export const selectDeviceState = createFeatureSelector<DeviceState>('device');

export const selectDevice = createSelector(
  selectDeviceState,
  (state) => state.device
);

export const selectDeviceLoading = createSelector(
  selectDeviceState,
  (state) => state.loading
);

export const selectDeviceError = createSelector(
  selectDeviceState,
  (state) => state.error
);

export const selectDeviceStatus = createSelector(
  selectDevice,
  (device) => device?.status
);

export const selectBatteryLevel = createSelector(
  selectDevice,
  (device) => device?.batteryLevel
);
