import {
  Activity,
  Copy,
  Cpu,
  MapPin,
  Network,
  Radar,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type { Dispositivo, LogAcesso } from '../../services/resources';
import { protectedApi, publicApi } from '../../services/resources';
import {
  ActionButton,
  Controls,
  DeviceName,
  EventList,
  EventRow,
  Eyebrow,
  Header,
  HeaderActions,
  Page,
  RoomTag,
  SearchField,
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
  SelectField,
  Status,
  Subtitle,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryNote,
  SummaryValue,
  Table,
  TableWrap,
  Title,
} from './styles';

type StatusFilter = 'todos' | 'online' | 'offline';

function isOnline(device: Dispositivo) {
  const status = device.status?.toUpperCase() || '';
  return status.includes('ATIV') || status.includes('ONLINE') || status.includes('CONECT');
}

function formatDateTime(value?: string) {
  if (!value) return 'Sem registro';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Data indisponível' : date.toLocaleString('pt-BR');
}

function eventLabel(event: string) {
  if (event === 'RFID_LEITURA') return 'Leitura RFID';
  if (event === 'RFID_IGNORADO_SEM_AULA') return 'Ignorado sem aula';
  if (event === 'JUSTIFICATIVA_MANUAL') return 'Justificativa manual';
  return event.replaceAll('_', ' ');
}

export function IoT() {
  const [devices, setDevices] = useState<Dispositivo[]>([]);
  const [logs, setLogs] = useState<LogAcesso[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [loading, setLoading] = useState(true);
  const [copiedIp, setCopiedIp] = useState('');

  async function loadData() {
    setLoading(true);
    const [deviceResponse, logResponse] = await Promise.all([
      protectedApi.listDispositivos().catch(() => [] as Dispositivo[]),
      publicApi.listAcessoLogs().catch(() => [] as LogAcesso[]),
    ]);

    setDevices(Array.isArray(deviceResponse) ? deviceResponse : []);
    setLogs(Array.isArray(logResponse) ? logResponse : []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  useEffect(() => {
    const configuredInterval = Number(
      localStorage.getItem('@SenacPass:refreshInterval'),
    );

    if (!Number.isFinite(configuredInterval) || configuredInterval <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      void loadData();
    }, configuredInterval * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const sortedLogs = useMemo(
    () =>
      [...logs].sort(
        (left, right) =>
          new Date(right.data_hora).getTime() - new Date(left.data_hora).getTime(),
      ),
    [logs],
  );
  const latestLogByDevice = useMemo(() => {
    const map = new Map<string, LogAcesso>();
    sortedLogs.forEach((log) => {
      const id = log.dispositivo?.id_dispositivo;
      if (id && !map.has(id)) map.set(id, log);
    });
    return map;
  }, [sortedLogs]);
  const filteredDevices = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR');

    return devices.filter((device) => {
      const matchesStatus =
        statusFilter === 'todos' ||
        (statusFilter === 'online' ? isOnline(device) : !isOnline(device));
      const content = [
        device.nome,
        device.id_hardware,
        device.localizacao,
        device.ip,
        device.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('pt-BR');

      return matchesStatus && (!query || content.includes(query));
    });
  }, [devices, search, statusFilter]);
  const visibleDeviceIds = useMemo(
    () => new Set(filteredDevices.map((device) => device.id_dispositivo)),
    [filteredDevices],
  );
  const visibleLogs = sortedLogs
    .filter((log) => visibleDeviceIds.has(log.dispositivo?.id_dispositivo))
    .slice(0, 12);
  const onlineDevices = devices.filter(isOnline).length;
  const monitoredRooms = new Set(devices.map((device) => device.localizacao).filter(Boolean)).size;

  async function copyIp(ip: string) {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedIp(ip);
      window.setTimeout(() => setCopiedIp(''), 1600);
    } catch {
      setCopiedIp('');
    }
  }

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Infraestrutura conectada</Eyebrow>
          <Title>Dispositivos IoT</Title>
          <Subtitle>
            Monitore leitores, conexão, localização e os eventos RFID recebidos pelo sistema.
          </Subtitle>
        </div>

        <HeaderActions>
          <SectionBadge>
            <Radar size={17} />
            {onlineDevices} online
          </SectionBadge>
          <ActionButton type="button" onClick={() => void loadData()} disabled={loading}>
            <RefreshCw size={16} />
            {loading ? 'Atualizando...' : 'Atualizar'}
          </ActionButton>
        </HeaderActions>
      </Header>

      <SummaryGrid>
        <SummaryCard>
          <SummaryLabel>Dispositivos vinculados</SummaryLabel>
          <SummaryValue>{devices.length}</SummaryValue>
          <SummaryNote>Leitores cadastrados</SummaryNote>
          <Cpu size={18} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Dispositivos online</SummaryLabel>
          <SummaryValue>{onlineDevices}</SummaryValue>
          <SummaryNote>{devices.length - onlineDevices} fora de conexão</SummaryNote>
          <Network size={18} />
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Salas monitoradas</SummaryLabel>
          <SummaryValue>{monitoredRooms}</SummaryValue>
          <SummaryNote>{logs.length} eventos recebidos</SummaryNote>
          <MapPin size={18} />
        </SummaryCard>
      </SummaryGrid>

      <Controls>
        <SearchField>
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por leitor, sala, hardware ou IP"
          />
        </SearchField>
        <SelectField>
          <SlidersHorizontal size={16} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          >
            <option value="todos">Todos os status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </SelectField>
      </Controls>

      <Section>
        <SectionHeader>
          <SectionTitle>Dispositivos por sala</SectionTitle>
          <SectionBadge>{filteredDevices.length} encontrados</SectionBadge>
        </SectionHeader>

        {filteredDevices.length === 0 ? (
          <EmptyState
            title="Nenhum dispositivo encontrado"
            description="Ajuste a busca ou o filtro de status para consultar outros leitores."
          />
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>Dispositivo</th>
                  <th>Localização</th>
                  <th>IP</th>
                  <th>Status</th>
                  <th>Última conexão</th>
                  <th>Último evento</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => {
                  const latestLog = latestLogByDevice.get(device.id_dispositivo);

                  return (
                    <tr key={device.id_dispositivo}>
                      <td>
                        <DeviceName>
                          <strong>{device.nome || device.id_hardware}</strong>
                          <small>{device.id_hardware}</small>
                        </DeviceName>
                      </td>
                      <td><RoomTag>{device.localizacao || 'Não informada'}</RoomTag></td>
                      <td>
                        <ActionButton type="button" onClick={() => void copyIp(device.ip)}>
                          <Copy size={13} />
                          {copiedIp === device.ip ? 'Copiado' : device.ip}
                        </ActionButton>
                      </td>
                      <td><Status $online={isOnline(device)}>{device.status}</Status></td>
                      <td>{formatDateTime(device.ultima_conexao)}</td>
                      <td>
                        {latestLog
                          ? `${eventLabel(latestLog.tipo_evento)} • ${formatDateTime(latestLog.data_hora)}`
                          : 'Sem eventos'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Eventos RFID recentes</SectionTitle>
          <SectionBadge>
            <Activity size={15} />
            Mais recentes primeiro
          </SectionBadge>
        </SectionHeader>

        {visibleLogs.length > 0 ? (
          <EventList>
            {visibleLogs.map((log) => (
              <EventRow key={log.id_log}>
                <div>
                  <strong>{eventLabel(log.tipo_evento)}</strong>
                  <span>
                    UID {log.rfid_uid} • {log.dispositivo?.nome || log.dispositivo?.localizacao || 'Dispositivo'}
                  </span>
                </div>
                <time>{formatDateTime(log.data_hora)}</time>
              </EventRow>
            ))}
          </EventList>
        ) : (
          <EmptyState
            title="Nenhum evento para os dispositivos exibidos"
            description="As leituras RFID aparecerão aqui assim que forem recebidas."
          />
        )}
      </Section>
    </Page>
  );
}
