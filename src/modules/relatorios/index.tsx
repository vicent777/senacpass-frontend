import {
  Activity,
  CalendarCheck,
  Download,
  FileText,
  Printer,
  RefreshCw,
  Search,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type {
  Aluno,
  Aula,
  InscricaoTurma,
  LogAcesso,
  Presenca,
  Turma,
} from '../../services/resources';
import { protectedApi, publicApi } from '../../services/resources';
import {
  ActionButton,
  Actions,
  Control,
  Controls,
  ErrorMessage,
  Eyebrow,
  Header,
  LogEvent,
  LogList,
  LogMeta,
  LogRow,
  Page,
  Progress,
  ProgressBar,
  ReportDocument,
  DocumentBrand,
  DocumentDetails,
  DocumentFooter,
  DocumentHeader,
  ReportMeta,
  ReportPrintStyles,
  SearchControl,
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
  Status,
  Subtitle,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryNote,
  SummaryValue,
  Table,
  TableWrap,
  Title,
  ViewTabs,
  ViewTab,
} from './styles';

type ViewMode = 'turma' | 'aluno';

type ReportData = {
  turmas: Turma[];
  alunos: Aluno[];
  aulas: Aula[];
  inscricoes: InscricaoTurma[];
  presencas: Presenca[];
  logs: LogAcesso[];
};

type AttendanceStatus = 'Presente' | 'Parcial' | 'Justificado' | 'Ausente';

const EMPTY_DATA: ReportData = {
  turmas: [],
  alunos: [],
  aulas: [],
  inscricoes: [],
  presencas: [],
  logs: [],
};

function dateKey(value: string) {
  return value.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || '';
}

function isPastOrToday(aula: Aula) {
  const key = dateKey(aula.data_aula);
  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  return Boolean(key && key <= todayKey);
}

function formatDate(value: string) {
  const key = dateKey(value);

  if (key) {
    const [year, month, day] = key.split('-');
    return `${day}/${month}/${year}`;
  }

  return 'Data indisponível';
}

function formatDateTime(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? 'Data indisponível'
    : date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function formatTime(value: string | null) {
  if (!value) {
    return '--:--';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '--:--'
    : date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function getAttendanceStatus(presenca?: Presenca): AttendanceStatus {
  const status = presenca?.status?.toUpperCase() || '';

  if (status.includes('JUSTIFIC')) {
    return 'Justificado';
  }

  if (status.includes('PARC') || status.includes('ATRAS')) {
    return 'Parcial';
  }

  if (presenca?.horario_checkin || status.includes('PRESENT')) {
    return 'Presente';
  }

  return 'Ausente';
}

function eventLabel(event: string) {
  const labels: Record<string, string> = {
    RFID_LEITURA: 'Leitura RFID',
    RFID_IGNORADO_SEM_AULA: 'Leitura sem aula',
    JUSTIFICATIVA_MANUAL: 'Justificativa manual',
  };

  return labels[event] || event.replaceAll('_', ' ');
}

export function Relatorios() {
  const [data, setData] = useState<ReportData>(EMPTY_DATA);
  const [viewMode, setViewMode] = useState<ViewMode>('turma');
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [selectedAlunoId, setSelectedAlunoId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadReport() {
    setLoading(true);
    setError(null);

    try {
      const [turmas, alunos, aulas, inscricoes, presencas, logs] = await Promise.all([
        protectedApi.listTurmas(),
        protectedApi.listAlunos(),
        protectedApi.listAulas(),
        protectedApi.listInscricoesTurmas(),
        protectedApi.listPresencas(),
        publicApi.listAcessoLogs(),
      ]);

      const nextData = {
        turmas: Array.isArray(turmas) ? turmas : [],
        alunos: Array.isArray(alunos) ? alunos : [],
        aulas: Array.isArray(aulas) ? aulas : [],
        inscricoes: Array.isArray(inscricoes) ? inscricoes : [],
        presencas: Array.isArray(presencas) ? presencas : [],
        logs: Array.isArray(logs) ? logs : [],
      };

      setData(nextData);
      setSelectedTurmaId((current) => current || nextData.turmas[0]?.id_turma || '');
    } catch (loadError) {
      console.error('Erro ao carregar os relatórios:', loadError);
      setError('Não foi possível carregar os dados dos relatórios.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadReport();
  }, []);

  const selectedTurma = data.turmas.find((turma) => turma.id_turma === selectedTurmaId);
  const turmaAulas = useMemo(
    () =>
      data.aulas
        .filter((aula) => aula.turma.id_turma === selectedTurmaId && isPastOrToday(aula))
        .sort((left, right) => right.data_aula.localeCompare(left.data_aula)),
    [data.aulas, selectedTurmaId],
  );
  const turmaInscricoes = useMemo(
    () =>
      data.inscricoes.filter(
        (inscricao) =>
          inscricao.turma.id_turma === selectedTurmaId &&
          inscricao.status?.toUpperCase() !== 'INATIVO',
      ),
    [data.inscricoes, selectedTurmaId],
  );

  const alunoOptions = useMemo(() => {
    if (selectedTurmaId) {
      return turmaInscricoes
        .map((inscricao) => inscricao.aluno)
        .sort((left, right) => left.nome.localeCompare(right.nome, 'pt-BR'));
    }

    return [...data.alunos].sort((left, right) => left.nome.localeCompare(right.nome, 'pt-BR'));
  }, [data.alunos, selectedTurmaId, turmaInscricoes]);

  const presencasByAlunoAndAula = useMemo(() => {
    const map = new Map<string, Presenca>();

    data.presencas.forEach((presenca) => {
      const key = `${presenca.aluno.id_aluno}:${presenca.aula.id_aula}`;
      const current = map.get(key);

      if (!current || getAttendanceStatus(current) === 'Ausente') {
        map.set(key, presenca);
      }
    });

    return map;
  }, [data.presencas]);

  const studentRows = useMemo(
    () =>
      turmaInscricoes
        .map((inscricao) => {
          const statuses = turmaAulas.map((aula) =>
            getAttendanceStatus(
              presencasByAlunoAndAula.get(`${inscricao.aluno.id_aluno}:${aula.id_aula}`),
            ),
          );
          const presencas = statuses.filter(
            (status) => status === 'Presente' || status === 'Parcial',
          ).length;
          const justificadas = statuses.filter((status) => status === 'Justificado').length;
          const ausencias = statuses.filter((status) => status === 'Ausente').length;
          const frequencia =
            turmaAulas.length > 0
              ? Math.round(((presencas + justificadas) / turmaAulas.length) * 100)
              : 0;

          return {
            aluno: inscricao.aluno,
            presencas,
            justificadas,
            ausencias,
            frequencia,
          };
        })
        .filter(({ aluno }) => {
          const query = search.trim().toLocaleLowerCase('pt-BR');
          return (
            !query ||
            aluno.nome.toLocaleLowerCase('pt-BR').includes(query) ||
            aluno.matricula_institucional.toLocaleLowerCase('pt-BR').includes(query)
          );
        })
        .sort((left, right) => left.aluno.nome.localeCompare(right.aluno.nome, 'pt-BR')),
    [presencasByAlunoAndAula, search, turmaAulas, turmaInscricoes],
  );

  const validSelectedAlunoId = alunoOptions.some(
    (aluno) => aluno.id_aluno === selectedAlunoId,
  )
    ? selectedAlunoId
    : '';
  const selectedAluno = data.alunos.find(
    (aluno) => aluno.id_aluno === validSelectedAlunoId,
  );
  const selectedAlunoRow = studentRows.find(
    ({ aluno }) => aluno.id_aluno === selectedAlunoId,
  );
  const studentHistory = useMemo(
    () =>
      selectedAluno
        ? turmaAulas.map((aula) => {
            const presenca = presencasByAlunoAndAula.get(
              `${selectedAluno.id_aluno}:${aula.id_aula}`,
            );

            return {
              aula,
              presenca,
              status: getAttendanceStatus(presenca),
            };
          })
        : [],
    [presencasByAlunoAndAula, selectedAluno, turmaAulas],
  );

  const alunoByRfid = useMemo(
    () => new Map(data.alunos.map((aluno) => [aluno.rfid_uid, aluno])),
    [data.alunos],
  );
  const turmaAlunoIds = useMemo(
    () => new Set(turmaInscricoes.map((inscricao) => inscricao.aluno.id_aluno)),
    [turmaInscricoes],
  );
  const turmaDeviceIds = useMemo(
    () =>
      new Set(
        turmaAulas
          .map((aula) => aula.dispositivo?.id_dispositivo)
          .filter((id): id is string => Boolean(id)),
      ),
    [turmaAulas],
  );
  const filteredLogs = useMemo(
    () =>
      data.logs
        .filter((log) => {
          const aluno = alunoByRfid.get(log.rfid_uid);

          if (viewMode === 'aluno') {
            return Boolean(selectedAluno && log.rfid_uid === selectedAluno.rfid_uid);
          }

          return Boolean(
            (aluno && turmaAlunoIds.has(aluno.id_aluno)) ||
              (log.dispositivo?.id_dispositivo &&
                turmaDeviceIds.has(log.dispositivo.id_dispositivo)),
          );
        })
        .sort(
          (left, right) =>
            new Date(right.data_hora).getTime() - new Date(left.data_hora).getTime(),
        ),
    [alunoByRfid, data.logs, selectedAluno, turmaAlunoIds, turmaDeviceIds, viewMode],
  );

  const totalExpected = turmaAulas.length * turmaInscricoes.length;
  const totalAttendance = studentRows.reduce(
    (total, row) => total + row.presencas + row.justificadas,
    0,
  );
  const averageFrequency =
    totalExpected > 0 ? Math.round((totalAttendance / totalExpected) * 100) : 0;
  const reportTitle =
    viewMode === 'aluno' && selectedAluno
      ? `Relatório individual - ${selectedAluno.nome}`
      : `Relatório da turma - ${selectedTurma?.codigo_turma || 'Sem turma'}`;
  const reportPeriod =
    turmaAulas.length > 0
      ? `${formatDate(turmaAulas[turmaAulas.length - 1].data_aula)} a ${formatDate(turmaAulas[0].data_aula)}`
      : 'Sem aulas realizadas';

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <Page>
        <EmptyState
          title="Carregando relatórios"
          description="Consolidando turmas, aulas, presenças e logs. Aguarde um momento."
        />
      </Page>
    );
  }

  return (
    <Page>
      <ReportPrintStyles />
      <Header>
        <div>
          <Eyebrow>Frequência e auditoria</Eyebrow>
          <Title>Relatórios</Title>
          <Subtitle>
            Acompanhe a frequência por turma ou consulte o histórico completo de cada aluno.
          </Subtitle>
        </div>

        <Actions>
          <ActionButton type="button" onClick={() => void loadReport()}>
            <RefreshCw size={16} />
            Atualizar
          </ActionButton>
          <ActionButton type="button" onClick={handlePrint}>
            <Download size={16} />
            Exportar PDF
          </ActionButton>
          <ActionButton type="button" onClick={handlePrint}>
            <Printer size={16} />
            Imprimir
          </ActionButton>
        </Actions>
      </Header>

      {error ? <ErrorMessage>{error}</ErrorMessage> : null}

      <Controls>
        <ViewTabs aria-label="Tipo de relatório">
          <ViewTab
            type="button"
            $active={viewMode === 'turma'}
            onClick={() => setViewMode('turma')}
          >
            <Users size={16} />
            Por turma
          </ViewTab>
          <ViewTab
            type="button"
            $active={viewMode === 'aluno'}
            onClick={() => setViewMode('aluno')}
          >
            <FileText size={16} />
            Por aluno
          </ViewTab>
        </ViewTabs>

        <Control>
          <span>Turma</span>
          <select
            value={selectedTurmaId}
            onChange={(event) => {
              setSelectedTurmaId(event.target.value);
              setSelectedAlunoId('');
            }}
          >
            {data.turmas.length === 0 ? <option value="">Nenhuma turma</option> : null}
            {data.turmas.map((turma) => (
              <option key={turma.id_turma} value={turma.id_turma}>
                {turma.codigo_turma} - {turma.unidade_curricular.nome}
              </option>
            ))}
          </select>
        </Control>

        {viewMode === 'aluno' ? (
          <Control>
            <span>Aluno</span>
            <select value={validSelectedAlunoId} onChange={(event) => setSelectedAlunoId(event.target.value)}>
              <option value="">Selecione um aluno</option>
              {alunoOptions.map((aluno) => (
                <option key={aluno.id_aluno} value={aluno.id_aluno}>
                  {aluno.nome} - {aluno.matricula_institucional}
                </option>
              ))}
            </select>
          </Control>
        ) : (
          <SearchControl>
            <span>Buscar aluno</span>
            <div>
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome ou matrícula"
              />
            </div>
          </SearchControl>
        )}
      </Controls>

      <ReportDocument>
        <DocumentHeader>
          <DocumentBrand>
            <span>SenacPass</span>
            <small>Faculdade Senac Pernambuco</small>
          </DocumentBrand>
          <div>
            <strong>Relatório de frequência acadêmica</strong>
            <small>Emitido em {new Date().toLocaleString('pt-BR')}</small>
          </div>
        </DocumentHeader>

        <ReportMeta>
          <div>
            <small>Documento</small>
            <strong>{reportTitle}</strong>
          </div>
          <DocumentDetails>
            <div>
              <small>Unidade curricular</small>
              <span>{selectedTurma?.unidade_curricular.nome || 'Não informada'}</span>
            </div>
            <div>
              <small>Professor</small>
              <span>{selectedTurma?.professor.nome || 'Não informado'}</span>
            </div>
            <div>
              <small>Período apurado</small>
              <span>{reportPeriod}</span>
            </div>
            <div>
              <small>Aulas contabilizadas</small>
              <span>{turmaAulas.length}</span>
            </div>
          </DocumentDetails>
        </ReportMeta>

        <SummaryGrid>
        <SummaryCard>
          <SummaryLabel>Alunos na turma</SummaryLabel>
          <SummaryValue>{turmaInscricoes.length}</SummaryValue>
          <SummaryNote>Inscrições ativas</SummaryNote>
          <Users size={19} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Aulas realizadas</SummaryLabel>
          <SummaryValue>{turmaAulas.length}</SummaryValue>
          <SummaryNote>Até a data de hoje</SummaryNote>
          <CalendarCheck size={19} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>
            {viewMode === 'aluno' ? 'Frequência do aluno' : 'Frequência média'}
          </SummaryLabel>
          <SummaryValue>
            {viewMode === 'aluno' ? selectedAlunoRow?.frequencia || 0 : averageFrequency}%
          </SummaryValue>
          <SummaryNote>Presenças e justificativas</SummaryNote>
          <Activity size={19} />
        </SummaryCard>
        </SummaryGrid>

        <Section>
        <SectionHeader>
          <SectionTitle>
            {viewMode === 'turma' ? 'Frequência por aluno' : 'Histórico de aulas'}
          </SectionTitle>
          <SectionBadge>{viewMode === 'turma' ? `${studentRows.length} alunos` : selectedAluno?.nome || 'Selecione um aluno'}</SectionBadge>
        </SectionHeader>

        {viewMode === 'turma' && studentRows.length > 0 ? (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Aluno</th>
                  <th>Matrícula</th>
                  <th>Presenças</th>
                  <th>Justificadas</th>
                  <th>Ausências</th>
                  <th>Frequência</th>
                </tr>
              </thead>
              <tbody>
                {studentRows.map((row, index) => (
                  <tr key={row.aluno.id_aluno}>
                    <td>{String(index + 1).padStart(2, '0')}</td>
                    <td><strong>{row.aluno.nome}</strong></td>
                    <td>{row.aluno.matricula_institucional}</td>
                    <td>{row.presencas}</td>
                    <td>{row.justificadas}</td>
                    <td>{row.ausencias}</td>
                    <td>
                      <Progress>
                        <ProgressBar $value={row.frequencia}><span /></ProgressBar>
                        <strong>{row.frequencia}%</strong>
                      </Progress>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        ) : null}

        {viewMode === 'aluno' && selectedAluno ? (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Aula</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Status</th>
                  <th>Justificativa</th>
                </tr>
              </thead>
              <tbody>
                {studentHistory.map(({ aula, presenca, status }, index) => (
                  <tr key={aula.id_aula}>
                    <td>{String(index + 1).padStart(2, '0')}</td>
                    <td>{formatDate(aula.data_aula)}</td>
                    <td>{aula.turma.codigo_turma}</td>
                    <td>{formatTime(presenca?.horario_checkin || null)}</td>
                    <td>{formatTime(presenca?.horario_checkout || null)}</td>
                    <td><Status $status={status}>{status}</Status></td>
                    <td>{presenca?.justificativa_manual || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        ) : null}

        {(viewMode === 'turma' && studentRows.length === 0) ||
        (viewMode === 'aluno' && !selectedAluno) ? (
          <EmptyState
            title={viewMode === 'aluno' ? 'Selecione um aluno' : 'Nenhum aluno encontrado'}
            description={
              viewMode === 'aluno'
                ? 'Escolha um aluno para consultar sua frequência aula por aula.'
                : 'A turma selecionada ainda não possui alunos ou não corresponde à busca.'
            }
          />
        ) : null}
        </Section>

        <Section>
        <SectionHeader>
          <SectionTitle>Logs de acesso</SectionTitle>
          <SectionBadge>
            <Activity size={15} />
            {filteredLogs.length} eventos
          </SectionBadge>
        </SectionHeader>

        {filteredLogs.length > 0 ? (
          <LogList>
            {filteredLogs.map((log) => {
              const aluno = alunoByRfid.get(log.rfid_uid);
              const deviceName =
                log.dispositivo?.nome ||
                log.dispositivo?.localizacao ||
                'Dispositivo não informado';

              return (
                <LogRow key={log.id_log}>
                  <div>
                    <LogEvent>{eventLabel(log.tipo_evento)}</LogEvent>
                    <strong>{aluno?.nome || 'RFID não vinculado a um aluno'}</strong>
                    <LogMeta>
                      UID {log.rfid_uid} • {deviceName}
                    </LogMeta>
                  </div>
                  <time>{formatDateTime(log.data_hora)}</time>
                </LogRow>
              );
            })}
          </LogList>
        ) : (
          <EmptyState
            title="Nenhum log encontrado"
            description="Não há eventos RFID relacionados à seleção atual."
          />
        )}
        </Section>

        <DocumentFooter>
          <span>SenacPass • Controle automatizado de frequência acadêmica</span>
          <span>Documento gerado eletronicamente</span>
        </DocumentFooter>
      </ReportDocument>
    </Page>
  );
}
