import React, { use, useState } from "react";
import { useTheme } from "@/app/context/theme";
import { useDispatch } from "react-redux";
import { add } from "@/redux/features/recentlySearched";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const recentlySearchedItems = useAppSelector((state) => state.recentlySearched.items);

  const inputClassName =
    theme === "light"
      ? "relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
      : "relative m-0 block flex-auto rounded border border-solid border-neutral-700 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out placeholder:text-neutral-300 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(add(value));
    router.push(`/product/${value}`);
    // setValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsDropdownVisible(true);
  };

  const filteredSuggestions = recentlySearchedItems.filter(item =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <form className="relative flex" onSubmit={handleSearch}>
      <input
        type="search"
        className={inputClassName}
        placeholder="Search"
        aria-label="Search"
        id="exampleFormControlInput2"
        aria-describedby="button-addon2"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)} // Delay hiding dropdown to allow clicking
      />
      {isDropdownVisible && filteredSuggestions.length > 0 && (
        <div
          className={`absolute top-full mt-1 w-full border rounded-md bg-white dark:bg-gray-800 ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          {filteredSuggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-gray-700"
              onClick={() => router.push(`/product/${item}`)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
