"use client";

import { useGetTrendingCoinsQuery } from "@/redux/api/api";
import React, { useMemo } from "react";
import BoxHeader from "@/app/components/boxHeader";
import { useTheme } from "@/app/context/theme";
import Image from "next/image";
import { TableHeading } from "@/app/styles/TableHeading";
import { TableData } from "@/app/styles/TableData";
import Link from "next/link";
import DraggableContainer from "../components/draggableContainer";

const Trending = () => {
  const { data } = useGetTrendingCoinsQuery();
  const { theme } = useTheme();

  const trendingCoins = useMemo(() => {
    if (data) {
      return data.coins.map((coin) => {
        return {
          id: coin.item.id,
          name: coin.item.name,
          symbol: coin.item.symbol,
          last_price: `$${coin.item.data.price.toFixed(5)}`,
          change_24h: `${coin.item.data.price_change_percentage_24h.usd.toFixed(
            2
          )}%`,
          market_cap: `${coin.item.data.market_cap}M`,
          thumb: coin.item.thumb,
        };
      });
    }
  }, [data]);

  const trendingCoinsData = trendingCoins?.slice(0, 5);

  if (!trendingCoinsData) return <div></div>;

  return (
    <div
      className={`py-3 px-5 border ${
        theme == "light" ? "border-gray-300" : "border-gray-100"
      }`}
    >
      <BoxHeader
        title="Trending Market"
        sideText="View more coins"
        link="/explore"
      />
      <table className="w-full text-left mt-4">
        <thead className="border-b">
          <tr>
            <TableHeading>Token</TableHeading>
            <TableHeading>Symbol</TableHeading>
            <TableHeading>Last Price</TableHeading>
            <TableHeading>24H Change</TableHeading>
            <TableHeading>Market Cap</TableHeading>
          </tr>
        </thead>
        <tbody>
          {trendingCoinsData?.map((coin) => (
            <DraggableContainer id={coin.id} key={coin.id}>
              <TableData className="flex items-center pt-2" $isBold={true}>
                <Link
                  href={`/product/${coin.id}`}
                  className="flex items-center"
                >
                  <Image
                    src={coin.thumb}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                  {coin.name}
                </Link>
              </TableData>
              <TableData>{coin.symbol}</TableData>
              <TableData>{coin.last_price}</TableData>
              <TableData $isNumeric={parseFloat(coin.change_24h)}>
                {parseFloat(coin.change_24h) > 0 ? "+" : ""}
                {coin.change_24h}
              </TableData>
              <TableData>{coin.market_cap}</TableData>
            </DraggableContainer>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trending;
