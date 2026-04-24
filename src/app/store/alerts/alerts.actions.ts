import { createAction, props } from '@ngrx/store';
import { Alert, Note } from '../../core/models/alert.model';

export const addAlert = createAction(
  '[Alerts] Add Alert',
  props<{ alert: Partial<Alert> }>()
);

export const addAlerts = createAction(
  '[Alerts] Add Alerts',
  props<{ alerts: Partial<Alert>[] }>()
);

export const acknowledgeAlert = createAction(
  '[Alerts] Acknowledge Alert',
  props<{ alertId: string }>()
);

export const clearAlert = createAction(
  '[Alerts] Clear Alert',
  props<{ alertId: string }>()
);

export const clearAllAlerts = createAction('[Alerts] Clear All Alerts');

export const addNote = createAction(
  '[Alerts] Add Note',
  props<{ note: Omit<Note, 'id' | 'createdAt'> }>()
);

export const loadNotes = createAction('[Alerts] Load Notes');
