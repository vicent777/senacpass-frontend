import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '../../styles/theme';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  .report-spinner {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 860px) {
    flex-direction: column;
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
  margin-top: 3px;
  color: ${theme.colors.text};
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
`;

export const Subtitle = styled.p`
  max-width: 700px;
  margin-top: 6px;
  color: ${theme.colors.muted};
  line-height: 1.55;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 13px;
  border: 1px solid rgba(15, 23, 42, 0.09);
  border-radius: 11px;
  background: #fff;
  color: ${theme.colors.text};
  font-weight: 700;

  &:nth-last-child(2) {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary};
    color: #fff;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 14px;
  border: 1px solid rgba(239, 68, 68, 0.22);
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.07);
  color: #991b1b;
`;

export const Controls = styled.section`
  display: grid;
  grid-template-columns: auto minmax(220px, 1fr) minmax(220px, 1fr);
  align-items: end;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ViewTabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #f1f5f9;
`;

export const ViewTab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 13px;
  border-radius: 9px;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  font-weight: 700;
  box-shadow: ${({ $active }) => ($active ? '0 3px 10px rgba(15, 23, 42, 0.08)' : 'none')};
`;

export const Control = styled.label`
  display: grid;
  gap: 6px;
  color: ${theme.colors.muted};
  font-size: 0.78rem;
  font-weight: 700;

  select {
    width: 100%;
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid #dbe2ea;
    border-radius: 10px;
    outline: none;
    background: #fff;
    color: ${theme.colors.text};
  }
`;

export const SearchControl = styled(Control)`
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid #dbe2ea;
    border-radius: 10px;
    color: ${theme.colors.muted};
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    color: ${theme.colors.text};
  }
`;

export const ReportMeta = styled.div`
  display: grid;
  gap: 16px;
  padding: 22px 26px;
  border-bottom: 1px solid #dbe3ec;

  > div:first-child {
    display: grid;
    gap: 4px;
  }

  small {
    color: ${theme.colors.muted};
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  strong {
    color: ${theme.colors.text};
    font-size: 1.18rem;
  }
`;

export const DocumentHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 26px;
  border-bottom: 3px solid ${theme.colors.primary};
  background: #f8fafc;
  text-align: right;

  > div:last-child {
    display: grid;
    gap: 4px;
  }

  > div:last-child strong {
    color: ${theme.colors.text};
    font-size: 0.92rem;
    text-transform: uppercase;
  }

  small {
    color: ${theme.colors.muted};
    font-size: 0.76rem;
  }

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
  }
`;

export const DocumentBrand = styled.div`
  display: grid;
  gap: 2px;
  text-align: left;

  span {
    color: ${theme.colors.primary};
    font-size: 1.45rem;
    font-weight: 900;
    letter-spacing: -0.04em;
  }
`;

export const DocumentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  div {
    display: grid;
    gap: 5px;
  }

  span {
    color: ${theme.colors.text};
    font-size: 0.86rem;
    font-weight: 700;
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const DocumentFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 26px;
  border-top: 1px solid #dbe3ec;
  background: #f8fafc;
  color: ${theme.colors.muted};
  font-size: 0.72rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.section`
  position: relative;
  padding: 17px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);

  > svg {
    position: absolute;
    top: 17px;
    right: 17px;
    color: ${theme.colors.primary};
  }
`;

export const SummaryLabel = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.82rem;
`;

export const SummaryValue = styled.div`
  margin-top: 7px;
  color: ${theme.colors.text};
  font-size: 1.7rem;
  font-weight: 800;
`;

export const SummaryNote = styled.p`
  margin-top: 4px;
  color: ${theme.colors.muted};
  font-size: 0.8rem;
`;

export const Section = styled.section`
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
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
`;

export const SectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(30, 107, 214, 0.08);
  color: ${theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid #e8edf3;
  border-radius: 13px;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;

  th, td {
    padding: 13px 14px;
    text-align: left;
  }

  th {
    background: #f8fafc;
    color: ${theme.colors.muted};
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  td {
    border-top: 1px solid #edf1f5;
    color: ${theme.colors.text};
    font-size: 0.87rem;
  }
`;

export const Status = styled.span<{ $status: string }>`
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === 'Presente'
      ? 'rgba(16, 185, 129, 0.1)'
      : $status === 'Parcial'
        ? 'rgba(245, 158, 11, 0.12)'
        : $status === 'Justificado'
          ? 'rgba(30, 107, 214, 0.1)'
          : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ $status }) =>
    $status === 'Presente'
      ? '#047857'
      : $status === 'Parcial'
        ? '#b45309'
        : $status === 'Justificado'
          ? '#1d4ed8'
          : '#b91c1c'};
  font-size: 0.76rem;
  font-weight: 800;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const ProgressBar = styled.div<{ $value: number }>`
  width: 82px;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #e8edf3;

  span {
    display: block;
    width: ${({ $value }) => `${Math.min(100, Math.max(0, $value))}%`};
    height: 100%;
    border-radius: inherit;
    background: ${({ $value }) =>
      $value >= 75 ? theme.colors.success : $value >= 50 ? theme.colors.warning : theme.colors.danger};
  }
`;

export const LogList = styled.div`
  overflow: hidden;
  border: 1px solid #e8edf3;
  border-radius: 13px;
`;

export const LogRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 13px 14px;

  & + & {
    border-top: 1px solid #edf1f5;
  }

  > div {
    display: grid;
    gap: 4px;
  }

  time {
    flex-shrink: 0;
    color: ${theme.colors.muted};
    font-size: 0.8rem;
  }

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const LogEvent = styled.span`
  width: fit-content;
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(30, 107, 214, 0.08);
  color: ${theme.colors.primary};
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
`;

export const LogMeta = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.78rem;
`;

export const ReportDocument = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  border: 1px solid #dbe3ec;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.1);

  ${SummaryGrid} {
    padding: 20px 26px;
    border-bottom: 1px solid #dbe3ec;
  }

  ${SummaryCard} {
    border-radius: 4px;
    background: #f8fafc;
    box-shadow: none;
  }

  ${Section} {
    border: 0;
    border-radius: 0;
    padding: 24px 26px;
    box-shadow: none;
  }

  ${Section} + ${Section} {
    border-top: 1px solid #dbe3ec;
  }
`;

export const ReportPrintStyles = createGlobalStyle`
  @media print {
    body {
      background: #fff !important;
    }

    ${Page} {
      gap: 12px;
    }

    ${Header}, ${Controls}, ${Actions} {
      display: none !important;
    }

    ${ReportDocument} {
      border: 0;
      box-shadow: none;
    }

    ${SummaryCard}, ${Section} {
      break-inside: avoid;
      box-shadow: none;
    }

    ${TableWrap} {
      overflow: visible;
    }

    ${Table} {
      min-width: 0;
    }

    ${Table} th, ${Table} td {
      padding: 8px;
      font-size: 0.7rem;
    }

    ${LogRow} {
      break-inside: avoid;
    }

    ${DocumentHeader}, ${ReportMeta}, ${DocumentFooter} {
      break-inside: avoid;
    }
  }
`;
