import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 24px;
`;

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

export const HeaderContext = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 240px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }
`;

export const HeaderContextLabel = styled.span`
  font-size: 0.78rem;
  color: ${theme.colors.muted};
`;

export const HeaderContextNote = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.muted};
`;

export const AulaSelect = styled.select`
  min-width: 240px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #ffffff;
  color: ${theme.colors.text};
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
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

export const BalancedHeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;

  > * {
    min-width: 0;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(290px, 3fr);
  gap: 16px;
  align-items: start;

  > * {
    min-width: 0;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const Surface = styled.section`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
`;

export const CourseCard = styled(Surface)`
  padding: 18px;
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

export const GhostButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #f8fafc;
  color: ${theme.colors.muted};
  flex-shrink: 0;
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

export const DeviceCard = styled(Surface)`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DeviceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const DeviceIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(30, 107, 214, 0.1);
  color: ${theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const DeviceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const DeviceDescription = styled.p`
  margin-top: 4px;
  font-size: 0.88rem;
  color: ${theme.colors.muted};
  line-height: 1.45;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

export const DeviceActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

export const DeviceAction = styled.button<{ danger?: boolean }>`
  min-height: 84px;
  padding: 14px 10px;
  border-radius: 14px;
  border: 1px solid ${({ danger }) => (danger ? 'rgba(239, 68, 68, 0.35)' : 'rgba(15, 23, 42, 0.1)')};
  background: ${({ danger }) => (danger ? 'rgba(254, 226, 226, 0.8)' : '#ffffff')};
  color: ${({ danger }) => (danger ? '#dc2626' : theme.colors.text)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.06);
  }
`;

export const DeviceActionLabel = styled.span`
  font-size: 0.9rem;
  line-height: 1.15;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled(Surface)`
  padding: 18px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 14px;
  font-size: 0.8rem;
  color: ${theme.colors.muted};
`;

export const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const AlertsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ChartAndAudit = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const AuditList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const AuditItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.86rem;
  color: ${theme.colors.muted};
`;

export const AuditLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`;

export const AuditIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: rgba(30, 107, 214, 0.1);
  color: ${theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AuditText = styled.span`
  min-width: 0;
`;

export const AuditTime = styled.span`
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  color: ${theme.colors.text};
`;

export const QuickButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 10px;
  background: ${theme.colors.primary};
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
`;

export const SmallButton = styled.button`
  padding: 8px 10px;
  border-radius: 8px;
  background: #f8fafc;
  color: ${theme.colors.text};
  font-size: 0.85rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
`;
export const Grid = styled.div`
  display: grid;
  gap: 20px;
`;

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const modalSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const modalPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.06);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(8px);
`;

export const ModalCard = styled.div`
  width: min(720px, 100%);
  max-height: min(88vh, 860px);
  overflow: auto;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.28);
  animation: ${modalFadeIn} 180ms ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 20px 20px 0;
`;

export const ModalTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ModalEyebrow = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
`;

export const ModalTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  color: ${theme.colors.text};
`;

export const ModalDescription = styled.p`
  font-size: 0.92rem;
  color: ${theme.colors.muted};
  line-height: 1.55;
`;

export const ModalBody = styled.div`
  padding: 18px 20px 20px;
  display: grid;
  gap: 16px;
`;

export const ModalFooter = styled.div`
  padding: 0 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ModalCloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  color: ${theme.colors.muted};
`;

export const ModalPrimaryButton = styled.button<{ danger?: boolean }>`
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: none;
  background: ${({ danger }) => (danger ? '#dc2626' : theme.colors.primary)};
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(30, 107, 214, 0.16);
`;

export const ModalSecondaryButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #ffffff;
  color: ${theme.colors.text};
  font-size: 0.92rem;
  font-weight: 600;
`;

export const StatusBanner = styled.div<{ tone?: 'info' | 'danger' | 'success' }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid
    ${({ tone }) =>
      tone === 'danger' ? 'rgba(239, 68, 68, 0.2)' : tone === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 107, 214, 0.16)'};
  background: ${({ tone }) =>
    tone === 'danger' ? 'rgba(254, 242, 242, 0.95)' : tone === 'success' ? 'rgba(236, 253, 245, 0.95)' : 'rgba(239, 246, 255, 0.95)'};
`;

export const StatusBadge = styled.div<{ tone?: 'info' | 'danger' | 'success' }>`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ tone }) => (tone === 'danger' ? '#dc2626' : tone === 'success' ? '#059669' : theme.colors.primary)};
  background: ${({ tone }) =>
    tone === 'danger' ? 'rgba(239, 68, 68, 0.12)' : tone === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(30, 107, 214, 0.12)'};
  animation: ${modalPulse} 1.8s ease-in-out infinite;
`;

export const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 3px solid rgba(30, 107, 214, 0.18);
  border-top-color: ${theme.colors.primary};
  animation: ${modalSpin} 0.8s linear infinite;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 14px;
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
`;

export const FieldLabel = styled.span`
  font-weight: 700;
`;

export const FormControl = styled.input`
  min-height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #ffffff;
  color: ${theme.colors.text};
`;

export const SelectControl = styled.select`
  min-height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #ffffff;
  color: ${theme.colors.text};
`;

export const TextAreaControl = styled.textarea`
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #ffffff;
  color: ${theme.colors.text};
  resize: vertical;
`;

export const HelperText = styled.span`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
`;

export const PreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PreviewChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  color: ${theme.colors.text};
  font-size: 0.85rem;
`;