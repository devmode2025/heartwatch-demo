import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../../core/models/device.model';

@Component({
  selector: 'app-device-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceStatusComponent {
  @Input() device: Device | null = null;

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'online': return 'status-online';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      case 'offline': return 'status-offline';
      default: return '';
    }
  }

  getBatteryClass(level: number | undefined): string {
    if (!level) return '';
    if (level < 15) return 'battery-critical';
    if (level < 30) return 'battery-warning';
    return 'battery-good';
  }
}
