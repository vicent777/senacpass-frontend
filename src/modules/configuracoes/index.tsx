import { BellRing, ShieldCheck, SlidersHorizontal, UserCog } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type { Professor } from '../../services/resources';
import { publicApi } from '../../services/resources';
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
  ToggleList,
  ToggleItem,
  ToggleTitle,
  ToggleText,
  TogglePill,
  ActionRow,
  GhostButton,
  PrimaryButton,
} from './styles';

export function Configuracoes() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProfessors() {
      const response = await publicApi.listProfessores().catch(() => []);

      if (isMounted) {
        setProfessors(response);
      }
    }

    void loadProfessors();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Professores cadastrados', value: String(professors.length), note: professors.length > 0 ? 'Lista retornada pela API' : 'Não há dados no momento', icon: ShieldCheck },
      { label: 'Permissões ativas', value: professors.length > 0 ? String(professors.length) : '0', note: 'Baseada nos professores cadastrados', icon: UserCog },
      { label: 'Alertas configurados', value: '0', note: 'Sem dados no momento', icon: BellRing },
    ],
    [professors],
  );

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Preferências do sistema</Eyebrow>
          <Title>Configurações</Title>
          <Subtitle>
            Ajustes do ambiente do professor com base no cadastro retornado pela API.
          </Subtitle>
        </div>

        <SectionBadge>
          <ShieldCheck size={18} />
          Segurança e operação
        </SectionBadge>
      </Header>

      <SummaryGrid>
        {stats.map((item) => {
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
          <SectionTitle>Professores cadastrados</SectionTitle>
          <SectionBadge>
            <SlidersHorizontal size={16} />
            Contrato real da API
          </SectionBadge>
        </SectionHeader>

        {professors.length === 0 ? (
          <EmptyState
            title="Não há professores cadastrados"
            description="Quando a API retornar professores, eles aparecerão aqui."
          />
        ) : (
          <ToggleList>
            {professors.map((professor) => (
              <ToggleItem key={professor.id_professor}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(30,107,214,0.1)', color: '#1E6BD6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <UserCog size={18} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <ToggleTitle>{professor.nome}</ToggleTitle>
                    <ToggleText>{professor.email}</ToggleText>
                  </div>
                </div>

                <TogglePill>{professor.id_professor}</TogglePill>
              </ToggleItem>
            ))}
          </ToggleList>
        )}
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Ações administrativas</SectionTitle>
          <SectionBadge>
            <UserCog size={16} />
            Perfil do professor
          </SectionBadge>
        </SectionHeader>

        <ActionRow>
          <GhostButton type="button">Revisar permissões</GhostButton>
          <PrimaryButton type="button">Salvar preferências</PrimaryButton>
        </ActionRow>
      </Section>
    </Page>
  );
}
