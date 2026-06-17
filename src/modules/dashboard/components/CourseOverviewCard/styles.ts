import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const CourseCard = styled.section`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
`;

export const CourseHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
`;

export const CourseTitleWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

export const CourseIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(30, 107, 214, 0.1);
  color: ${theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CourseName = styled.h2`
  font-size: clamp(1rem, 1.1vw, 1.15rem);
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1.2;
`;

export const CourseMeta = styled.p`
  margin-top: 4px;
  font-size: 0.88rem;
  color: ${theme.colors.muted};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ accent?: boolean }>`
  min-height: 84px;
  padding: 14px;
  border-radius: 14px;
  background: ${({ accent }) => (accent ? 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)' : '#f8fafc')};
  border: 1px solid ${({ accent }) => (accent ? 'rgba(30, 107, 214, 0.2)' : 'rgba(15, 23, 42, 0.06)')};

`;

export const PresenceSection = styled.div`
  margin-top: 14px;
  padding: 15px;
  border: 1px solid rgba(30, 107, 214, 0.18);
  border-radius: 14px;
  background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
`;

export const StatLabel = styled.div`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  margin-bottom: 8px;
`;

export const StatValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const StatValueAccent = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const ProgressWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 9px;
  border-radius: 999px;
  background: rgba(30, 107, 214, 0.14);
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ value: number }>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0ea5e9 0%, #1e6bd6 100%);
`;

export const ProgressNote = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.muted};
`;
