import { createReducer, on } from '@ngrx/store';
import { Patient } from '../../core/models/patient.model';
import { Vitals } from '../../core/models/vitals.model';
import * as PatientActions from './patient.actions';

export interface PatientState {
  patient: Patient | null;
  currentVitals: Vitals | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PatientState = {
  patient: null,
  currentVitals: null,
  loading: false,
  error: null
};

export const patientReducer = createReducer(
  initialState,
  on(PatientActions.loadPatient, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PatientActions.loadPatientSuccess, (state, { patient }) => ({
    ...state,
    patient,
    loading: false,
    error: null
  })),
  on(PatientActions.loadPatientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(PatientActions.updateVitals, (state, { vitals }) => ({
    ...state,
    currentVitals: vitals
  }))
);
