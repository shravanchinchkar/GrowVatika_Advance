import axios from "axios";
import Image from "next/image";
import Skeleton from "@repo/ui/loading";
import { useSearchParams } from "next/navigation";
import { SellerProductData, TSingleProductData } from "@repo/common-types";
import { memo, useCallback, useEffect, useReducer, useState } from "react";
import {
  useAddToCard,
  usefilterProductByCategoryStore,
} from "@repo/shared-store";
import toast from "react-hot-toast";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";

type SingleProductDataState = {
  error: boolean;
  loading: boolean;
  productData: SellerProductData | null;
  productQuantity: number;
  loadingAddToCart: boolean;
  disablePlusButton: boolean;
  singleProductData: TSingleProductData | null;
};

enum DirectionType {
  LEFT = "left",
  RIGHT = "right",
}

type LeftRigthArrowProps = {
  direction: string;
};

type TAvailablePotSizeandPrice = {
  sizeandPrice: string;
  approxSize: string;
  tag?: string;
};

type PlusMinusButtonProp = {
  src: string;
  conditionalStyle: string | boolean;
  alt: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type TNurseryCardButton = {
  imagePath: string;
  buttonName: string;
};

type TNurseryCardProp = {
  pictureURL: string;
  nurseryName: string;
  nurseryAddress: string;
};

const NurseryCardButton: TNurseryCardButton[] = [
  {
    imagePath: "/assets/images/SingleProductImage/visitStoreIcon.svg",
    buttonName: "Visit Store",
  },
  {
    imagePath: "/assets/images/SingleProductImage/contactIcon.svg",
    buttonName: "Contact",
  },
];

// Left-Right arrow component
const LeftRightArrow = memo(({ direction }: LeftRigthArrowProps) => {
  return (
    <button
      className={`new-sm:w-[2.2rem] new-sm:h-[3.2rem] md:w-[2.5rem] md:h-[4rem] lg:h-[5rem] xl:w-[3rem] xl:h-[6rem] 2xl:w-[3.4rem] 2xl:h-[6.75rem] flex justify-center items-center bg-[#56A430] cursor-not-allowed ${direction === DirectionType.RIGHT ? "rounded-r-full" : "rounded-l-full"}`}
      disabled={true}
    >
      <div
        className={`relative new-sm:w-[1.2rem] new-sm:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] xl:w-[1.7rem] xl:h-[1.7rem] 2xl:w-[2.25rem] 2xl:h-[2.25rem]
            ${direction === DirectionType.RIGHT && "rotate-180"}`}
      >
        <Image
          src={"/assets/images/SingleProductImage/leftSlideIcon.svg"}
          alt="slideIcon"
          fill
          className="object-contain"
        />
      </div>
    </button>
  );
});

// Like Share button Component
const LikandShare = memo(({ src }: { src: string }) => {
  return (
    <button className=" new-sm:w-[14%] new-sm-1:w-[12%] md:w-[14%] 2xl:w-[10%] new-sm:h-[2.3125rem] md:h-[2.5rem] 2xl:h-[3.1875rem] border border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-center">
      <div className="relative  new-sm:w-[1.3rem] new-sm:h-[1.3rem] lg:w-[1.5rem] lg:h-[1.5rem] 2xl:w-[1.8rem] 2xl:h-[1.8rem]">
        <Image src={src} alt="like" fill className="object-cover" />
      </div>
    </button>
  );
});

// Plus Minus Button Component
const PlusMinusButton = memo(
  ({ conditionalStyle, src, alt, disabled, onClick }: PlusMinusButtonProp) => {
    return (
      <button
        className={`new-sm:w-[1.21806rem] new-sm:h-[1.21806rem] new-sm-1:w-[1.5rem] new-sm-1:h-[1.5rem] 2xl:w-[2.125rem] 2xl:h-[2.125rem] flex items-center justify-center ${conditionalStyle}`}
        disabled={disabled}
        onClick={onClick}
      >
        <div className="relative new-sm:w-[0.5rem] new-sm:h-[0.5rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]">
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      </button>
    );
  }
);

// Nursry Card Component
const NurseryCard = memo(
  ({ pictureURL, nurseryName, nurseryAddress }: TNurseryCardProp) => {
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center bg-[#FFF6F4] rounded-[0.625rem]">
        <div className="w-[95%] h-[90%] flex flex-col new-sm:justify-between bg-[#FFFFFF] rounded-[0.625rem] new-sm:p-[0.5rem] md:p-[1rem]">
          {/* Nursery photo and details */}
          <div className="new-sm:h-[50%] md:h-[60%] flex justify-between">
            {/* Nursery Image */}
            <div className="relative new-sm:w-[4.2rem] new-sm:h-[4.2rem] new-sm-1:w-[4.5rem] new-sm-1:h-[4.5rem] new-sm-2:w-[5rem] new-sm-2:h-[5rem] new-sm-3:w-[6rem] new-sm-3:h-[6rem] md:w-[4.5rem] md:h-[4.5rem] xl:w-[5.5rem] xl:h-[5.5rem] 2xl:w-[6.3125rem] 2xl:h-[6.3125rem] rounded-[6.3125rem] overflow-hidden">
              <Image
                src={pictureURL}
                alt="profil"
                className="object-cover"
                fill
              />
            </div>

            {/* Nursery Details */}
            <div className="new-sm:w-[70%] new-sm-2:w-[75%] md:w-[75%] lg:w-[70%] flex flex-col justify-around">
              {/* Nursery Name and verify badge */}
              <div className="flex items-center justify-between">
                <h1 className="new-sm:text-[0.875rem] new-sm-1:text-[1.1rem] lg:text-[1rem] xl:text-[1.3rem] 2xl:text-[1.5rem] text-[#171717] font-semibold leading-none">
                  {nurseryName}
                </h1>
                <div className="relative new-sm:w-[1.08825rem] new-sm:h-[1.08825rem] md:w-[1.2rem] md:h-[1.2rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]">
                  <Image
                    src={"/assets/images/SingleProductImage/verifyIcon.svg"}
                    alt="verify"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>

              {/* Nursery Location and rating */}
              <div className="flex items-center new-sm:justify-around new-sm-3:justify-between md:justify-around">
                {/* Nursery Location */}
                <div className="flex items-center gap-[0.5rem] new-sm:text-[0.6rem] new-sm-1:text-[0.8rem] md:text-[0.9rem] 2xl:text-[1rem] text-[#697F75] font-medium">
                  <div className="relative new-sm:w-[1.2rem] new-sm:h-[1.2rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]">
                    <Image
                      src="/assets/images/SingleProductImage/locationIcon.svg"
                      alt="Location"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {`${nurseryAddress} |`}
                </div>

                {/* Nursery rating */}
                <div className="flex items-center text-[#697F75] font-medium new-sm:text-[0.75rem] md:text-[1.22669rem]">
                  <div className="relative new-sm:w-[0.88913rem] new-sm:h-[0.88913rem] md:w-[1rem] md:h-[1rem] 2xl:w-[1.375rem] 2xl:h-[1.375rem]">
                    <Image
                      src="/assets/images/SingleProductImage/ratingIcon.svg"
                      alt="Star"
                      fill
                      className="object-cover"
                    />
                  </div>
                  0
                </div>
              </div>
            </div>
          </div>

          {/* Visit store and contact button */}
          <div className="flex items-end gap-[0.5rem] w-[100%] new-sm:h-[40%] md:h-[40%] lg:h-[50%] 2xl:h-[40%] new-sm:text-[0.75rem]  new-sm-1:text-[0.9rem] md:text-[1.1rem] xl:text-[1.2rem] 2xl:text-[1.22669rem] text-[#171717] font-medium">
            {NurseryCardButton.map((item, index) => {
              return (
                <button
                  key={index}
                  className="flex new-sm:justify-center new-sm:gap-[1rem] md:gap-0 md:justify-evenly items-center w-[50%] new-sm:h-[80%] 2xl:h-[70%] rounded-[0.625rem] border-[1.6px] border-[#CBD0D3]"
                >
                  <div className="relative new-sm:w-[0.9375rem] new-sm:h-[0.9375rem] new-sm-1:w-[1rem] new-sm-1:h-[1rem] md:w-[1.5rem] md:h-[1.5rem] 2xl:w-[1.53806rem] 2xl:h-[1.53806rem]">
                    <Image
                      src={item.imagePath}
                      alt="Contact"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {item.buttonName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

const reducer = (
  state: SingleProductDataState,
  action: any
): SingleProductDataState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, loading: false, error: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        singleProductData: action.payload.productData,
        loading: false,
      };
    case "DISABLED_PLUS_BUTTON":
      return { ...state, disablePlusButton: false };
    case "DECREASE_PRODUCT_QUANTITY":
      return { ...state, productQuantity: state.productQuantity - 1 };
    case "INCREASE_PRODUCT_QUANTITY":
      return { ...state, productQuantity: state.productQuantity + 1 };
    case "ENABLE_PLUS_BUTTON":
      return { ...state, disablePlusButton: true };
    case "SET_PRODUCT_DATA":
      return { ...state, productData: action.payload.addToCartData };
    case "SET_AddToCart_Loading":
      return { ...state, loadingAddToCart: true };
    case "SET_AddToCart_Loading_False":
      return { ...state, loadingAddToCart: false };
    default:
      return state;
  }
};

export const SingleProductCard = () => {
  const searchParams = useSearchParams();
  const productId: string = searchParams.get("id") || "";

  // following is the useReducer hook
  const [state, dispatch] = useReducer<SingleProductDataState, any>(reducer, {
    error: false,
    loading: true,
    productData: null,
    productQuantity: 1,
    loadingAddToCart: false,
    singleProductData: null,
    disablePlusButton: false,
  });

  // Following are the zustand state
  const { setCategory } = usefilterProductByCategoryStore();
  const { addNewProduct } = useAddToCard();

  // call to backend to fetch single product data
  useEffect(() => {
    const getSingleProductData = async () => {
      dispatch({ type: "LOADING" });
      const res = await axios.get(`api/getsingleproductdata?id=${productId}`); //api call
      if (!res.data.success) {
        dispatch({ type: "ERROR" });
        return;
      }
      const { seller, ...prodData } = res.data.productData;
      dispatch({
        type: "SET_PRODUCT_DATA",
        payload: {
          addToCartData: prodData,
        },
      });

      const beProductData = res.data.productData;
      setCategory(beProductData.category);
      const transformData = {
        ...beProductData,
        price: beProductData.price ? Number(beProductData.price) : 0,
        compareAt: beProductData.compareAt
          ? Number(beProductData.compareAt)
          : 0,
        productSize: beProductData.productSize
          ? Number(beProductData.productSize)
          : 0,
        productQuantity: beProductData.productQuantity
          ? Number(beProductData.productQuantity)
          : 0,
      };
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          productData: transformData,
        },
      });
    };
    if (!productId) {
      return;
    } else {
      getSingleProductData();
    }
    return () => setCategory("All");
  }, [productId]);

  // Following are the functions

  const percentageoff = useCallback((compareAt: number, price: number) => {
    if (compareAt === 0) {
      return 0;
    } else {
      return Math.round(((compareAt - price) / compareAt) * 100);
    }
  }, []);

  const inchesToFeetRange = useCallback((inches: number) => {
    const exactFeet = inches / 12;
    const lowerFeet = Math.max(1, Math.floor(exactFeet));
    const upperFeet = Math.max(lowerFeet + 1, Math.ceil(exactFeet));
    return `${lowerFeet}-${upperFeet} feet`;
  }, []);

  const handleAddToCart = (e: any, addToCartData: any) => {
    dispatch({ type: "SET_AddToCart_Loading" });
    addNewProduct(addToCartData);
    setTimeout(() => {
      dispatch({ type: "SET_AddToCart_Loading_False" });
      toast.success("Product Added to Cart", toastStyle);
    }, 500);
  };

  //Following are the function call

  const disCount = percentageoff(
    Number(state.singleProductData?.compareAt),
    Number(state.singleProductData?.price)
  );
  const sizeInFeet = inchesToFeetRange(
    Number(state.singleProductData?.productSize)
  );

  // Following are objects of type array
  const DummyNavigation: string[] = [
    "Home",
    `${state.singleProductData?.category}`,
    `${state.singleProductData?.collection}`,
    `${state.singleProductData?.name || "Product Name"}`,
  ];

  const ProductImages: string[] = [
    "/assets/images/ExploreBySellerImages/ImagePlaceholder.jpg",
    `${state.singleProductData?.imageURL || "/assets/images/SingleProductImage/productImage.jpg"}`,
    "/assets/images/ExploreBySellerImages/ImagePlaceholder.jpg",
  ];

  const AvailablePotSizeandPrice: TAvailablePotSizeandPrice[] = [
    {
      sizeandPrice: `${state.singleProductData?.productSize}" Pot - ₹ ${state.singleProductData?.price}`,
      approxSize: sizeInFeet,
      tag: "Best Value",
    },
  ];

  if (!productId || state.error) {
    return (
      <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem] text-[#CBD0D3] uppercase text-[1.5rem]">
        No Product Data found
      </div>
    );
  }
  if (state.loading) {
    return <Skeleton className="flex justify-center items-center" />;
  } else {
    return (
      <div className="new-sm:w-[100%] new-sm:h-[90rem] new-sm-1:h-[110rem] new-sm-3:h-[115rem] md:h-[65rem] lg:h-[65rem] xl:h-[70rem] 2xl:h-[78.8125rem] flex flex-col new-sm:gap-[1rem] md:gap-[2rem] items-center bg-[#FFFFFF] rounded-[0.94rem] font-[Poppins] pb-[1rem]">
        {/* Top Div Dummy Navigation */}
        <div className="w-[100%] new-sm:min-h-[2%] md:min-h-[4%] max-h-max flex items-center gap-[1rem] new-sm:pl-[1rem] md:pl-[1rem] new-sm:text-[0.6rem] new-sm-1:text-[0.7625rem] md:text-[1rem] xl:text-[1.25rem] font-medium border-b-[0.0625rem] border-[#00000033]">
          {DummyNavigation.map((item, index) => {
            return (
              <div
                className={`flex items-center justify-between new-sm:gap-[0.2rem] md:gap-[1rem] ${index !== 3 ? "text-[#697F75]" : "text-[#171717]"}`}
                key={index}
              >
                {item}
                {index !== 3 && (
                  <div className="relative w-[0.6875rem] h-[0.6875rem]">
                    <Image
                      src={
                        "/assets/images/SingleProductImage/rightArrowIcon.svg"
                      }
                      alt="arrow"
                      className="object-contain"
                      fill
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Middle div consist of prod images and data */}
        <div className="w-[100%] new-sm:h-[55%] new-sm-1:h-[60%] new-sm-3:h-[70%] sm:h-[80%] md:h-[50%] new-md:h-[75%] lg:h-[65%] xl:h-[75%] flex new-sm:flex-col new-sm:gap-[1rem] md:gap-0 md:flex-row">
          {/* Left div Product Images */}
          <div className="new-sm:w-[100%] md:w-[55%] xl:w-[60%] new-sm:h-[50%] new-sm-1:h-[50%] new-sm-3:h-[60%] sm:h-[75%] md:h-[100%] flex flex-col new-sm:justify-start lg:justify-between new-sm:gap-[0.5rem] md:gap-[1rem] lg:gap-0 items-center">
            {/* Main Product image */}
            <div className="new-sm:w-[95%] md:w-[90%] xl:w-[78%] new-sm:h-[70%] md:h-[70%] p-[1rem] bg-[#FFF6F4] rounded-[0.625rem] flex justify-center">
              <div className="relative new-sm:w-[100%] new-sm:h-[100%] border-[1px] border-[#00000033] rounded-[0.625rem] overflow-hidden">
                <Image
                  src={`${state.singleProductData?.imageURL || "/assets/images/ExploreBySellerImages/ImagePlaceholder.jpg"}`}
                  alt="productImage"
                  className="object-cover"
                  fill
                />
                <div className="absolute top-0 left-0 w-[50%] h-[100%] new-sm:px-[0.8rem] md:px-[1.2rem] new-sm:py-[0.8rem] md:py-[1rem]">
                  <h1 className="new-sm:w-[5rem] new-sm-1:w-[6rem] lg:w-[8rem] lg:h-[2.5rem] 2xl:w-[9.8125rem] 2xl:h-[3.0625rem] flex justify-center items-center text-[#FFFFFF] new-sm:text-[0.7rem] new-sm-1:text-[1rem] lg:text-[1.2rem] 2xl:text-[1.5rem] font-semibold rounded-[5.25rem] bg-[#56A430] capitalize">
                    {`-${disCount ? disCount : "25"}% off`}
                  </h1>
                </div>

                <div className="absolute top-0 right-0 w-[50%] h-[100%] flex justify-end new-sm:p-[0.8rem] md:px-[1.2rem] md:py-[1rem]">
                  <p className="new-sm:w-[5rem] new-sm-1:w-[6rem] lg:w-[8rem] 2xl:w-[9.625rem] h-[1.625rem] flex justify-center items-center rounded-[5.25rem] bg-[#7FB819] text-[#FFFFFF] new-sm:text-[0.6rem] new-sm-1:text-[0.7rem] lg:text-[0.8rem] 2xl:text-[1rem] font-semibold">
                    {state.singleProductData?.tags || "Best Seller"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="new-sm:w-[100%] md:w-[78%] h-[3%] flex justify-center items-center">
              <div className="new-sm:w-[25%] new-sm-3:w-[20%] 2xl:w-[10%] h-[100%] flex items-center justify-between">
                {[...Array(4)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[0.75rem] h-[0.75rem] bg-[#CBD0D3] rounded-full"
                    ></div>
                  );
                })}
              </div>
            </div>

            {/* Sliding Images */}
            <div className="new-sm:w-[100%] md:w-[100%] new-sm:h-[22%] md:h-[22%] lg:h-[25%] flex justify-center items-center">
              {/* Left Button */}
              <LeftRightArrow direction={DirectionType.LEFT} />

              {/* Product Images */}
              <div className="new-sm:w-[90%] md:w-[100%] lg:w-[78%] h-[100%] flex items-center justify-evenly bg-[#FFF6F4] rounded-[0.9375rem]">
                {ProductImages.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-[29%] h-[80%] rounded-[0.625rem] border-[1.6px] border-[#FFFFFF] overflow-hidden"
                    >
                      <Image
                        src={item}
                        alt="prodImage"
                        className="object-cover"
                        fill
                      />
                    </div>
                  );
                })}
              </div>

              {/* Right button */}
              <LeftRightArrow direction={DirectionType.RIGHT} />
            </div>
          </div>

          {/* Right */}
          <div className="new-sm:w-[100%] md:w-[45%] xl:w-[40%] new-sm:h-[50%] new-sm-1:h-[50%] new-sm-3:h-[40%] sm:h-[40%] md:h-[100%] flex flex-col new-sm:justify-between md:justify-start lg:justify-between md:gap-[2rem] lg:gap-0 new-sm:pl-[1rem] md:pl-[1rem] xl:pl-0">
            {/* Prod Name, Pot Info, Prod Rating and review */}
            <div>
              {/* Product Name */}
              <h1 className="text-[#000000] new-sm:text-[1rem] new-sm-1:text-[1.5rem] md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] capitalize font-semibold">
                {state.singleProductData?.name || "Product Name"}
              </h1>

              {/* Pot Size available */}
              <p className="new-sm:text-[0.75rem] new-sm-1:text-[0.9rem] xl:text-[1.2rem] 2xl:text-[1.5rem] text-[#697F75] font-medium">
                {`Pot - ${state.singleProductData?.productSize || 'Strelitzia Nicolai - 10" Premium Pot'}" Premium Pot`}
              </p>

              {/* Product Stars and Product review */}
              <div className="flex gap-[1rem] new-sm:text-[0.625rem] new-sm-1:text-[1rem] 2xl:text-[1.22669rem]">
                <div className="flex items-center gap-[0.2rem] text-[#171717] font-normal">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <div
                        className="relative new-sm:w-[0.88913rem] new-sm:h-[0.88913rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]"
                        key={index}
                      >
                        <Image
                          src={`/assets/images/SingleProductImage/whiteStarIcon.svg`}
                          alt="Star"
                          fill
                          className="object-contain"
                        />
                      </div>
                    );
                  })}
                  0
                </div>
                <p className="text-[#CBD0D3] font-medium">(0 reviews)</p>
              </div>
            </div>

            {/* Prod Price,CompareAt Price, Discound and shipping details */}
            <div className="flex flex-col gap-[0.5rem]">
              <div className="flex items-center gap-[1rem]">
                <h1 className="new-sm:text-[1rem] new-sm-1:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] text-[#56A430] font-semibold">
                  {`₹ ${state.singleProductData?.price}`}
                </h1>
                <h3 className="new-sm:text-[0.625rem] new-sm-1:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.25rem] text-[#697F75] font-normal line-through">
                  {`₹ ${state.singleProductData?.compareAt}`}
                </h3>
                <div className="new-sm:w-[4.26025rem] new-sm:h-[1.44481rem] new-sm-1:w-[6rem] new-sm-1:h-[2rem] 2xl:w-[7.1875rem] 2xl:h-[2.4375rem] bg-[#DBD5A4] new-sm:text-[0.625rem] new-sm-1:text-[0.8rem] xl:text-[0.9rem]  2xl:text-[1rem] text-[#56A430] font-semibold rounded-[5.25rem] flex items-center justify-center">
                  {`Save ${disCount ? disCount : "25%"}%`}
                </div>
              </div>
              <div className="flex items-center gap-[0.5rem] new-sm:text-[0.5625rem] new-sm-1:text-[0.8rem] 2xl:text-[0.9375rem] text-[#697F75] font-normal">
                <div className="relative new-sm:w-[0.8125rem] new-sm:h-[0.8125rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]">
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

            {/* Pot Size div */}
            <div className="new-sm:text-[0.75rem] new-sm-1:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.25rem] text-[#171717] font-medium">
              <h1>Choose Size:</h1>
              <div className="flex md:flex-col lg:flex-row gap-[0.5rem]">
                {AvailablePotSizeandPrice.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="new-sm:w-[45%] new-sm-1:max-w-[60%] new-sm-3:w-[35%] md:w-[60%] lg:w-[35%] new-sm:h-[4.30581rem] md:h-[5rem] 2xl:h-[5.9375rem] flex flex-col justify-center items-start border-[1.6px] rounded-[0.625rem] border-[#56A430] bg-[#DEFFE0] px-[0.5rem]"
                    >
                      <p>{item.sizeandPrice}</p>
                      <p className="md:text-[0.7rem] 2xl:text-[0.9375rem] text-[#697F75] font-normal">
                        {item.approxSize}
                      </p>
                      {item.tag && (
                        <p className="new-sm:w-[5.167rem]  new-sm:h-[1.17844rem] md:w-[6rem] 2xl:w-[7.125rem] h-[1.625rem] rounded-[5.25rem] bg-[#7FB819] flex justify-center items-center new-sm:text-[0.625rem] md:text-[0.7rem] 2xl:text-[0.875rem] text-[#FFFFFF] font-semibold">
                          {item.tag}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity,Add to cart and buy-now */}
            <div className="flex flex-col gap-[1rem]">
              <div className="flex gap-[1rem] items-center">
                <h1 className="new-sm:text-[0.75rem] new-sm-1:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.25rem] text-[#171717] font-medium">
                  Quantity:
                </h1>

                {/* Plus Minus */}
                <div className="flex w-max bg-[#FFF6F4] rounded-[0.3125rem]">
                  {/* Minus Button */}
                  <PlusMinusButton
                    src="/assets/images/SingleProductImage/minusIcon.svg"
                    alt="minusButton"
                    conditionalStyle={
                      state.productQuantity === 1 && "cursor-not-allowed"
                    }
                    disabled={state.productQuantity === 1 && true}
                    onClick={() => {
                      if (state.singleProductData?.productQuantity) {
                        if (state.disablePlusButton) {
                          dispatch({ type: "DISABLED_PLUS_BUTTON" });
                          // setDisablePlusButton(false);
                        }
                      }
                      dispatch({ type: "DECREASE_PRODUCT_QUANTITY" });
                      // setProductCount(productCount - 1);
                    }}
                  />

                  {/* Product Count */}
                  <div className="new-sm:w-[1.21806rem] new-sm:h-[1.21806rem] new-sm-1:w-[1.5rem] new-sm-1:h-[1.5rem] 2xl:w-[2.5rem] 2xl:h-[2.125rem] my-[0.1rem] flex items-center justify-center bg-white md:text-[1.1rem] 2lx:text-[1.22669rem] text-black">
                    {state.productQuantity}
                  </div>

                  {/*Plus Button */}
                  <PlusMinusButton
                    src="/assets/images/SingleProductImage/plusIcon.svg"
                    alt="PlusButton"
                    conditionalStyle={
                      state.disablePlusButton
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    disabled={state.disablePlusButton}
                    onClick={() => {
                      if (state.singleProductData?.productQuantity) {
                        if (
                          state.productQuantity ===
                          state.singleProductData.productQuantity
                        ) {
                          dispatch({ type: "ENABLE_PLUS_BUTTON" });
                          // setDisablePlusButton(true);
                        } else {
                          dispatch({ type: "INCREASE_PRODUCT_QUANTITY" });
                          // setProductCount((prevCount: number) => prevCount + 1);
                        }
                      }
                    }}
                  />
                </div>

                <div className="new-sm:text-[0.625rem] new-sm-1:text-[0.9rem] lg:text-[1rem] 2xl:text-[1.22669rem] text-[#CBD0D3] font-medium">
                  {`(${state.singleProductData?.productQuantity} available)`}
                </div>
              </div>

              {/* Add to cart,like and share button */}
              <div className="flex justify-start gap-[1rem]">
                {/* Add to cart */}
                <button
                  className="new-sm:w-[55%] 2xl:w-[60%] new-sm:h-[2.3125rem] md:h-[2.7rem] 2xl:h-[3.1875rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex items-center justify-center gap-[1rem] text-white new-sm:text-[0.75rem] new-sm-1:text-[1rem] lg:text-[1.1rem] 2xl:text-[1.22669rem] font-[Poppins]"
                  onClick={(e) => handleAddToCart(e, state.productData)}
                >
                  {state.loadingAddToCart ? (
                    <ButtonLoadingSign />
                  ) : (
                    <>
                      <div className="relative new-sm:w-[1.125rem] new-sm:h-[1.125rem] new-sm-1:w-[1.3rem] new-sm-1:h-[1.3rem] lg:w-[1.5rem] lg:h-[1.5rem] 2xl:w-[1.53806rem] 2xl:h-[1.50469rem]">
                        <Image
                          src="/assets/images/CommonImages/addToCartIcon.svg"
                          alt="cart"
                          className="object-cover"
                          fill
                        />
                      </div>
                      Add to Cart
                    </>
                  )}
                </button>
                {/* Like Product button */}
                <LikandShare src="/assets/images/SingleProductImage/heartIcon.svg" />
                {/* Share Product Button */}
                <LikandShare src="/assets/images/SingleProductImage/shareIcon.svg" />
              </div>

              {/* Buy-Now Button */}
              <button className="new-sm:w-[95%] lg:w-[85%] new-sm:h-[2.3125rem] md:h-[2.7rem] 2xl:h-[3.1875rem] border border-[#56A430] bg-white rounded-[0.625rem] text-[#56A430] new-sm:text-[0.75rem] new-sm-1:text-[1rem] lg:text-[1.1rem] 2xl:text-[1.22669rem] font-medium">
                Buy Now - Express Checkout
              </button>
            </div>

            {/* Nursery Card */}
            <div className="new-sm:hidden lg:block lg:w-[90%] 2xl:w-[85%] h-[25%]">
              <NurseryCard
                pictureURL={
                  state.singleProductData?.seller.profilePictureURL ||
                  "/assets/images/ExploreBySellerImages/ImagePlaceholder2.pn"
                }
                nurseryName={
                  state.singleProductData?.seller.nurseryName ||
                  "Evergreen Gardens"
                }
                nurseryAddress={
                  state.singleProductData?.seller.address || "Katraj, Pune |"
                }
              />
            </div>
          </div>
        </div>

        {/* Product about section */}
        <div className="w-[100%] new-sm:h-[43%] new-sm-3:h-[30%] md:h-[50%] lg:h-[20%] flex flex-col new-sm:justify-between lg:justify-start items-center gap-[1rem] md:pb-[1rem] lg:pb-0">
          <div className="flex flex-col items-center">
            <h1 className="new-sm:text-[1rem] new-sm-1:text-[1.5rem] 2xl:text-[2rem] text-[#000000] font-semibold">
              About Product
            </h1>
            {/* Product Description */}
            <p className="text-[#171717] new-sm:text-[0.75rem] new-sm-1:text-[1rem] lg:text-[1rem] 2xl:text-[1.25rem] font-normal text-center new-sm:px-[1rem] md:px-[2rem] lg:px-[3.5rem]">
              {state.singleProductData?.description}
            </p>
          </div>

          {/* Nursery Card  displayed in md and new-md hidden from lg*/}
          <div className="new-sm:block lg:hidden new-sm:w-[95%] new-sm:h-[25%] new-sm-1:h-[25%] new-sm-3:h-[40%] md:w-[55%] new-md:w-[50%] md:h-[40%] new-md:h-[50%]">
            <NurseryCard
              pictureURL={
                state.singleProductData?.seller.profilePictureURL ||
                "/assets/images/ExploreBySellerImages/ImagePlaceholder2.pn"
              }
              nurseryName={
                state.singleProductData?.seller.nurseryName ||
                "Evergreen Gardens"
              }
              nurseryAddress={
                state.singleProductData?.seller.address || "Katraj, Pune |"
              }
            />
          </div>
        </div>
      </div>
    );
  }
};
