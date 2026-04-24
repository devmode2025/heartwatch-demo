import { createAction, props } from '@ngrx/store';
import { Patient } from '../../core/models/patient.model';
import { Vitals } from '../../core/models/vitals.model';

export const loadPatient = createAction('[Patient] Load Patient');

export const loadPatientSuccess = createAction(
  '[Patient] Load Patient Success',
  props<{ patient: Patient }>()
);

export const loadPatientFailure = createAction(
  '[Patient] Load Patient Failure',
  props<{ error: string }>()
);

export const updateVitals = createAction(
  '[Patient] Update Vitals',
  props<{ vitals: Vitals }>()
);

export const checkVitalsThresholds = createAction(
  '[Patient] Check Vitals Thresholds',
  props<{ vitals: Vitals }>()
);
