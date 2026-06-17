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

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
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
  font-size: 0.85rem;
  font-weight: 700;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 11px;
  border: 1px solid #dbe2ea;
  border-radius: 10px;
  background: #fff;
  color: ${theme.colors.text};
  font-weight: 700;

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
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
  font-size: 1.65rem;
  font-weight: 800;
`;

export const SummaryNote = styled.p`
  margin-top: 6px;
  color: ${theme.colors.muted};
  font-size: 0.86rem;
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  gap: 10px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #dbe2ea;
  border-radius: 11px;
  background: #fff;
  color: ${theme.colors.muted};

  input {
    width: 100%;
    border: 0;
    outline: 0;
    color: ${theme.colors.text};
  }
`;

export const SelectField = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 42px;
  padding: 0 11px;
  border: 1px solid #dbe2ea;
  border-radius: 11px;
  background: #fff;
  color: ${theme.colors.muted};

  select {
    border: 0;
    outline: 0;
    background: transparent;
    color: ${theme.colors.text};
  }
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
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;

  th, td {
    padding: 14px 16px;
    text-align: left;
  }

  thead {
    background: #f8fafc;
    color: ${theme.colors.muted};
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  tbody tr {
    border-top: 1px solid rgba(15, 23, 42, 0.06);
  }

  tbody td {
    color: ${theme.colors.text};
    font-size: 0.86rem;
  }
`;

export const Status = styled.span<{ $online: boolean }>`
  display: inline-flex;
  justify-content: center;
  min-width: 82px;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $online }) =>
    $online ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ $online }) => ($online ? '#047857' : '#b91c1c')};
  font-size: 0.78rem;
  font-weight: 800;
`;

export const RoomTag = styled.span`
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(30, 107, 214, 0.08);
  color: ${theme.colors.primary};
  font-weight: 700;
`;

export const DeviceName = styled.div`
  display: grid;
  gap: 3px;

  small {
    color: ${theme.colors.muted};
  }
`;

export const EventList = styled.div`
  overflow: hidden;
  border: 1px solid #e8edf3;
  border-radius: 14px;
`;

export const EventRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 14px;

  & + & {
    border-top: 1px solid #edf1f5;
  }

  > div {
    display: grid;
    gap: 3px;
  }

  span, time {
    color: ${theme.colors.muted};
    font-size: 0.8rem;
  }

  time {
    flex-shrink: 0;
  }

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
