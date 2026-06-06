import { AlertCard } from '../AlertCard';
import { BellRing } from 'lucide-react';
import type { AlertsPanelData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';
import {
  Panel,
  PanelHeader,
  PanelTitleWrap,
  PanelIcon,
  PanelTitle,
  AlertsStack,
} from './styles';

interface Props {
  data: AlertsPanelData;
}

export function AlertsPanel({ data }: Props) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitleWrap>
          <PanelIcon>
            <BellRing size={16} />
          </PanelIcon>
          <PanelTitle>{data.title}</PanelTitle>
        </PanelTitleWrap>
      </PanelHeader>

      {data.alerts.length === 0 ? (
        <EmptyState
          title="Não há alertas no momento"
          description="Quando houver eventos, eles aparecerão aqui automaticamente."
        />
      ) : (
        <AlertsStack>
          {data.alerts.map((alert) => (
            <AlertCard key={alert.id} {...alert} />
          ))}
        </AlertsStack>
      )}
    </Panel>
  );
}