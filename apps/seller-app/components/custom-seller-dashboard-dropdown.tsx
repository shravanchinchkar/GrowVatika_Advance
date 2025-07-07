import React, { useState, useId, useEffect } from "react";
import Image from "next/image";
import { useDropdownStore } from "@repo/shared-store";

interface DropdownOption {
  value: string;
  label: string;
}

interface ReusableDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[] | string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  customKey: string;
}

export const CustomSellerDashboardDropDown: React.FC<ReusableDropdownProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
  customKey,
}) => {
  const { openDropdown, setOpenDropdown } = useDropdownStore();
  const isOpen = openDropdown === customKey;

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      if (isOpen) {
        setOpenDropdown(null); // Close this dropdown
      } else {
        setOpenDropdown(customKey); // Open this dropdown (closes others)
      }
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is inside the dropdown container
      const dropdownContainer = target.closest(`[data-key="${customKey}"]`);

      if (!dropdownContainer && isOpen) {
        setOpenDropdown(null);
      }
    };

    if (isOpen) {
      // Use a small delay to ensure click events on dropdown items are processed first
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      },500);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, customKey, setOpenDropdown]);

  // Normalize options to always have value and label
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  const displayValue = value || placeholder;

  return (
    <div
      className={`relative lg:w-[15.9375rem] new-xl:w-[20rem] 2xl:w-[15.9375rem] h-[6rem] flex flex-col gap-2 ${className}`}
    >
      {/* Label */}
      <div className="lg:text-[1.1rem] xl:text-[1.2rem] font-medium">{label}</div>

      {/* Dropdown Button */}
      <button
        className={`lg:w-[100%] xl:w-[90%] 2xl:w-[100%] h-[3.1875rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-between px-[1rem] ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-white cursor-pointer"
        }`}
        onClick={handleToggle}
        type="button"
        disabled={disabled}
        data-key={customKey}
      >
        <div
          className={`lg:text-[1.2rem] xl:text-[1rem] 2xl:text-[1.2rem] ${!value ? "text-[#697F75]" : "text-[#171717]"}`}
        >
          {displayValue}
        </div>

        <div className="relative h-[1.5rem] w-[1.5rem]">
          <Image
            src="/assets/images/AddProductSectionImages/dropdownIcon.svg"
            alt="dropdownIcon"
            fill
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* Dropdown Options */}
      <ul
        className={`absolute top-[6rem] lg:w-[1005] xl:w-[90%] 2xl:w-[100%] bg-[#fff] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] gap-[0.5rem] overflow-hidden justify-between p-[0.2rem] z-10 shadow-lg ${
          isOpen ? "flex flex-col" : "hidden"
        }`}
      >
        {normalizedOptions.map((option, index) => (
          <li
            className="h-[2.4375rem] bg-[#FFF6F4] rounded-[0.625rem] px-[1rem] flex items-center cursor-pointer hover:bg-[#FFE8E3] transition-colors duration-150 text-[1rem]"
            key={index}
            onMouseDown={(e) => {
              // Prevent the mousedown event from bubbling up
              e.preventDefault();
              handleSelect(option.value);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
