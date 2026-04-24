import { createReducer, on } from '@ngrx/store';
import { Alert, Note } from '../../core/models/alert.model';
import * as AlertsActions from './alerts.actions';

export interface AlertsState {
  alerts: Alert[];
  notes: Note[];
}

export const initialState: AlertsState = {
  alerts: [],
  notes: [],
};

let alertIdCounter = 1;
let noteIdCounter = 1;

export const alertsReducer = createReducer(
  initialState,
  on(AlertsActions.addAlert, (state, { alert }) => ({
    ...state,
    alerts: [
      ...state.alerts,
      {
        ...alert,
        id: `alert-${alertIdCounter++}`,
        timestamp: new Date(),
        acknowledged: false,
      } as Alert,
    ],
  })),
  on(AlertsActions.addAlerts, (state, { alerts }) => ({
    ...state,
    alerts: [
      ...state.alerts,
      ...alerts.map(
        (alert) =>
          ({
            ...alert,
            id: `alert-${alertIdCounter++}`,
            timestamp: new Date(),
            acknowledged: false,
          } as Alert)
      ),
    ],
  })),
  on(AlertsActions.acknowledgeAlert, (state, { alertId }) => ({
    ...state,
    alerts: state.alerts.map((alert) =>
      alert.id === alertId
        ? { ...alert, acknowledged: true, acknowledgedAt: new Date() }
        : alert
    ),
  })),
  on(AlertsActions.clearAlert, (state, { alertId }) => ({
    ...state,
    alerts: state.alerts.filter((alert) => alert.id !== alertId),
  })),
  on(AlertsActions.clearAllAlerts, (state) => ({
    ...state,
    alerts: [],
  })),
  on(AlertsActions.addNote, (state, { note }) => ({
    ...state,
    notes: [
      ...state.notes,
      {
        ...note,
        id: `note-${noteIdCounter++}`,
        createdAt: new Date(),
      } as Note,
    ],
  }))
);
