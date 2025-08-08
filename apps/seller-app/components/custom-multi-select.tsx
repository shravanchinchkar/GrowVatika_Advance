import { ChevronDown, Check } from "lucide-react";
import { useSpecialties } from "@repo/shared-store";
import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  options: string[];
  placeholder?: string;
  maxHeight?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select options...",
  maxHeight = "200px",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const specialties = useSpecialties((state: any) => state.specialties);
  const toggleSpecialties = useSpecialties(
    (state: any) => state.toggleSpecialties
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full min-h-[42px] px-3 py-2 text-left text-[#171717] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] outline-none cursor-pointer
        `}
      >
        <div className="flex items-center justify-between gap-[1rem]">
          {placeholder}
          <ChevronDown
            size={20}
            className={`text-[#697F75] transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Following is the dropdown */}
      {isOpen && (
        <div className="w-full mt-1 bg-white border-[1.5px] border-[#CBD0D3] rounded-md shadow-lg">
          <div
            className="flex flex-col gap-[0.5rem] max-h-60 overflow-y-auto  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#CBD0D3]"
            style={{ maxHeight }}
          >
            {options.map((option, index) => {
              const isSelected = specialties.includes(option);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    // handleToggleOption(option);
                    toggleSpecialties(option);
                  }}
                  className={`
                      w-full px-3 py-2 text-left flex items-center justify-start gap-[1rem] outline-none hover:bg-[#FFF6F4] cursor-pointer rounded-[0.625rem] text-[#171717] ${isSelected && "bg-[#FFF6F4]"}
                    `}
                >
                  {isSelected && (
                    <Check size={20} className="text-[#000000] text-[1.5rem]" />
                  )}
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
