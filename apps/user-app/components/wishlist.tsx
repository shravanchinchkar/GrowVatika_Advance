import Image from "next/image";

export const WishList = () => {
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
    // Add more items as needed
  ];

  return (
    <div className="h-[49.6875rem] w-[82.1875rem] font-[Poppins] bg-white rounded-[1.25rem] shadow-2xl mx-auto my-[2.75rem]">
      {/* Your Wishlist header section */}
      <div className="border-b pb-[1.81rem]">
        <div className="flex items-center pt-[1.88rem]">
          <div className="flex items-center ml-[34.81rem] gap-1">
            <div className="relative h-[1.875rem] w-[1.875rem]">
              <Image
                src="/assets/images/WishListImages/wishListIcon.svg"
                alt="wishListIcon"
                fill
              />
            </div>
            <p className="text-[2rem] font-semibold">Your Wishlist</p>
          </div>
          <button className="relative h-[1.5rem] w-[1.5rem] ml-[28rem]">
            <Image
              src="/assets/images/WishListImages/cancelIcon.svg"
              alt="cancelIcon"
              fill
            />
          </button>
        </div>
      </div>

      <div className="mt-[2rem] ml-[4rem] mr-[4rem]">
        {/* Items in your wishlist section */}
        <div className="text-[1.25rem] font-medium flex justify-between">
          <div>Items in your wishlist</div>
          <button className="text-[#697F75]">Remove all</button>
        </div>

        {/* Items section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 justify-items-center border-b pb-[2rem]">
          {wishlistItems.map((item, index) => (
            <div
              key={index}
              className="h-[12.1875rem] w-[22rem] mt-[1.75rem] bg-[#EDE7E4] rounded-[1.25rem] flex flex-col justify-center items-center gap-2"
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
                    <div className="text-[1rem] font-medium">{item.name}</div>
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

              <button className="h-[2.7rem] w-[20rem] bg-[#56A430] rounded-[0.625rem] flex justify-center items-center gap-[1.42rem]">
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
        <div className="flex justify-center pt-4 gap-2">
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
        <button className="h-[3.1875rem] w-[73.625rem] mt-4 bg-[#1A9AEF] rounded-[0.625rem] flex justify-center items-center">
          <p className="text-[1.22669rem] text-white">Go to Your Cart</p>
        </button>
      </div>
    </div>
  );
};
