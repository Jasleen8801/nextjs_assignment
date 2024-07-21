import Image from "next/image";
import React from "react";
import add from "@/app/assets/add.png";
import { useTheme } from "@/app/context/theme";

type Props = {
  name: string;
  icon: string;
  price: string;
  price_change_24h: string;
  price_change_percentage_24h: string;
  handleClick?: () => void;
};

const Header = ({
  name,
  icon,
  price,
  price_change_24h,
  price_change_percentage_24h,
  handleClick,
}: Props) => {
  const { theme } = useTheme();
  const isNegativePercentage = parseFloat(price_change_percentage_24h) < 0;

  return (
    <div className="flex flex-col w-full">
      <Image
        src={icon}
        alt={name}
        width={40}
        height={40}
        className={`border mb-2 ${
          theme == "light" ? "border-black" : "border-white"
        }`}
      />
      <div className="flex justify-between items-center w-full">
        <div className="mb-3">
          <h1 className="text-gray-400 font-bold font-sans uppercase text-sm">
            {name}
          </h1>
          <div className="flex justify-center items-center">
            <p className="text-lg font-bold me-2">{price}</p>
            <p
              className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded h-fit ${
                theme == "light"
                  ? isNegativePercentage
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                  : isNegativePercentage
                  ? "bg-red-900 text-red-300"
                  : "bg-green-900 text-green-300"
              }`}
            >
              {!isNegativePercentage && "+"}{price_change_percentage_24h}
            </p>
            <p
              className={`text-xs font-medium me-2 px-2.5 py-0.5 h-fit ${
                theme == "light"
                  ? isNegativePercentage
                    ? "text-red-800"
                    : "text-green-800"
                  : isNegativePercentage
                  ? "text-red-300"
                  : "text-green-300"
              }`}
            >
              {price_change_24h} Today
            </p>
          </div>
        </div>
        <button onClick={handleClick}>
          <Image src={add} alt="add" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default Header;
