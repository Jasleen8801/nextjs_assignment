import { add, remove, removeAll } from "@/redux/features/watchList";
import { useAppSelector } from "@/redux/store";
import React, { useMemo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@/app/context/theme";
import BoxHeader from "./boxHeader";
import { TableHeading } from "../styles/TableHeading";
import { TableData } from "../styles/TableData";
import Link from "next/link";
import Image from "next/image";
import deleteImage from "@/app/assets/delete.png";
import DroppableContainer from "./droppableArea";
import { GetCoinDataByIdResponse } from "@/redux/api/types";

const Watchlist = () => {
  const { theme } = useTheme();
  const items = useAppSelector((state) => state.watchlist.items);
  const dispatch = useDispatch();

  const removeFromWatchlist = (id: string) => {
    dispatch(remove(id));
  };

  const clearWatchlist = () => {
    dispatch(removeAll());
  };
  
  const handleDrop = useCallback((data: any) => {
    dispatch(add(data.data));
  }, [dispatch]);

  const watchListItems = useMemo(() => {
    const uniqueItems = Array.from(new Set(items.map((item) => item.id))).slice(
      0,
      5
    );
    return uniqueItems.map((id) => {
      const item = items.find((item) => item.id === id);
      return {
        id: item?.id,
        name: item?.name,
        last_price: `${item?.market_data.current_price.usd}`,
        image: item?.image,
        change_24h: `${item?.market_data.market_cap_change_24h.toLocaleString()}%`,
        market_cap: `${item?.market_data.market_cap.usd.toLocaleString()}M`,
      };
    });
  }, [items]);

  console.log(items);

  return (
    <div
      className={`py-3 px-5 border ${
        theme == "light" ? "border-gray-300" : "border-gray-100"
      }`}
    >
      <DroppableContainer onDrop={handleDrop}>
        <BoxHeader
          title="WatchList"
          sideText="Clear All"
          handleClick={clearWatchlist}
        />
        <table className="w-full text-left mt-4 gap-1">
          <thead className="border-b">
            <tr>
              <TableHeading>Token</TableHeading>
              <TableHeading>Last Price</TableHeading>
              <TableHeading>24H Change</TableHeading>
              <TableHeading>Market Cap</TableHeading>
              <TableHeading></TableHeading>
            </tr>
          </thead>
          <tbody>
            {watchListItems.length ? (
              watchListItems.map((coin, index) => (
                <tr key={index} className="h-12 border-b">
                  <TableData className="flex items-center" $isBold={true}>
                    <Link
                      href={`/product/${coin.id}`}
                      className="flex items-center"
                    >
                      {coin.image && (
                        <Image
                          src={coin.image.thumb}
                          alt={coin.name ?? ""}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <span className="ml-2">{coin.name}</span>
                    </Link>
                  </TableData>
                  <TableData>${coin.last_price}</TableData>
                  <TableData>{coin.change_24h}</TableData>
                  <TableData>{coin.market_cap}</TableData>
                  <TableData>
                    <button onClick={() => removeFromWatchlist(coin.id ?? "")}>
                      <Image
                        src={deleteImage}
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </button>
                  </TableData>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No items in watchlist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DroppableContainer>
    </div>
  );
};

export default Watchlist;
