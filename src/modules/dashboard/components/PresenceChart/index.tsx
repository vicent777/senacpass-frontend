import { XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { PresenceChartData } from '../../types';
import { EmptyState } from '../../../../components/ui/EmptyState';

import {
  ChartHeader,
  ChartLegend,
  ChartLegendItem,
  ChartTitle,
  ChartWrap,
} from './styles';

interface Props {
  data: PresenceChartData;
}

export function PresenceChart({ data }: Props) {
  const hasData = data.data.length > 0;

  return (
    <ChartWrap>
      <ChartHeader>
        <ChartTitle>{data.title}</ChartTitle>
        <ChartLegend>
          <ChartLegendItem color="#1E6BD6">{data.legendLabel}</ChartLegendItem>
        </ChartLegend>
      </ChartHeader>

      {hasData ? (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data.data}>
            <defs>
              <linearGradient id="presenceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E6BD6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#1E6BD6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1E6BD6"
              strokeWidth={2.5}
              fill="url(#presenceFill)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          title="Sem dados de presença"
          description="Quando a API retornar presenças, o gráfico será exibido automaticamente."
        />
      )}
    </ChartWrap>
  );
}