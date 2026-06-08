import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px 0 20px;

  background: ${theme.colors.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.06);
`;

export const Status = styled.div<{ online: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 9999px;

  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;

  font-size: 0.9rem;
  font-weight: 500;

  backdrop-filter: blur(8px);
`;

export const Dot = styled.div<{ online: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;

  background: ${({ online }) => (online ? '#22C55E' : '#F87171')};
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.3);
  }

  span {
    position: absolute;
    top: 9px;
    right: 10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 2px ${theme.colors.primary};
  }
`;

export const User = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 40px;
  padding: 5px 14px 5px 6px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;

  cursor: pointer;
  font-weight: 500;
  text-align: left;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.34);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.9);
    outline-offset: 2px;
  }
`;

export const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.28);
  flex-shrink: 0;
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1;
  min-width: 0;
`;

export const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
`;

export const UserRole = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
`;

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 10px);

  background: rgba(31, 41, 55, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 8px;

  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.22);
  backdrop-filter: blur(10px);

  min-width: 160px;

  hr {
    margin: 6px 0;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 9px 10px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 0.95rem;
  text-align: left;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    outline: none;
  }
`;

export const HeaderModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
`;

export const HeaderModalCard = styled.section`
  width: min(480px, 100%);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
`;

export const HeaderModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
`;

export const HeaderModalTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1.08rem;
`;

export const HeaderModalClose = styled.button`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f1f5f9;
  color: ${theme.colors.muted};
`;

export const HeaderModalBody = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 20px;
  color: ${theme.colors.muted};

  strong {
    display: block;
    margin-bottom: 5px;
    color: ${theme.colors.text};
  }

  p {
    line-height: 1.55;
  }
`;

export const NotificationList = styled.div`
  display: grid;
  width: 100%;
  max-height: 430px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  display: flex;
  gap: 11px;
  padding: 12px 2px;

  & + & {
    border-top: 1px solid #edf1f5;
  }
`;

export const NotificationIcon = styled.span<{ $tone: 'blue' | 'green' | 'orange' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ $tone }) =>
    $tone === 'green'
      ? 'rgba(16, 185, 129, 0.12)'
      : $tone === 'orange'
        ? 'rgba(245, 158, 11, 0.14)'
        : 'rgba(30, 107, 214, 0.1)'};
  color: ${({ $tone }) =>
    $tone === 'green' ? '#047857' : $tone === 'orange' ? '#b45309' : '#1d4ed8'};
`;

export const NotificationCopy = styled.div`
  min-width: 0;

  strong {
    margin: 0;
    font-size: 0.88rem;
  }

  p {
    margin-top: 3px;
    font-size: 0.8rem;
  }
`;

export const NotificationTime = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 5px;
  color: #94a3b8;
  font-size: 0.72rem;
`;

export const ModalAction = styled.button`
  margin-top: 12px;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 9px;
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
`;

export const ProfileAvatar = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 20px;
  object-fit: cover;
  border: 3px solid rgba(30, 107, 214, 0.14);
`;

export const ProfileDetails = styled.div`
  display: grid;
  gap: 5px;
  min-width: 0;

  > strong {
    font-size: 1.05rem;
  }

  > span {
    font-size: 0.88rem;
  }

  div {
    margin-top: 10px;
    padding: 12px;
    border-radius: 12px;
    background: #f8fafc;
  }

  b {
    display: block;
    margin-bottom: 4px;
    color: ${theme.colors.text};
    font-size: 0.82rem;
  }

  p {
    font-size: 0.88rem;
  }
`;
