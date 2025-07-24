"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TSingleProductData } from "@repo/common-types";

const StarRating = () => (
  <div className="flex items-center gap-2">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[1.5rem] h-[1.5rem] relative shrink-0">
          <Image
            src={`/assets/images/SingleProductImage/${i < 4 ? "ratingIcon" : "whiteStarIcon"}.svg`}
            alt="Star"
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
    <span className="text-[#171717] text-[1.22669rem] font-[Poppins]">4.9</span>
    <span className="text-[#CBD0D3] text-[1.22669rem] font-[Poppins] font-medium">
      (87 reviews)
    </span>
  </div>
);

const SizeOption = ({ selected, size, price, height, tag }: any) => (
  <div
    className={`w-[14.1875rem] h-[5.9375rem] rounded-[0.625rem] border ${selected ? "border-[#56A430] bg-[#DEFFE0]" : "border-[#D9D9D9]"} px-4 py-3 flex flex-col`}
  >
    <div className="text-[#171717] text-[1.25rem] font-[Poppins] font-medium leading-[1.625rem]">
      {size} - ₹ {price}
    </div>
    <div className="text-[#697F75] text-[0.8rem] font-[Poppins]">{height}</div>
    {tag && (
      <div className="w-[7.125rem] h-[1.625rem] bg-[#7FB819] rounded-[5.25rem] flex items-center justify-center mt-1">
        <span className="text-white text-[0.875rem] font-[Poppins] font-semibold">
          {tag}
        </span>
      </div>
    )}
  </div>
);

const IconButton = ({ src, alt }: any) => (
  <button className="w-[3.1875rem] h-[3.1875rem] border border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-center">
    <img src={src} alt={alt} className="w-[1.8rem] h-[1.8rem]" />
  </button>
);

const Thumbnail = ({ src, selected }: any) => (
  <div
    className={`w-[11rem] h-[11rem] rounded-[0.625rem] border-[1.6px] ${selected ? "border-[#56A430]" : "border-white"} overflow-hidden relative`}
  >
    <Image
      src={src}
      alt="Thumbnail"
      fill
      className="object-cover rounded-[0.625rem]"
    />
  </div>
);

export const SingleProductCard = () => {
  const [productCount, setProductCount] = useState(1);
  const crumbs = [
    "Home",
    "Plants",
    "Indoor Plants",
    "Lush Green Bird of Paradise",
  ];
  const searchParams = useSearchParams();
  const productId: string = searchParams.get("id") || "";
  const [singleProductData, setSingleProductData] =
    useState<TSingleProductData>();

  console.log("product id is:", productId);

  useEffect(() => {
    const getSingleProductData = async () => {
      const res = await axios.get(`api/getsingleproductdata?id=${productId}`);
      console.log("single product data is:", res.data.productData);
    };
    getSingleProductData();
  }, [productId]);

  return (
    <div className="w-[82rem] h-[78.8125rem] rounded-[0.9375rem] bg-white my-[1rem]">
      {/* Top div */}
      <div className="flex items-center gap-2 font-[Poppins] text-[1.25rem] leading-[1.625rem] font-normal border-b-[0.0625rem] border-[#00000033] py-[0.7rem] px-[1rem]">
        {crumbs.map((text, i) => (
          <span
            key={i}
            className={`text-[${i === crumbs.length - 1 ? "#171717" : "#697F75"}]`}
          >
            {text}
            {i !== crumbs.length - 1 && (
              <Image
                src="/assets/images/SingleProductImage/rightArrowIcon.svg"
                alt=">"
                width={11}
                height={6}
                className="shrink-0 mx-2 inline-block"
              />
            )}
          </span>
        ))}
      </div>

      {/* Middle div */}
      <div className="w-full flex new-sm:flex-col md:flex-row justify-between py-[1.5rem]">

        {/* LEFT DIV that consist of Product Photos */}
        <div className="w-[60%] flex flex-col items-center gap-[1rem]">
          {/* Product Image div */}
          <div
            className="relative flex w-[75%] h-[37.5rem] border-[20px] border-[#FFF6F4] bg-cover bg-center bg-no-repeat rounded-[0.625rem] overflow-hidden"
            style={{
              backgroundImage: `url("/assets/images/SingleProductImage/productImage.jpg")`,
            }}
          >
            <div className="w-[50%] h-[100%] px-[1.2rem] py-[1rem]">
              <h1 className="w-[9.8125rem] h-[3.0625rem] flex justify-center items-center text-[#FFFFFF] text-[1.5rem] font-semibold rounded-[5.25rem] bg-[#56A430] capitalize">
                -25% off
              </h1>
            </div>

            <div className="w-[50%] h-[100%] flex justify-end px-[1.2rem] py-[1rem]">
              <p className="w-[9.625rem] h-[1.625rem] flex justify-center items-center rounded-[5.25rem] bg-[#7FB819] text-[#FFFFFF] text-[1rem] font-semibold">
                Premium Quality
              </p>
            </div>
          </div>

          {/* Following div consist of Dots*/}
          <div className="flex justify-center w-[100%]">
            <div className="flex justify-start gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 relative">
                  <Image
                    src={`/assets/images/SingleProductImage/${i === 1 ? "selectCircle" : "nonSelectedCircle"}.svg`}
                    alt="Dot"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slidebar Section */}
          <div className="w-[90%] relative flex justify-center items-center">
            {/* Left Arrow */}
            <button
              className="w-[6.75rem] h-[6.75rem] flex justify-center items-center rounded-l-full bg-[#56A430] cursor-not-allowed"
              disabled={true}
            >
              <div className="relative w-[2.25rem] h-[2.25rem]">
                <Image
                  src={"/assets/images/SingleProductImage/leftSlideIcon.svg"}
                  alt="slideIcon"
                  fill
                  className="object-contain"
                />
              </div>
            </button>

            {/* Product Multiple Images */}
            <div className="w-[37.5rem] h-[14.3125rem] rounded-[0.9375rem] bg-[#FFF6F4] flex items-center justify-between px-4 relative">
              <div className="flex gap-4 mx-auto z-10">
                <Thumbnail src="/assets/images/SingleProductImage/leafImage.png" />
                <Thumbnail
                  src="/assets/images/SingleProductImage/productImage.png"
                  selected
                />
                <Thumbnail src="/assets/images/SingleProductImage/rootImage.png" />
              </div>
            </div>

            {/* Right Arrow */}
            <button
              className="w-[6.75rem] h-[6.75rem] flex justify-center items-center rounded-r-full bg-[#56A430] cursor-not-allowed"
              disabled={true}
            >
              <div className="relative w-[2.25rem] h-[2.25rem]  rotate-180">
                <Image
                  src={"/assets/images/SingleProductImage/leftSlideIcon.svg"}
                  alt="slideIcon"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT DIV that consist of product Content and product seller data */}
        <div className="w-[40%] flex flex-col justify-between">
          {/* Right Product Info */}
          <div className="h-[37.5rem] flex flex-col justify-between ">
            {/* Plant Name and other stuff */}
            <div className="flex flex-col ">
              <h1 className="text-[#000] font-[Poppins] text-[2rem] font-semibold leading-[2.3rem]">
                Lush Green Bird of Paradise
              </h1>
              <h2 className="text-[#697F75] text-[1.5rem] font-[Poppins] font-medium leading-[2.3rem]">
                Strelitzia Nicolai - 10&quot; Premium Pot
              </h2>
              <StarRating />
            </div>

            {/* Plant Price and shipping section */}
            <div className="flex flex-col gap-[0.2rem] ">
              <div className="flex items-center gap-4">
                <div className="text-[#56A430] text-[2rem] font-[Poppins] font-semibold">
                  ₹1499
                </div>
                <div className="flex items-end text-[#697F75] text-[1.25rem] font-[Poppins] line-through">
                  ₹1999
                </div>
                <div className="w-[7.1875rem] h-[2.4375rem] bg-[#DBD5A4] flex items-center justify-center rounded-[5.25rem]">
                  <span className="text-[#56A430] text-[1rem] font-[Poppins] font-semibold">
                    Save 25%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#697F75] text-[0.9375rem] font-[Poppins]">
                <div className="w-[1.375rem] h-[1.375rem] relative">
                  <Image
                    src="/assets/images/SingleProductImage/truckIcon.svg"
                    alt="Truck"
                    fill
                    className="object-contain"
                  />
                </div>
                Free shipping on this item
              </div>
            </div>

            {/* Choose Size and Quantity */}
            <div className="flex flex-col gap-[2rem]">
              {/*Following div consist of size option */}
              <div className="flex flex-col gap-[0.5rem] ">
                <h3 className="text-[#171717] text-[1.25rem] font-[Poppins] font-medium">
                  Choose size:
                </h3>
                <div className="">
                  <div className="flex gap-3">
                    <SizeOption size='8"' price="969" height="2-3 feet tall" />
                    <SizeOption
                      selected
                      size='10"'
                      price="1499"
                      height="3-4 feet tall (Most Popular)"
                      tag="Best Value"
                    />
                  </div>
                </div>
              </div>

              {/* Following div consist quantity and other sections */}
              <div className="flex flex-col gap-[1rem] ">
                <div className="flex items-center gap-2 text-[1.25rem] font-[Poppins] ">
                  <label>Quantity:</label>

                  <div className="flex items-center space-x-1 ">
                    {/* Minus Sign,Product Coun and Plus Sign */}
                    <div className="flex bg-[#FFF6F4] rounded-[0.3125rem]">
                      {/* Minus Button */}
                      <button
                        className={`w-[2.125rem] h-[2.125rem] flex items-center justify-center ${productCount === 1 && "cursor-not-allowed"}`}
                        disabled={productCount === 1 && true}
                        onClick={() => {
                          setProductCount(productCount - 1);
                        }}
                      >
                        <div className="relative w-[1.5rem] h-[1.5rem]">
                          <Image
                            src="/assets/images/SingleProductImage/minusIcon.svg"
                            alt="-"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </button>

                      {/* Product Count */}
                      <div className="w-[2.5rem] h-[2.125rem] my-[0.1rem] flex items-center justify-center bg-white text-[1.22669rem] text-black">
                        {productCount}
                      </div>

                      {/*Plus Button */}
                      <button
                        className="w-[2.125rem] h-[2.125rem] flex items-center justify-center"
                        onClick={() => {
                          setProductCount(productCount + 1);
                        }}
                      >
                        <div className="relative w-[1.5rem] h-[1.5rem]">
                          <Image
                            src="/assets/images/SingleProductImage/plusIcon.svg"
                            alt="+"
                            fill
                            className="w-4 h-4"
                          />
                        </div>
                      </button>
                    </div>

                    <span className="ml-2 text-[#CBD0D3] text-[1.22669rem] font-medium">
                      (8 available)
                    </span>
                  </div>
                </div>

                {/* add-to-cart, like and share button */}
                <div className="flex gap-2">
                  <button className="w-[20.3125rem] h-[3.1875rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex items-center justify-center gap-2">
                    <img
                      src="/assets/images/ExploreImages/shopping-cart.svg"
                      alt="cart"
                      className="w-[1.53806rem] h-[1.50469rem]"
                    />
                    <span className="text-white text-[1.22669rem] font-[Poppins]">
                      Add to Cart
                    </span>
                  </button>
                  <IconButton
                    src="/assets/images/SingleProductImage/heartIcon.svg"
                    alt="heart"
                  />
                  <IconButton
                    src="/assets/images/SingleProductImage/shareIcon.svg"
                    alt="share"
                  />
                </div>

                <button className="w-[28.6875rem] h-[3.1875rem] border border-[#56A430] bg-white rounded-[0.625rem]">
                  <span className="text-[#56A430] font-[Poppins] text-[1.22669rem] font-medium">
                    Buy Now - Express Checkout
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Evergreen Gardens Card */}
          <div className="w-[28.6875rem] h-[14.3125rem] flex-shrink-0 rounded-[0.625rem] bg-[#FFF6F4] flex items-center justify-center  ">
            {" "}
            {/* 👈 Push down to align */}
            <div className="w-[26.25rem] h-[11.875rem] flex-shrink-0 rounded-[0.625rem] bg-white flex flex-col justify-between px-4 py-4 shadow-sm">
              {/* Top Row: Image + Info */}
              <div className="flex">
                <div className="w-[6.3125rem] h-[6.3125rem] flex-shrink-0 rounded-full overflow-hidden relative">
                  <Image
                    src="/assets/images/SingleProductImage/profileImage.svg"
                    alt="Evergreen Gardens"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-start ml-4">
                  <div className="text-[#171717] font-[Poppins] text-[1.5rem] font-semibold leading-[1.95rem] flex items-center gap-1">
                    Evergreen Gardens
                    <Image
                      src="/assets/images/SingleProductImage/verifyIcon.svg"
                      alt="Verified"
                      width={24}
                      height={24}
                      className="w-[1.5rem] h-[1.5rem] flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Image
                      src="/assets/images/SingleProductImage/locationIcon.svg"
                      alt="Location"
                      width={24}
                      height={24}
                      className="w-[1.5rem] h-[1.5rem] flex-shrink-0"
                    />
                    <span className="text-[#697F75] font-[Poppins] text-[1.1875rem] font-medium">
                      Katraj, Pune |
                    </span>
                    <Image
                      src="/assets/images/SingleProductImage/ratingIcon.svg"
                      alt="Star"
                      width={22}
                      height={22}
                      className="w-[1.375rem] h-[1.375rem] flex-shrink-0"
                    />
                    <span className="text-[#697F75] text-center font-[Poppins] text-[1.22669rem] font-medium uppercase">
                      4.9
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Buttons */}
              <div className="flex gap-2 mt-4">
                <button className="w-[12.75rem] h-[3.1875rem] flex-shrink-0 rounded-[0.625rem] border border-[#CBD0D3] flex items-center justify-center gap-2">
                  <Image
                    src="/assets/images/SingleProductImage/visitStoreIcon.svg"
                    alt="Visit Store"
                    width={25}
                    height={25}
                    className="w-[1.53806rem] h-[1.50469rem] flex-shrink-0"
                  />
                  <span className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
                    Visit Store
                  </span>
                </button>

                <button className="w-[11rem] h-[3.1875rem] flex-shrink-0 rounded-[0.625rem] border border-[#CBD0D3] flex items-center justify-center gap-2">
                  <Image
                    src="/assets/images/SingleProductImage/contactIcon.svg"
                    alt="Contact"
                    width={25}
                    height={25}
                    className="w-[1.53806rem] h-[1.50469rem] flex-shrink-0"
                  />
                  <span className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
                    Contact
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom div */}
      {/* About Product */}
      <div className="w-[95%] bg-white p-8 ">
        <div className="text-[#000] text-center font-[Poppins] text-[2rem] not-italic font-semibold leading-[130%]">
          About Product
        </div>
        <div className="text-[#171717] text-center font-[Poppins] text-[1.25rem] not-italic font-normal leading-[130%] mt-4">
          The Lush Green Bird of Paradise (Strelitzia reginae) is a striking
          ornamental plant known for its large, banana-like leaves and bold,
          upright presence. Ideal for bright indoor corners, balconies, or
          patios, it adds a tropical elegance to any space while naturally
          purifying the air. Easy to care for with moderate watering and
          indirect sunlight, this fast-growing plant makes a stunning focal
          point in home or office décor.
        </div>
      </div>
    </div>
  );
};
