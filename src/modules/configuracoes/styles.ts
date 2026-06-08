import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Eyebrow = styled.span`
  color: ${theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin-top: 2px;
  color: ${theme.colors.text};
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  font-weight: 700;
`;

export const Subtitle = styled.p`
  max-width: 760px;
  margin-top: 6px;
  color: ${theme.colors.muted};
  font-size: 0.94rem;
  line-height: 1.55;
`;

export const SectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid rgba(30, 107, 214, 0.12);
  border-radius: 999px;
  background: rgba(30, 107, 214, 0.08);
  color: ${theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 700;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.section`
  position: relative;
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);

  > svg {
    position: absolute;
    top: 18px;
    right: 18px;
    color: ${theme.colors.primary};
  }
`;

export const SummaryLabel = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.84rem;
`;

export const SummaryValue = styled.div`
  margin-top: 8px;
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 800;
`;

export const SummaryNote = styled.p`
  margin-top: 6px;
  color: ${theme.colors.muted};
  font-size: 0.84rem;
`;

export const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid ${({ $type }) => ($type === 'success' ? '#a7f3d0' : '#fecaca')};
  border-radius: 12px;
  background: ${({ $type }) => ($type === 'success' ? '#ecfdf5' : '#fef2f2')};
  color: ${({ $type }) => ($type === 'success' ? '#047857' : '#b91c1c')};
  font-weight: 700;
`;

export const Section = styled.section`
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Control = styled.label`
  display: grid;
  gap: 6px;
  color: ${theme.colors.muted};
  font-size: 0.8rem;
  font-weight: 700;

  input, select {
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid #dbe2ea;
    border-radius: 10px;
    outline: none;
    background: #fff;
    color: ${theme.colors.text};
  }

  input:focus, select:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 107, 214, 0.1);
  }
`;

export const ToggleList = styled.div`
  display: grid;
  gap: 10px;
`;

export const ToggleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px;
  border: 1px solid #e8edf3;
  border-radius: 14px;
  background: #f8fafc;

  strong {
    color: ${theme.colors.text};
  }

  p {
    margin-top: 4px;
    color: ${theme.colors.muted};
    font-size: 0.84rem;
    line-height: 1.45;
  }
`;

export const Toggle = styled.label`
  position: relative;
  width: 46px;
  height: 26px;
  flex-shrink: 0;

  input {
    position: absolute;
    opacity: 0;
  }

  span {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: #cbd5e1;
    transition: 0.2s ease;
  }

  span::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 5px rgba(15, 23, 42, 0.2);
    transition: 0.2s ease;
  }

  input:checked + span {
    background: ${theme.colors.primary};
  }

  input:checked + span::after {
    transform: translateX(20px);
  }
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 11px;
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(30, 107, 214, 0.16);

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;
