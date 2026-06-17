import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const ChartWrap = styled.section`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const ChartLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  color: ${theme.colors.muted};
  font-size: 0.8rem;
`;

export const ChartLegendItem = styled.span<{ color: string }>`
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

export const ChartScroll = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;
