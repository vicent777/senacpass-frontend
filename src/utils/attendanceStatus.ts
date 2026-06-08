import type { Presenca } from '../services/resources';

export type AttendanceStatus = 'Presente' | 'Parcial' | 'Ausente' | 'Justificado';

function hasValidDate(value: string | null) {
  return Boolean(value && !Number.isNaN(new Date(value).getTime()));
}

export function getAttendanceStatus(presenca?: Presenca): AttendanceStatus {
  if (!presenca) {
    return 'Ausente';
  }

  const status = presenca.status?.toUpperCase() || '';

  if (status.includes('JUSTIFIC')) {
    return 'Justificado';
  }

  if (!hasValidDate(presenca.horario_checkin) || status.includes('AUSENT')) {
    return 'Ausente';
  }

  const isPartialStatus =
    status.includes('ABERT') ||
    status.includes('PARC') ||
    status.includes('ATRAS') ||
    status.includes('INSUFIC');

  if (isPartialStatus || !hasValidDate(presenca.horario_checkout)) {
    return 'Parcial';
  }

  return 'Presente';
}

export function attendanceStatusRank(presenca?: Presenca) {
  const ranks: Record<AttendanceStatus, number> = {
    Ausente: 0,
    Parcial: 1,
    Justificado: 2,
    Presente: 3,
  };

  return ranks[getAttendanceStatus(presenca)];
}
