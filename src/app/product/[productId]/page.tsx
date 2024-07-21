"use client";

import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/app/components/mainLayout";
import { useTheme } from "@/app/context/theme";
import { useGetCoinDataQuery } from "@/redux/api/api";
import Chart from "@/app/product/[productId]/chart";
import Header from "@/app/product/[productId]/header";
import Performance from "@/app/product/[productId]/performance";
import Fundamentals from "@/app/product/[productId]/fundamentals";
import { useDispatch } from "react-redux";
import { add as addWatchList } from "@/redux/features/watchList";
import { add as addRecentlyViewed } from "@/redux/features/recentlyViewed";
import { GetCoinDataByIdResponse } from "@/redux/api/types";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const { data } = useGetCoinDataQuery(params.productId);
  const [active, setActive] = useState("1D");
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const daysList: { [key: string]: number } = {
    "1D": 1,
    "1W": 7,
    "2W": 14,
    "1M": 30,
    "2M": 60,
    "3M": 90,
  };

  const coinData = useMemo(() => {
    if (!data) return {};
    return {
      name: data.name,
      icon: data.image.thumb,
      price: `$${data.market_data.current_price.usd}`,
      price_change_24h: data.market_data.price_change_24h.toFixed(4),
      price_change_percentage_24h: `${data.market_data.price_change_percentage_24h.toFixed(
        4
      )}%`,
      market_cap: data.market_data.market_cap.usd,
      fully_diluted_valuation: data.market_data.fully_diluted_valuation.usd,
      trading_volume: data.market_data.total_volume.usd,
      circulating_supply: data.market_data.circulating_supply,
      max_supply: data.market_data.max_supply,
      total_supply: data.market_data.total_supply,
      today_low: data.market_data.low_24h.usd,
      today_high: data.market_data.high_24h.usd,
      ath: data.market_data.ath.usd,
      atl: data.market_data.atl.usd,
      description: data.description.en,
    };
  }, [data]);

  const handleAddToWatchlist = (data: GetCoinDataByIdResponse) => {
    if (!data) return;
    dispatch(addWatchList(data));
  };

  useEffect(() => {
    if (data) {
      dispatch(addRecentlyViewed(data));
    }
  }, [data, dispatch]);

  if (!coinData) return <MainLayout>Loading...</MainLayout>;
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <Header
          name={coinData.name ?? ""}
          icon={coinData.icon ?? ""}
          price={coinData.price ?? ""}
          price_change_24h={coinData.price_change_24h ?? ""}
          price_change_percentage_24h={
            coinData.price_change_percentage_24h ?? ""
          }
          handleClick={() => handleAddToWatchlist(data as any)}
        />
        <Chart coinId={params.productId} days={daysList[active]} />
        <nav className="flex justify-between space-x-8 py-4 px-5 w-full">
          {Object.keys(daysList).map((day) => (
            <button
              onClick={() => setActive(day)}
              key={day}
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              } hover:text-green-600 hover:border-green-600 border-b-2 pb-1 transition-all duration-300 ${
                active === day ? " text-green-600 border-green-600" : ""
              } flex-1`}
            >
              {day}
            </button>
          ))}
        </nav>
        <Performance
          todayLow={coinData.today_low || 0}
          todayHigh={coinData.today_high || 0}
          todayValue={parseFloat(coinData?.price?.replace("$", "") ?? "")}
          yearLow={coinData.atl || 0}
          yearHigh={coinData.ath || 0}
          yearValue={parseFloat(coinData?.price?.replace("$", "") ?? "")}
        />
        <Fundamentals
          market_cap={coinData.market_cap || 0}
          fully_diluted_valuation={coinData.fully_diluted_valuation || 0}
          trading_volume={coinData.trading_volume || 0}
          circulating_supply={coinData.circulating_supply || 0}
          total_supply={coinData.total_supply || 0}
          max_supply={coinData.max_supply || 0}
        />
        <div
          className={`${
            theme === "light" ? "text-gray-900" : "text-gray-300"
          } mt-7 w-full`}
        >
          <h2 className="mb-4 text-lg font-semibold">About {coinData.name}</h2>
          <p className="text-sm text-justify">
            {/* render html content */}
            <div
              dangerouslySetInnerHTML={{
                __html: coinData.description ?? "",
              }}
            />
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
