import Image from "next/image";

export const Cart = () => {
  const iconButton =
    "w-[2.5rem] h-[2.125rem] flex items-center justify-center bg-white rounded-sm flex-shrink-0";

  return (
    <div className="flex justify-center bg-[rgba(0,0,0,0.25)] w-full h-full">
      <div className="w-[29.375rem] h-[49.6875rem] font-[Poppins] flex-shrink-0 rounded-l-[1.25rem] bg-white shadow-[0px_3.2px_32px_-0.8px_rgba(0,0,0,0.25)] flex flex-col">
        {/* Cart Header */}
        <div className="relative border-b border-gray-200 px-4 py-[3rem] h-[4.5rem] flex items-center justify-center">
          <div className="flex items-center gap-2">
            <h2 className="text-black text-[2rem] font-semibold leading-[130%]">
              Your Cart
            </h2>
            <div className="relative w-6 h-6 flex-shrink-0 translate-y-[2px]">
              <Image
                src="/assets/images/ExploreImages/greenCircleIcon.svg"
                alt="green circle"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-white text-[1.22688rem] font-medium capitalize">
                  3
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-3 right-3 w-[1.2rem] h-[1.2rem] cursor-pointer">
            <img
              src="/assets/images/ExploreImages/cartXIcon.svg"
              alt="Close"
              className="w-full h-full object-contain"
            />
          </div>
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
        <div className="border-t border-gray-200 px-4 py-3 flex justify-center">
          <div className="w-[26.125rem] px-[1.69rem] pb-[1.63rem] space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/ExploreImages/cartDiscountIcon.svg"
                alt="Discount"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <p className="text-[#697F75] text-[0.9375rem] font-normal leading-none">
                Pay online and get extra 5% off
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#171717] text-[1.25rem] font-semibold leading-[130%]">
                Subtotal
              </p>
              <p className="text-black text-[1.25rem] font-medium capitalize">
                ₹ 399
              </p>
            </div>
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
};
