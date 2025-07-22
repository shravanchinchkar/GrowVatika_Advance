"use client";

import { memo } from "react";
import Image from "next/image";
import { useAddToCartVisibilityStore } from "@repo/shared-store";

export const Cart = memo(() => {
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
      <div className="w-[100%] h-screen z-50 absolute top-0 flex new-sm:justify-end md:justify-end bg-black bg-opacity-10">
        <div className="new-sm:w-[90%] new-sm-3:w-[70%] md:w-[29.375rem] h-max font-[Poppins] flex-shrink-0 rounded-l-[1.25rem] bg-white shadow-[0px_3.2px_32px_-0.8px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden my-[2rem] animate-slide-in-right">
          {/* Cart Header */}
          <div className="relative border-b-[0.0625rem] border-[#00000033] h-[4.5rem] flex items-center">
            {/* Your Cart tiltle and count */}
            <div className="w-[85%] h-[100%] flex justify-center items-center gap-[0.5rem]">
              <h2 className="text-black new-sm:text-[1.2rem] new-sm-1:text-[1.5rem] md:text-[2rem] font-semibold ml-[4rem]">
                Your Cart
              </h2>
              {/* Count */}
              <p className="new-sm:w-[1.2rem] new-sm:h-[1.2rem] new-sm-1:w-[1.5rem] new-sm-1:h-[1.5rem] md:w-[2rem] md:h-[2rem] rounded-full bg-[#56A430] flex justify-center items-center text-[#FFF] new-sm:text-[1rem] new-sm-1:text-[1.22688rem] font-medium uppercase">
                3
              </p>
            </div>

            {/* Cancle Icon */}
            <button
              className="w-[15%] h-[100%] flex justify-center items-center"
              onClick={handleAddToCartVisibility}
            >
              <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] cursor-pointer">
                <Image
                  src="/assets/images/ExploreImages/cancleIcon.svg"
                  alt="cancle"
                  className="object-contain"
                  fill
                />
              </div>
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto new-sm:pl-[1rem] md:pl-[1.5rem] pr-0 py-3 space-y-4 overflow-x-hidden">
            <h3 className="text-[#171717] new-sm:text-[0.9rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium leading-[130%]">
              Items in your cart
            </h3>

            {/* Apply Coupon message */}
            <div className="new-sm:w-[100%] new-sm:h-[1.1875rem] md:w-[27.875rem] md:h-[1.875rem] flex items-center px-4 rounded-l-[6.25rem] bg-gradient-to-r from-[#0F5889] via-[#1A9AEF] to-white">
              <p className="text-white new-sm:text-[0.5625rem] md:text-[0.75rem] italic font-normal capitalize leading-none">
                *Apply Coupons At Checkout
              </p>
            </div>

            {/* Product Card div */}
            <div className="new-sm:max-h-[15rem] md:max-h-[18rem] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75] space-y-[0.5rem]">
              {/* Product Card */}

              <div className="new-sm:w-[100%] new-sm:h-[5.5rem] new-sm-1:h-[6.62219rem] md:w-[100%] md:h-[8.25rem] flex justify-between rounded-l-[1.25rem] bg-[#EDE7E4] px-[0.5rem]">
                {/* Product Image */}
                <div className="w-[35%] flex justify-start items-center md:pl-[0.2rem]">
                  <div className="relative new-sm:w-[5.2rem] new-sm:h-[4.6rem] new-sm-1:w-[6.52188rem] new-sm-1:h-[5.26769rem] new-sm-2:w-[6.9rem] new-sm-2:h-[5.7rem] md:w-[8.125rem] md:h-[6.5625rem] rounded-[1.25rem] border-[1.6px] border-white overflow-hidden flex-shrink-0">
                    <Image
                      src="/assets/images/ExploreImages/product-image.jpg"
                      alt="Product"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="new-sm:w-[65%] flex flex-col justify-center">
                  <div className="flex items-start justify-between">
                    <div className="font-normal">
                      <h4 className="text-black new-sm:text-[0.7rem] new-sm-1:text-[0.9rem] new-sm-2:text-[1.04rem] md:text-[1.25rem] capitalize leading-none">
                        Monstera Deliciosa
                      </h4>
                      <p className="text-[#606060] new-sm:text-[0.5rem] new-sm-1:text-[0.625rem] new-sm-2:text-[0.7rem] md:text-[0.9375rem]">
                        Swiss Cheese Plant - 6&quot; Pot
                      </p>
                      <p className="text-[#171717] new-sm:text-[0.7rem]  new-sm-1:text-[0.75rem] new-sm-2:text-[0.77rem] md:text-[0.9375rem]">
                        Indoor Plant
                      </p>
                    </div>

                    <div className="ml-3 new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.70569rem] new-sm-1:h-[1.70569rem] md:w-[2.125rem] md:h-[2.125rem] flex items-center justify-center rounded-[0.3125rem] bg-white">
                      <div className="relative new-sm:w-[1.1rem] new-sm:h-[1.1rem] new-sm-1:w-[1.23431rem] new-sm-1:h-[1.23431rem] md:w-[1.25rem] md:h-[1.25rem]">
                        <Image
                          src="/assets/images/ExploreImages/trashIcon.svg"
                          alt="delete"
                          className="object-contain"
                          fill
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-black new-sm:text-[0.9rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium capitalize">
                      ₹ 399
                    </p>

                    <div className="flex items-center new-sm:gap-[0.2rem] md:gap-[0.3125rem]">
                      <button className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.70569rem] new-sm-1:h-[1.70569rem] md:w-[2.5rem] md:h-[2.125rem] flex items-center justify-center bg-white rounded-l-[0.25081rem] flex-shrink-0">
                        <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.1rem] new-sm-1:h-[1.1rem] md:w-[1.25rem] md:h-[1.25rem]">
                          <Image
                            src="/assets/images/ExploreImages/cartMinusIcon.svg"
                            className="object-contain"
                            alt="Decrease quantity"
                            fill
                          />
                        </div>
                      </button>

                      <span className="new-sm:w-[1.8rem] new-sm:h-[1.5rem] new-sm-1:w-[2.00675rem] new-sm-1:h-[1.70569rem] md:w-[2.5rem] md:h-[2.125rem] flex items-center justify-center bg-white text-black new-sm:text-[1rem] md:text-[1.22669rem] font-normal capitalize">
                        2
                      </span>

                      <button className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.70569rem] new-sm-1:h-[1.70569rem] md:w-[2.5rem] md:h-[2.125rem] flex items-center justify-center bg-white rounded-r-[0.25081rem] flex-shrink-0">
                        <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.1rem] new-sm-1:h-[1.1rem] md:w-[1.25rem] md:h-[1.25rem]">
                          <Image
                            src="/assets/images/ExploreImages/cartPlusIcon.svg"
                            className="object-contain"
                            alt="Increase quantity"
                            fill
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Footer */}
          <div className="w-[100%] border-t-[0.0625rem] border-[#00000033] flex justify-center">
            <div className="w-[90%] new-sm:pb-[1.3rem] md:pb-[1.63rem] flex flex-col gap-[0.5rem] pt-[0.5rem]">
              {/* Discount Message */}
              <div className="flex items-center new-sm:gap-[0.2rem] md:gap-[0.5rem]">
                {/* Discount Icon */}
                <div className="relative new-sm:w-[1.08756rem] new-sm:h-[1.08756rem] md:w-[1.5rem] md:h-[1.5rem] ">
                  <Image
                    src="/assets/images/ExploreImages/cartDiscountIcon.svg"
                    alt="Discount"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-[#697F75] new-sm:text-[0.625rem] md:text-[0.9375rem] font-normal leading-none">
                  Pay online and get extra 5% off
                </p>
              </div>

              {/* Total Price to be paid */}
              <div className="flex justify-between items-center new-sm:text-[0.9rem] new-sm-1:text-[1rem] md:text-[1.25rem]">
                <p className="text-[#171717] font-semibold leading-[130%]">
                  Subtotal
                </p>
                <p className="text-black font-medium capitalize">₹ 399</p>
              </div>

              {/* Checkout Button */}
              <button className="w-full new-sm:h-[3rem] new-sm-1:h-[3.0625rem] md:h-[3.1875rem] bg-[#1A9AEF] hover:bg-[#0F5889] rounded-[0.625rem] flex justify-center items-center">
                <span className="text-white new-sm:text-[1rem] md:text-[1.22669rem] font-medium text-center">
                  Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
