import { memo } from "react";
import Image from "next/image";

export enum SearchBarWorkType {
  PRODUCTSEARCH = "productSearch",
  CITYSEARCH = "citySearch",
}

interface ProductSearchBarProps {
  placeholder: string;
  UseType: SearchBarWorkType;
}

export const ProductSearchBar =memo(({
  placeholder,
  UseType,
}: ProductSearchBarProps) => {
  return (
    <div className="w-[100%] h-[100%] border-[2px] rounded-l-full rounded-r-full border-[#56A430] flex gap-[0.2rem] justify-start items-center bg-white new-sm:pl-[0.7rem] md:pl-[1rem]">
      {/* Following is the search Image */}
      <div className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] lg:w-[1.5rem] lg:h-[1.5rem] xl:w-[1.8rem] xl:h-[1.8rem] relative">
        <Image
          className="object-cover"
          src="./assets/images/HeaderImages/search-logo.svg"
          alt="search-logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Following is the Search Input Field */}
      <input
        className={
          UseType === SearchBarWorkType.PRODUCTSEARCH
            ? "new-sm:w-[85%] new-sm-1:w-[87%] lg:w-[11rem] xl:w-[17.3125rem] h-[1.8125rem] font-[Poppins] outline-none font-normal new-sm:text-[0.9rem] new-sm-1:text-[1rem] xl:text-[1.22669rem] placeholder:text-[#CBD0D3] text-[#8C8C8C]"
            : "w-[7.875rem] h-[1.8125rem] font-[Poppins] text-[1.22669rem] placeholder:text-[#CBD0D3] text-[#8C8C8C] font-normal border-none outline-none"
        }
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
});
