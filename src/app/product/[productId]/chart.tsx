import React, { useMemo } from 'react';
import { useTheme } from '@/app/context/theme';
import { useGetChartValuesQuery } from '@/redux/api/api';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  coinId: string;
  days: number;
};

const Chart = ({ coinId, days }: Props) => {
  const { theme } = useTheme();
  const { data: chartValues, isFetching, isError } = useGetChartValuesQuery({
    productId: coinId,
    days,
  });

  const chartData = useMemo(() => {
    if (chartValues) {
      return chartValues.prices.map((price) => ({
        timestamp:
          days === 1
            ? new Date(price[0]).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));
    }
    return [];
  }, [chartValues, days]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className={`py-3 border bottom-0.5 ${
        theme === 'light' ? 'border-gray-300' : 'border-gray-100'
      }`}
    >
      <LineChart data={chartData}>
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: '10px' }}
        />
        <YAxis tickLine={false} style={{ fontSize: '10px' }} axisLine={false} />
        <Tooltip
          labelClassName={theme === 'light' ? 'text-gray-600' : 'text-black'}
        />
        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
