import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientState } from './patient.reducer';

export const selectPatientState =
  createFeatureSelector<PatientState>('patient');

export const selectPatient = createSelector(
  selectPatientState,
  (state) => state.patient
);

export const selectCurrentVitals = createSelector(
  selectPatientState,
  (state) => state.currentVitals
);

export const selectPatientLoading = createSelector(
  selectPatientState,
  (state) => state.loading
);

export const selectPatientError = createSelector(
  selectPatientState,
  (state) => state.error
);
