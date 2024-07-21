"use client";

import MainLayout from "@/app/components/mainLayout";
import { useTheme } from "@/app/context/theme";
import { useGetCoinListQuery } from "@/redux/api/api";
import { useMemo, useState } from "react";
import { TableHeading } from "@/app/styles/TableHeading";
import TableCoinData from "./table";
import { useAppSelector } from "@/redux/store";
import { CoinData } from "@/redux/api/types";

const ITEMS_PER_PAGE = 20;

export default function ExplorePage() {
  const { theme } = useTheme();
  const { data: allCoinData } = useGetCoinListQuery();
  const watchListItems = useAppSelector((state) => state.watchlist.items);
  const recentlyViewedItems = useAppSelector(
    (state) => state.recentlyViewed.items
  );

  const [currentPage, setCurrentPage] = useState(1);

  const allCoinList: Array<CoinData> = useMemo(() => {
    if (allCoinData) {
      return allCoinData.map((coin) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image,
        market_cap: (coin.market_cap / 10000000).toFixed(2) + "M",
        market_cap_rank: coin.market_cap_rank,
        price: coin.current_price.toFixed(2),
        price_change_24h: coin.price_change_24h.toFixed(2),
        market_cap_change_percentage_24h:
          coin.market_cap_change_percentage_24h.toFixed(2),
        ath_change_percentage: coin.ath_change_percentage.toFixed(2),
        atl_change_percentage: coin.atl_change_percentage.toFixed(2),
      }));
    }
    return [];
  }, [allCoinData]);

  const [currentList, setCurrentList] = useState<CoinData[]>(allCoinList || []);

  const watchList: Array<CoinData> = useMemo(() => {
    if (watchListItems) {
      return watchListItems.map((coin) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image.thumb,
        market_cap:
          (coin.market_data.market_cap.usd / 10000000).toFixed(2) + "M",
        market_cap_rank: coin.market_cap_rank,
        price: coin.market_data.current_price.usd.toFixed(2),
        price_change_24h: coin.market_data.price_change_24h.toFixed(2),
        market_cap_change_percentage_24h:
          coin.market_data.price_change_percentage_24h.toFixed(2),
        ath_change_percentage:
          coin.market_data.ath_change_percentage.usd.toFixed(2),
        atl_change_percentage:
          coin.market_data.atl_change_percentage.usd.toFixed(2),
      }));
    }
    return [];
  }, [watchListItems]);

  const recentlyViewedList = useMemo(() => {
    if (recentlyViewedItems) {
      return recentlyViewedItems.map((coin) => ({
        id: coin.id,
        name: coin.name,
        image: coin.image.thumb,
        market_cap:
          (coin.market_data.market_cap.usd / 10000000).toFixed(2) + "M",
        market_cap_rank: coin.market_cap_rank,
        price: coin.market_data.current_price.usd.toFixed(2),
        price_change_24h: coin.market_data.price_change_24h.toFixed(2),
        market_cap_change_percentage_24h:
          coin.market_data.price_change_percentage_24h.toFixed(2),
        ath_change_percentage:
          coin.market_data.ath_change_percentage.usd.toFixed(2),
        atl_change_percentage:
          coin.market_data.atl_change_percentage.usd.toFixed(2),
      }));
    }
    return [];
  }, [recentlyViewedItems]);

  const navItems = [
    { name: "All Coins", list: allCoinList },
    { name: "Watchlist", list: watchList },
    { name: "Gainers", list: [] },
    { name: "Losers", list: [] },
    { name: "Recently Viewed", list: recentlyViewedList },
  ];

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = currentList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(currentList.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSetList = (data: Array<CoinData>) => {
    if (data) {
      setCurrentList(data);
    }
  };

  return (
    <MainLayout>
      <div
        className={`py-3 px-5 border ${
          theme === "light" ? "border-gray-300" : "border-gray-100"
        }`}
      >
        <nav className="flex justify-between space-x-8 py-4 px-5 w-full">
          {navItems.map((item, index) => (
            <button
              onClick={() => handleSetList(item.list)}
              key={index}
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              } hover:text-green-600 hover:border-green-600 border-b-2 pb-1 transition-all duration-300`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        <table className="w-full text-left mt-4">
          <thead className="border-b">
            <tr>
              <TableHeading>Name</TableHeading>
              <TableHeading>Market Cap</TableHeading>
              <TableHeading>Rank</TableHeading>
              <TableHeading>Price</TableHeading>
              <TableHeading>Price 24h</TableHeading>
              <TableHeading>24h</TableHeading>
              <TableHeading>ATH</TableHeading>
              <TableHeading>ATL</TableHeading>
            </tr>
          </thead>
          <tbody>
            <TableCoinData data={currentItems} />
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            } py-2 px-4 border-b ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:text-green-600 hover:border-b-green-600"
            }`}
          >
            Previous
          </button>
          <span
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            } py-2 px-4 border-b ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:text-green-600 hover:border-b-green-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
