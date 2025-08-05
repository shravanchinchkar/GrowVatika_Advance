"use client";

import axios from "axios";
import Image from "next/image";
import Skeleton from "@repo/ui/loading";
import { useRouter } from "next/navigation";
import { ProductCard } from "./product-card";
import { useSearchParams } from "next/navigation";
import {
  useFilterProduct,
  usefilterProductByCategoryStore,
} from "@repo/shared-store";
import { SellerProductData } from "@repo/common-types";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

// ProductState type
interface ProductState {
  productsData: SellerProductData[];
  loading: boolean;
  totalProductsCount: number | undefined;
  totalPages: number;
  pageNotFound: boolean;
  error: string | null;
}

// PaginationState type
interface PaginationState {
  currentPage: number;
  filterCurrentPage: number;
  categoryCurrentPage: number;
}

// reducer function
const productReducer = (state: ProductState, action: any): ProductState => {
  switch (action.type) {
    case "PAGE_NOT_FOUND":
      return { ...state, loading: false, pageNotFound: true };
    case "LOADING":
      return { ...state, loading: true };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        pageNotFound: true,
        error: action.payload,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        productsData: action.payload.productsdata,
        totalProductsCount: action.payload.totalProductsCount,
        totalPages: action.payload.totalPages,
        pageNotFound: false,
        error: null,
      };
    default:
      return state;
  }
};

// Custom hook that fetch the Product data from the BE
const useFetchProductData = () => {
  // Following block execute if the filter array consist of elements
  const fetchFilteredProducts = useCallback(
    async (filter: string[], page: number) => {
      const encodedFilter = encodeURIComponent(JSON.stringify(filter));
      const res = await axios.get(
        `api/getfilterproductdata?filter=${encodedFilter}&page=${page}`
      );
      return res.data;
    },
    []
  );

  //Following block execute by default and for category filter
  const fetchAllProducts = useCallback(
    async (page: number, category: string) => {
      const res = await axios.get(
        `api/getallproducts?page=${page}&category=${category}`
      );
      return res.data;
    },
    []
  );

  return { fetchFilteredProducts, fetchAllProducts };
};

export const ProductCatalogGrid = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsPage = searchParams.get("page");

  //useState hook
  const [likeProduct, setLikeProduct] = useState(false);

  // Use useReducer hook instead of useState hook
  const [productState, dispatch] = useReducer<ProductState, any>(
    productReducer,
    {
      //Initial State of productState
      productsData: [],
      loading: true,
      totalProductsCount: 0,
      totalPages: 0,
      pageNotFound: false,
      error: null,
    }
  );

  // State for different Pages.
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage:
      typeof searchParamsPage === "string" ? Number(searchParamsPage) : 1,
    filterCurrentPage: 1,
    categoryCurrentPage: 1,
  });

  // call to the custom hook
  const { fetchAllProducts, fetchFilteredProducts } = useFetchProductData();

  // Following are the zustand state management code
  const { filter } = useFilterProduct();
  const { category } = usefilterProductByCategoryStore();

  const currentEffectivePage = useMemo(() => {
    if (filter.length > 0) return paginationState.filterCurrentPage;
    if (category !== "All") return paginationState.categoryCurrentPage;
    return paginationState.currentPage;
  }, [filter.length, category, paginationState]);

  //Following code helps to display page number at the bottom
  const pageNumbers = useMemo(() => {
    let pageNumber: number[] = [];
    const start = Math.max(1, currentEffectivePage - 3);
    const end = Math.min(productState.totalPages, currentEffectivePage + 3);

    for (let i = start; i <= end; i++) {
      pageNumber.push(i);
    }
    return pageNumber;
  }, [currentEffectivePage, productState.totalPages]);

  // Call to the backend
  useEffect(() => {
    // check if the page count is less than 1 ?
    if (paginationState.currentPage < 1) {
      dispatch({ type: "PAGE_NOT_FOUND" });
      return;
    }

    dispatch({ type: "LOADING" }); // dispatch function pass an action to the reducer function in this case productReducer function

    const fetchData = async () => {
      try {
        let page;
        let response;

        // Execute the following below block is filters are present
        if (filter.length > 0) {
          page = paginationState.filterCurrentPage;
          response = await fetchFilteredProducts(filter, page);
        } else {
          page =
            category !== "All"
              ? paginationState.categoryCurrentPage
              : paginationState.currentPage;
          response = await fetchAllProducts(page, category);
        }

        if (!response.success) {
          dispatch({ type: "FETCH_ERROR", payload: "Fail to fetch products" });
          return;
        }

        const productsdata =
          filter.length > 0 ? response.filterProduct : response.productsData;
        const totalProductsCount =
          filter.length > 0
            ? response.totalFilterProductCount
            : response.totalProductsCount;
        const totalPages = response.totalPages;

        if (page > totalPages) {
          dispatch({ type: "PAGE_NOT_FOUND" });
          return;
        }

        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            productsdata,
            totalProductsCount,
            totalPages,
          },
        });
      } catch (error) {
        console.error("Error while fetching product data:", error);
        dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch products" });
      }
    };

    fetchData();
  }, [
    paginationState.currentPage,
    paginationState.filterCurrentPage,
    paginationState.categoryCurrentPage,
    filter,
    category,
    fetchAllProducts,
    fetchFilteredProducts,
  ]);

  useEffect(() => {
    const page = currentEffectivePage;
    router.push(`/explore?page=${page}`);
  }, [currentEffectivePage, router]);

  const handlePageNumber = useCallback(
    (newPage: number) => {
      setPaginationState((prev) => {
        if (filter.length > 0) {
          return { ...prev, filterCurrentPage: newPage };
        } else if (category !== "All") {
          return { ...prev, categoryCurrentPage: newPage };
        } else {
          // { ...prev, currentPage: newPage }
          return { ...prev, currentPage: newPage };
        }
      });
    },
    [filter.length, category]
  );

  const handlePrevPage = useCallback(() => {
    const prev = currentEffectivePage - 1;
    if (prev >= 1) {
      handlePageNumber(prev);
    }
  }, [currentEffectivePage, handlePageNumber]);

  const handleNextPage = useCallback(() => {
    const nextPage = currentEffectivePage + 1;
    if (nextPage <= productState.totalPages) {
      handlePageNumber(nextPage);
    }
  }, [currentEffectivePage, productState.totalPages, handlePageNumber]);

  const handleLikeProduct = () => {
    if (!likeProduct) {
      setLikeProduct(true);
    } else {
      setLikeProduct(false);
    }
  };

  // If Loading then execute the following below block
  if (productState.loading) {
    return (
      <Skeleton className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem]" />
    );
  }
  if (productState.pageNotFound || productState.productsData.length === 0) {
    return (
      <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem] text-[#CBD0D3] uppercase text-[1.5rem]">
        No Product Data found
      </div>
    );
  } else {
    return (
      <div className="w-[100%] flex flex-col gap-[1rem] pb-[1rem]">
        {/* Count of the products */}
        <div className="w-max md:text-[1.2rem] new-md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#000] 2xl:ml-[1.3rem] font-semibold">
          {`${productState.totalProductsCount} Products Available`}
        </div>

        {/* Product Card  */}
        <div className="min-h-[60rem] max-h-max grid md:grid-cols-2 new-xl:grid-cols-3 gap-8">
          {productState.productsData.map((item: SellerProductData) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                imageURL={item.imageURL}
                collection={item.collection}
                compareAt={item.compareAt}
                handleLikeProduct={handleLikeProduct}
                likeProduct={likeProduct}
                name={item.name}
                price={item.price}
                productSize={item.productSize}
                tags={item.tags}
              />
            );
          })}
        </div>

        {/*  Page Navigation */}
        <div className="w-[95%] mx-[1.5rem] flex justify-center mt-[4rem]">
          <div className="min-w-[20%] max-w-max flex justify-between gap-[0.5rem]">
            {/* Previous Page Button */}

            {currentEffectivePage > 1 ? (
              // Show the below button if the current page is greater than 1
              <button
                onClick={() => {
                  handlePrevPage();
                }}
                className="w-[3.1875rem] h-[3.1875rem] flex justify-center items-center bg-[#FFFFFF] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem]"
              >
                <div className="relative w-[1rem] h-[1rem]">
                  <Image
                    src={
                      "/assets/images/ExploreImages/navigationIconActive.svg"
                    }
                    alt="navIcon"
                    fill
                    className="object-contain rotate-180"
                  />
                </div>
              </button>
            ) : (
              // disabled the button if the current page is 1
              <button
                className="w-[3.1875rem] h-[3.1875rem] flex justify-center items-center bg-[#FFFFFF] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] cursor-not-allowed"
                disabled
              >
                <div className="relative w-[1rem] h-[1rem]">
                  <Image
                    src={"/assets/images/ExploreImages/navigationIcon.svg"}
                    alt="navIcon"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            )}

            {pageNumbers.map((page, index) => {
              return (
                <button
                  onClick={() => {
                    handlePageNumber(page);
                  }}
                  key={index}
                  className={`w-[3.1875rem] h-[3.1875rem] text-[1.22669rem] flex justify-center items-center border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] ${currentEffectivePage === page ? "bg-[#EDE7E4]" : "bg-[#FFFFFF]"}`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Page Button */}

            {currentEffectivePage === productState.totalPages ? (
              // disabled if the currentPage is equal to total number of pages
              <button
                className="w-[3.1875rem] h-[3.1875rem] flex justify-center items-center bg-[#FFFFFF] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] cursor-not-allowed"
                disabled
              >
                <div className="relative w-[1rem] h-[1rem] rotate-180">
                  <Image
                    src={"/assets/images/ExploreImages/navigationIcon.svg"}
                    alt="navIcon"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleNextPage();
                }}
                className="w-[3.1875rem] h-[3.1875rem] flex justify-center items-center bg-[#FFFFFF] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem]"
              >
                <div className="relative w-[1rem] h-[1rem]">
                  <Image
                    src={
                      "/assets/images/ExploreImages/navigationIconActive.svg"
                    }
                    alt="navIcon"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
});
