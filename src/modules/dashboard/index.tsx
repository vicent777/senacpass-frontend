import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CalendarPlus, LoaderCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { EMPTY_DASHBOARD_DATA, loadDashboardData, type AulaOption } from '../../services/dashboard';
import { protectedApi, publicApi } from '../../services/resources';

import { DashboardHeader } from './components/DashboardHeader';
import { CourseOverviewCard } from './components/CourseOverviewCard';
import { AlertsPanel } from './components/AlertsPanel';
import { AuditPanel } from './components/AuditPanel';
import { StudentList } from './components/StudentList';
import { DevicePanel } from './components/DevicePanel';
import { PresenceChart } from './components/PresenceChart';
import { DashboardModal } from './components/DashboardModal';
import type { DeviceActionData, Student } from './types';
import {
  Page,
  BalancedHeroGrid,
  HeroGrid,
  ChartAndAudit,
  HeaderContext,
  HeaderContextLabel,
  HeaderContextNote,
  AulaSelect,
  DashboardState,
  DashboardStateIcon,
  DashboardStateTitle,
  DashboardStateDescription,
  DashboardStateButton,
} from './styles';
import type { DashboardData } from './types';

export function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTurmaId = useRef(searchParams.get('turma') || undefined);
  const { user, loading: authLoading } = useAuth();
  const professorId = user?.id ?? '';
  const [dashboardData, setDashboardData] = useState<DashboardData>(EMPTY_DASHBOARD_DATA);
  const [aulaOptions, setAulaOptions] = useState<AulaOption[]>([]);
  const [turmaOptions, setTurmaOptions] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedAulaId, setSelectedAulaId] = useState('');
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [refreshingDashboard, setRefreshingDashboard] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [studentToJustify, setStudentToJustify] = useState<Student | null>(null);
  const [justification, setJustification] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [justificationError, setJustificationError] = useState<string | null>(null);
  const [submittingJustification, setSubmittingJustification] = useState(false);

  function applyDashboardResult(result: Awaited<ReturnType<typeof loadDashboardData>>) {
    setDashboardData(result.dashboardData);
    setAulaOptions(result.aulaOptions);
    setTurmaOptions(result.turmaOptions);
    setSelectedAulaId(result.selectedAulaId);
    setSelectedTurmaId(result.turmaId);
  }

  useEffect(() => {
    if (authLoading || !professorId) {
      return;
    }

    let isMounted = true;

    async function fetchDashboardData() {
      setLoadingDashboard(true);
      setLoadError(null);

      try {
        const result = await loadDashboardData({
          professorId,
          turmaId: initialTurmaId.current,
        });

        if (!isMounted) {
          return;
        }

        applyDashboardResult(result);
      } catch (error) {
        console.error('Erro ao carregar os dados do dashboard:', error);

        if (!isMounted) {
          return;
        }

        setLoadError('Não foi possível carregar as aulas do professor no momento.');
        setDashboardData(EMPTY_DASHBOARD_DATA);
        setAulaOptions([]);
        setSelectedAulaId('');
        setSelectedTurmaId('');
      } finally {
        if (isMounted) {
          setLoadingDashboard(false);
        }
      }
    }

    void fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [authLoading, professorId]);

  function handleDeviceAction(action: DeviceActionData) {
    if (action.icon === 'refresh' || action.icon === 'sync') {
      if (!user?.id) {
        return;
      }

      setRefreshingDashboard(true);
      setLoadError(null);
      void loadDashboardData({
        professorId: user.id,
        turmaId: selectedTurmaId || undefined,
        selectedAulaId: selectedAulaId || undefined,
      })
        .then((result) => {
          applyDashboardResult(result);
        })
        .catch((error) => {
          console.error('Erro ao atualizar o dashboard:', error);
          setLoadError('Não foi possível atualizar o contexto da aula.');
        })
        .finally(() => {
          setRefreshingDashboard(false);
        });
      return;
    }

    if (action.icon === 'lock') {
      navigate('/turmas');
    }
  }

  function handleTurmasNavigation() {
    navigate('/turmas');
  }

  function handleAulaChange(nextAulaId: string) {
    if (!user?.id || !nextAulaId) {
      return;
    }

    setRefreshingDashboard(true);
    setLoadError(null);

    void loadDashboardData({
      professorId: user.id,
      turmaId: selectedTurmaId || undefined,
      selectedAulaId: nextAulaId,
    })
      .then((result) => {
        applyDashboardResult(result);
      })
      .catch((error) => {
        console.error('Erro ao trocar a aula selecionada:', error);
        setLoadError('Não foi possível trocar a aula selecionada.');
      })
      .finally(() => {
        setRefreshingDashboard(false);
      });
  }

  function handleTurmaChange(nextTurmaId: string) {
    if (!user?.id || !nextTurmaId) {
      return;
    }

    setRefreshingDashboard(true);
    setLoadError(null);
    setSearchParams({ turma: nextTurmaId });

    void loadDashboardData({
      professorId: user.id,
      turmaId: nextTurmaId,
    })
      .then((result) => applyDashboardResult(result))
      .catch((error) => {
        console.error('Erro ao trocar a turma selecionada:', error);
        setLoadError('Não foi possível carregar a turma selecionada.');
      })
      .finally(() => setRefreshingDashboard(false));
  }

  function handleOpenJustification(student: Student) {
    setStudentToJustify(student);
    setJustification('');
    setAttachmentName('');
    setJustificationError(null);
  }

  function handleCloseJustification() {
    if (submittingJustification) {
      return;
    }

    setStudentToJustify(null);
    setJustification('');
    setAttachmentName('');
    setJustificationError(null);
  }

  async function handleJustificationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!studentToJustify || !user?.id || !selectedAulaId || justification.trim().length < 3) {
      return;
    }

    setSubmittingJustification(true);
    setJustificationError(null);

    try {
      let presenceId = studentToJustify.presenceId;

      if (!presenceId) {
        if (!studentToJustify.studentId) {
          throw new Error('Aluno sem identificador para criar a presença.');
        }

        const createdPresence = await protectedApi.createManualAbsence({
          id_aluno: studentToJustify.studentId,
          id_aula: selectedAulaId,
        });
        presenceId = createdPresence.id_presenca;
      }

      await protectedApi.justifyPresenca(presenceId, justification.trim());

      try {
        if (!studentToJustify.studentId) {
          throw new Error('Aluno sem identificador para registrar o log.');
        }

        const aluno = await protectedApi.getAlunoById(studentToJustify.studentId);
        await publicApi.createAcessoLog({
          rfid_uid: aluno.rfid_uid,
          tipo_evento: 'JUSTIFICATIVA_MANUAL',
          data_hora: new Date().toISOString(),
          id_aula: selectedAulaId,
          justificativa: justification.trim(),
        });
      } catch (logError) {
        console.warn(
          'A justificativa foi salva, mas a API não aceitou o log de auditoria. O backend precisa permitir JUSTIFICATIVA_MANUAL.',
          logError,
        );
      }

      const result = await loadDashboardData({
        professorId: user.id,
        turmaId: selectedTurmaId || undefined,
        selectedAulaId: selectedAulaId || undefined,
      });
      applyDashboardResult(result);
      setStudentToJustify(null);
      setJustification('');
      setAttachmentName('');
    } catch (error) {
      console.error('Erro ao justificar presença:', error);
      setJustificationError('Não foi possível salvar a justificativa. Tente novamente.');
    } finally {
      setSubmittingJustification(false);
    }
  }

  const rightSlot = (
    <HeaderContext>
      <HeaderContextLabel>Turma</HeaderContextLabel>
      <AulaSelect
        value={selectedTurmaId}
        onChange={(event) => handleTurmaChange(event.target.value)}
        disabled={loadingDashboard || refreshingDashboard || turmaOptions.length === 0}
      >
        {turmaOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </AulaSelect>

      <HeaderContextLabel>Aula exibida</HeaderContextLabel>
      <AulaSelect
        value={selectedAulaId}
        onChange={(event) => handleAulaChange(event.target.value)}
        disabled={loadingDashboard || refreshingDashboard || aulaOptions.length === 0}
      >
        {aulaOptions.length === 0 ? (
          <option value="">Sem aulas disponíveis</option>
        ) : null}

        {aulaOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.isActive ? 'Em andamento • ' : ''}
            {option.label}
          </option>
        ))}
      </AulaSelect>

      {loadError || refreshingDashboard ? (
        <HeaderContextNote>
          {loadError || 'Atualizando a visão da aula...'}
        </HeaderContextNote>
      ) : null}
    </HeaderContext>
  );

  if (loadingDashboard) {
    return (
      <Page>
        <DashboardState>
          <DashboardStateIcon>
            <LoaderCircle size={28} className="dashboard-state-spinner" />
          </DashboardStateIcon>
          <DashboardStateTitle>Carregando seu dashboard</DashboardStateTitle>
          <DashboardStateDescription>
            Estamos buscando suas turmas e aulas.
          </DashboardStateDescription>
        </DashboardState>
      </Page>
    );
  }

  if (aulaOptions.length === 0) {
    return (
      <Page>
        <DashboardHeader
          data={dashboardData.header}
          onStartProcess={handleTurmasNavigation}
        />

        <DashboardState>
          <DashboardStateIcon>
            <CalendarPlus size={28} />
          </DashboardStateIcon>
          <DashboardStateTitle>
            {loadError ? 'Não foi possível carregar as aulas' : 'Nenhuma aula disponível'}
          </DashboardStateTitle>
          <DashboardStateDescription>
            {loadError
              ? loadError
              : selectedTurmaId
                ? 'Sua turma já está cadastrada, mas ainda não possui aulas. Cadastre uma aula para começar a acompanhar presenças.'
                : 'Cadastre uma turma e sua primeira aula para começar a usar o dashboard.'}
          </DashboardStateDescription>
          <DashboardStateButton type="button" onClick={handleTurmasNavigation}>
            Ir para turmas
          </DashboardStateButton>
        </DashboardState>
      </Page>
    );
  }

  return (
    <Page>
      <DashboardHeader data={dashboardData.header} rightSlot={rightSlot} />

      <BalancedHeroGrid>
        <CourseOverviewCard data={dashboardData.courseOverview} />
        <DevicePanel data={dashboardData.devicePanel} onAction={handleDeviceAction} />
      </BalancedHeroGrid>

      <HeroGrid>
        <AlertsPanel data={dashboardData.alertsPanel} />
        <StudentList data={dashboardData.studentList} onJustify={handleOpenJustification} />
      </HeroGrid>

      <ChartAndAudit>
        <PresenceChart data={dashboardData.presenceChart} />
        <AuditPanel data={dashboardData.auditPanel} onStartProcess={handleTurmasNavigation} />
      </ChartAndAudit>

      <DashboardModal
        open={Boolean(studentToJustify)}
        submitting={submittingJustification}
        studentName={studentToJustify?.name || ''}
        justification={justification}
        attachmentName={attachmentName}
        error={justificationError}
        onClose={handleCloseJustification}
        onJustificationChange={setJustification}
        onAttachmentChange={(file) => setAttachmentName(file?.name || '')}
        onSubmit={handleJustificationSubmit}
      />
    </Page>
  );
}
