import React, { useMemo } from "react";
import { useTheme } from "@/app/context/theme";
import BoxHeader from "@/app/components/boxHeader";
import { useAppSelector } from "@/redux/store";
import { TableHeading } from "../styles/TableHeading";
import { TableData } from "../styles/TableData";
import Image from "next/image";
import DraggableContainer from "./draggableContainer";

const RecentlyWatched = () => {
  const { theme } = useTheme();

  const items = useAppSelector((state) => state.recentlyViewed.items);

  const recentlyViewedItems = useMemo(() => {
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

  return (
    <div
      className={`py-3 px-5 border ${
        theme == "light" ? "border-gray-300" : "border-gray-100"
      }`}
    >
      <BoxHeader title="Recently Watched" sideText="View All" link="/explore" />
      <table className="w-full text-left mt-4 gap-1">
        <thead className="border-b">
          <tr>
            <TableHeading>Token</TableHeading>
            <TableHeading>Last Price</TableHeading>
            <TableHeading>24H Change</TableHeading>
            <TableHeading>Market Cap</TableHeading>
          </tr>
        </thead>
        <tbody>
          {recentlyViewedItems &&
            recentlyViewedItems.map((item) => (
              <DraggableContainer key={item.id} id={item.id || ""}>
                <TableData>
                  <div className="flex items-center">
                    <Image
                      src={item.image?.thumb ?? ""}
                      alt={item.name ?? ""}
                      width={20}
                      height={20}
                    />
                    <span className="ml-2">{item.name}</span>
                  </div>
                </TableData>
                <TableData>{item.last_price}</TableData>
                <TableData>{item.change_24h}</TableData>
                <TableData>{item.market_cap}</TableData>
              </DraggableContainer>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyWatched;
