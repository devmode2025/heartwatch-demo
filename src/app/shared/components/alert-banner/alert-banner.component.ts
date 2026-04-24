import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { Alert } from '../../../core/models/alert.model';
import { selectActiveAlerts, selectCriticalAlerts, selectWarningAlerts } from '../../../store/alerts/alerts.selectors';
import * as AlertsActions from '../../../store/alerts/alerts.actions';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertBannerComponent {
  activeAlerts$: Observable<Alert[]>;
  criticalAlerts$: Observable<Alert[]>;
  warningAlerts$: Observable<Alert[]>;

  constructor(private store: Store<AppState>) {
    this.activeAlerts$ = this.store.select(selectActiveAlerts);
    this.criticalAlerts$ = this.store.select(selectCriticalAlerts);
    this.warningAlerts$ = this.store.select(selectWarningAlerts);
  }

  acknowledgeAlert(alertId: string): void {
    this.store.dispatch(AlertsActions.acknowledgeAlert({ alertId }));
  }

  dismissAlert(alertId: string): void {
    this.store.dispatch(AlertsActions.clearAlert({ alertId }));
  }

  getAlertIcon(severity: string): string {
    switch (severity) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  }

  getTimeSince(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  }
}
