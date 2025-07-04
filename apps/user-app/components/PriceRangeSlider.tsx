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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = Math.round(
        (percentage / 100) * (maxPrice - minPrice) + minPrice
      );

      if (isDragging === "min") {
        setMinValue(Math.min(newValue, maxValue - 10));
      } else if (isDragging === "max") {
        setMaxValue(Math.max(newValue, minValue + 10));
      }
    },
    [isDragging, minValue, maxValue, minPrice, maxPrice]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add global mouse event listeners
  React.useEffect(() => {
    console.log("Price Range Side bar")
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    if (type === "min") {
      setMinValue(Math.max(minPrice, Math.min(numValue, maxValue - 10)));
    } else {
      setMaxValue(Math.min(maxPrice, Math.max(numValue, minValue + 10)));
    }
  };

  return (
    <div className="bg-white rounded-lg font-[Poppins]">
      {/* Price Display */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[1.25rem] font-medium">Price Range</span>
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
      <div className="grid grid-cols-2 gap-10 mb-6  items-center">
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              value={minValue}
              onChange={(e) => handleInputChange("min", e.target.value)}
              className="w-[5.6875rem] pl-8 pr-3 py-2 border border-gray-300 rounded-[0.625rem]"
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>        

        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => handleInputChange("max", e.target.value)}
              className="w-[5.6875rem] pl-8 pr-3 py-2 border border-gray-300 rounded-[0.625rem]"
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
