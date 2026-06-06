import { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import {
  Container,
  Status,
  Dot,
  User,
  Actions,
  ActionButton,
  UserAvatar,
  UserMeta,
  UserName,
  UserRole,
  Dropdown,
} from './styles';
import avatar from '../../../assets/avatar.svg';
import { useAuth } from '../../../contexts/AuthContext';

export function Header() {
  const [ open, setOpen ] = useState(false);
  const { user, logout } = useAuth();
  const isOnline = true; // depois pode vir do backend

  return (
    <Container>
      <Status online={isOnline}>
        <Dot online={isOnline} />
        {isOnline ? 'Sistema Online' : 'Sistema Offline'}
      </Status>

      <Actions>
        <ActionButton type="button" aria-label="Notificações">
          <Bell size={16} />
          <span aria-hidden="true" />
        </ActionButton>

        <User type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
          <UserAvatar src={avatar} alt={user?.name || 'Usuário'} />

          <UserMeta>
            <UserName>{user?.name || 'Arnott R. Caiado'}</UserName>
            <UserRole>Faculdade Senac Pernambuco</UserRole>
          </UserMeta>

          <ChevronDown size={16} strokeWidth={2.5} />

          {open && (
            <Dropdown>
              <div>Perfil</div>
              <div>Preferências</div>
              <div>Notificações</div>
              <hr />
              <div onClick={logout}>Sair</div>
            </Dropdown>
          )}
        </User>
      </Actions>
    </Container>
  );
}
