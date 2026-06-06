import type { DeviceActionData, DevicePanelData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { DeviceAction, DeviceActions, DeviceDescription, DeviceHeader, DeviceIcon, DeviceTitle, Divider, Panel } from './styles';
import { Cpu, RefreshCcw, Shuffle, LockKeyhole, Unlock } from 'lucide-react';

interface Props {
  data: DevicePanelData;
  onAction?: (action: DeviceActionData) => void;
}

export function DevicePanel({ data, onAction }: Props) {
  return (
    <Panel>
      <DeviceHeader>
        <DeviceIcon>
          <Cpu size={16} />
        </DeviceIcon>

        <div>
          <DeviceTitle>{data.title}</DeviceTitle>
          <DeviceDescription>{data.description}</DeviceDescription>
        </div>
      </DeviceHeader>

      <Divider />

      {data.actions.length === 0 ? (
        <EmptyState
          title="Nenhum dispositivo vinculado"
          description="Assim que houver dispositivos cadastrados, as ações de manutenção aparecem aqui."
        />
      ) : (
        <DeviceActions>
          {data.actions.map(({ label, icon, danger }) => {
            const Icon =
              icon === 'refresh'
                ? RefreshCcw
                : icon === 'sync'
                ? Shuffle
                : icon === 'lock'
                ? LockKeyhole
                : Unlock;

            return (
              <DeviceAction key={label} type="button" danger={danger} onClick={() => onAction?.({ label, icon, danger })}>
                <Icon size={18} />
                <span>{label}</span>
              </DeviceAction>
            );
          })}
        </DeviceActions>
      )}
    </Panel>
  );
}