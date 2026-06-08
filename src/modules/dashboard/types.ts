export interface SummaryCardData {
  title: string;
  value: string;
  subtitle: string;
}

export interface DashboardHeaderData {
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel: string;
}

export interface CourseOverviewData {
  title: string;
  subtitle: string;
  dateLabel: string;
  dateValue: string;
  timeLabel: string;
  timeValue: string;
  roomLabel: string;
  roomValue: string;
  roomIcon: 'building';
  presenceLabel: string;
  presenceValue: string;
  progress: number;
  progressNote: string;
  optionsLabel: string;
}

export interface DeviceActionData {
  label: string;
  icon: 'refresh' | 'sync' | 'lock' | 'unlock';
  danger?: boolean;
}

export interface DevicePanelData {
  title: string;
  description: string;
  actions: DeviceActionData[];
}

export type DeviceActionKind = DeviceActionData['icon'];

export interface Alert {
  id: number;
  title: string;
  description: string;
  type: 'warning' | 'danger' | 'success';
}

export interface AlertsPanelData {
  title: string;
  legend: Array<{ label: string; color: string; icon: 'present' | 'partial' | 'absent' }>;
  alerts: Alert[];
}

export interface Student {
  id: number;
  studentId?: string;
  presenceId?: string;
  name: string;
  avatar?: string;
  registration: string;
  entry: string;
  permanence: string;
  status: 'Presente' | 'Parcial' | 'Ausente' | 'Justificado';
  justification?: string;
}

export interface StudentListData {
  title: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterOptions?: string[];
  statusLegend: Array<{ label: string; color: string }>;
  columns: Array<{ key: string; label: string }>;
  items: Student[];
  totalLabel: string;
  previousLabel: string;
  nextLabel: string;
}

export interface AuditLog {
  text: string;
  time: string;
}

export interface AuditPanelData {
  title: string;
  actionTitle: string;
  actionDescription: string;
  actionButtonLabel: string;
  logsTitle: string;
  logs: AuditLog[];
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface PresenceChartData {
  title: string;
  legendLabel: string;
  totalStudents: number;
  data: ChartDataPoint[];
}

export interface DashboardData {
  header: DashboardHeaderData;
  courseOverview: CourseOverviewData;
  devicePanel: DevicePanelData;
  alertsPanel: AlertsPanelData;
  studentList: StudentListData;
  presenceChart: PresenceChartData;
  auditPanel: AuditPanelData;
  summaryCards: SummaryCardData[];
}
