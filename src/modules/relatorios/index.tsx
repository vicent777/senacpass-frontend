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
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type {
  Aluno,
  Aula,
  InscricaoTurma,
  Presenca,
  Turma,
} from '../../services/resources';
import { protectedApi } from '../../services/resources';
import {
  attendanceStatusRank,
  getAttendanceStatus,
} from '../../utils/attendanceStatus';
import {
  ActionButton,
  Actions,
  Control,
  Controls,
  ErrorMessage,
  Eyebrow,
  Header,
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
};

const EMPTY_DATA: ReportData = {
  turmas: [],
  alunos: [],
  aulas: [],
  inscricoes: [],
  presencas: [],
};

function dateKey(value: string) {
  return value.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || '';
}

function getTimeMinutes(value: string) {
  const parsed = new Date(value);

  if (!Number.isNaN(parsed.getTime()) && value.includes('T')) {
    return parsed.getHours() * 60 + parsed.getMinutes();
  }

  const time = value.match(/(\d{2}):(\d{2})/);
  return time ? Number(time[1]) * 60 + Number(time[2]) : null;
}

function getAulaStartTimestamp(aula: Aula) {
  const key = dateKey(aula.data_aula);
  const minutes = getTimeMinutes(aula.horario_inicio_previsto);

  if (!key || minutes === null) {
    return null;
  }

  const [year, month, day] = key.split('-').map(Number);
  return new Date(
    year,
    month - 1,
    day,
    Math.floor(minutes / 60),
    minutes % 60,
  ).getTime();
}

function hasAulaStarted(aula: Aula) {
  const start = getAulaStartTimestamp(aula);
  return start !== null && start <= Date.now();
}

function formatDate(value: string) {
  const key = dateKey(value);

  if (key) {
    const [year, month, day] = key.split('-');
    return `${day}/${month}/${year}`;
  }

  return 'Data indisponível';
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

export function Relatorios() {
  const reportDocumentRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<ReportData>(EMPTY_DATA);
  const [viewMode, setViewMode] = useState<ViewMode>('turma');
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [selectedAlunoId, setSelectedAlunoId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadReport() {
    setLoading(true);
    setError(null);

    try {
      const [turmas, alunos, aulas, inscricoes, presencas] = await Promise.all([
        protectedApi.listTurmas(),
        protectedApi.listAlunos(),
        protectedApi.listAulas(),
        protectedApi.listInscricoesTurmas(),
        protectedApi.listPresencas(),
      ]);

      const nextData = {
        turmas: Array.isArray(turmas) ? turmas : [],
        alunos: Array.isArray(alunos) ? alunos : [],
        aulas: Array.isArray(aulas) ? aulas : [],
        inscricoes: Array.isArray(inscricoes) ? inscricoes : [],
        presencas: Array.isArray(presencas) ? presencas : [],
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
        .filter((aula) => aula.turma.id_turma === selectedTurmaId && hasAulaStarted(aula))
        .sort(
          (left, right) =>
            (getAulaStartTimestamp(right) || 0) - (getAulaStartTimestamp(left) || 0),
        ),
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

      if (!current || attendanceStatusRank(presenca) > attendanceStatusRank(current)) {
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
          const presencas = statuses.filter((status) => status === 'Presente').length;
          const parciais = statuses.filter((status) => status === 'Parcial').length;
          const justificadas = statuses.filter((status) => status === 'Justificado').length;
          const ausencias = statuses.filter((status) => status === 'Ausente').length;
          const frequencia =
            turmaAulas.length > 0
              ? Math.round(
                  ((presencas + justificadas + parciais * 0.5) / turmaAulas.length) *
                    100,
                )
              : 0;

          return {
            aluno: inscricao.aluno,
            presencas,
            parciais,
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

  const totalExpected = turmaAulas.length * turmaInscricoes.length;
  const totalAttendance = studentRows.reduce(
    (total, row) => total + row.presencas + row.justificadas + row.parciais * 0.5,
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

  async function handleExportPdf() {
    const element = reportDocumentRef.current;

    if (!element || exportingPdf) {
      return;
    }

    setExportingPdf(true);
    setError(null);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: Math.max(element.scrollWidth, 1100),
      });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const printableWidth = pageWidth - margin * 2;
      const printableHeight = pageHeight - margin * 2;
      const sliceHeight = Math.floor(
        canvas.width * (printableHeight / printableWidth),
      );
      let offset = 0;
      let page = 0;

      while (offset < canvas.height) {
        const currentSliceHeight = Math.min(sliceHeight, canvas.height - offset);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSliceHeight;
        const context = pageCanvas.getContext('2d');

        if (!context) {
          throw new Error('Não foi possível preparar a página do PDF.');
        }

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(
          canvas,
          0,
          offset,
          canvas.width,
          currentSliceHeight,
          0,
          0,
          canvas.width,
          currentSliceHeight,
        );

        if (page > 0) {
          pdf.addPage();
        }

        const renderedHeight =
          (currentSliceHeight * printableWidth) / canvas.width;
        pdf.addImage(
          pageCanvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          margin,
          margin,
          printableWidth,
          renderedHeight,
          undefined,
          'FAST',
        );

        offset += currentSliceHeight;
        page += 1;
      }

      const subject =
        viewMode === 'aluno' && selectedAluno
          ? selectedAluno.nome
          : selectedTurma?.codigo_turma || 'relatorio';
      const fileName = `senacpass-${subject}`
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

      pdf.save(`${fileName}.pdf`);
    } catch (exportError) {
      console.error('Erro ao exportar o relatório em PDF:', exportError);
      setError('Não foi possível gerar o PDF do relatório.');
    } finally {
      setExportingPdf(false);
    }
  }

  if (loading) {
    return (
      <Page>
        <EmptyState
          title="Carregando relatórios"
          description="Consolidando turmas, aulas e presenças. Aguarde um momento."
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
          <ActionButton
            type="button"
            onClick={() => void handleExportPdf()}
            disabled={exportingPdf}
          >
            <Download size={16} />
            {exportingPdf ? 'Gerando PDF...' : 'Exportar PDF'}
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

      <ReportDocument ref={reportDocumentRef}>
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
          <SummaryNote>Somente aulas já iniciadas</SummaryNote>
          <CalendarCheck size={19} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>
            {viewMode === 'aluno' ? 'Frequência do aluno' : 'Frequência média'}
          </SummaryLabel>
          <SummaryValue>
            {viewMode === 'aluno' ? selectedAlunoRow?.frequencia || 0 : averageFrequency}%
          </SummaryValue>
          <SummaryNote>Presenças e justificativas integrais; parciais valem meia aula</SummaryNote>
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
                  <th>Parciais</th>
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
                    <td>{row.parciais}</td>
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

        <DocumentFooter>
          <span>SenacPass • Controle automatizado de frequência acadêmica</span>
          <span>Documento gerado eletronicamente</span>
        </DocumentFooter>
      </ReportDocument>
    </Page>
  );
}
