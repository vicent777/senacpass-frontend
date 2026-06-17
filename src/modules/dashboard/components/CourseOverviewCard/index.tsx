import { CalendarDays, Clock3, DoorClosed, GraduationCap } from 'lucide-react';
import type { CourseOverviewData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';
import {
  CourseCard,
  CourseHeader,
  CourseTitleWrap,
  CourseIcon,
  CourseName,
  CourseMeta,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatValueAccent,
  ProgressWrap,
  ProgressTop,
  ProgressBar,
  ProgressFill,
  ProgressNote,
  PresenceSection,
} from './styles';

interface Props {
  data: CourseOverviewData;
}

export function CourseOverviewCard({ data }: Props) {
  const isEmpty = data.title.startsWith('Não há');

  return (
    <CourseCard>
      <CourseHeader>
        <CourseTitleWrap>
          <CourseIcon>
            <GraduationCap size={18} />
          </CourseIcon>

          <div>
            <CourseName>{data.title}</CourseName>
            <CourseMeta>{data.subtitle}</CourseMeta>
          </div>
        </CourseTitleWrap>

      </CourseHeader>

      {isEmpty ? (
        <EmptyState
          title="Não há dados da aula no momento"
          description="As informações da turma aparecem aqui quando a API retornar uma aula ativa."
        />
      ) : (
        <>
          <StatsGrid>
            <StatCard>
              <StatLabel>
                <CalendarDays size={12} style={{ display: 'inline', marginRight: 6 }} />
                {data.dateLabel}
              </StatLabel>
              <StatValue>{data.dateValue}</StatValue>
            </StatCard>

            <StatCard>
              <StatLabel>
                <Clock3 size={12} style={{ display: 'inline', marginRight: 6 }} />
                {data.timeLabel}
              </StatLabel>
              <StatValue>{data.timeValue}</StatValue>
            </StatCard>

            <StatCard>
              <StatLabel>
                <DoorClosed size={12} style={{ display: 'inline', marginRight: 6 }} />
                {data.roomLabel}
              </StatLabel>
              <StatValue>{data.roomValue}</StatValue>
            </StatCard>
          </StatsGrid>

          <PresenceSection>
            <ProgressWrap>
              <ProgressTop>
                <div>
                  <StatLabel>{data.presenceLabel}</StatLabel>
                  <StatValueAccent>{data.presenceValue}</StatValueAccent>
                </div>
                <StatValueAccent>{data.progress}%</StatValueAccent>
              </ProgressTop>

              <ProgressBar>
                <ProgressFill value={data.progress} />
              </ProgressBar>
              <ProgressNote>{data.progressNote}</ProgressNote>
            </ProgressWrap>
          </PresenceSection>
        </>
      )}
    </CourseCard>
  );
}
