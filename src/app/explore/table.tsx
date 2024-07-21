import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TableData } from "@/app/styles/TableData";
import { CoinData } from "@/redux/api/types";
import DraggableContainer from "../components/draggableContainer";


type Props = {
  data: Array<CoinData>;
};

const TableCoinData = ({ data }: Props) => {
  return (
    <>
      {data.map((coin, index) => (
        <DraggableContainer id={coin.id} key={coin.id}>
          <TableData className="flex items-center pt-2" $isBold={true}>
            <Link href={`/product/${coin.id}`} className="flex">
              <Image
                src={coin.image}
                alt={coin.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              {coin.name}
            </Link>
          </TableData>
          <TableData>${coin.market_cap}</TableData>
          <TableData>{coin.market_cap_rank}</TableData>
          <TableData>${coin.price}</TableData>
          <TableData $isNumeric={parseFloat(coin.price_change_24h)}>
            {coin.price_change_24h}%
          </TableData>
          <TableData
            $isNumeric={parseFloat(coin.market_cap_change_percentage_24h)}
          >
            {coin.market_cap_change_percentage_24h}%
          </TableData>
          <TableData>{coin.ath_change_percentage}%</TableData>
          <TableData>{coin.atl_change_percentage}%</TableData>
        </DraggableContainer>
      ))}
    </>
  );
};

export default TableCoinData;
