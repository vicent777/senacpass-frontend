import {
  CartesianGrid,
  Line,
  LineChart,
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
  const compactData = data.data.slice(-6);

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
          <ResponsiveContainer width="100%" height={240}>
              <LineChart data={compactData} margin={{ top: 8, right: 8, left: -18, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                  minTickGap={18}
                  tickFormatter={(value: string) => value.split(' ')[0]?.slice(0, 5) || value}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, Math.max(1, data.totalStudents)]}
                  width={34}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <Tooltip
                  formatter={(value) => [`${value} de ${data.totalStudents} alunos`, 'Presença']}
                  cursor={{ stroke: 'rgba(30, 107, 214, 0.18)' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1E6BD6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ffffff', stroke: '#1E6BD6', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
          </ResponsiveContainer>
        </ChartScroll>
      )}
    </ChartWrap>
  );
}
