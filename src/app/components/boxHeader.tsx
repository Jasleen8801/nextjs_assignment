import React from "react";
import { useTheme } from "@/app/context/theme";
import Link from "next/link";

type Props = {
  title: string;
  sideText: string;
  link?: string;
  handleClick?: () => void;
};

const BoxHeader = ({ title, sideText, link, handleClick }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {link ? (
        <Link
          className={`text-sm ${
            theme == "light" ? "text-blue-700" : "text-blue-300"
          } font-semibold`}
          href={link ? link : "#"}
        >
          {sideText}
        </Link>
      ): (
        <button
          className={`text-sm ${
            theme == "light" ? "text-blue-700" : "text-blue-300"
          } font-semibold`}
          onClick={handleClick}
        >
          {sideText}
        </button>
      )}
      
    </div>
  );
};

export default BoxHeader;
