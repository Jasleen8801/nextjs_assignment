import { useGetCoinDataQuery } from "@/redux/api/api";
import React from "react";

type Props = {
  children: React.ReactNode;
  id: string;
};

const DraggableContainer = ({ children, id }: Props) => {
  const coinData = useGetCoinDataQuery(id);
  const onDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.dataTransfer.setData("data", JSON.stringify(coinData));
  };

  return (
    <tr
      draggable
      onDragStart={onDragStart}
      style={{
        cursor: "grab",
      }}
    >
      {children}
    </tr>
  );
};

export default DraggableContainer;
