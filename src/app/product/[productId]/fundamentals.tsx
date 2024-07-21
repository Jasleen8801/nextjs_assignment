import { useTheme } from "@/app/context/theme";
import React from "react";

type Props = {
  market_cap: number;
  fully_diluted_valuation: number;
  trading_volume: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
};

const Fundamentals = ({
  market_cap,
  fully_diluted_valuation,
  trading_volume,
  circulating_supply,
  total_supply,
  max_supply,
}: Props) => {
  const { theme } = useTheme();

  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  return (
    <div className="mt-7 w-full pb-10 border-b border-gray-400">
      <h2 className="mb-4 text-lg font-semibold">Fundamentals</h2>
      <div className="flex flex-col gap-2">
        <div
          className={`w-1/2 flex justify-between border-b pb-2 ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">Market Cap</div>
          <div className="text-sm font-semibold">
            ${formatNumber(market_cap)}
          </div>
        </div>
        <div
          className={`w-1/2 flex justify-between border-b pb-2 ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">
            Fully Diluted Valuation
          </div>
          <div className="text-sm font-semibold">
            ${formatNumber(fully_diluted_valuation)}
          </div>
        </div>
        <div
          className={`w-1/2 flex justify-between border-b pb-2 ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">
            Trading Volume
          </div>
          <div className="text-sm font-semibold">
            ${formatNumber(trading_volume)}
          </div>
        </div>
        <div
          className={`w-1/2 flex justify-between border-b pb-2 ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">
            Circulating Supply
          </div>
          <div className="text-sm font-semibold">
            {formatNumber(circulating_supply)}
          </div>
        </div>
        <div
          className={`w-1/2 flex justify-between border-b pb-2 ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">
            Total Supply
          </div>
          <div className="text-sm font-semibold">
            {formatNumber(total_supply)}
          </div>
        </div>
        <div
          className={`w-1/2 flex justify-between ${
            theme == "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="text-sm text-gray-400 font-semibold">Max Supply</div>
          <div className="text-sm font-semibold">
            {formatNumber(max_supply)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;
