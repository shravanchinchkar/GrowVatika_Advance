"use client";

import axios from "axios";
import Image from "next/image";
import { Cart } from "./cart";
import toast from "react-hot-toast";
import Skeleton from "@/app/loading";
import { Navbar } from "./nav-section";
import { Footer } from "./footer-section";
import { Header } from "./header-section";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "./cart-icon";
import { CustomSelectTag } from "./custom-select-tag";
import { UserProfileIcon } from "./user-profile-icon";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ProductPageButton } from "./product-page-button";
import { TExploreBySellerData } from "@repo/common-types/types";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";
import plantImage1 from "../public/assets/images/ProductImages/explore-by-seller-img1.jpg";

export const ExplorePlantsBySeller = () => {
  const [loading, setLoading] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(true);
  const [sellerData, setSellerData] = useState<TExploreBySellerData[]>([]);

  useEffect(() => {
    console.log("Explore By Seller useEffect");
    // Function that fetch the sellerData
    const fetchSellerData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/getexplorebysellerdata");
        console.log(
          "Explore By seller Response is:",
          res.data.sellerWithProductData
        );
        const transformData = res.data.sellerWithProductData.map(
          (data: any) => ({
            ...data,
            businesshours: data.business_hours,
            specialities: data.specialities.slice(0, 4),
            products: data.products.slice(0, 2),
          })
        );
        const size = transformData.length;
        if (size === 0) {
          setIsDataPresent(false);
          setLoading(false);
          return;
        }
        setSellerData(transformData);
        setLoading(false);
      } catch (error) {
        console.log("error while getting seller data:", error);
        toast.error("Error while fetching nurseries data!", toastStyle);
      }
    };
    fetchSellerData();
  }, []);

  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];
  console.log("sellerData value is:", sellerData);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="h-max flex flex-col items-center bg-[#FFF6F4] font-[Poppins]">
      <Cart />
      {/* Heder and Navbar */}
      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex flex-col items-center gap-[1rem] pt-[2rem]">
        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex justify-between">
          <Header />
          <div className="w-[12rem] flex justify-between items-center">
            <UserProfileIcon />
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="w-[100%] flex justify-between">
          <Navbar />
          <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
            <CustomSelectTag
              activeValue="Explore by seller"
              values={["Explore", "Explore by seller"]}
              explore={false}
            />
          </div>
        </div>
      </div>

      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max mt-[3rem] flex flex-col gap-[3rem] items-center">
        {/* Heading of  Eplore by seller */}
        <h1 className="w-[67.8125rem] uppercase text-center text-[#123524] font-[Unbounded] text-[2.25rem]">
          Explore by Sellers – Discover Nurseries Near You!
        </h1>

        {/* Button and Search Bar */}
        <div className="w-[100%] flex items-center ">
          {/* Buttons of the product pages */}
          <div className="w-[70%] flex gap-[1.5rem] justify-end">
            {productPageButton.map((b, index) => {
              return (
                <div className="w-[12.09619rem] h-[4.0625rem]" key={index}>
                  <ProductPageButton
                    uniqueId={index.toString()}
                    buttonName={b}
                  />
                </div>
              );
            })}
          </div>
          {/* Search bar*/}
          <div className="w-[30%] flex justify-end">
            <div className="w-[12.9375rem] h-[4.0625rem] shrink-0">
              <ProductSearchBar
                UseType={SearchBarWorkType.CITYSEARCH}
                placeholder="Find by city"
              />
            </div>
          </div>
        </div>

        {!isDataPresent ? (
          <div className="text-[1.5rem] font-medium uppercase text-[#FF4B4B]">
            No Nursery Data Available Currently
          </div>
        ) : (
          <>
            {/* Seller Cards Starts from below */}
            <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max grid grid-cols-3">
              {sellerData.map((item, index) => {
                return (
                  <div
                    className="justify-self-center flex justify-center w-[100%] mb-[2rem]"
                    key={index}
                  >
                    {/* Following is the nursery card! */}
                    <div className="w-[25rem] h-max shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] flex flex-col items-center gap-[1rem] shrink-0 bg-[#fff] rounded-[1.8rem] p-[1rem] outline-none border-[1.2px] border-[#56A430]">
                      {/* Following is the image div */}
                      <div className="w-[98%] h-[17rem] flex justify-between">
                        {/* Nursery profile Photo */}
                        <div className="relative w-[14rem] h-[100%] rounded-[1.5625rem] overflow-hidden border-[3px] border-[#56A430]">
                          <Image
                            className="object-cover"
                            alt="plant-img-1"
                            src={plantImage1}
                            fill
                            placeholder="blur"
                          />
                        </div>

                        {/* Nursery product Photo */}
                        <div className="flex flex-col justify-between">
                          {item.products.map((image, index) => {
                            if (index == 1) {
                              return (
                                <div
                                  className="relative overflow-hidden w-[7.8rem] h-[8.2rem] border-[3px] rounded-[1.5625rem] border-[#56A430]"
                                  key={index}
                                >
                                  <Image
                                    className="object-cover"
                                    alt="plant-img-2"
                                    src={image}
                                    fill
                                  />
                                  <div className="w-[100%] h-[100%] absolute top-0 bg-[#00000087] flex justify-center items-center text-[#FFF6F4] font-medium text-[2.25rem] uppercase">
                                    {`+${item.productCount}`}
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div
                                className="relative overflow-hidden w-[7.8rem] h-[8.2rem] border-[3px] rounded-[1.5625rem] border-[#56A430]"
                                key={index}
                              >
                                <Image
                                  className="object-cover"
                                  alt="plant-img-2"
                                  src={image}
                                  fill
                                />
                              </div>
                            );
                          })}
                          {item.productCount === 0 && (
                            <>
                              <div className="relative overflow-hidden w-[7.8rem] h-[8.2rem] bg-[#DBD5A4] rounded-[1.5625rem]"></div>
                              <div className="relative overflow-hidden w-[7.8rem] h-[8.2rem] bg-[#DBD5A4] rounded-[1.5625rem]"></div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="w-[98%] min-h-[25rem] max-h-max flex flex-col justify-between">
                        {/* Following div consist of Nursery Name and all that */}
                        <div className="w-[100%] max-h-max border-b-[0.0625rem] flex flex-col gap-[1rem] pb-[1rem] border-[#00000033]">
                          {/* Following div consist of Nursery name,distance and address */}
                          <div className="flex flex-col">
                            <h1 className="text-[#123524] text-[1.5rem] uppercase font-medium">
                              {item.nurseryName}
                            </h1>
                            {/* Following div consist of distance and address */}
                            <div className="flex flex-wrap text-[1rem] text-[#123524A1] font-medium">
                              {/* Distance */}
                              <div className="w-[40%] flex items-center gap-[0.5rem]">
                                <div className="relative w-[1rem] h-[1rem]">
                                  <Image
                                    className="object-cover"
                                    alt="location"
                                    src="/assets/images/ProductImages/location-one.svg"
                                    fill
                                  />
                                </div>
                                <div>2.5 Km away</div>
                              </div>

                              {/* Address */}
                              <div className="min-w-[60%] max-w-max flex items-center gap-[10px]">
                                <div className="w-[8px] h-[8px] bg-[#123524A1] rounded-full"></div>
                                <span>{item.address}</span>
                              </div>
                            </div>
                          </div>

                          {/* Following div consist of Nursery Bio */}
                          <p className="text-[#606060] text-[1rem] font-medium text-justify capitalize">
                            {item.nurseryBio}
                          </p>

                          {/* Following div consist of specialties of the nursery */}
                          <div className="flex flex-wrap justify-between gap-[0.5rem]">
                            {item.specialities.map((speciality, index) => {
                              return (
                                <p
                                  className="min-w-[8.5rem] max-w-max min-h-[2rem] max-h-max rounded-[5.25rem] border-[1.6px] border-[#56A430] p-[0.3rem] flex justify-center items-center text-[#56A430] font-medium text-[1rem]"
                                  key={index}
                                >
                                  {speciality}
                                </p>
                              );
                            })}
                          </div>
                        </div>

                        {/* Following div consist of working hours,buttons and all that */}
                        <div className="w-[100%] max-h-max flex flex-col gap-[1.5rem]">
                          {/* Following div consist of business hours and contact number */}
                          <div className="flex flex-wrap justify-between gap-[0.5rem] text-[1rem] text-[#606060]">
                            {/* Following div consist of business hours */}
                            <div className="w-max flex justify-start items-center gap-[0.5rem]">
                              <div className="relative w-[1rem] h-[1rem]">
                                <Image
                                  className="object-cover"
                                  src="/assets/images/ProductImages/explore-by-seller-clock.svg"
                                  alt="clock"
                                  fill
                                />
                              </div>
                              <p>{item.businesshours}</p>
                            </div>

                            {/* Following div consist of Nursery Phone Number */}
                            <div className="w-max flex justify-center items-center gap-[0.5rem]">
                              <div className="relative w-[1rem] h-[1rem]">
                                <Image
                                  className="object-cover"
                                  src="/assets/images/ProductImages/explore-by-seller-phone.svg"
                                  alt="clock"
                                  fill
                                />
                              </div>
                              <p>{item.phoneNumber}</p>
                            </div>
                          </div>

                          {/* Following div consist of rating,view-map and visit store button */}
                          <div className="w-[100%] flex flex-wrap justify-evenly gap-[1rem] font-[Poppins] font-medium text-[1rem]">
                            {/* View Map Button */}
                            <button
                              className={`w-[10.5rem] h-[2.5rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#fff] flex justify-center items-center gap-[0.5rem] text-[#56A430] uppercase`}
                            >
                              <div className="relative w-[1.3rem] h-[1.3rem]">
                                <Image
                                  alt="location"
                                  src="/assets/images/ProductImages/location-two.svg"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p>View Map</p>
                            </button>

                            {/* Visit Store Button */}
                            <button className="w-[10.5rem] h-[2.5rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#56A430] flex justify-center items-center gap-[0.5rem] text-[#fff] uppercase shadow-lg">
                              <p>Visit Store</p>
                              <div className="relative w-[0.6rem] h-[0.6rem]">
                                <Image
                                  src="/assets/images/ProductImages/right-arrow.svg"
                                  alt="right-arrow"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </button>

                            {/* Rating */}
                            <div className="w-[6.5rem] h-[2.5rem] rounded-[5.25rem] bg-[#123524] text-[#fff] text-[1rem] font-medium uppercase flex justify-center items-center gap-[0.5rem]">
                              <div className="relative w-[1rem] h-[1rem]">
                                <Image
                                  alt="rating"
                                  src="/assets/images/ProductImages/rating.svg"
                                  fill
                                />
                              </div>
                              <p>4.5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="w-[100%]">
        <Footer />
      </div>
    </div>
  );
};
