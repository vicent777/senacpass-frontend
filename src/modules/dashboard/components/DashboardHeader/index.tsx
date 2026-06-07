import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import type { DashboardHeaderData } from '../../types';
import { HeaderRow, HeaderCopy, HeaderActions, Eyebrow, Title, PrimaryButton } from './styles';

interface Props {
  data: DashboardHeaderData;
  onStartProcess?: () => void;
  rightSlot?: ReactNode;
}

export function DashboardHeader({ data, onStartProcess, rightSlot }: Props) {
  return (
    <HeaderRow>
      <HeaderCopy>
        {data.eyebrow ? <Eyebrow>{data.eyebrow}</Eyebrow> : null}
        <Title>{data.title}</Title>
      </HeaderCopy>

      <HeaderActions>
        {rightSlot}

        {onStartProcess ? (
          <PrimaryButton type="button" onClick={onStartProcess}>
            <Plus size={16} />
            {data.actionLabel}
          </PrimaryButton>
        ) : null}
      </HeaderActions>
    </HeaderRow>
  );
}
