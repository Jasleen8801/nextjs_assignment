import { GetCoinDataByIdResponse } from "@/redux/api/types";
import React, { ReactNode } from "react";

interface DroppableContainerProps {
  children: ReactNode;
  onDrop: (data: GetCoinDataByIdResponse) => void;
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({
  children,
  onDrop,
}) => {
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("data");
    const id = JSON.parse(data) as GetCoinDataByIdResponse;
    onDrop(id);
};

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDropHandler}  
    >
      {children}
    </div>
  );
};

export default DroppableContainer;
