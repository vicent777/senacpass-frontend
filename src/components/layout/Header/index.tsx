import { useEffect, useState } from 'react';
import { Bell, ChevronDown, Clock3, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import type { Aluno, Aula, LogAcesso, Presenca, Turma } from '../../../services/resources';
import { protectedApi, publicApi } from '../../../services/resources';
import { getProfilePicture } from '../../../utils/profilePicture';
import {
  ActionButton,
  Actions,
  Container,
  Dot,
  Dropdown,
  DropdownButton,
  HeaderModalBody,
  HeaderModalCard,
  HeaderModalClose,
  HeaderModalHeader,
  HeaderModalOverlay,
  HeaderModalTitle,
  ModalAction,
  NotificationCopy,
  NotificationIcon,
  NotificationItem,
  NotificationList,
  NotificationTime,
  ProfileAvatar,
  ProfileDetails,
  Status,
  User,
  UserAvatar,
  UserButton,
  UserMeta,
  UserName,
  UserRole,
} from './styles';

type HeaderModal = 'profile' | 'preferences' | 'notifications' | null;

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  tone: 'blue' | 'green' | 'orange';
};

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<HeaderModal>(null);
  const [professorName, setProfessorName] = useState('');
  const [curricularUnits, setCurricularUnits] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => localStorage.getItem('@SenacPass:notifications') !== 'false',
  );
  const { user, logout } = useAuth();

  useEffect(() => {
    function updateConnection() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);

    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  useEffect(() => {
    function updatePreferences() {
      setNotificationsEnabled(
        localStorage.getItem('@SenacPass:notifications') !== 'false',
      );
    }

    function updateProfile(event: Event) {
      const customEvent = event as CustomEvent<{ name?: string }>;
      if (customEvent.detail?.name) {
        setProfessorName(customEvent.detail.name);
      }
    }

    window.addEventListener('senacpass:preferences', updatePreferences);
    window.addEventListener('senacpass:profile', updateProfile);

    return () => {
      window.removeEventListener('senacpass:preferences', updatePreferences);
      window.removeEventListener('senacpass:profile', updateProfile);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let mounted = true;

    async function loadHeaderData() {
      const [professor, turmas, logs, presencas, alunos] = await Promise.all([
        publicApi.getProfessorById(user!.id).catch(() => null),
        protectedApi.listTurmasByProfessor(user!.id).catch(() => [] as Turma[]),
        publicApi.listAcessoLogs().catch(() => [] as LogAcesso[]),
        protectedApi.listPresencas().catch(() => [] as Presenca[]),
        protectedApi.listAlunos().catch(() => [] as Aluno[]),
      ]);
      const aulas = (
        await Promise.all(
          turmas.map((turma) =>
            protectedApi.listAulasByTurma(turma.id_turma).catch(() => [] as Aula[]),
          ),
        )
      ).flat();

      if (!mounted) {
        return;
      }

      const aulaIds = new Set(aulas.map((aula) => aula.id_aula));
      const deviceIds = new Set(
        aulas
          .map((aula) => aula.dispositivo?.id_dispositivo)
          .filter((id): id is string => Boolean(id)),
      );
      const alunoByRfid = new Map(alunos.map((aluno) => [aluno.rfid_uid, aluno]));
      const presenceNotifications: Notification[] = presencas
        .filter((presenca) => aulaIds.has(presenca.aula.id_aula) && presenca.horario_checkin)
        .map((presenca) => ({
          id: `presence-${presenca.id_presenca}`,
          title: `${presenca.aluno.nome} registrou presença`,
          description: `Status: ${presenca.status || 'PRESENTE'}`,
          date: presenca.horario_checkin || '',
          tone: 'green',
        }));
      const logNotifications: Notification[] = logs
        .filter((log) => deviceIds.has(log.dispositivo?.id_dispositivo))
        .map((log) => {
          const aluno = alunoByRfid.get(log.rfid_uid);

          return {
            id: `log-${log.id_log}`,
            title:
              log.tipo_evento === 'RFID_IGNORADO_SEM_AULA'
                ? 'Leitura RFID sem aula ativa'
                : `RFID recebido${aluno ? ` de ${aluno.nome}` : ''}`,
            description: `${log.rfid_uid} • ${log.dispositivo?.nome || log.dispositivo?.localizacao || 'Dispositivo'}`,
            date: log.data_hora,
            tone: log.tipo_evento === 'RFID_IGNORADO_SEM_AULA' ? 'orange' : 'blue',
          } satisfies Notification;
        });

      setProfessorName(professor?.nome || user!.name || 'Professor');
      setCurricularUnits([
        ...new Set(turmas.map((turma) => turma.unidade_curricular.nome).filter(Boolean)),
      ]);
      setNotifications(
        [...presenceNotifications, ...logNotifications]
          .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
          .slice(0, 10),
      );
      setLoadingNotifications(false);
    }

    void loadHeaderData();

    return () => {
      mounted = false;
    };
  }, [user]);

  function openModal(modal: Exclude<HeaderModal, null>) {
    setOpen(false);
    setActiveModal(modal);
  }

  const displayName = professorName || user?.name || 'Professor';
  const profilePicture = getProfilePicture(user?.id);
  return (
    <>
      <Container>
        <Status online={isOnline}>
          <Dot online={isOnline} />
          {isOnline ? 'Sistema Online' : 'Sistema Offline'}
        </Status>

        <Actions>
          <ActionButton
            type="button"
            aria-label="Notificações"
            onClick={() => openModal('notifications')}
          >
            <Bell size={16} />
            {notificationsEnabled && notifications.length > 0 ? <span aria-hidden="true" /> : null}
          </ActionButton>

          <User>
            <UserButton type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
              <UserAvatar src={profilePicture} alt={displayName} />
              <UserMeta>
                <UserName>{displayName}</UserName>
                <UserRole>Faculdade Senac Pernambuco</UserRole>
              </UserMeta>
              <ChevronDown size={16} strokeWidth={2.5} />
            </UserButton>

            {open ? (
              <Dropdown>
                <DropdownButton type="button" onClick={() => openModal('profile')}>
                  Perfil
                </DropdownButton>
                <DropdownButton type="button" onClick={() => openModal('preferences')}>
                  Preferências
                </DropdownButton>
                <DropdownButton type="button" onClick={() => openModal('notifications')}>
                  Notificações
                </DropdownButton>
                <hr />
                <DropdownButton type="button" onClick={logout}>
                  Sair
                </DropdownButton>
              </Dropdown>
            ) : null}
          </User>
        </Actions>
      </Container>

      {activeModal ? (
        <HeaderModalOverlay onClick={() => setActiveModal(null)} role="presentation">
          <HeaderModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="header-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <HeaderModalHeader>
              <HeaderModalTitle id="header-modal-title">
                {activeModal === 'profile'
                  ? 'Perfil do professor'
                  : activeModal === 'preferences'
                    ? 'Preferências'
                    : 'Notificações'}
              </HeaderModalTitle>
              <HeaderModalClose
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Fechar"
              >
                <X size={17} />
              </HeaderModalClose>
            </HeaderModalHeader>

            <HeaderModalBody>
              {activeModal === 'profile' ? (
                <>
                  <ProfileAvatar src={profilePicture} alt={displayName} />
                  <ProfileDetails>
                    <strong>{displayName}</strong>
                    <span>{user?.email}</span>
                    <span>Faculdade Senac Pernambuco</span>
                    <div>
                      <b>Unidade curricular</b>
                      <p>
                        {curricularUnits.length > 0
                          ? curricularUnits.join(', ')
                          : 'Nenhuma unidade curricular vinculada.'}
                      </p>
                    </div>
                  </ProfileDetails>
                </>
              ) : activeModal === 'preferences' ? (
                <>
                  <SlidersHorizontal size={30} />
                  <div>
                    <strong>Preferências do sistema</strong>
                    <p>Gerencie perfil, notificações e comportamento da aplicação.</p>
                    <ModalAction
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        navigate('/configuracoes');
                      }}
                    >
                      Abrir configurações
                    </ModalAction>
                  </div>
                </>
              ) : (
                <NotificationList>
                  {loadingNotifications ? (
                    <p>Carregando eventos do professor...</p>
                  ) : notificationsEnabled && notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem key={notification.id}>
                        <NotificationIcon $tone={notification.tone}>
                          <Bell size={15} />
                        </NotificationIcon>
                        <NotificationCopy>
                          <strong>{notification.title}</strong>
                          <p>{notification.description}</p>
                          <NotificationTime>
                            <Clock3 size={12} />
                            {new Date(notification.date).toLocaleString('pt-BR')}
                          </NotificationTime>
                        </NotificationCopy>
                      </NotificationItem>
                    ))
                  ) : (
                    <div>
                      <strong>Sem notificações para exibir</strong>
                      <p>
                        {notificationsEnabled
                          ? 'Novos registros das suas turmas aparecerão aqui.'
                          : 'As notificações estão desativadas nas configurações.'}
                      </p>
                    </div>
                  )}
                </NotificationList>
              )}
            </HeaderModalBody>
          </HeaderModalCard>
        </HeaderModalOverlay>
      ) : null}
    </>
  );
}
