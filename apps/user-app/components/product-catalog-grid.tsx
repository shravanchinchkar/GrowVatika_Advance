"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { useSearchParams } from "next/navigation";
import { useFilterProduct } from "@repo/shared-store";
import { SellerProductData } from "@repo/common-types";
import { LocalLoadingSkeleton } from "./local-loading-skeleton";

export const ProductCatalogGrid = () => {
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

  const currentPage =
    typeof searchParamsPage === "string" ? Number(searchParamsPage) : 1;

  const filter = useFilterProduct((state: any) => state.filter);

  useEffect(() => {
    if (currentPage < 1) {
      setPageNotFound(true);
      return;
    } else {
      if (filter.length > 0) {
        const getFilterProductData = async () => {
          try {
            if (!loading) {
              setLoading(true);
            }
            const encodedFilter = encodeURIComponent(JSON.stringify(filter));
            const res = await axios.get(
              `api/getfilterproductdata?filter=${encodedFilter}`
            );
            console.log("filter response is :", res.data.success);
            if (!res.data.success) {
              setProductsData([]);
              setTotalProductsCount(0);
              setTotalPages(1);
              setLoading(false);
              return;
            }
            const filterProductData = res.data.filterProduct;
            setProductsData(filterProductData);
            setLoading(false);
          } catch (error) {
            console.error("Error while getting data of filter products", error);
            setLoading(false);
          }
        };
        getFilterProductData();
        return;
      } else {
        console.log("not if...")
        const getProductsData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(
              `api/getallproducts?page=${currentPage}`
            );
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
          } catch (error) {
            console.error("Error while getting product data", error);
          }
        };
        getProductsData();
      }
    }
  }, [currentPage, filter]);

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

  if (pageNotFound) {
    return (
      <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem] text-[#CBD0D3] uppercase text-[1.5rem]">
        No Product Data found
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem]">
        <LocalLoadingSkeleton />
      </div>
    );
  } else {
    return (
      <div className="w-[100%] flex flex-col gap-[1rem] pb-[1rem]">
        {/* Count of the products */}
        <div className="w-max text-[2rem] text-[#000] ml-[1.5rem] font-semibold">
          {`${totalProductsCount} Products Available`}
        </div>

        {/* Product Card  */}
        <div className="min-h-[60rem] max-h-max grid grid-cols-3 gap-8">
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
          <div className="min-w-[30%] max-w-max flex justify-between">
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
};
