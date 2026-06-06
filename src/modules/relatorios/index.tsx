import { Download, FileSpreadsheet, FileText, LineChart, Printer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import { publicApi, protectedApi } from '../../services/resources';
import {
  Page,
  Header,
  Eyebrow,
  Title,
  Subtitle,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  SummaryNote,
  Actions,
  ActionButton,
  Section,
  SectionHeader,
  SectionTitle,
  SectionBadge,
  TableWrap,
  Table,
  Status,
} from './styles';

type ReportRow = {
  name: string;
  type: string;
  range: string;
  owner: string;
  status: string;
};

export function Relatorios() {
  const [reportRows, setReportRows] = useState<ReportRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadReports() {
      const [logs, presencas, aulas, turmas, dispositivos] = await Promise.all([
        publicApi.listAcessoLogs().catch(() => []),
        publicApi.listPresencas().catch(() => []),
        protectedApi.listAulas().catch(() => []),
        protectedApi.listTurmas().catch(() => []),
        protectedApi.listDispositivos().catch(() => []),
      ]);

      const rows = [
        {
          name: 'Log de acessos',
          type: 'GET /api/log-acessos',
          range: `${logs.length} registros`,
          owner: 'Público',
          status: logs.length > 0 ? 'Disponível' : 'Não há dados no momento',
        },
        {
          name: 'Presenças',
          type: 'GET /api/presencas',
          range: `${presencas.length} registros`,
          owner: 'Público',
          status: presencas.length > 0 ? 'Disponível' : 'Não há dados no momento',
        },
        {
          name: 'Aulas',
          type: 'GET /api/aulas',
          range: `${aulas.length} registros`,
          owner: 'Protegida',
          status: aulas.length > 0 ? 'Disponível' : 'Não há dados no momento',
        },
        {
          name: 'Turmas',
          type: 'GET /api/turmas',
          range: `${turmas.length} registros`,
          owner: 'Protegida',
          status: turmas.length > 0 ? 'Disponível' : 'Não há dados no momento',
        },
        {
          name: 'Dispositivos',
          type: 'GET /api/dispositivos',
          range: `${dispositivos.length} registros`,
          owner: 'Protegida',
          status: dispositivos.length > 0 ? 'Disponível' : 'Não há dados no momento',
        },
      ];

      if (isMounted) {
        setReportRows(rows);
      }
    }

    void loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: 'Seções prontas',
        value: String(reportRows.filter((report) => report.status === 'Disponível').length),
        note: reportRows.length > 0 ? 'Agrupadas pelos endpoints reais' : 'Não há dados no momento',
        icon: FileSpreadsheet,
      },
      {
        label: 'Coleções lidas',
        value: String(reportRows.length),
        note: reportRows.length > 0 ? 'Endpoints consultados com sucesso' : 'Não há dados no momento',
        icon: LineChart,
      },
      {
        label: 'Vazios detectados',
        value: String(reportRows.filter((report) => report.status !== 'Disponível').length),
        note: reportRows.length > 0 ? 'Seções sem registros ainda' : 'Não há dados no momento',
        icon: FileText,
      },
    ],
    [reportRows],
  );

  const hasData = reportRows.some((report) => report.range !== '0 registros');

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Painel de exportação</Eyebrow>
          <Title>Relatórios</Title>
          <Subtitle>
            Resumo dos dados que cada endpoint devolve no backend atual.
          </Subtitle>
        </div>

        <Actions>
          <ActionButton type="button">
            <Download size={16} />
            Exportar CSV
          </ActionButton>
          <ActionButton type="button">
            <Printer size={16} />
            Imprimir
          </ActionButton>
        </Actions>
      </Header>

      <SummaryGrid>
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <SummaryCard key={item.label}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <SummaryLabel>{item.label}</SummaryLabel>
                <Icon size={18} />
              </div>
              <SummaryValue>{item.value}</SummaryValue>
              <SummaryNote>{item.note}</SummaryNote>
            </SummaryCard>
          );
        })}
      </SummaryGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>Resumo dos endpoints</SectionTitle>
          <SectionBadge>
            <Download size={16} />
            Contrato real da API
          </SectionBadge>
        </SectionHeader>

        {hasData ? (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Recurso</th>
                  <th>Endpoint</th>
                  <th>Volume</th>
                  <th>Camada</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((report) => (
                  <tr key={report.name}>
                    <td>
                      <strong>{report.name}</strong>
                    </td>
                    <td>{report.type}</td>
                    <td>{report.range}</td>
                    <td>{report.owner}</td>
                    <td>
                      <Status>{report.status}</Status>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        ) : (
          <EmptyState
            title="Não há dados para relatórios no momento"
            description="Quando os endpoints retornarem registros, o resumo aparecerá aqui."
          />
        )}
      </Section>
    </Page>
  );
}
