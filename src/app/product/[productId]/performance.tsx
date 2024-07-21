import { useTheme } from "@/app/context/theme";
import React from "react";

type Props = {
  todayLow: number;
  todayHigh: number;
  todayValue: number;
  yearLow: number;
  yearHigh: number;
  yearValue: number;
};

const Performance = ({
  todayLow,
  todayHigh,
  todayValue,
  yearLow,
  yearHigh,
  yearValue,
}: Props) => {
  const getPercentage = (value: number, min: number, max: number) =>
    ((value - min) / (max - min)) * 100;
  const { theme } = useTheme();
  return (
    <div className="mt-7 w-full pb-10 border-b border-gray-400">
      <h2 className="mb-4 text-lg font-semibold">Performance</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-xs text-gray-400">
          <div>Today{"'"}s Low</div>
          <div>Today{"'"}s High</div>
        </div>
        <div className="relative h-2 mb-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-green-500 rounded-full"
            style={{
              width: `${getPercentage(todayValue, todayLow, todayHigh)}%`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-gray-900"
            style={{
              left: `${getPercentage(todayValue, todayLow, todayHigh)}%`,
            }}
          />
        </div>
        <div
          className={`flex justify-between text-sm font-semibold ${
            theme == "light" ? "text-gray-900" : "text-gray-300"
          }`}
        >
          <div>
            {todayHigh < 1 ? todayHigh.toFixed(8) : todayHigh.toFixed(2)}
          </div>
          <div>{todayLow < 1 ? todayLow.toFixed(8) : todayLow.toFixed(2)}</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2 text-xs text-gray-400">
          <div>52W Low</div>
          <div>52W High</div>
        </div>
        <div className="relative h-2 mb-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-green-500 rounded-full"
            style={{ width: `${getPercentage(yearValue, yearLow, yearHigh)}%` }}
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-gray-900"
            style={{ left: `${getPercentage(yearValue, yearLow, yearHigh)}%` }}
          />
        </div>
        <div
          className={`flex justify-between text-sm font-semibold ${
            theme == "light" ? "text-gray-900" : "text-gray-300"
          }`}
        >
          <div>{yearHigh < 1 ? yearHigh.toFixed(8) : yearHigh.toFixed(2)}</div>
          <div>{yearLow < 1 ? yearLow.toFixed(8) : yearLow.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
