export interface Device {
  id: string;
  patientId: string;
  deviceType: DeviceType;
  serialNumber: string;
  installDate: Date;
  status: DeviceStatus;
  batteryLevel: number; // percentage
  pumpSpeed: number; // RPM
  flowRate: number; // L/min
  powerSource: PowerSource;
  lastMaintenance?: Date;
  nextMaintenanceDue?: Date;
}

export type DeviceType = 'LVAD' | 'RVAD' | 'BiVAD' | 'TAH';

export type DeviceStatus = 'online' | 'warning' | 'critical' | 'offline';

export type PowerSource = 'battery' | 'ac' | 'backup';

export interface DeviceAlert {
  deviceId: string;
  type: DeviceAlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export type DeviceAlertType =
  | 'low_battery'
  | 'pump_speed_deviation'
  | 'flow_rate_low'
  | 'power_source_change'
  | 'maintenance_due'
  | 'device_offline';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface DeviceTelemetry {
  deviceId: string;
  timestamp: Date;
  pumpSpeed: number;
  flowRate: number;
  power: number; // watts
  batteryLevel: number;
}

// Thresholds for device monitoring
export interface DeviceThresholds {
  batteryLevelWarning: number;
  batteryLevelCritical: number;
  pumpSpeedDeviationPercent: number;
  flowRateMinimum: number;
}

export const DEFAULT_DEVICE_THRESHOLDS: DeviceThresholds = {
  batteryLevelWarning: 30,
  batteryLevelCritical: 15,
  pumpSpeedDeviationPercent: 20,
  flowRateMinimum: 3.0,
};
