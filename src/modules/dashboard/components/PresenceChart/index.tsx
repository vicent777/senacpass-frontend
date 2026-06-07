import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EmptyState } from '../../../../components/ui/EmptyState';
import type { PresenceChartData } from '../../types';

import {
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartTitle,
  ChartWrap,
  ChartScroll,
} from './styles';

interface Props {
  data: PresenceChartData;
}

export function PresenceChart({ data }: Props) {
  return (
    <ChartWrap>
      <ChartHeader>
        <ChartTitle>{data.title}</ChartTitle>
        <ChartLegend>
          <ChartLegendItem color="#1E6BD6">{data.legendLabel}</ChartLegendItem>
        </ChartLegend>
      </ChartHeader>

      {data.data.length === 0 ? (
        <EmptyState
          title="Sem histórico de presença"
          description="O gráfico será exibido quando houver aulas e registros de presença."
        />
      ) : (
        <ChartScroll>
          <div style={{ width: Math.max(560, data.data.length * 92), height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.data} margin={{ top: 8, right: 12, left: 0, bottom: 38 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  angle={-25}
                  textAnchor="end"
                  height={62}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, Math.max(1, data.totalStudents)]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value) => [`${value} de ${data.totalStudents} alunos`, 'Presença']}
                  cursor={{ fill: 'rgba(30, 107, 214, 0.06)' }}
                />
                <Bar dataKey="value" fill="#1E6BD6" radius={[7, 7, 0, 0]} maxBarSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartScroll>
      )}
    </ChartWrap>
  );
}
