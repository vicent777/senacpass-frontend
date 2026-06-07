import type {
  Alert,
  AlertsPanelData,
  AuditPanelData,
  CourseOverviewData,
  DashboardData,
  DevicePanelData,
  PresenceChartData,
  StudentListData,
} from '../modules/dashboard/types';
import {
  publicApi,
  protectedApi,
  type Aula,
  type InscricaoTurma,
  type LogAcesso,
  type Presenca,
  type Turma,
  type UnidadeCurricular,
} from './resources';
import { getProfilePicture } from '../utils/profilePicture';

export interface AulaOption {
  id: string;
  label: string;
  status: string;
  turmaId: string;
  isActive: boolean;
}

export interface DashboardLoadInput {
  professorId: string;
  turmaId?: string;
  selectedAulaId?: string;
}

export interface DashboardLoadResult {
  dashboardData: DashboardData;
  aulaOptions: AulaOption[];
  selectedAulaId: string;
  turmaId: string;
}

function formatMinutes(totalMinutes: number) {
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) {
    return '0m';
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
}

function formatTime(value: string | null) {
  if (!value) {
    return '--:--';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '--:--';
  }

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(value: string) {
  const calendarDate = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (calendarDate) {
    const [, year, month, day] = calendarDate;
    return `${day}/${month}/${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Não há dados no momento';
  }

  return date.toLocaleDateString('pt-BR');
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Não há dados no momento';
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function getCalendarDateKey(value: string) {
  const calendarDate = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (calendarDate) {
    return `${calendarDate[1]}-${calendarDate[2]}-${calendarDate[3]}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getLocalTimeMinutes(value: string) {
  const date = new Date(value);

  if (!Number.isNaN(date.getTime()) && value.includes('T')) {
    return date.getHours() * 60 + date.getMinutes();
  }

  const time = value.match(/(\d{2}):(\d{2})/);
  return time ? Number(time[1]) * 60 + Number(time[2]) : null;
}

function getAulaSortKey(aula: Aula) {
  const startMinutes = getLocalTimeMinutes(aula.horario_inicio_previsto) ?? 0;
  return `${getCalendarDateKey(aula.data_aula)}-${String(startMinutes).padStart(4, '0')}`;
}

function isAulaInProgress(aula: Aula) {
  const aulaDate = getCalendarDateKey(aula.data_aula);

  if (!aulaDate || aulaDate !== getTodayKey()) {
    return false;
  }

  const start = getLocalTimeMinutes(aula.horario_inicio_previsto);
  const end = getLocalTimeMinutes(aula.horario_fim_previsto);

  if (start === null || end === null) {
    return aula.status?.toUpperCase() === 'EM_ANDAMENTO';
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= start && currentMinutes <= end;
}

function getHistoricalAulas(aulas: Aula[]) {
  const today = getTodayKey();
  return aulas.filter((aula) => {
    const aulaDate = getCalendarDateKey(aula.data_aula);
    return aulaDate !== '' && aulaDate <= today;
  });
}

function hasCheckIn(presenca?: Presenca) {
  if (!presenca?.horario_checkin) {
    return false;
  }

  return !Number.isNaN(new Date(presenca.horario_checkin).getTime());
}

function getCheckInTimestamp(presenca: Presenca) {
  return presenca.horario_checkin
    ? new Date(presenca.horario_checkin).getTime()
    : 0;
}

function presenceStatusLabel(presenca?: Presenca): 'Presente' | 'Parcial' | 'Ausente' | 'Justificado' {
  const normalized = presenca?.status?.toUpperCase() || '';

  if (normalized.includes('JUSTIFIC')) {
    return 'Justificado';
  }

  if (!hasCheckIn(presenca)) {
    return 'Ausente';
  }

  if (normalized.includes('PARC') || normalized.includes('ATR')) {
    return 'Parcial';
  }

  return 'Presente';
}

function alertTone(text?: string): Alert['type'] {
  if (!text) {
    return 'success';
  }

  const normalized = text.toLowerCase();

  if (normalized.includes('erro') || normalized.includes('falha') || normalized.includes('não encontrado')) {
    return 'danger';
  }

  if (normalized.includes('atras') || normalized.includes('suspe')) {
    return 'warning';
  }

  return 'success';
}


function getSelectedAula(aulas: Aula[], selectedAulaId?: string) {
  const historicalAulas = getHistoricalAulas(aulas);

  if (selectedAulaId) {
    const selected = historicalAulas.find((aula) => aula.id_aula === selectedAulaId);

    if (selected) {
      return selected;
    }
  }

  const activeAula = historicalAulas.find((aula) => isAulaInProgress(aula));

  if (activeAula) {
    return activeAula;
  }

  return [...historicalAulas].sort(
    (left, right) => getAulaSortKey(right).localeCompare(getAulaSortKey(left)),
  )[0];
}

export function buildAulaOptions(aulas: Aula[]) {
  return getHistoricalAulas(aulas)
    .map((aula) => {
      const isActive = isAulaInProgress(aula);
      return { ...aula, isActive };
    })
    .sort((left, right) => {
      if (left.isActive !== right.isActive) {
        return left.isActive ? -1 : 1;
      }

      return getAulaSortKey(right).localeCompare(getAulaSortKey(left));
    })
    .map((aula) => ({
      id: aula.id_aula,
      label: `${formatDate(aula.data_aula)} • ${formatTime(aula.horario_inicio_previsto)} - ${formatTime(aula.horario_fim_previsto)}`,
      status: aula.status,
      turmaId: aula.turma.id_turma,
      isActive: aula.isActive, // Puxa o boolean que calculamos ali em cima
    }));
}

function buildAlerts(presencas: Presenca[]): AlertsPanelData {
  return {
    title: 'Movimentação da aula',
    legend: [
      { label: 'Presente', color: '#10B981', icon: 'present' },
      { label: 'Parcial', color: '#F59E0B', icon: 'partial' },
      { label: 'Ausente', color: '#EF4444', icon: 'absent' },
    ],
    alerts: presencas
      .filter((presence) => hasCheckIn(presence))
      .sort((left, right) => getCheckInTimestamp(right) - getCheckInTimestamp(left))
      .slice(0, 3)
      .map((presence, index) => ({
        id: index + 1,
        title: `${presence.aluno.nome} • ${presenceStatusLabel(presence)}`,
        description: `${presence.aluno.matricula_institucional} • Check-in ${formatTime(presence.horario_checkin)}`,
        type: alertTone(presence.status),
        time: formatTime(presence.horario_checkin),
      })),
  };
}

function buildStudentList(inscricoes: InscricaoTurma[], presencas: Presenca[]): StudentListData {
  const presencasByAluno = new Map<string, Presenca>();

  presencas.forEach((presenca) => {
    const alunoId = presenca.aluno.id_aluno;
    const current = presencasByAluno.get(alunoId);

    if (!current || (!hasCheckIn(current) && hasCheckIn(presenca))) {
      presencasByAluno.set(alunoId, presenca);
    }
  });

  const items = inscricoes.map((inscricao, index) => {
    const presenca = presencasByAluno.get(inscricao.aluno.id_aluno);

    return {
    id: index + 1,
    studentId: inscricao.aluno.id_aluno,
    presenceId: presenca?.id_presenca,
    name: inscricao.aluno.nome,
    avatar: getProfilePicture(inscricao.aluno.id_aluno),
    registration: inscricao.aluno.matricula_institucional,
    entry: presenca ? formatTime(presenca.horario_checkin) : '--:--',
    permanence: presenca ? formatMinutes(presenca.tempo_permanencia_minutos) : '0m',
    status: presenceStatusLabel(presenca),
    justification: presenca?.justificativa_manual || undefined,
    };
  });

  return {
    title: 'Lista de presença da aula',
    searchPlaceholder: 'Buscar aluno...',
    filterLabel: 'Todos os status',
    filterOptions: ['Todos os status', 'Presente', 'Parcial', 'Ausente', 'Justificado'],
    statusLegend: [
      { label: 'Presente', color: '#10B981' },
      { label: 'Parcial', color: '#F59E0B' },
      { label: 'Ausente', color: '#EF4444' },
      { label: 'Justificado', color: '#2563EB' },
    ],
    columns: [
      { key: 'name', label: 'Aluno' },
      { key: 'registration', label: 'Matrícula' },
      { key: 'entry', label: 'Entrada' },
      { key: 'permanence', label: 'Permanência' },
      { key: 'status', label: 'Status' },
      { key: 'action', label: 'Ação' },
    ],
    items,
    totalLabel: '{shown} de {total} alunos',
    previousLabel: 'Anterior',
    nextLabel: 'Próxima',
  };
}

function buildPresenceChart(
  aulas: Aula[],
  todasPresencas: Presenca[],
  selectedAula: Aula,
  inscricoes: InscricaoTurma[],
): PresenceChartData {
  const selectedDate = getCalendarDateKey(selectedAula.data_aula);
  const alunoIds = new Set(inscricoes.map((inscricao) => inscricao.aluno.id_aluno));
  const ultimasAulas = getHistoricalAulas(aulas)
    .filter((aula) => getCalendarDateKey(aula.data_aula) <= selectedDate)
    .sort((left, right) => getAulaSortKey(left).localeCompare(getAulaSortKey(right)));

  const data = ultimasAulas.map((aula) => {
    const totalPresentes = new Set(
      todasPresencas
        .filter((presenca) => presenca.aula.id_aula === aula.id_aula)
        .filter((presenca) => alunoIds.has(presenca.aluno.id_aluno))
        .filter((presenca) => hasCheckIn(presenca))
        .map((presenca) => presenca.aluno.id_aluno),
    ).size;

    return {
      time: `${formatDate(aula.data_aula)} ${formatTime(aula.horario_inicio_previsto)}`,
      value: totalPresentes,
    };
  });

  return {
    title: 'Presença por aula',
    legendLabel: 'Presentes, parciais e atrasados',
    totalStudents: alunoIds.size,
    data,
  };
}

function buildCourseOverview(
  turma: Turma,
  aula: Aula,
  inscricoes: InscricaoTurma[],
  presencas: Presenca[],
  ucDetalhes: UnidadeCurricular | null,
): CourseOverviewData {
  const alunoIds = new Set(inscricoes.map((inscricao) => inscricao.aluno.id_aluno));
  const totalAlunos = alunoIds.size;
  const totalPresentes = new Set(
    presencas
      .filter((presence) => alunoIds.has(presence.aluno.id_aluno))
      .filter((presence) => hasCheckIn(presence))
      .map((presence) => presence.aluno.id_aluno),
  ).size;
  const presencePercent = totalAlunos > 0 ? Math.round((totalPresentes / totalAlunos) * 100) : 0;
  const aulaEmAndamento = isAulaInProgress(aula);
  const aulaStatus = aulaEmAndamento ? 'Em andamento' : aula.status || 'Selecionada';

  const nomeUc = ucDetalhes?.nome || turma.unidade_curricular.nome;
  const cargaHoraria = ucDetalhes?.carga_horaria ?? turma.unidade_curricular.carga_horaria;

  return {
    title: `${nomeUc}${cargaHoraria ? ` (${cargaHoraria}h)` : ''}`,
    subtitle: `${turma.professor.nome} • ${aulaStatus}`,
    dateLabel: 'Dia da aula',
    dateValue: formatDate(aula.data_aula),
    timeLabel: 'Horário',
    timeValue: `${formatTime(aula.horario_inicio_previsto)} - ${formatTime(aula.horario_fim_previsto)}`,
    roomLabel: 'Sala',
    roomValue: aula.dispositivo?.localizacao || 'Não há dados no momento',
    roomIcon: 'building',
    presenceLabel: aulaEmAndamento ? 'Presença atual' : 'Presença',
    presenceValue: totalAlunos > 0 ? `${totalPresentes} / ${totalAlunos} alunos` : 'Nenhum aluno inscrito',
    progress: presencePercent,
    progressNote:
      totalAlunos > 0
        ? aulaEmAndamento
          ? `${totalAlunos - totalPresentes} alunos ainda sem check-in`
          : 'Aula histórica selecionada'
        : 'Não há dados no momento',
    optionsLabel: 'Mais opções',
  };
}

function buildDevicePanel(aula: Aula): DevicePanelData {
  const device = aula.dispositivo;

  if (!device) {
    return {
      title: 'Nenhum dispositivo',
      description: '', // Vazio para disparar o EmptyState
      actions: [],
    };
  }

  return {
    title: 'Dispositivo da sala',
    description: `${device.id_hardware}|${device.status}`,
    actions: [],
  };
}

function buildAuditPanel(logs: LogAcesso[]): AuditPanelData {
  return {
    title: 'Registros RFID da sala',
    actionTitle: 'Trocar de turma',
    actionDescription: 'Use a página de turmas para acessar outro contexto. As aulas anteriores da turma atual ficam no seletor acima.',
    actionButtonLabel: 'Ir para turmas',
    logsTitle: 'Últimos eventos do dispositivo',
    logs: [...logs]
      .sort((left, right) => new Date(right.data_hora).getTime() - new Date(left.data_hora).getTime())
      .slice(0, 6)
      .map((log) => ({
        text: `${log.tipo_evento} • ${log.rfid_uid} • ${log.dispositivo?.localizacao || 'Localização desconhecida'}`,
        time: formatDateTime(log.data_hora),
      })),
  };
}

export async function loadDashboardData({ professorId, turmaId, selectedAulaId }: DashboardLoadInput): Promise<DashboardLoadResult> {
  const [turmas, activeAulas, logs, todasPresencas] = await Promise.all([
  protectedApi.listTurmasByProfessor(professorId).catch(() => [] as Turma[]),
  protectedApi.listAulasAtivasByProfessor(professorId).catch(() => [] as Aula[]),
  publicApi.listAcessoLogs().catch(() => [] as LogAcesso[]),
  protectedApi.listPresencas().catch(() => [] as Presenca[]), // Voltou!
]);

  console.log('DADOS DO DASHBOARD:', {
    turmasRecebidas: turmas,
    aulasAtivasRecebidas: activeAulas,
    professorIdUsado: professorId
  });

  const safeTurmas = Array.isArray(turmas) ? turmas : [];
  const safeActiveAulas = Array.isArray(activeAulas) ? activeAulas : [];
  const safeLogs = Array.isArray(logs) ? logs : [];
  const safeTodasPresencas = Array.isArray(todasPresencas) ? todasPresencas : [];

  console.log('DEBUG 1 - Aulas ativas que chegaram da API:', activeAulas);
  console.log('DEBUG 2 - Lista segura de aulas ativas:', safeActiveAulas);

  const initialTurmaId = turmaId || safeActiveAulas[0]?.turma?.id_turma || safeTurmas[0]?.id_turma || '';
  const turma = safeTurmas.find((item) => item.id_turma === initialTurmaId) ?? safeTurmas[0];

  if (!turma) {
    return {
      dashboardData: EMPTY_DASHBOARD_DATA,
      aulaOptions: [],
      selectedAulaId: '',
      turmaId: '',
    };
  }

  const [ucDetalhes, aulasDaTurma, inscricoesDaTurma] = await Promise.all([
    protectedApi
      .getUnidadeCurricularById(turma.unidade_curricular.id_unidade_curricular)
      .catch(() => null),
    protectedApi.listAulasByTurma(turma.id_turma).catch(() => [] as Aula[]),
    protectedApi.listInscricoesByTurma(turma.id_turma).catch(() => [] as InscricaoTurma[]),
  ]);
  const safeAulasDaTurma = Array.isArray(aulasDaTurma) ? aulasDaTurma : [];
  const safeInscricoes = Array.isArray(inscricoesDaTurma)
    ? inscricoesDaTurma.filter((inscricao) => inscricao.status?.toUpperCase() === 'ATIVO')
    : [];
  const selectedAula = getSelectedAula(safeAulasDaTurma, selectedAulaId);

  if (!selectedAula) {
    return {
      dashboardData: EMPTY_DASHBOARD_DATA,
      aulaOptions: buildAulaOptions(safeAulasDaTurma),
      selectedAulaId: '',
      turmaId: turma.id_turma,
    };
  }

  const selectedPresencas = await protectedApi.listPresencasByAula(selectedAula.id_aula).catch(() => [] as Presenca[]);
  const selectedLogs = selectedAula.dispositivo
    ? safeLogs.filter((log) => log?.dispositivo?.id_dispositivo === selectedAula.dispositivo?.id_dispositivo)
    : safeLogs;

  const dashboardData: DashboardData = {
    header: {
      eyebrow: '',
      title: turma.professor.nome,
      actionLabel: 'Turmas',
    },
    courseOverview: buildCourseOverview(turma, selectedAula, safeInscricoes, selectedPresencas, ucDetalhes),
    alertsPanel: buildAlerts(selectedPresencas),
    studentList: buildStudentList(safeInscricoes, selectedPresencas),
    presenceChart: buildPresenceChart(
      safeAulasDaTurma,
      safeTodasPresencas,
      selectedAula,
      safeInscricoes,
    ),
    auditPanel: buildAuditPanel(selectedLogs),
    summaryCards: [
      {
        title: 'Aulas na turma',
        value: String(safeAulasDaTurma.length),
        subtitle: safeAulasDaTurma.length > 0 ? 'Inclui aulas anteriores da turma' : 'Não há dados no momento',
      },
      {
        title: 'Alunos inscritos',
        value: String(safeInscricoes.length),
        subtitle: safeInscricoes.length > 0 ? 'Inscrições ativas na turma' : 'Não há dados no momento',
      },
      {
        title: 'Leituras RFID',
        value: String(selectedLogs.length),
        subtitle: selectedLogs.length > 0 ? 'Eventos vinculados ao dispositivo' : 'Não há dados no momento',
      },
    ],
    devicePanel: buildDevicePanel(selectedAula),
  };

  return {
    dashboardData,
    aulaOptions: buildAulaOptions(safeAulasDaTurma),
    selectedAulaId: selectedAula.id_aula,
    turmaId: turma.id_turma,
  };
}

export const EMPTY_DASHBOARD_DATA: DashboardData = {
  header: {
    eyebrow: '',
    title: 'Dashboard',
    actionLabel: 'Turmas',
  },
  courseOverview: {
    title: 'Não há dados no momento',
    subtitle: 'Não há dados no momento',
    dateLabel: 'Dia da aula',
    dateValue: 'Não há dados no momento',
    timeLabel: 'Horário',
    timeValue: 'Não há dados no momento',
    roomLabel: 'Sala',
    roomValue: 'Não há dados no momento',
    roomIcon: 'building',
    presenceLabel: 'Presença atual',
    presenceValue: 'Não há dados no momento',
    progress: 0,
    progressNote: 'Não há dados no momento',
    optionsLabel: 'Mais opções',
  },
  devicePanel: {
    title: 'Não há dados no momento',
    description: 'Não há dados no momento',
    actions: [],
  },
  alertsPanel: {
    title: 'Movimentação da aula',
    legend: [
      { label: 'Presente', color: '#10B981', icon: 'present' },
      { label: 'Parcial', color: '#F59E0B', icon: 'partial' },
      { label: 'Ausente', color: '#EF4444', icon: 'absent' },
    ],
    alerts: [],
  },
  studentList: {
    title: 'Lista da turma',
    searchPlaceholder: 'Buscar aluno...',
    filterLabel: 'Todos os status',
    filterOptions: ['Todos os status', 'Presente', 'Parcial', 'Ausente', 'Justificado'],
    statusLegend: [
      { label: 'Presente', color: '#10B981' },
      { label: 'Parcial', color: '#F59E0B' },
      { label: 'Ausente', color: '#EF4444' },
      { label: 'Justificado', color: '#2563EB' },
    ],
    columns: [
      { key: 'name', label: 'Aluno' },
      { key: 'registration', label: 'Matrícula' },
      { key: 'entry', label: 'Entrada' },
      { key: 'permanence', label: 'Permanência' },
      { key: 'status', label: 'Status' },
      { key: 'action', label: 'Ação' },
    ],
    items: [],
    totalLabel: '{shown} de {total} alunos',
    previousLabel: 'Anterior',
    nextLabel: 'Próxima',
  },
  presenceChart: {
    title: 'Presença por período',
    legendLabel: 'Tempo de permanência',
    totalStudents: 0,
    data: [],
  },
  auditPanel: {
    title: 'Registros RFID da sala',
    actionTitle: 'Trocar de turma',
    actionDescription: 'Use a página de turmas para trocar o contexto. As aulas anteriores da turma atual ficam no seletor acima.',
    actionButtonLabel: 'Ir para turmas',
    logsTitle: 'Últimos eventos do dispositivo',
    logs: [],
  },
  summaryCards: [
    {
      title: 'Aulas na turma',
      value: '0',
      subtitle: 'Não há dados no momento',
    },
    {
      title: 'Alunos inscritos',
      value: '0',
      subtitle: 'Não há dados no momento',
    },
    {
      title: 'Leituras RFID',
      value: '0',
      subtitle: 'Não há dados no momento',
    },
  ],
};
