import { BellRing, CheckCircle2, Clock3, Save, ShieldCheck, UserCog } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Professor, Turma } from '../../services/resources';
import { protectedApi, publicApi } from '../../services/resources';
import {
  ActionRow,
  Control,
  Eyebrow,
  FormGrid,
  Header,
  Page,
  PrimaryButton,
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
  StatusMessage,
  Subtitle,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryNote,
  SummaryValue,
  Title,
  Toggle,
  ToggleContent,
  ToggleList,
} from './styles';

type Feedback = { type: 'success' | 'error'; text: string } | null;

export function Configuracoes() {
  const { user } = useAuth();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => localStorage.getItem('@SenacPass:notifications') !== 'false',
  );
  const [refreshInterval, setRefreshInterval] = useState(
    () => localStorage.getItem('@SenacPass:refreshInterval') || 'manual',
  );
  const [savingProfile, setSavingProfile] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;

    void Promise.all([
      publicApi.getProfessorById(user.id).catch(() => null),
      protectedApi.listTurmasByProfessor(user.id).catch(() => [] as Turma[]),
    ]).then(([professorResponse, turmaResponse]) => {
      if (!mounted) return;

      setProfessor(professorResponse);
      setName(professorResponse?.nome || user.name || '');
      setEmail(professorResponse?.email || user.email || '');
      setTurmas(turmaResponse);
    });

    return () => {
      mounted = false;
    };
  }, [user]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user?.id || name.trim().length < 3 || !email.includes('@')) return;

    setSavingProfile(true);
    setFeedback(null);

    try {
      const updated = await publicApi.updateProfessor(user.id, {
        nome: name.trim(),
        email: email.trim(),
      });
      const storedUser = {
        id: user.id,
        name: updated.nome || name.trim(),
        email: updated.email || email.trim(),
      };

      localStorage.setItem('@SenacPass:user', JSON.stringify(storedUser));
      window.dispatchEvent(
        new CustomEvent('senacpass:profile', { detail: { name: storedUser.name } }),
      );
      setProfessor(updated);
      setFeedback({ type: 'success', text: 'Perfil atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setFeedback({ type: 'error', text: 'Não foi possível atualizar o perfil.' });
    } finally {
      setSavingProfile(false);
    }
  }

  function savePreferences() {
    localStorage.setItem('@SenacPass:notifications', String(notificationsEnabled));
    localStorage.setItem('@SenacPass:refreshInterval', refreshInterval);
    window.dispatchEvent(new Event('senacpass:preferences'));
    setFeedback({ type: 'success', text: 'Preferências salvas neste navegador.' });
  }

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Preferências do sistema</Eyebrow>
          <Title>Configurações</Title>
          <Subtitle>
            Atualize seus dados e escolha como o SenacPass deve apresentar notificações e atualizações.
          </Subtitle>
        </div>

        <SectionBadge>
          <ShieldCheck size={18} />
          Conta do professor
        </SectionBadge>
      </Header>

      <SummaryGrid>
        <SummaryCard>
          <SummaryLabel>Turmas vinculadas</SummaryLabel>
          <SummaryValue>{turmas.length}</SummaryValue>
          <SummaryNote>Associadas ao seu perfil</SummaryNote>
          <UserCog size={18} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Notificações</SummaryLabel>
          <SummaryValue>{notificationsEnabled ? 'Ativas' : 'Pausadas'}</SummaryValue>
          <SummaryNote>Eventos das suas aulas</SummaryNote>
          <BellRing size={18} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Atualização</SummaryLabel>
          <SummaryValue>{refreshInterval === 'manual' ? 'Manual' : `${refreshInterval}s`}</SummaryValue>
          <SummaryNote>Preferência de consulta</SummaryNote>
          <Clock3 size={18} />
        </SummaryCard>
      </SummaryGrid>

      {feedback ? (
        <StatusMessage $type={feedback.type}>
          <CheckCircle2 size={17} />
          {feedback.text}
        </StatusMessage>
      ) : null}

      <Section>
        <SectionHeader>
          <SectionTitle>Dados do perfil</SectionTitle>
          <SectionBadge>{professor ? 'Cadastro carregado' : 'Carregando perfil'}</SectionBadge>
        </SectionHeader>

        <form onSubmit={saveProfile}>
          <FormGrid>
            <Control>
              <span>Nome</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={3}
                required
              />
            </Control>
            <Control>
              <span>E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Control>
          </FormGrid>

          <ActionRow>
            <PrimaryButton type="submit" disabled={savingProfile}>
              <Save size={16} />
              {savingProfile ? 'Salvando...' : 'Salvar perfil'}
            </PrimaryButton>
          </ActionRow>
        </form>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Comportamento da aplicação</SectionTitle>
          <SectionBadge>
            <BellRing size={16} />
            Preferências locais
          </SectionBadge>
        </SectionHeader>

        <ToggleList>
          <ToggleContent>
            <div>
              <strong>Notificações no cabeçalho</strong>
              <p>Exibe presenças e leituras RFID relacionadas às suas turmas.</p>
            </div>
            <Toggle>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(event) => setNotificationsEnabled(event.target.checked)}
              />
              <span />
            </Toggle>
          </ToggleContent>

          <ToggleContent>
            <div>
              <strong>Intervalo preferido de atualização</strong>
              <p>Controla a atualização automática da página de dispositivos IoT.</p>
            </div>
            <Control>
              <select
                value={refreshInterval}
                onChange={(event) => setRefreshInterval(event.target.value)}
              >
                <option value="manual">Somente manual</option>
                <option value="30">A cada 30 segundos</option>
                <option value="60">A cada 1 minuto</option>
                <option value="300">A cada 5 minutos</option>
              </select>
            </Control>
          </ToggleContent>
        </ToggleList>

        <ActionRow>
          <PrimaryButton type="button" onClick={savePreferences}>
            <Save size={16} />
            Salvar preferências
          </PrimaryButton>
        </ActionRow>
      </Section>
    </Page>
  );
}
