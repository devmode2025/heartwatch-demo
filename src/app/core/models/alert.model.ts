export interface Alert {
  id: string;
  patientId: string;
  type: AlertType;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  relatedData?: any;
}

export type AlertType =
  | 'vitals_hr_high'
  | 'vitals_hr_low'
  | 'vitals_bp_high'
  | 'vitals_temp_high'
  | 'vitals_temp_low'
  | 'device_battery_low'
  | 'device_battery_critical'
  | 'device_offline'
  | 'device_pump_speed'
  | 'device_flow_rate'
  | 'system_notification';

export interface AlertFilter {
  severity?: ('info' | 'warning' | 'critical')[];
  acknowledged?: boolean;
  patientId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface Note {
  id: string;
  patientId: string;
  title: string;
  content: string;
  priority: 'low' | 'normal' | 'high';
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
