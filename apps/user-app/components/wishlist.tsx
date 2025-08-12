"use client";

import { memo } from "react";
import Image from "next/image";
import { useWishListVisibilityStore } from "@repo/shared-store";

export const WishList = memo(() => {
  const { isWishListVisible, setVisibilityOfWishList } =
    useWishListVisibilityStore();

  const wishlistItems = [
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
    {
      name: "Monstera Deliciosa",
      description: 'Swiss Cheese Plant - 6" Pot',
      type: "Indoor Plant",
      price: 399,
      image: "/assets/images/WishListImages/plantImage.jpg",
    },
  ];
  const handleWishListVisibility = () => {
    setVisibilityOfWishList(false);
  };

  if (isWishListVisible) {
    return (
      <div className="z-50 absolute top-0 w-[100%] min-h-screen max-h-max bg-[#00000040] bg-opacity-10 flex justify-center">
        <div className="new-sm:w-[95%] new-sm:h-max md:w-[65%] lg:w-[90%] md:h-[90%] font-[Poppins] bg-white rounded-[1.25rem] shadow-2xl mx-auto my-[1rem] overflow-hidden pb-[1rem] animate-slide-in-right">
          {/* Wishlist header section */}
          <div className="w-[100%] py-[1rem] flex justify-between items-center border-b-[0.0625rem] border-[#00000033]">
            {/* Wishlist title */}
            <div className="new-sm:w-[85%] new-sm-1:w-[100%] md:w-[90%] h-[100%] flex justify-center items-center new-sm:gap-[0.5rem] md:gap-[1rem]">
              <div className="relative new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.875rem] new-sm-1:h-[1.875rem]">
                <Image
                  src="/assets/images/WishListImages/wishListIcon.svg"
                  alt="wishListIcon"
                  fill
                />
              </div>
              <p className="new-sm:text-[1.2rem] new-sm-1:text-[1.5rem] md:text-[2rem] font-semibold">
                Your Wishlist
              </p>
            </div>

            {/* Cancel Icon */}
            <button
              className="new-sm:w-[15%] new-sm-1:w-[10%] md:w-[10%] lg:w-[5%] flex justify-center new-sm:pr-[0.5rem] new-sm-1:pr-[1rem] md:pr-[1rem]"
              onClick={handleWishListVisibility}
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

          <div className="flex flex-col items-center">
            {/* Items in your wishlist section */}
            <div className="w-[100%] new-sm:text-[0.7rem] new-sm-1:text-[0.9rem] md:text-[1.25rem] font-medium flex justify-between items-center new-sm:px-[1.5rem] new-sm-1:px-[1.7rem] md:px-[2rem] pt-[0.5rem]">
              <div>Items in your wishlist</div>
              <button className="text-[#697F75]">Remove all</button>
            </div>

            {/* Items section */}
            <div className="w-[100%] h-[26.5rem] grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-[0.5rem] gap-y-[1rem] justify-items-center pb-[1rem] border-b-[0.0625rem] border-[#00000033] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75] px-[1rem]">
              {wishlistItems.map((item, index) => (
                <div
                  key={index}
                  className="new-sm:w-[100%] new-sm:h-[9.4rem] new-sm-2:h-[10rem] md:w-[95%] lg:w-[95%] md:h-[12.1875rem] bg-[#EDE7E4] rounded-[1.25rem] flex flex-col justify-center items-center md:gap-[0.5rem] new-sm:p-[0.2rem] md:p-[0.5rem]"
                >
                  <div className="w-[95%] new-sm:h-[87%] md:h-[92%] flex flex-col justify-between">
                    {/* Product Data */}
                    <div className="w-[100%] flex justify-between gap-[1rem]">
                      {/* Product Image */}
                      <div className="flex justify-center items-start">
                        <div className="relative new-sm:w-[5.2rem] new-sm:h-[4.6rem] new-sm-1:w-[6.52188rem] new-sm-1:h-[5.26769rem] new-sm-2:w-[6.9rem] new-sm-2:h-[5.7rem] md:w-[8.125rem] md:h-[6.5625rem] rounded-[1.25rem] border-[1.6px] border-white overflow-hidden">
                          <Image
                            className="object-cover"
                            src={item.image}
                            alt={item.name}
                            fill
                          />
                        </div>
                      </div>

                      {/* product content */}
                      <div className="flex w-[70%] flex-col justify-between ">
                        <div>
                          <div className="new-sm:text-[0.8rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium leading-[20px]">
                            {item.name}
                          </div>
                          <div className="new-sm:text-[0.625rem] md:text-[0.9375rem] text-[#606060]">
                            {item.description}
                          </div>
                          <div className="new-sm:text-[0.75rem] md:text-[0.9375rem] leading-[20px]">
                            {item.type}
                          </div>
                        </div>

                        <div className="flex justify-between items-center w-full">
                          <div className="new-sm:text-[0.9rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium">
                            ₹ {item.price}
                          </div>
                          <button className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.70569rem] new-sm-1:h-[1.70569rem] md:w-[2.125rem] md:h-[2.125rem] bg-white rounded-[0.3125rem] flex justify-center items-center">
                            <div className="relative new-sm:w-[1.1rem] new-sm:h-[1.1rem] new-sm-1:w-[1.23431rem] new-sm-1:h-[1.23431rem] md:w-[1.25rem] md:h-[1.25rem]">
                              <Image
                                className="object-contain"
                                src="/assets/images/WishListImages/trashIcon.svg"
                                alt="trashIcon"
                                fill
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <button className="new-sm:w-[100%] new-sm:h-[1.9375rem] md:w-[100%] md:h-[2.7rem]  bg-[#56A430] hover:bg-[#213E12]  new-sm:rounded-[0.37825rem] md:rounded-[0.625rem] flex justify-center items-center gap-[1.42rem]">
                      <div className="relative new-sm:w-[0.9375rem] new-sm:h-[0.9375rem] md:w-[1.5rem] md:h-[1.5rem]">
                        <Image
                          className="object-contain"
                          src="/assets/images/CommonImages/addToCartIcon.svg"
                          alt="addToCartIcon"
                          fill
                        />
                      </div>
                      <p className="text-white new-sm:text-[0.74238rem] md:text-[1.22669rem]">
                        Add to Cart
                      </p>
                    </button>
                  </div>
                </div>
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
            <button className="new-sm:w-[90%] new-sm:h-[3.0625rem] md:w-[90%] md:h-[3.1875rem] mt-[0.5rem] bg-[#1A9AEF] hover:bg-[#0F5889] rounded-[0.625rem] flex justify-center items-center">
              <p className="new-sm:text-[1rem] md:text-[1.22669rem] text-white">
                Go to Your Cart
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }
});
