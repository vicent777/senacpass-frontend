import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { EMPTY_DASHBOARD_DATA, loadDashboardData, type AulaOption } from '../../services/dashboard';

import { DashboardHeader } from './components/DashboardHeader';
import { CourseOverviewCard } from './components/CourseOverviewCard';
import { AlertsPanel } from './components/AlertsPanel';
import { AuditPanel } from './components/AuditPanel';
import { StudentList } from './components/StudentList';
import { DevicePanel } from './components/DevicePanel';
import { PresenceChart } from './components/PresenceChart';
import type { DeviceActionData } from './types';
import {
  Page,
  BalancedHeroGrid,
  HeroGrid,
  ChartAndAudit,
  HeaderContext,
  HeaderContextLabel,
  HeaderContextNote,
  AulaSelect,
} from './styles';
import type { DashboardData } from './types';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const professorId = user?.id ?? '';
  const [dashboardData, setDashboardData] = useState<DashboardData>(EMPTY_DASHBOARD_DATA);
  const [aulaOptions, setAulaOptions] = useState<AulaOption[]>([]);
  const [selectedAulaId, setSelectedAulaId] = useState('');
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [refreshingDashboard, setRefreshingDashboard] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  function applyDashboardResult(result: Awaited<ReturnType<typeof loadDashboardData>>) {
    setDashboardData(result.dashboardData);
    setAulaOptions(result.aulaOptions);
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
        const result = await loadDashboardData({ professorId });

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

  const selectedAula = useMemo(
    () => aulaOptions.find((option) => option.id === selectedAulaId),
    [aulaOptions, selectedAulaId],
  );

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

  const rightSlot = (
    <HeaderContext>
      <HeaderContextLabel>Aula da turma</HeaderContextLabel>

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

      <HeaderContextNote>
        {loadError || (refreshingDashboard ? 'Atualizando a visão da aula...' : selectedAula?.label || 'Selecione uma aula para ver a turma vinculada.')}
      </HeaderContextNote>
    </HeaderContext>
  );

  return (
    <Page>
      <DashboardHeader data={dashboardData.header} onStartProcess={handleTurmasNavigation} rightSlot={rightSlot} />

      <BalancedHeroGrid>
        <CourseOverviewCard data={dashboardData.courseOverview} />
        <DevicePanel data={dashboardData.devicePanel} onAction={handleDeviceAction} />
      </BalancedHeroGrid>

      <HeroGrid>
        <AlertsPanel data={dashboardData.alertsPanel} />
        <StudentList data={dashboardData.studentList} />
      </HeroGrid>

      <ChartAndAudit>
        <PresenceChart data={dashboardData.presenceChart} />
        <AuditPanel data={dashboardData.auditPanel} onStartProcess={handleTurmasNavigation} />
      </ChartAndAudit>
    </Page>
  );
}