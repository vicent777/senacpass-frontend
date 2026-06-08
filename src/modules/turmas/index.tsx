import { BookOpen, CalendarDays, GraduationCap, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type { Turma } from '../../services/resources';
import { protectedApi } from '../../services/resources';
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
  Section,
  SectionHeader,
  SectionTitle,
  SectionBadge,
  TableWrap,
  Table,
} from './styles';

export function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadTurmas() {
      const response = await protectedApi.listTurmas().catch(() => []);

      if (isMounted) {
        setTurmas(response);
      }
    }

    void loadTurmas();

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const totalCargaHoraria = turmas.reduce(
      (total, turma) => total + turma.unidade_curricular.carga_horaria,
      0,
    );
    const professoresUnicos = new Set(turmas.map((turma) => turma.professor.id_professor)).size;
    const unidadesUnicas = new Set(turmas.map((turma) => turma.unidade_curricular.nome)).size;

    return [
      {
        label: 'Turmas cadastradas',
        value: String(turmas.length),
        note: turmas.length > 0 ? 'Turmas retornadas pela API' : 'Não há dados no momento',
        icon: Users,
      },
      {
        label: 'Professores vinculados',
        value: String(professoresUnicos),
        note: turmas.length > 0 ? 'Professores presentes na listagem' : 'Não há dados no momento',
        icon: GraduationCap,
      },
      {
        label: 'Carga horária total',
        value: `${totalCargaHoraria}h`,
        note: turmas.length > 0 ? `${unidadesUnicas} unidades curriculares` : 'Não há dados no momento',
        icon: CalendarDays,
      },
    ];
  }, [turmas]);

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Gestão acadêmica</Eyebrow>
          <Title>Turmas</Title>
          <Subtitle>
            Consulte as turmas, unidades curriculares, professores responsáveis e cargas horárias.
          </Subtitle>
        </div>

        <SectionBadge>
          <BookOpen size={18} />
          API de turmas
        </SectionBadge>
      </Header>

      <SummaryGrid>
        {summary.map((item) => {
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
          <SectionTitle>Turmas vinculadas</SectionTitle>
          <SectionBadge>
            <BookOpen size={16} />
            Contrato real da API
          </SectionBadge>
        </SectionHeader>

        {turmas.length === 0 ? (
          <EmptyState
            title="Não há turmas no momento"
            description="Quando a API retornar turmas, elas aparecerão nesta tabela."
          />
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Unidade curricular</th>
                  <th>Carga horária</th>
                  <th>Professor</th>
                  <th>E-mail</th>
                </tr>
              </thead>

              <tbody>
                {turmas.map((turma) => (
                  <tr key={turma.id_turma}>
                    <td>
                      <strong>{turma.codigo_turma}</strong>
                    </td>
                    <td>{turma.unidade_curricular.nome}</td>
                    <td>{turma.unidade_curricular.carga_horaria}h</td>
                    <td>{turma.professor.nome}</td>
                    <td>{turma.professor.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Section>
    </Page>
  );
}
