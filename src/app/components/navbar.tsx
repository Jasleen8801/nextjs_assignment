import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import light from "@/app/assets/light.jpg";
import dark from "@/app/assets/dark.png";
import { useTheme } from "@/app/context/theme";
import Link from "next/link";
import SearchBar from "./searchBar";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav
        className={`fixed w-full z-20 top-0 start-0 border-b ${
          theme == "light"
            ? "bg-white border-gray-200"
            : "bg-gray-900 border-gray-600"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              className="h-8 ps-2 ms-5"
              alt="logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-semibold">Coin Tracker</span>
          </Link>
          <SearchBar />
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className={`${
                theme == "light" ? "bg-white" : "bg-gray-900"
              } me-5`}
              onClick={toggleTheme}
            >
              {theme == "light" ? (
                <Image src={dark} alt="light" width={32} height={32} />
              ) : (
                <Image
                  src={light}
                  alt="dark"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
