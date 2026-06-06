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
  type LogAcesso,
  type Presenca,
  type Turma,
  type UnidadeCurricular,
} from './resources';

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

function formatTime(value: string) {
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

function presenceStatusLabel(status?: string): 'Presente' | 'Parcial' | 'Ausente' {
  if (!status) {
    return 'Ausente';
  }

  const normalized = status.toUpperCase();

  if (normalized.includes('PRES')) {
    return 'Presente';
  }

  if (normalized.includes('PARC') || normalized.includes('ATR')) {
    return 'Parcial';
  }

  return 'Ausente';
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
  if (selectedAulaId) {
    const selected = aulas.find((aula) => aula.id_aula === selectedAulaId);

    if (selected) {
      return selected;
    }
  }

  const activeAula = aulas.find((aula) => aula.status?.toUpperCase() === 'EM_ANDAMENTO');

  if (activeAula) {
    return activeAula;
  }

  return [...aulas].sort(
    (left, right) => new Date(right.data_aula).getTime() - new Date(left.data_aula).getTime(),
  )[0];
}

export function buildAulaOptions(aulas: Aula[], aulasAtivas: Aula[] = []) {
  // Cria um conjunto (Set) com os IDs das aulas que sabemos que estão ativas
  const activeAulaIds = new Set(aulasAtivas.map(a => a.id_aula));

  return [...aulas]
    .map((aula) => {
      // É ativa se estiver na lista de ativas OU se o status próprio disser que sim
      const isActive = activeAulaIds.has(aula.id_aula) || aula.status?.toUpperCase() === 'EM_ANDAMENTO';
      return { ...aula, isActive };
    })
    .sort((left, right) => {
      if (left.isActive !== right.isActive) {
        return left.isActive ? -1 : 1;
      }

      return new Date(right.data_aula).getTime() - new Date(left.data_aula).getTime();
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
    alerts: [...presencas]
      .sort((left, right) => new Date(right.horario_checkin).getTime() - new Date(left.horario_checkin).getTime())
      .slice(0, 3)
      .map((presence, index) => ({
        id: index + 1,
        title: `${presence.aluno.nome} • ${presenceStatusLabel(presence.status)}`,
        description: `${presence.aluno.matricula_institucional} • Check-in ${formatTime(presence.horario_checkin)}`,
        type: alertTone(presence.status),
        time: formatTime(presence.horario_checkin),
      })),
  };
}

function buildStudentList(presencas: Presenca[]): StudentListData {
  const items = presencas.map((presenca, index) => ({
    id: index + 1,
    name: presenca.aluno.nome,
    avatar: `https://i.pravatar.cc/150?u=${presenca.aluno.id_aluno}`,
    registration: presenca.aluno.matricula_institucional,
    entry: formatTime(presenca.horario_checkin),
    permanence: formatMinutes(presenca.tempo_permanencia_minutos),
    status: presenceStatusLabel(presenca.status),
  }));

  return {
    title: 'Lista de presença da aula',
    searchPlaceholder: 'Buscar aluno...',
    filterLabel: 'Todos os status',
    filterOptions: ['Todos os status', 'Presente', 'Parcial', 'Ausente'],
    statusLegend: [
      { label: 'Presente', color: '#10B981' },
      { label: 'Parcial', color: '#F59E0B' },
      { label: 'Ausente', color: '#EF4444' },
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

function buildPresenceChart(aulas: Aula[], todasPresencas: Presenca[]): PresenceChartData {
  const ultimasAulas = [...aulas]
    .sort((left, right) => new Date(left.data_aula).getTime() - new Date(right.data_aula).getTime())
    .slice(-8);

  const data = ultimasAulas.map((aula) => {
    const presencasDaAula = todasPresencas.filter(p => p.aula.id_aula === aula.id_aula);
    const totalPresentes = presencasDaAula.filter(p => p.status?.toUpperCase().includes('PRES')).length;

    return {
      time: formatDate(aula.data_aula),
      value: totalPresentes,
    };
  });

  return {
    title: 'Presença por aula',
    legendLabel: 'Total de presentes',
    data,
  };
}

function buildCourseOverview(turma: Turma, aula: Aula, presencas: Presenca[], ucDetalhes: UnidadeCurricular | null): CourseOverviewData {
  const totalAlunos = presencas.length;
  const totalPresentes = presencas.filter((presence) => presence.status?.toUpperCase().includes('PRES')).length;
  const presencePercent = totalAlunos > 0 ? Math.round((totalPresentes / totalAlunos) * 100) : 0;
  const aulaStatus = aula.status?.toUpperCase() === 'EM_ANDAMENTO' ? 'Em andamento' : aula.status || 'Selecionada';

  const nomeUc = ucDetalhes?.nome || turma.unidade_curricular.nome;
  const cargaHorariaTxt = ucDetalhes?.carga_horaria ? ` • CH: ${ucDetalhes.carga_horaria}h` : '';

  return {
    title: `${nomeUc} • ${turma.codigo_turma}${cargaHorariaTxt}`,
    subtitle: `${turma.professor.nome} • ${aulaStatus}`,
    scheduleLabel: 'Horário',
    scheduleValue: `${formatDate(aula.data_aula)} • ${formatTime(aula.horario_inicio_previsto)} - ${formatTime(aula.horario_fim_previsto)}`,
    roomLabel: 'Sala',
    roomValue: aula.dispositivo?.localizacao || 'Não há dados no momento',
    roomIcon: 'building',
    presenceLabel: 'Presença atual',
    presenceValue: totalAlunos > 0 ? `${totalPresentes} / ${totalAlunos} alunos` : 'Não há dados no momento',
    progress: presencePercent,
    progressNote:
      totalAlunos > 0
        ? aula.status?.toUpperCase() === 'EM_ANDAMENTO'
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
    title: `Dispositivo ${device.id_hardware || 'Hardware'}`,
    // Passamos os dados limpos, sem formatação difícil de separar
    description: `${device.id_dispositivo}|${device.status}`,
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

  const ucDetalhes = await protectedApi
    .getUnidadeCurricularById(turma.unidade_curricular.id_unidade_curricular)
    .catch(() => null);

  const aulasDaTurma = await protectedApi.listAulasByTurma(turma.id_turma).catch(() => [] as Aula[]);
  const safeAulasDaTurma = Array.isArray(aulasDaTurma) ? aulasDaTurma : [];
  const selectedAula = getSelectedAula(safeAulasDaTurma, selectedAulaId);

  if (!selectedAula) {
    return {
      dashboardData: EMPTY_DASHBOARD_DATA,
      aulaOptions: buildAulaOptions(safeAulasDaTurma, safeActiveAulas),
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
      eyebrow: `${turma.professor.nome} • ${turma.professor.email}`,
      title: `${turma.unidade_curricular.nome} • ${turma.codigo_turma}`,
      actionLabel: 'Turmas',
    },
    courseOverview: buildCourseOverview(turma, selectedAula, [], ucDetalhes),
    alertsPanel: buildAlerts(selectedPresencas),
    studentList: buildStudentList(selectedPresencas),
    presenceChart: buildPresenceChart(safeAulasDaTurma, todasPresencas),
    auditPanel: buildAuditPanel(selectedLogs),
    summaryCards: [
      {
        title: 'Aulas na turma',
        value: String(safeAulasDaTurma.length),
        subtitle: safeAulasDaTurma.length > 0 ? 'Inclui aulas anteriores da turma' : 'Não há dados no momento',
      },
      {
        title: 'Alunos inscritos',
        value: String(selectedPresencas.length),
        subtitle: selectedPresencas.length > 0 ? 'Lista da turma selecionada' : 'Não há dados no momento',
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
    aulaOptions: buildAulaOptions(safeAulasDaTurma, safeActiveAulas),
    selectedAulaId: selectedAula.id_aula,
    turmaId: turma.id_turma,
  };
}

export const EMPTY_DASHBOARD_DATA: DashboardData = {
  header: {
    eyebrow: 'Professor logado',
    title: 'Selecione uma aula ativa',
    actionLabel: 'Turmas',
  },
  courseOverview: {
    title: 'Não há dados no momento',
    subtitle: 'Não há dados no momento',
    scheduleLabel: 'Horário',
    scheduleValue: 'Não há dados no momento',
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
    filterOptions: ['Todos os status', 'Presente', 'Parcial', 'Ausente'],
    statusLegend: [
      { label: 'Presente', color: '#10B981' },
      { label: 'Parcial', color: '#F59E0B' },
      { label: 'Ausente', color: '#EF4444' },
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
