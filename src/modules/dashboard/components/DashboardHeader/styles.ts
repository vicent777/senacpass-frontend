import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const HeaderCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Eyebrow = styled.span`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
`;

export const Title = styled.h1`
  font-size: clamp(1.45rem, 2vw, 2rem);
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;

  padding: 10px 14px;
  border-radius: 10px;
  background: ${theme.colors.primary};
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(30, 107, 214, 0.18);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;