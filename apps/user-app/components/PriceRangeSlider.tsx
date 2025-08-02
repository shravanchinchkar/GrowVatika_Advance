"use client";

import React, { useState, useRef, useCallback } from "react";

export default function PriceRangeSlider() {
  const [minValue, setMinValue] = useState(100);
  const [maxValue, setMaxValue] = useState(800);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const minPrice = 0;
  const maxPrice = 1000;
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) =>
    ((value - minPrice) / (maxPrice - minPrice)) * 100;

  const handleMouseDown = (handle: string) => (e: React.MouseEvent) => {
    setIsDragging(handle);
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-lg font-[Poppins]">
      {/* Price Display */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] font-medium">
            Price Range
          </span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative mb-8">
        <div
          ref={sliderRef}
          className="relative h-2 bg-[#CBD0D3] rounded-full cursor-pointer"
        >
          {/* Active Range Fill */}
          <div
            className="absolute h-full bg-black rounded-full"
            style={{
              left: `${getPercentage(minValue)}%`,
              width: `${getPercentage(maxValue) - getPercentage(minValue)}%`,
            }}
          />

          {/* Min Handle */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-black rounded-full shadow-md cursor-grab transform -translate-x-3 -translate-y-2 transition-all duration-150 hover:scale-110 ${
              isDragging === "min" ? "scale-110 cursor-grabbing" : ""
            }`}
            style={{ left: `${getPercentage(minValue)}%` }}
            onMouseDown={handleMouseDown("min")}
          >
            <div className="w-full h-full bg-white rounded-full scale-50" />
          </div>

          {/* Max Handle */}
          <div
            className={`absolute w-6 h-6 bg-white border-2 border-black rounded-full shadow-md cursor-grab transform -translate-x-3 -translate-y-2 transition-all duration-150 hover:scale-110 ${
              isDragging === "max" ? "scale-110 cursor-grabbing" : ""
            }`}
            style={{ left: `${getPercentage(maxValue)}%` }}
            onMouseDown={handleMouseDown("max")}
          >
            <div className="w-full h-full bg-white rounded-full scale-50" />
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="w-[100%] h-[3.0625rem] flex justify-between items-center gap-[0.8rem] text-[#171717] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] font-normal">
        <div className="w-[50%] h-[100%] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] flex justify-center items-center">
          ₹ 100
        </div>
        <p className="text-[#697F75]">To</p>
        <div className="w-[50%] h-[100%] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] flex justify-center items-center">
          ₹ 400
        </div>
      </div>
    </div>
  );
}
