import { memo } from "react";
import Image from "next/image";

export enum SearchBarWorkType {
  PRODUCTSEARCH = "productSearch",
  CITYSEARCH = "citySearch",
}

interface ProductSearchBarProps {
  placeholder: string;
  parentClassName?:string
  searchInputClassName?:string
  searchButtonClassName?:string
}

export const ProductSearchBar = memo(
  ({ placeholder,parentClassName,searchInputClassName,searchButtonClassName }: ProductSearchBarProps) => {
    return (
      <div className={`${parentClassName} flex items-center justify-between rounded-full border-[1.6px] border-[#56A430] bg-white`}>
        {/* Search Input*/}
        <input
          type="text"
          placeholder={placeholder}
          className={`w-[100%] h-[100%] rounded-l-full bg-transparent text-[#CBD0D3] placeholder-[#CBD0D3] font-normal outline-none font-poppins ${searchInputClassName}`}
        />
        {/* Search Button */}
        <button className={`h-[100%] rounded-r-full bg-[#56A430] text-white font-poppins capitalize backdrop-blur-[6.408869743347168px] overflow-hidden ${searchButtonClassName}`}> 
          <div className="w-[100%] h-[100%] flex justify-center items-center bg-button-custom-gradient overflow-hidden">
            <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-3:w-[1.2rem] new-sm-3:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/searchButtonSearchIcon.svg"
                alt="search icon"
                className="w-full h-full"
                fill
              />
            </div>
          </div>

        </button>
      </div>
    );
  }
);
