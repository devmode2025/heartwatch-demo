import { createReducer, on } from '@ngrx/store';
import { Device } from '../../core/models/device.model';
import * as DeviceActions from './device.actions';

export interface DeviceState {
  device: Device | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DeviceState = {
  device: null,
  loading: false,
  error: null
};

export const deviceReducer = createReducer(
  initialState,
  on(DeviceActions.loadDevice, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DeviceActions.loadDeviceSuccess, (state, { device }) => ({
    ...state,
    device,
    loading: false,
    error: null
  })),
  on(DeviceActions.loadDeviceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DeviceActions.updateDeviceTelemetry, (state, { device }) => ({
    ...state,
    device
  }))
);
