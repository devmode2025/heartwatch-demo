import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertsState } from './alerts.reducer';

export const selectAlertsState = createFeatureSelector<AlertsState>('alerts');

export const selectAllAlerts = createSelector(
  selectAlertsState,
  (state) => state.alerts
);

export const selectActiveAlerts = createSelector(selectAllAlerts, (alerts) =>
  alerts.filter((alert) => !alert.acknowledged)
);

export const selectCriticalAlerts = createSelector(
  selectActiveAlerts,
  (alerts) => alerts.filter((alert) => alert.severity === 'critical')
);

export const selectWarningAlerts = createSelector(
  selectActiveAlerts,
  (alerts) => alerts.filter((alert) => alert.severity === 'warning')
);

export const selectAllNotes = createSelector(
  selectAlertsState,
  (state) => state.notes
);

export const selectRecentNotes = createSelector(selectAllNotes, (notes) =>
  notes.slice(-5).reverse()
);
