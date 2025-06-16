import React, { useState } from "react";
import Image from "next/image";

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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // Normalize options to always have value and label
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  const displayValue = value || placeholder;

  return (
    <div className={`relative w-[15.9375rem] h-[6rem] flex flex-col gap-2 ${className}`}>
      {/* Label */}
      <div className="text-[1.22669rem]">
        {label}
        {required && <span className="text-[#FF4B4B]"> *</span>}
      </div>

      {/* Dropdown Button */}
      <button
        className={`h-[3.1875rem] w-[100%] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-between px-[1rem] ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"
        }`}
        onClick={handleToggle}
        type="button"
        disabled={disabled}
      >
        <div className={`text-[1.22669rem] ${!value ? "text-[#697F75]" : "text-[#171717]"}`}>
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
        className={`absolute top-[6rem] w-[100%] bg-[#fff] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] gap-[0.5rem] overflow-hidden justify-between p-[0.2rem] z-10 shadow-lg ${
          isOpen ? "flex flex-col" : "hidden"
        }`}
      >
        {normalizedOptions.map((option, index) => (
          <li
            className="h-[2.4375rem] bg-[#FFF6F4] rounded-[0.625rem] px-[1rem] flex items-center cursor-pointer hover:bg-[#FFE8E3] transition-colors duration-150"
            key={index}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};