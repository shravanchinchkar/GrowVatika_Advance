"use client";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { memo, useEffect, useState } from "react";
import { toastStyle } from "@repo/shared/utilfunctions";
import { TExploreBySellerData } from "@repo/common-types";
import { LocalLoadingSkeleton } from "./local-loading-skeleton";

export const ExploreBySellerGrid = memo(() => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [isDataPresent, setIsDataPresent] = useState(true);
  const [disableLoadMoreSellers, setDisableLoadMoreSellers] =
    useState<boolean>(false);
  const [sellerData, setSellerData] = useState<TExploreBySellerData[]>([]);

  useEffect(() => {
    console.log("Explore By Seller useEffect");

    // Reset states when component mounts
    setSellerData([]);
    setPage(1);
    setLoading(true);
    setIsDataPresent(true);
    setDisableLoadMoreSellers(false);

    // Function that fetch the sellerData
    const fetchSellerData = async () => {
      try {
        const res = await axios.get(`api/getexplorebysellerdata?page=${page}`);
        const transformData = res.data.sellerWithProductData.map(
          (data: any) => ({
            ...data,
            productCount: data.productCount - 2,
            businesshours: data.business_hours,
            specialities: data.specialities.slice(0, 4),
            products: data.products.slice(0, 2),
          })
        );
        const totalPages = res.data.totalPages;

        const size = transformData.length;
        if (size === 0) {
          setIsDataPresent(false);
          setLoading(false);
          return;
        }

        // For initial load, set data directly
        setSellerData(transformData);

        if (page >= totalPages) {
          setDisableLoadMoreSellers(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("error while getting seller data:", error);
        toast.error("Error while fetching nurseries data!", toastStyle);
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []); // Empty dependency array - only run on mount

  useEffect(() => {
    console.log("Explore By Seller useEffect");

    if (page > 1) {
      setLoading(true);
      const fetchSellerData = async () => {
        try {
          const res = await axios.get(
            `api/getexplorebysellerdata?page=${page}`
          );
          const transformData = res.data.sellerWithProductData.map(
            (data: any) => ({
              ...data,
              productCount: data.productCount - 2,
              businesshours: data.business_hours,
              specialities: data.specialities.slice(0, 4),
              products: data.products.slice(0, 2),
            })
          );
          const totalPages = res.data.totalPages;

          const size = transformData.length;
          if (size === 0) {
            setIsDataPresent(false);
            setLoading(false);
            return;
          }

          setSellerData((prev: TExploreBySellerData[]) => {
            return [...prev, ...transformData];
          });

          if (page >= totalPages) {
            setDisableLoadMoreSellers(true);
            setLoading(false);
            return;
          }
          setLoading(false);
        } catch (error) {
          console.log("error while getting seller data:", error);
          toast.error("Error while fetching nurseries data!", toastStyle);
        }
      };
      fetchSellerData();
    }
  }, [page]);

  console.log("seller data is:", sellerData);

  const handleLoadMoreSellerData = () => {
    setPage(page + 1);
  };

  if (!isDataPresent) {
    return (
      <div className="text-[1.5rem] font-medium uppercase text-[#CBD0D3]">
        No Nursery Data Available Currently
      </div>
    );
  } else {
    if (loading) {
      return <LocalLoadingSkeleton />;
    }
    return (
      // Nursery Seller Card Start from here
      <div className="flex flex-col">
        <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max grid grid-cols-3">
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
                    <div
                      className={`relative w-[14rem] h-[100%] rounded-[1.5625rem] overflow-hidden ${!item.profilePictureURL ? "bg-[#DBD5A4]" : "border-[1.2px] border-[#56A430]"}`}
                    >
                      {item.profilePictureURL && (
                        <Image
                          className="object-cover"
                          alt="nursery-profile-photo"
                          src={item.profilePictureURL}
                          fill
                        />
                      )}
                    </div>

                    {/* Nursery product Photos */}
                    {/* bg-[#DBD5A4] */}
                    <div className="flex flex-col justify-between">
                      {item.products.length === 0 ? (
                        <>
                          <div className="relative overflow-hidden w-[7.8rem] h-[8.2rem] rounded-[1.5625rem] bg-[#DBD5A4]"></div>
                          <div className="relative overflow-hidden w-[7.8rem] h-[8.2rem] rounded-[1.5625rem] bg-[#DBD5A4]"></div>
                        </>
                      ) : item.products.length === 1 ? (
                        item.products.map((image, index) => {
                          return (
                            <div
                              className="relative overflow-hidden w-[7.8rem] h-[8.2rem] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
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
                        })
                      ) : (
                        item.products.length >= 2 &&
                        item.products.map((image, index) => {
                          if (item.productCount > 0) {
                            if (index == 1) {
                              return (
                                <div
                                  className="relative overflow-hidden w-[7.8rem] h-[8.2rem] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
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
                          }
                          return (
                            <div
                              className="relative overflow-hidden w-[7.8rem] h-[8.2rem] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
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
                        })
                      )}
                      {item.products.length === 1 && (
                        <div className="relative overflow-hidden w-[7.8rem] h-[8.2rem] bg-[#DBD5A4] rounded-[1.5625rem]"></div>
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

        {/* Button that loads more seller data */}
        <div className="w-[100%] flex justify-center items-center">
          <button
            className={`w-[14.875rem] h-[4.0625rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#FFFFFF] text-[#697F75] text-[1.22669rem] font-medium uppercase font-[Poppins] ${disableLoadMoreSellers ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleLoadMoreSellerData}
            disabled={disableLoadMoreSellers}
          >
            Load more sellers
          </button>
        </div>
      </div>
    );
  }
});
