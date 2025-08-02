"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import Skeleton from "@repo/ui/loading";
import { useRouter } from "next/navigation";
import { ProductCard } from "./product-card";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useFilterProduct,
  usefilterProductByCategoryStore,
} from "@repo/shared-store";
import { SellerProductData } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";
import test from "node:test";

export const ProductCatalogGrid = memo(() => {
  const searchParams = useSearchParams();
  const searchParamsPage = searchParams.get("page");

  const [loading, setLoading] = useState(true);
  const [likeProduct, setLikeProduct] = useState(false);
  const [productsData, setProductsData] = useState<SellerProductData[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState<
    number | undefined
  >(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNotFound, setPageNotFound] = useState(false);
  const router = useRouter();

  // Following are the zustand state management code
  const { filter } = useFilterProduct();
  const { category } = usefilterProductByCategoryStore();

  const currentPage =
    typeof searchParamsPage === "string" ? Number(searchParamsPage) : 1;

  // Call to the backend
  useEffect(() => {
    if (currentPage < 1) {
      setPageNotFound(true);
      return;
    } else {
      // only call the below end-point if the filter array length is greater than 0
      if (filter.length > 0) {
        const getFilterProductData = async () => {
          try {
            if (!loading) {
              setLoading(true);
            }
            const encodedFilter = encodeURIComponent(JSON.stringify(filter));
            const res = await axios.get(
              `api/getfilterproductdata?filter=${encodedFilter}&page=${currentPage}`
            );
            if (!res.data.success) {
              setProductsData([]);
              setTotalProductsCount(0);
              setTotalPages(1);
              setLoading(false);
              return;
            }
            const filterProductData = res.data.filterProduct;
            const totalFilterProductCount = res.data.totalFilterProductCount;
            const totalPages = res.data.totalPages;
            if (currentPage > totalPages) {
              setLoading(false);
              setPageNotFound(true);
              return;
            }
            setProductsData(filterProductData);
            setTotalProductsCount(totalFilterProductCount);
            setTotalPages(totalPages);
            setLoading(false);
          } catch (error) {
            console.error("Error while getting data of filter products", error);
            setLoading(false);
          }
        };
        getFilterProductData();
        return;
      } else {
        const getProductsData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(
              `api/getallproducts?page=${currentPage}&category=${category}`
            );
            if (res.data.success) {
              const productsData = res.data.productsData;
              const totalProductsCount = res.data.totalProductsCount;
              const totalPages = res.data.totalPages;
              if (currentPage > totalPages) {
                setLoading(false);
                setPageNotFound(true);
                return;
              }
              setProductsData(productsData);
              setTotalProductsCount(totalProductsCount);
              setTotalPages(totalPages);
              setLoading(false);
            }
            if (!res.data.success) {
              setProductsData([]);
              toast.error("No Product Found :(", toastStyle);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error while getting product data", error);
          }
        };
        getProductsData();
      }
    }
  }, [currentPage, filter, category]);

  //Following code helps to display page number at the bottom
  let pageNumber: number[] = [];

  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) {
      continue;
    }
    if (i > totalPages) {
      break;
    }
    pageNumber.push(i);
  }

  const handleLikeProduct = () => {
    if (!likeProduct) {
      setLikeProduct(true);
    } else {
      setLikeProduct(false);
    }
  };

  if (loading) {
    return (
      <Skeleton className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem]" />
    );
  }
  if (pageNotFound || productsData.length === 0) {
    return (
      <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem] text-[#CBD0D3] uppercase text-[1.5rem]">
        No Product Data found
      </div>
    );
  } else {
    return (
      <div className="w-[100%] flex flex-col gap-[1rem] pb-[1rem]">
        {/* Count of the products */}
        <div className="w-max md:text-[1.2rem] lg:text-[1.5rem] xl:text-[2rem] text-[#000] ml-[1.5rem] font-semibold">
          {`${totalProductsCount} Products Available`}
        </div>

        {/* Product Card  */}
        <div className="min-h-[60rem] max-h-max grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {productsData.map((item: SellerProductData) => {
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

            {currentPage - 1 >= 1 ? (
              // Show the below button if the current page is greater than 1
              <Link
                href={`/explore?page=${currentPage - 1}`}
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
              </Link>
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

            {pageNumber.map((page, index) => {
              return (
                <Link
                  href={`explore?page=${page}`}
                  key={index}
                  className={`w-[3.1875rem] h-[3.1875rem] text-[1.22669rem] flex justify-center items-center border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] ${currentPage === page ? "bg-[#EDE7E4]" : "bg-[#FFFFFF]"}`}
                >
                  {page}
                </Link>
              );
            })}

            {/* Next Page Button */}
            {currentPage === totalPages ? (
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
              <Link
                href={`/explore?page=${currentPage + 1}`}
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
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
});
