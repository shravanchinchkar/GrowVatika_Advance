"use client";

import Image from "next/image";
import { useWishListVisibilityStore } from "@repo/shared-store";

export const WishList = () => {
  const wishListVisibility = useWishListVisibilityStore(
    (state: any) => state.wishListDropDownVisibility
  );

  const updateWishListVisibility = useWishListVisibilityStore(
    (state: any) => state.updateWishListDropDownVisibility
  );

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
    updateWishListVisibility(false);
  };

  if (wishListVisibility === true) {
    return (
      <div className="z-50 absolute top-0 w-[100%] h-[100%] bg-[#00000040] bg-opacity-10 flex justify-center">
        <div className="w-[82.1875rem] h-[41rem] font-[Poppins] bg-white rounded-[1.25rem] shadow-2xl mx-auto my-[1rem] overflow-hidden">
          {/* Wishlist header section */}
          <div className="w-[100%] py-[1rem] flex justify-between items-center border-b-[0.0625rem] border-[#00000033]">
            {/* Wishlist title */}
            <div className="w-[95%] h-[100%]  flex justify-center items-center gap-[1rem]">
              <div className="relative h-[1.875rem] w-[1.875rem]">
                <Image
                  src="/assets/images/WishListImages/wishListIcon.svg"
                  alt="wishListIcon"
                  fill
                />
              </div>
              <p className="text-[2rem] font-semibold">Your Wishlist</p>
            </div>

            {/* Cancel Icon */}
            <button
              className="relative w-[5%] flex justify-center"
              onClick={handleWishListVisibility}
            >
              <div className="relative w-[1.5rem] h-[1.5rem]">
                <Image
                  src="/assets/images/WishListImages/cancelIcon.svg"
                  className="object-cover"
                  alt="cancelIcon"
                  fill
                />
              </div>
            </button>
          </div>

          <div className="flex flex-col items-center">
            {/* Items in your wishlist section */}
            <div className="w-[100%] text-[1.25rem] font-medium flex justify-between items-center px-[3rem] pt-[0.5rem]">
              <div>Items in your wishlist</div>
              <button className="text-[#697F75]">Remove all</button>
            </div>

            {/* Items section */}
            <div className="w-[100%] h-[26.5rem] grid sm:grid-cols-2 lg:grid-cols-3 mt-[0.5rem] gap-y-[1rem] justify-items-center pb-[1rem] border-b-[0.0625rem] border-[#00000033] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75]">
              {wishlistItems.map((item, index) => (
                <div
                  key={index}
                  className="h-[12.1875rem] w-[22rem] bg-[#EDE7E4] rounded-[1.25rem] flex flex-col justify-center items-center gap-[0.5rem]"
                >
                  <div className="h-[7.5625rem] flex gap-[1.5rem]">
                    <div className="relative h-[7rem] w-[7rem] border-[1.6px] border-white rounded-[1.25rem] overflow-hidden">
                      <img
                        className="h-full w-full object-cover rounded-[1.25rem]"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div>
                        <div className="text-[1rem] font-medium">
                          {item.name}
                        </div>
                        <div className="text-[0.8rem] text-[#606060]">
                          {item.description}
                        </div>
                        <div className="text-[0.8rem]">{item.type}</div>
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <div className="text-[1.25rem] font-medium">
                          ₹ {item.price}
                        </div>
                        <button className="w-[2.125rem] h-[2.125rem] bg-white rounded-[0.3125rem] flex justify-center items-center">
                          <img
                            className="h-[1.25rem] w-[1.25rem] object-contain"
                            src="/assets/images/WishListImages/trashIcon.svg"
                            alt="trashIcon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="h-[2.7rem] w-[20rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex justify-center items-center gap-[1.42rem]">
                    <img
                      className="h-[1.5rem] w-[1.5rem] object-contain"
                      src="/assets/images/WishListImages/addToCartIcon.svg"
                      alt="addToCartIcon"
                    />
                    <p className="text-white text-sm">Add to Cart</p>
                  </button>
                </div>
              ))}
            </div>

            {/* Pay online and get extra 5% off section*/}
            <div className="flex justify-center gap-2 pt-[0.5rem]">
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image
                  src="/assets/images/WishListImages/discountIcon.svg"
                  alt="discountIcon"
                  fill
                />
              </div>
              <div>Pay online and get extra 5% off</div>
            </div>

            {/* Go to Your Cart section */}
            <button className="h-[3.1875rem] w-[73.625rem] mt-[0.5rem] bg-[#1A9AEF] hover:bg-[#0F5889] rounded-[0.625rem] flex justify-center items-center">
              <p className="text-[1.22669rem] text-white">Go to Your Cart</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
};
