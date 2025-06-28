"use client";

import Image from "next/image";
import { useAddToCartVisibilityStore } from "@repo/shared-store";

export const Cart = () => {
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const updateAddToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.updateAddToCartDropDownVisibility
  );
  const iconButton =
    "w-[2.5rem] h-[2.125rem] flex items-center justify-center bg-white rounded-sm flex-shrink-0";

  const handleAddToCartVisibility = () => {
    updateAddToCartVisibility(false);
  };
  if (addToCartVisibility === true) {
    return (
      <div className="z-30 absolute top-0 h-[100%] flex justify-end bg-black bg-opacity-10 w-full">
        <div className="w-[29.375rem] h-max font-[Poppins] flex-shrink-0 rounded-l-[1.25rem] bg-white shadow-[0px_3.2px_32px_-0.8px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden my-[2rem]">
          {/* Cart Header */}
          <div className="relative border-b border-gray-200 h-[4.5rem] flex items-center">
            {/* Your Cart tiltle and count */}
            <div className="w-[90%] h-[100%] flex justify-center items-center gap-[0.5rem]">
              <h2 className="text-black text-[2rem] font-semibold ml-[4rem]">
                Your Cart
              </h2>
              {/* Count */}
              <p className="w-[2rem] h-[2rem] rounded-full bg-[#56A430] flex justify-center items-center text-[#FFF] text-[1.22688rem] font-medium uppercase">
                3
              </p>
            </div>

            {/* Cancle Icon */}
            <button
              className="h-[100%] w-[10%] flex justify-center items-center"
              onClick={handleAddToCartVisibility}
            >
              <div className="w-[1.5rem] h-[1.5rem] cursor-pointer">
                <img
                  src="/assets/images/ExploreImages/cancleIcon.svg"
                  alt="cancle"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto pl-[1.5rem] pr-0 py-3 space-y-4 overflow-x-hidden">
            <h3 className="text-[#171717] text-[1.25rem] font-medium leading-[130%]">
              Items in your cart
            </h3>

            <div className="w-full max-w-[27.875rem] h-[1.875rem] flex items-center px-4 rounded-l-[6.25rem] bg-gradient-to-r from-[#0F5889] via-[#1A9AEF] to-white">
              <p className="text-white text-[0.75rem] italic font-normal capitalize leading-none">
                *Apply Coupons At Checkout
              </p>
            </div>

            <div className="w-full max-w-[27.875rem] flex rounded-l-[1.25rem] bg-[#EDE7E4] p-2 gap-4">
              <div className="w-[8.125rem] h-[6.5625rem] rounded-[1.25rem] border-[1.6px] border-white overflow-hidden flex-shrink-0">
                <Image
                  src="/assets/images/ExploreImages/product-image.jpg"
                  alt="Product"
                  width={130}
                  height={105}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between py-1 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-black text-[1.25rem] font-normal capitalize leading-none">
                      Monstera Deliciosa
                    </h4>
                    <p className="text-[#606060] text-[0.9375rem] font-normal">
                      Swiss Cheese Plant - 6&quot; Pot
                    </p>
                    <p className="text-[#171717] text-[0.9375rem] font-normal">
                      Indoor Plant
                    </p>
                  </div>
                  <div className="ml-3 w-[2.125rem] h-[2.125rem] flex items-center justify-center rounded-[0.3125rem] bg-white">
                    <Image
                      src="/assets/images/ExploreImages/trashIcon.svg"
                      alt="delete"
                      width={20}
                      height={20}
                      className="w-[1.25rem] h-[1.25rem] object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-black text-[1.25rem] font-medium capitalize">
                    ₹ 399
                  </p>
                  <div className="flex items-center gap-[0.3125rem]">
                    <button className={iconButton}>
                      <Image
                        src="/assets/images/ExploreImages/cartMinusIcon.svg"
                        alt="Decrease quantity"
                        width={20}
                        height={20}
                        className="w-[1.25rem] h-[1.25rem] object-contain"
                      />
                    </button>
                    <span className="w-[2.5rem] h-[2.125rem] flex items-center justify-center bg-white text-black text-[1.22669rem] font-normal capitalize">
                      2
                    </span>
                    <button className={iconButton}>
                      <Image
                        src="/assets/images/ExploreImages/cartPlusIcon.svg"
                        alt="Increase quantity"
                        width={20}
                        height={20}
                        className="w-[1.25rem] h-[1.25rem] object-contain"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Footer */}
          <div className="w-[100%] border-t border-gray-200 flex justify-center">
            <div className="w-[90%] pb-[1.63rem] flex flex-col gap-[0.5rem] pt-[0.5rem]">
              {/* Discount Message */}
              <div className="flex items-center gap-2">
                {/* Discount Icon */}
                <div className="relative w-[1.5rem] h-[1.5rem] ">
                  <Image
                    src="/assets/images/ExploreImages/cartDiscountIcon.svg"
                    alt="Discount"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-[#697F75] text-[0.9375rem] font-normal leading-none">
                  Pay online and get extra 5% off
                </p>
              </div>

              {/* Total Price to be paid */}
              <div className="flex justify-between items-center">
                <p className="text-[#171717] text-[1.25rem] font-semibold leading-[130%]">
                  Subtotal
                </p>
                <p className="text-black text-[1.25rem] font-medium capitalize">
                  ₹ 399
                </p>
              </div>

              {/* Checkout Button */}
              <button className="w-full h-[3.1875rem] bg-[#1A9AEF] rounded-[0.625rem] flex justify-center items-center">
                <span className="text-white text-[1.22669rem] font-medium text-center">
                  Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
