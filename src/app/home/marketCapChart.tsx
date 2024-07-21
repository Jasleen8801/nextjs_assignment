"use client";

import { useGetChartValuesQuery } from "@/redux/api/api";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/app/context/theme";

interface ChartData {
  timestamp: string;
  wrappedEeth: number;
  ethereum: number;
  maker: number;
}

const MarketCapChart = () => {
  const { theme } = useTheme();
  
  const { data: wrappedEethData } = useGetChartValuesQuery({
    productId: "wrapped-eeth",
    days: 1,
  });
  const { data: ethereumData } = useGetChartValuesQuery({
    productId: "ethereum",
    days: 1,
  });
  const { data: makerData } = useGetChartValuesQuery({
    productId: "maker",
    days: 1,
  });

  const wrappedEethLength = wrappedEethData?.prices.length || 0;
  const ethereumLength = ethereumData?.prices.length || 0;
  const makerLength = makerData?.prices.length || 0;

  const chartData: Array<ChartData> = [];

  for (
    let i = 0;
    i < Math.min(wrappedEethLength, ethereumLength, makerLength);
    i++
  ) {
    chartData.push({
      timestamp: new Date(
        wrappedEethData?.prices[i][0] || 0
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      wrappedEeth: wrappedEethData?.prices[i][1] || 0,
      ethereum: ethereumData?.prices[i][1] || 0,
      maker: makerData?.prices[i][1] || 0,
    });
  }

  if(chartData.length === 0) return <div>Loading...</div>

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className={`py-3 border bottom-0.5 ${
        theme == "light" ? "border-gray-300" : "border-gray-100"
      }`}
    >
      <LineChart data={chartData}>
        <Legend />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "10px" }}
        />
        <YAxis tickLine={false} style={{ fontSize: "10px" }} axisLine={false} />
        <Tooltip
          labelClassName={theme === "light" ? "text-gray-600" : "text-black"}
        />
        <Line
          type="monotone"
          dataKey="wrappedEeth"
          stroke={theme === "light" ? "#e9005d" : "#ff4391"}
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="ethereum"
          stroke={theme === "light" ? "#1605ff" : "#a8b9cc"}
          dot={false}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="maker"
          stroke={theme === "light" ? "#ff7300" : "#ffb04f"}
          dot={false}
          strokeWidth={1.5}
        />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketCapChart;
