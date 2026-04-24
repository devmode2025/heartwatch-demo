import { ActionReducerMap } from '@ngrx/store';
import { DeviceState, deviceReducer } from './device/device.reducer';
import { PatientState, patientReducer } from './patient/patient.reducer';
import { AlertsState, alertsReducer } from './alerts/alerts.reducer';

export interface AppState {
  device: DeviceState;
  patient: PatientState;
  alerts: AlertsState;
}

export const reducers: ActionReducerMap<AppState> = {
  device: deviceReducer,
  patient: patientReducer,
  alerts: alertsReducer,
};
