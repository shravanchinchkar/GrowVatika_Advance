"use client";

import axios from "axios";
import Image from "next/image";
import Skeleton from "@repo/ui/loading";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";

type NurseryDataType = {
  imageURL: string;
  name: string;
  productSizeVariant: [
    {
      price: string;
      compareAt: string;
      quantity: string;
    },
  ];
};

type SingleNurseryDetailsTyes = {
  productsData: NurseryDataType[];
  loading: boolean;
  selectedCategory: string;
  nurseryName: string;
  error: string;
};

const reducer = (
  state: SingleNurseryDetailsTyes,
  action: any
): SingleNurseryDetailsTyes => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        productsData: action.payload.productsData,
        nurseryName: action.payload.nurseryName,
        loading: action.payload.loading,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        nurseryName: action.payload.nurseryName,
      };
    case "CHANGE_CATEGORY":
      return { ...state, selectedCategory: action.payload.selectedCategory };
    default:
      return state;
  }
};

export const SingleNurseryDetails = () => {
  const params = useParams();
  const nurseryId = params["nurseryId"];

  const [state, dispatch] = useReducer<SingleNurseryDetailsTyes, any>(reducer, {
    loading: true,
    productsData: [],
    selectedCategory: "All",
    nurseryName: "Loading...",
    error: "",
  });

  useEffect(() => {
    const getProductData = async () => {
      try {
        dispatch({ type: "LOADING" });
        const res = await axios.get(
          `/api/admin/getnurseryproductsdata?nurseryId=${nurseryId}&category=${state.selectedCategory}`
        );
        if (!res.data.success) {
          dispatch({
            type: "FETCH_ERROR",
            payload: {
              loading: false,
              error: res.data.error,
              nurseryName: res.data.nurseryName,
            },
          });
        }
        if (res.data.success && res.data.productData && res.data.nurseryName) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              productsData: res.data.productData,
              nurseryName: res.data.nurseryName,
              loading: false,
            },
          });
        }
      } catch (error: any) {
        console.log(
          "error while getting products data:",
          error.response.data.error
        );
        if (error.response.data.error) {
          dispatch({
            type: "FETCH_ERROR",
            payload: {
              loading: false,
              error: error.response.data.error,
              nurseryName: error.response.data.nurseryName,
            },
          });
        }
      }
    };
    getProductData();
  }, [state.selectedCategory]);

  const categotyButtonStyle =
    "w-[15%] h-[100%] flex justify-around items-center bg-[#FFFFFF] text-[1.22669rem] text-[#171717] font-poppins font-medium rounded-[0.3125rem] cursor-pointer capitalize outline-none";
  const categoryButton = ["All", "Plants", "Pots", "Soil", "Fertilizers"];
  return (
    <div className="w-[90%] h-[90%] flex flex-col gap-[1rem] items-center">
      {/* Nursery Name */}
      <div className="w-[100%] flex justify-center gap-[0.5rem] text-[2rem] font-unbounded">
        <label>Nursery Name:</label>
        <h1>{state.nurseryName}</h1>
      </div>

      {/* Categoty Buttons */}
      <div className="w-[100%] h-[10%] flex justify-between gap-[0.5rem]">
        {categoryButton.map((item, index) => {
          return (
            <button
              key={index}
              className={`${categotyButtonStyle} ${state.selectedCategory === item && "shadow-admindashboard-button-boxShadow"}`}
              onClick={() =>
                dispatch({
                  type: "CHANGE_CATEGORY",
                  payload: { selectedCategory: item },
                })
              }
            >
              {item}
            </button>
          );
        })}
      </div>
      {state.error ? (
        <div className="w-[90%] h-[90%] flex justify-center items-center">
          <h1 className="text-[#CBD0D3] uppercase text-[1.5rem]">
            {state.error}
          </h1>
        </div>
      ) : state.loading ? (
        <Skeleton />
      ) : (
        <div className="w-[100%] h-[80%] grid grid-cols-[50%_50%] font-poppins overflow-y-auto border-[2px] rounded-[1.25rem] bg-[#FFFFFF] shadow-admindashboard-button-boxShadow">
          {state.productsData.map((item, index) => {
            return (
              <div className="w-[100%] p-[0.5rem]" key={index}>
                <div className="w-[100%] h-[10rem] flex items-center gap-[1rem] bg-[#ffffff] px-[0.5rem] rounded-[1.5625rem] shadow-admindashboard-button-boxShadow">
                  <div className="relative w-[20%] h-[90%] rounded-[1.5625rem] overflow-hidden">
                    <Image
                      src={
                        item.imageURL
                          ? item.imageURL
                          : "/assets/images/Common/ImagePlaceholder2.png"
                      }
                      alt="product_image"
                      className="object-cover"
                      fill
                    />
                  </div>

                  <div className="w-[80%] h-[90%] flex flex-col justify-between text-[1.22669rem] text-[#171717]">
                    <div className="flex gap-[1rem]">
                      <label>Product Name:</label>
                      <h2 className="font-medium">{item.name}</h2>
                    </div>

                    <div className="flex gap-[0.5rem]">
                      <label>Product Actual Price:</label>
                      <h2 className="font-medium">{`₹ ${item.productSizeVariant[0].compareAt}`}</h2>
                    </div>

                    <div className="flex gap-[0.5rem]">
                      <label>Product Discount Price:</label>
                      <h2 className="font-medium">{`₹ ${item.productSizeVariant[0].price}`}</h2>
                    </div>

                    <div className="flex gap-[0.5rem]">
                      <label>Product In Stock:</label>
                      <h2 className="font-medium">{`${item.productSizeVariant[0].quantity} available`}</h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
