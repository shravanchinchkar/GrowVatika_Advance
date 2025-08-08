"use client";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Skeleton from "@repo/ui/loading";
import { toastStyle } from "@repo/shared/utilfunctions";
import { TExploreBySellerData } from "@repo/common-types";
import { memo, useCallback, useEffect, useReducer } from "react";
import { ExploreBySellerMobileGrid } from "./explore-by-seller-mobile-grid";

interface SellerData {
  loading: boolean;
  isDataPresent: boolean;
  disableLoadMoreSellers: boolean;
  sellerData: TExploreBySellerData[];
  page: number;
}

// Reducer function
const reducer = (state: SellerData, action: any): SellerData => {
  switch (action.type) {
    case "INITIAL_MOUNT":
      return state;
    case "LOADING":
      return { ...state, loading: true };
    case "NO_DATA_FOUND":
      return { ...state, isDataPresent: false, loading: false };
    case "DISABLE_LOAD_MORE_SELLERS":
      return { ...state, disableLoadMoreSellers: true };
    case "INCREASE_PAGE_COUNT":
      return { ...state, page: state.page + 1 };
    case "FETCH_SUCCESS":
      return {
        ...state,
        sellerData: action.payload.sellerData,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};


export const ExploreBySellerGrid = memo(() => {
  const [state, dispatch] = useReducer<SellerData, any>(reducer, {
    loading: true,
    isDataPresent: true,
    disableLoadMoreSellers: false,
    sellerData: [],
    page: 1,
  });

  const fetchSellerData = useCallback(async () => {
    try {
      const res = await axios.get(
        `api/getexplorebysellerdata?page=${state.page}`
      );
      const transformData = res.data.sellerWithProductData.map((data: any) => ({
        ...data,
        productCount: data.productCount - 2,
        businesshours: data.business_hours,
        specialities: data.specialities.slice(0, 4),
        products: data.products.slice(0, 2),
      }));
      const totalPages = res.data.totalPages;

      const size = transformData.length;
      if (size === 0) {
        dispatch({ type: "NO_DATA_FOUND" });
        return;
      }

      if (state.page >= totalPages) {
        dispatch({ type: "DISABLE_LOAD_MORE_SELLERS" });
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          sellerData: transformData,
          loading: false,
        },
      });
    } catch (error) {
      toast.error("Error while fetching nurseries data!", toastStyle);
      dispatch({ type: "NO_DATA_FOUND" });
    }
  }, [state.page]);

  useEffect(() => {
    // Reset states when component mounts
    dispatch({ type: "INITIAL_MOUNT" });

    fetchSellerData();
  }, []); // Empty dependency array - only run on mount

  useEffect(() => {
    if (state.page > 1) {
      dispatch({ type: "LOADING" });
      fetchSellerData();
    }
  }, [state.page]);

  const handleLoadMoreSellerData = useCallback(() => {
    dispatch({ type: "INCREASE_PAGE_COUNT" });
  }, [state.page]);

  // reduce the word count present in the nurseryBio
  const truncateWords = (text: string, wordLimit: number = 15): string => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (!state.isDataPresent) {
    return (
      <div className="text-[1.5rem] font-medium uppercase text-[#CBD0D3]">
        No Nursery Data Available Currently
      </div>
    );
  } else {
    if (state.loading) {
      return (
        <Skeleton className="w-[100%] h-[100%] flex justify-center items-center" />
      );
    }
    return (
      // Nursery Seller Card Start from here
      <div className="new-sm:w-[100%] md:w-[100%] flex flex-col gap-[1rem]">

        {/* Following is the mobile veiw */}
        <ExploreBySellerMobileGrid sellerData={state.sellerData} truncateWords={truncateWords}/>

        {/* Following is the tab,laptop and computer view start from md */}
        <div className="w-[100%] h-max new-sm:hidden md:grid md:grid-cols-2 new-xl:grid-cols-3">
          {state.sellerData.map((item, index) => {
            return (
              <div
                className="justify-self-center flex justify-center w-[100%] mb-[2rem]"
                key={index}
              >
                {/* Following is the nursery card! */}
                <div className="md:w-[95%] xl:w-[80%] new-xl:w-[95%] md:h-[40rem] lg:h-[45rem] 2xl:h-[50rem] shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] flex flex-col items-center md:gap-[0.5rem] xl:gap-[1rem] shrink-0 bg-[#fff] rounded-[1.8rem] md:p-[0.5rem] xl:p-[1rem] outline-none border-[1.2px] border-[#56A430]">
                  {/* Following is the image div */}
                  <div className="w-[98%] md:h-[35%] new-md:h-[40%] flex justify-between">
                    {/* Nursery profile Photo */}
                    <div
                      className={`relative w-[60%] h-[100%] rounded-[1.5625rem] overflow-hidden ${item.profilePictureURL && "border-[1.2px] border-[#56A430]"}`}
                    >
                      {item.profilePictureURL ? (
                        <Image
                          className="object-cover"
                          alt="nursery-profile-photo"
                          src={item.profilePictureURL}
                          fill
                        />
                      ) : (
                        <Image
                          src={
                            "/assets/images/ExploreBySellerImages/ImagePlaceholder.jpg"
                          }
                          alt="NoImage"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Nursery product Photos */}
                    <div className="w-[37%] flex flex-col justify-between items-end">
                      {/* If seller has not publish any product then the following block gets displayed */}
                      {item.products.length === 0 ? (
                        <>
                          <div className="relative overflow-hidden w-[100%] h-[48%] rounded-[1.5625rem]">
                            <Image
                              src={
                                "/assets/images/ExploreBySellerImages/ImagePlaceholder2.png"
                              }
                              alt="NoImage"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative overflow-hidden w-[100%] h-[48%] rounded-[1.5625rem]">
                            <Image
                              src={
                                "/assets/images/ExploreBySellerImages/ImagePlaceholder2.png"
                              }
                              alt="NoImage"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </>
                      ) : // If Seller has published a single product
                      item.products.length === 1 ? (
                        item.products.map((image, index) => {
                          return (
                            <div
                              className="relative overflow-hidden w-[100%] h-[48%] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
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
                        // If Seller has published 2 or more than 2 products
                        item.products.length >= 2 &&
                        item.products.map((image, index) => {
                          if (item.productCount > 0) {
                            if (index == 1) {
                              return (
                                <div
                                  className="relative overflow-hidden w-[100%] h-[48%] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
                                  key={index}
                                >
                                  <Image
                                    className="object-cover"
                                    alt="plant-img-2"
                                    src={image}
                                    fill
                                  />
                                  <div className="w-[100%] h-[100%] absolute top-0 bg-[#00000087] flex justify-center items-center text-[#FFF6F4] font-medium  md:text-[1.5rem] xl:text-[2.25rem] uppercase">
                                    {`+${item.productCount}`}
                                  </div>
                                </div>
                              );
                            }
                          }
                          return (
                            <div
                              className="relative overflow-hidden w-[100%] h-[48%] border-[1.2px] rounded-[1.5625rem] border-[#56A430]"
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
                        <div className="relative overflow-hidden w-[100%] h-[48%] bg-[#DBD5A4] rounded-[1.5625rem]"></div>
                      )}
                    </div>
                  </div>

                  <div className="w-[98%] md:h-[65%] new-md:h-[60%] flex flex-col justify-between">
                    {/* Following div consist of Nursery Name and all that */}
                    <div className="w-[100%] md:h-[60%] xl:h-[65%] new-xl:h-[70%] border-b-[0.0625rem] flex flex-col justify-around gap-[1rem] border-[#00000033] pb-[1.5rem]">
                      {/* Following div consist of Nursery name,distance and address */}
                      <div className="flex flex-col">
                        <h1 className="text-[#123524] md:text-[1.3rem] lg:text-[1.5rem] 2xl:text-[1.5rem] uppercase font-medium">
                          {item.nurseryName}
                        </h1>
                        {/* Following div consist of distance and address */}
                        <div className="flex flex-wrap md:text-[0.9rem] lg:text-[1rem] 2xl:text-[1rem] text-[#123524A1] font-medium">
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
                      <p className="text-[#606060] md:text-[0.9rem] lg:text-[1rem] 2xl:text-[1rem] font-medium text-justify capitalize">
                        {truncateWords(item.nurseryBio)}
                      </p>

                      {/* Following div consist of specialties of the nursery */}
                      <div className="flex flex-wrap justify-between gap-[0.5rem]">
                        {item.specialities.map((speciality, index) => {
                          return (
                            <p
                              className="md:min-w-[7.5rem] 2xl:min-w-[8.5rem] max-w-max min-h-[2rem] max-h-max rounded-[5.25rem] border-[1.6px] border-[#56A430] p-[0.3rem] flex justify-center items-center text-[#56A430] font-medium md:text-[0.8rem] lg:text-[1rem] 2xl:text-[1rem]"
                              key={index}
                            >
                              {speciality}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Following div consist of working hours,buttons and all that */}
                    <div className="w-[100%] md:h-[40%] xl:h-[35%] new-xl:h-[30%] flex flex-col md:justify-around new-xl:justify-start  2xl:justify-between md:gap-[1rem] lg:gap-[1.5rem] new-xl:gap-[1rem] 2xl:gap-[1.5rem] xl:pt-[0.5rem]">
                      {/* Following div consist of business hours and contact number */}
                      <div className="flex flex-wrap justify-between gap-[0.5rem] md:text-[0.9em] lg:text-[1rem] 2xl:text-[1rem] text-[#606060]">
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
                      <div className="w-[100%] flex justify-between md:gap-[0.5rem] 2xl:gap-[1rem] font-[Poppins] font-medium md:text-[0.8rem] lg:text-[0.9rem] 2xl:text-[1rem]">
                        {/* Rating */}
                        <div className="md:w-[5rem] lg:w-[6rem] 2xl:w-[5.5rem] md:h-[2.5rem] lg:h-[3rem] xl:h-[3.2rem] new-xl:h-[2.8rem] 2xl:h-[2.5rem] rounded-[5.25rem] bg-[#123524] text-[#fff] flex justify-center items-center gap-[0.5rem] uppercase">
                          <div className="relative md:w-[0.8rem] md:h-[0.8rem] 2xl:w-[1rem] 2xl:h-[1rem]">
                            <Image
                              alt="rating"
                              src="/assets/images/ProductImages/rating.svg"
                              fill
                            />
                          </div>
                          4.5
                        </div>
                        {/* View Map Button */}
                        <button className="md:w-[8rem] md:h-[2.5rem] lg:h-[3rem] xl:w-[9rem] xl:h-[3.2rem] new-xl:h-[2.8rem] 2xl:w-[9rem] 2xl:h-[2.5rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#fff] flex justify-center items-center gap-[0.5rem] text-[#56A430] uppercase">
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
                        <button className="md:w-[8rem] md:h-[2.5rem] lg:h-[3rem] xl:w-[9rem] xl:h-[3.2rem] new-xl:h-[2.8rem] 2xl:w-[9rem] 2xl:h-[2.5rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#56A430] flex justify-center items-center gap-[0.5rem] text-[#fff] shadow-explore-by-seller-button uppercase">
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
            className={`new-sm:w-[12rem] new-sm:h-[3rem] md:h-[3.5rem] 2xl:w-[14.875rem] 2xl:h-[4.0625rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#FFFFFF] text-[#697F75] new-sm:text-[1rem] 2xl:text-[1.22669rem] font-medium uppercase font-[Poppins] ${state.disableLoadMoreSellers ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleLoadMoreSellerData}
            disabled={state.disableLoadMoreSellers}
          >
            Load more sellers
          </button>
        </div>
      </div>
    );
  }
});
