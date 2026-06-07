import { useEffect, useState } from 'react';
import { Bell, ChevronDown, SlidersHorizontal, UserRound, X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
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

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<HeaderModal>(null);
  const [professorName, setProfessorName] = useState('');
  const [curricularUnits, setCurricularUnits] = useState<string[]>([]);
  const { user, logout } = useAuth();
  const isOnline = true;

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let mounted = true;

    void Promise.all([
      publicApi.getProfessorById(user.id).catch(() => null),
      protectedApi.listTurmasByProfessor(user.id).catch(() => []),
    ]).then(([professor, turmas]) => {
      if (!mounted) {
        return;
      }

      setProfessorName(professor?.nome || user.name || 'Professor');
      setCurricularUnits([
        ...new Set(turmas.map((turma) => turma.unidade_curricular.nome).filter(Boolean)),
      ]);
    });

    return () => {
      mounted = false;
    };
  }, [user?.id, user?.name]);

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
            <span aria-hidden="true" />
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
                    <p>Configurações de aparência e comportamento estarão disponíveis aqui.</p>
                  </div>
                </>
              ) : (
                <>
                  <UserRound size={30} />
                  <div>
                    <strong>Nenhuma nova notificação</strong>
                    <p>Os avisos sobre aulas e dispositivos aparecerão neste espaço.</p>
                  </div>
                </>
              )}
            </HeaderModalBody>
          </HeaderModalCard>
        </HeaderModalOverlay>
      ) : null}
    </>
  );
}
