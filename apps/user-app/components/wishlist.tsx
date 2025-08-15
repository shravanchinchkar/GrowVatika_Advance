"use client";

import { memo } from "react";
import Image from "next/image";
import {
  useAddToCartVisibilityStore,
  useWishListStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { WishListCard } from "./wishlist-card";
import { RiHeart3Line, RiHeart3Fill } from "@remixicon/react";

export const WishList = memo(() => {
  //following are the zustand state
  const { likeProductData, clearWishList } = useWishListStore();

  const { isWishListVisible, setVisibilityOfWishList } =
    useWishListVisibilityStore();
  const { setVisibilityOfAddToCart } = useAddToCartVisibilityStore();

  if (isWishListVisible) {
    return (
      <div className="z-50 absolute top-0 w-[100%] h-screen  bg-[#00000040] bg-opacity-10 flex justify-center">
        <div className="new-sm:w-[95%] md:w-[65%] lg:w-[90%] new-sm:h-[95%] font-[Poppins] bg-white rounded-[1.25rem] shadow-2xl mx-auto my-[1rem] overflow-hidden pb-[1rem] animate-slide-in-right">
          {/* Wishlist header section */}
          <div className="w-[100%] py-[1rem] flex justify-between items-center border-b-[0.0625rem] border-[#00000033]">
            {/* Wishlist title */}
            <div className="new-sm:w-[85%] new-sm-1:w-[100%] md:w-[90%] h-[100%] flex justify-center items-center new-sm:gap-[0.5rem] md:gap-[1rem]">
              <div className="flex justify-center items-center bg-[#EDE7E4] rounded-full new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.875rem] new-sm-1:h-[1.875rem]">
                <RiHeart3Fill className="new-sm:w-[1.1rem] new-sm:h-[1.1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] text-[#EA4335]" />
              </div>
              <p className="new-sm:text-[1.2rem] new-sm-1:text-[1.5rem] md:text-[2rem] font-semibold">
                Your Wishlist
              </p>
            </div>

            {/* Cancel Icon */}
            <button
              className="new-sm:w-[15%] new-sm-1:w-[10%] md:w-[10%] lg:w-[5%] flex justify-center new-sm:pr-[0.5rem] new-sm-1:pr-[1rem] md:pr-[1rem]"
              onClick={(e) => {
                e.preventDefault();
                setVisibilityOfWishList(false);
              }}
            >
              <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem]">
                <Image
                  src="/assets/images/CommonImages/cancelIcon.svg"
                  className="object-cover"
                  alt="cancelIcon"
                  fill
                />
              </div>
            </button>
          </div>

          {likeProductData.length === 0 ? (
            // Display the below UI if productData is empty
            <div className="w-[100%] h-[80%] flex flex-col gap-[0.5rem] text-[#697F75] justify-center items-center">
              <RiHeart3Line className="text-gray-500 w-[3rem] h-[3rem]" />
              <h1 className="text-[1.5rem] font-semibold">
                Your WishList is Empty
              </h1>
              <h2>Add items to your wishlist to start shopping</h2>
            </div>
          ) : (
            //display the below UI if productData is Available
            <div className="new-sm:h-[90%] md:h-[87%] flex flex-col justify-between items-center">
              {/* Items in your wishlist section */}
              <div className="w-[100%] new-sm:text-[0.7rem] new-sm-1:text-[0.9rem] md:text-[1.25rem] font-medium flex justify-between items-center new-sm:px-[1.5rem] new-sm-1:px-[1.7rem] md:px-[2rem] pt-[0.5rem]">
                <div>Items in your wishlist</div>
                <button
                  className="text-[#697F75]"
                  onClick={() => clearWishList()}
                >
                  Remove all
                </button>
              </div>

              {/* Items section */}
              <div className="w-[100%] new-sm:h-[35rem] md:h-[25rem] grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-[0.5rem] gap-y-[1rem] justify-items-center pb-[1rem] border-b-[0.0625rem] border-[#00000033] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75] px-[1rem]">
                {likeProductData.map((product, index) => (
                  <WishListCard product={product} key={product.id} />
                ))}
              </div>

              {/* Pay online and get extra 5% off section*/}
              <div className="flex justify-center gap-2 pt-[0.5rem] text-[#697F75] new-sm:text-[0.625rem] md:text-[0.9375rem]">
                <div className="relative new-sm:w-[1.08756rem] new-sm:h-[1.08756rem] md:w-[1.5rem] md:h-[1.5rem]">
                  <Image
                    src="/assets/images/WishListImages/discountIcon.svg"
                    alt="discountIcon"
                    fill
                  />
                </div>
                <div>Pay online and get extra 5% off</div>
              </div>

              {/* Go to Your Cart section */}
              <button
                className="new-sm:w-[90%] new-sm:h-[3.0625rem] md:w-[90%] md:h-[3.1875rem] mt-[0.5rem] bg-[#1A9AEF] hover:bg-[#0F5889] rounded-[0.625rem] flex justify-center items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setVisibilityOfWishList(false);
                  setVisibilityOfAddToCart(true);
                }}
              >
                <p className="new-sm:text-[1rem] md:text-[1.22669rem] text-white">
                  Go to Your Cart
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
});
