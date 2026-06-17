import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const Container = styled.section`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-top: 8px;
  font-size: 0.8rem;
  color: ${theme.colors.muted};
`;

export const LegendItem = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  background: #ffffff;
  color: ${theme.colors.muted};

  input {
    border: none;
    outline: none;
    width: 140px;
    background: transparent;
    font-size: 0.86rem;
  }
`;

export const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  background: #ffffff;
  color: ${theme.colors.muted};
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const FilterMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  min-width: 150px;
  z-index: 10;
`;

export const FilterMenuOption = styled.button<{ isActive: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border: none;
  background: ${({ isActive }) => (isActive ? '#f0f7ff' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? theme.colors.primary : theme.colors.muted)};
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f7ff;
    color: ${theme.colors.primary};
  }

  &:first-child {
    border-radius: 7px 7px 0 0;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: #ffffff;
  max-height: 500px;
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    padding: 0;
  }

  thead {
    background: #f8fafc;
    color: ${theme.colors.muted};
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  thead th:last-child {
    text-align: left;
  }

  tbody tr {
    border-top: 1px solid rgba(15, 23, 42, 0.06);
  }

  tbody td {
    font-size: 0.92rem;
    color: ${theme.colors.text};
  }

  /* First column (Aluno) layout: avatar + name */
  tbody td:first-child {
    padding: 12px 16px;
    vertical-align: middle;
  }

  tbody td:first-child img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    object-fit: cover;
  }

  tbody tr:hover {
    background: rgba(248, 250, 252, 0.8);
  }

  /* Use percentage widths so the table tries to fit the container
     and only allows horizontal scrolling on very small screens */
  thead th:nth-child(1),
  tbody td:nth-child(1) {
    width: 30%; /* Aluno */
  }

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 14%; /* Matrícula */
  }

  thead th:nth-child(3),
  tbody td:nth-child(3) {
    width: 10%; /* Entrada */
  }

  thead th:nth-child(4),
  tbody td:nth-child(4) {
    width: 10%; /* Saída */
  }

  thead th:nth-child(5),
  tbody td:nth-child(5) {
    width: 14%; /* Permanência */
  }

  thead th:nth-child(6),
  tbody td:nth-child(6) {
    width: 14%; /* Status */
  }

  thead th:nth-child(7),
  tbody td:nth-child(7) {
    width: 8%; /* Ação */
  }

  @media (max-width: 600px) {
    table-layout: auto;
    min-width: 760px; /* allow horizontal scroll on very small screens */
  }
`;

export const StudentRow = styled.tr<{ absent: boolean }>`
  background: ${({ absent }) => (absent ? '#f1f5f9' : '#ffffff')};
  opacity: ${({ absent }) => (absent ? 0.72 : 1)};

  td {
    color: ${({ absent }) => (absent ? '#64748b' : theme.colors.text)} !important;
  }

  img {
    filter: ${({ absent }) => (absent ? 'grayscale(1)' : 'none')};
  }

  &:hover {
    background: ${({ absent }) => (absent ? '#e2e8f0' : 'rgba(248, 250, 252, 0.8)')} !important;
  }
`;

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-transform: inherit;
  letter-spacing: inherit;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const HeaderLabel = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
`;

export const RowActions = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eff6ff;
  color: ${theme.colors.primary};

  &:hover {
    background: #dbeafe;
  }
`;

export const ObservationDetails = styled.details`
  position: relative;

  summary {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #eff6ff;
    color: ${theme.colors.primary};
    cursor: pointer;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  &[open] summary {
    background: #dbeafe;
  }
`;

export const ObservationText = styled.span`
  position: absolute;
  z-index: 12;
  right: 0;
  top: calc(100% + 6px);
  width: min(260px, 70vw);
  padding: 10px 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 10px;
  background: #ffffff;
  color: ${theme.colors.text};
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
  font-size: 0.82rem;
  line-height: 1.45;
`;

export const Status = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 78px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;

  background: ${({ status }) =>
    status === 'Presente'
      ? '#DCFCE7'
      : status === 'Parcial'
      ? '#FEF3C7'
      : status === 'Justificado'
      ? '#DBEAFE'
      : '#FEE2E2'};

  color: ${({ status }) =>
    status === 'Presente'
      ? '#166534'
      : status === 'Parcial'
      ? '#B45309'
      : status === 'Justificado'
      ? '#1D4ED8'
      : '#991B1B'};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${theme.colors.muted};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Count = styled.span`
  font-size: 0.86rem;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: ${theme.colors.text};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: #f0f7ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: ${theme.colors.muted};
  }
`;
