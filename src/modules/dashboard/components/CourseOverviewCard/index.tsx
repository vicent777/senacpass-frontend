import { DoorClosed, Laptop, MoreVertical, Clock3 } from 'lucide-react';
import type { CourseOverviewData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';
import {
  CourseCard,
  CourseHeader,
  CourseTitleWrap,
  CourseIcon,
  CourseName,
  CourseMeta,
  GhostButton,
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
} from './styles';

interface Props {
  data: CourseOverviewData;
}

export function CourseOverviewCard({ data }: Props) {
  const isEmpty = data.title.startsWith('Não há') || data.presenceValue === 'Não há dados no momento';

  return (
    <CourseCard>
      <CourseHeader>
        <CourseTitleWrap>
          <CourseIcon>
            <Laptop size={18} />
          </CourseIcon>

          <div>
            <CourseName>{data.title}</CourseName>
            <CourseMeta>{data.subtitle}</CourseMeta>
          </div>
        </CourseTitleWrap>

        <GhostButton type="button" aria-label={data.optionsLabel}>
          <MoreVertical size={16} />
        </GhostButton>
      </CourseHeader>

      {isEmpty ? (
        <EmptyState
          title="Não há dados da aula no momento"
          description="As informações da turma aparecem aqui quando a API retornar uma aula ativa."
        />
      ) : (
        <StatsGrid>
          <StatCard>
            <StatLabel>
              <Clock3 size={12} style={{ display: 'inline', marginRight: 6 }} />
              {data.scheduleLabel}
            </StatLabel>
            <StatValue>{data.scheduleValue}</StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>
              <DoorClosed size={12} style={{ display: 'inline', marginRight: 6 }} />
              {data.roomLabel}
            </StatLabel>
            <StatValue>{data.roomValue}</StatValue>
          </StatCard>

          <StatCard accent wide>
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
          </StatCard>
        </StatsGrid>
      )}
    </CourseCard>
  );
}