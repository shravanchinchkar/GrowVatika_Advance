"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useDropdownUserStore,
  usefilterProductByCategoryStore,
} from "@repo/shared-store";

interface SelectTagUserProps {
  activeValue?: string;
  values?: string[];
  className?: string;
  custom_Id: string;
  isCategory: boolean;
  isSort?: boolean;
  singleProduct?: boolean;
}

export const SelectTagUser = memo(
  ({
    activeValue,
    values,
    className,
    custom_Id,
    isCategory,
    isSort,
    singleProduct,
  }: SelectTagUserProps) => {
    const router = useRouter();
    const { openDropdown, setOpenDropdown } = useDropdownUserStore();
    const isOpen = openDropdown === custom_Id;
    const { category, setCategory } = usefilterProductByCategoryStore();

    //Use useEffect that close the dropdown when click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        // Check if the click is inside the dropdown container
        const dropdownContainer = target.closest(`[data-key="${custom_Id}"]`);

        if (!dropdownContainer && isOpen) {
          setOpenDropdown(null);
        }
      };

      if (isOpen) {
        // Use a small delay to ensure click events on dropdown items are processed first
        const timeoutId = setTimeout(() => {
          document.addEventListener("mousedown", handleClickOutside);
        }, 500);

        return () => {
          clearTimeout(timeoutId);
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen, custom_Id, setOpenDropdown]);

    const handleDropdown = () => {
      if (isOpen) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(custom_Id);
      }
    };

    const handleCategory = (item: string) => {
      setCategory(item);
    };

    const handleSortProduct = () => {};

    const handleExploreType = (item: string) => {
      const navigate = item.toLowerCase().trim().replaceAll(" ", "");
      router.push(`/${navigate}`);
    };
    return (
      <div
        className={`${className} h-[100%] relative rounded-tl-[2.1875rem] rounded-tr-[2.1875rem] z-10`}
      >
        <button
          onClick={() => {
            handleDropdown();
          }}
          type="button"
          className={`${className} h-[100%] absolute top-0 left-0 flex items-center border-[1.6px] border-[#56A430] bg-[#FFFFFF] rounded-[5.25rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1.22669rem] font-[Poppins] font-normal outline-none md:justify-start backdrop-blur-[6.408869743347168px] lg:justify-between overflow-hidden ${isSort ? "text-[#171717] capitalize md:gap-[1rem] lg:gap-0 px-[1.5rem]" : "text-[#697F75] uppercase md:px-[0.5rem] lg:px-[1.2rem] md:gap-[0.5rem] lg:gap-0"} ${singleProduct ? "cursor-not-allowed" : "cursor-pointer"}`}
          data-key={custom_Id}
          disabled={singleProduct}
        >
          {isSort && (
            <div className="relative md:w-[1.2rem] md:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/sortButtonIcon.svg"
                alt="sort icon"
                className="w-full h-full"
                fill
              />
            </div>
          )}
          <p
            className={`${isSort ? "w-max" : "md:w-[90%] lg:w-[100%]"}w-[100%] z-10`}
          >
            {isCategory ? (category ? category : activeValue) : activeValue}
          </p>
          {!isSort && (
            <div className="relative w-[1rem] h-[1rem]">
              <Image
                src={"/assets/images/CustomSelectTagImages/downArrow.svg"}
                alt="downarrow"
                className={
                  isOpen ? "object-contain rotate-180" : "object-contain"
                }
                fill
              />
            </div>
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <ul
            className={`w-[100%] h-max bg-[#fff] top-[1.5rem] border-x-[1.6px] border-b-[1.6px] border-[#56A430] rounded-bl-[2.1875rem] rounded-br-[2.1875rem] text-[#171717] flex flex-col overflow-hidden gap-[0.2rem] pb-[0.5rem] ${isSort ? "mt-[1.5rem] text-[1rem] pt-[2.2rem]" : "mt-[2rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.22669rem] pt-[2.5rem]"}`}
          >
            {values?.map((item, index) => {
              const isSelected = isCategory
                ? category
                  ? category === item
                  : activeValue === item
                : activeValue === item;
              return (
                <li
                  className={`${isSelected ? "pl-[1rem]" : isSort ? "pl-[1.5rem]" : "pl-[2.5rem]"} min-h-[2.5rem] max-h-max flex justify-start items-center gap-[0.5rem] hover:bg-[#FFF6F4] bg-[#FFF6F4] cursor-pointer`}
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    isCategory
                      ? handleCategory(item)
                      : isSort
                        ? handleSortProduct()
                        : handleExploreType(item);
                  }}
                >
                  {isSelected && (
                    <Check className="md:w-[0.9rem] md:h-[0.9rem] lg:w-[1rem] lg:h-[1rem] xl:w-[1.22669rem] xl:h-[1.22669rem] text-[#000000]" />
                  )}

                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);
