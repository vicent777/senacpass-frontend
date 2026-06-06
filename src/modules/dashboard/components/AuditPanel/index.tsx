import { ShieldAlert, History } from 'lucide-react';
import type { AuditPanelData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  QuickAction,
  QuickActionText,
  QuickActionButton,
  LogsTitle,
  LogsList,
  LogItem,
  LogLeft,
  LogText,
  LogTime,
} from './styles';

interface Props {
  data: AuditPanelData;
  onStartProcess?: () => void;
}

export function AuditPanel({ data, onStartProcess }: Props) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{data.title}</PanelTitle>
      </PanelHeader>

      <div style={{ display: 'grid', gap: '14px' }}>
        <QuickAction>
          <QuickActionText>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 12, background: 'rgba(30,107,214,0.1)', color: '#1E6BD6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldAlert size={18} />
              </div>

              <div>
                  <div style={{ fontWeight: 700, color: '#1f2937' }}>{data.actionTitle}</div>
                  <div style={{ marginTop: 4, color: '#6b7280', fontSize: '0.88rem' }}>
                    {data.actionDescription}
                </div>
              </div>
            </div>
          </QuickActionText>

          <QuickActionButton type="button" onClick={onStartProcess}>{data.actionButtonLabel}</QuickActionButton>
        </QuickAction>

        <div>
          <LogsTitle>
            <History size={16} />
            {data.logsTitle}
          </LogsTitle>

          {data.logs.length === 0 ? (
            <EmptyState
              title="Sem registros de auditoria"
              description="Quando houver acessos ou eventos recentes, eles serão listados aqui."
            />
          ) : (
            <LogsList>
              {data.logs.map((log) => (
                <LogItem key={`${log.text}-${log.time}`}>
                  <LogLeft>
                    <LogText>{log.text}</LogText>
                  </LogLeft>
                  <LogTime>{log.time}</LogTime>
                </LogItem>
              ))}
            </LogsList>
          )}
        </div>
      </div>
    </Panel>
  );
}