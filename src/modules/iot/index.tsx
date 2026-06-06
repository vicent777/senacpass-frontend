import { Cpu, MapPin, Network, Radar, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import type { Dispositivo } from '../../services/resources';
import { protectedApi } from '../../services/resources';
import {
  Page,
  Header,
  Eyebrow,
  Title,
  Subtitle,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  SummaryNote,
  Section,
  SectionHeader,
  SectionTitle,
  SectionBadge,
  TableWrap,
  Table,
  Status,
  RoomTag,
} from './styles';

export function IoT() {
  const [devices, setDevices] = useState<Dispositivo[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDevices() {
      const response = await protectedApi.listDispositivos().catch(() => []);

      if (isMounted) {
        setDevices(response);
      }
    }

    void loadDevices();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(
    () => [
      { label: 'Dispositivos vinculados', value: String(devices.length), note: devices.length > 0 ? 'Dispositivos retornados pela API' : 'Não há dados no momento', icon: Cpu },
      { label: 'Salas monitoradas', value: String(new Set(devices.map((device) => device.localizacao)).size), note: devices.length > 0 ? 'Localizações retornadas pela API' : 'Não há dados no momento', icon: MapPin },
      { label: 'IPs ativos', value: String(new Set(devices.map((device) => device.ip)).size), note: devices.length > 0 ? 'Endereços retornados pela API' : 'Não há dados no momento', icon: Network },
    ],
    [devices],
  );

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Infraestrutura conectada</Eyebrow>
          <Title>Dispositivos IoT</Title>
          <Subtitle>
            Lista dos dispositivos retornados pela API com hardware, localização, IP,
            status e última conexão.
          </Subtitle>
        </div>

        <SectionBadge>
          <Radar size={18} />
          Monitoramento ativo
        </SectionBadge>
      </Header>

      <SummaryGrid>
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <SummaryCard key={item.label}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <SummaryLabel>{item.label}</SummaryLabel>
                <Icon size={18} />
              </div>
              <SummaryValue>{item.value}</SummaryValue>
              <SummaryNote>{item.note}</SummaryNote>
            </SummaryCard>
          );
        })}
      </SummaryGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>Dispositivos por sala</SectionTitle>
          <SectionBadge>
            <SlidersHorizontal size={16} />
            Contrato real da API
          </SectionBadge>
        </SectionHeader>

        {devices.length === 0 ? (
          <EmptyState
            title="Não há dispositivos no momento"
            description="Quando a API retornar dispositivos, a lista aparecerá aqui."
          />
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hardware</th>
                  <th>Localização</th>
                  <th>IP</th>
                  <th>Status</th>
                  <th>Última conexão</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id_dispositivo}>
                    <td>
                      <strong>{device.id_dispositivo}</strong>
                    </td>
                    <td>{device.id_hardware}</td>
                    <td>
                      <RoomTag>{device.localizacao}</RoomTag>
                    </td>
                    <td>{device.ip}</td>
                    <td>
                      <Status>{device.status}</Status>
                    </td>
                    <td>{new Date(device.ultima_conexao).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Section>
    </Page>
  );
}
