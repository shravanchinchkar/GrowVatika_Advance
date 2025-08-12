"use client";

import Image from "next/image";
import { useState } from "react";
import { useSellerDataStore } from "@repo/shared-store";
import { useActiveSellerDashboardSideBar } from "@repo/shared-store";
import { SellerProductData } from "@repo/common-types/types";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";
import { useSellerProductDataStore } from "@repo/shared-store";
export const SellerDashboardProductManagementSection = () => {
  // Following is the Zustand state management code for displaying component depending upon active sidebar
  const { activeSideBar } = useActiveSellerDashboardSideBar();
  

  // Following is the Zustand state management code for displaying add product section
  const{displayAddProductSection,setVisibilityOfAddProductSection}=useDisplayAddProductSectionStore()

  // Following is the Zustand state management code for sellerProductData
  const sellerProductData = useSellerProductDataStore(
    (state) => state.productData
  );

  // Following is the Zustand state management code for sellerData
  const sellerData = useSellerDataStore((state) => state.sellerData);

  const ButtonType = ["All Products", "Active", "Draft", "Hidden"];

  const [activeButton, setActiveButton] = useState("All Products");
  const [filterProducts, setFilterProducts] =
    useState<SellerProductData[]>(sellerProductData);

  const handelDisplayofAddProductSection = () => {
    setVisibilityOfAddProductSection(true);
  };

  const handleFilterProducts = (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonName: string
  ) => {
    setActiveButton(buttonName);
    if (buttonName == "All Products") {
      setFilterProducts(sellerProductData);
    } else if (buttonName == "Active") {
      const activeProducts = sellerProductData.filter((product) => {
        return product.productStatus === "Active";
      });
      setFilterProducts(activeProducts);
    } else if (buttonName === "Draft") {
      const draftProducts = sellerProductData.filter((product) => {
        return product.productStatus === "Draft";
      });
      setFilterProducts(draftProducts);
    } else {
      const hiddenProducts = sellerProductData.filter((product) => {
        return product.productStatus === "Hidden";
      });
      setFilterProducts(hiddenProducts);
    }
  };

  const activeButtonStyle =
    "h-[2.9375rem] w-[9.1875rem] lg:text-[1.1rem] xl:text-[1.22669rem] text-[#171717] bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] rounded-[0.3125rem] flex justify-center items-center outline-none";
  const normalStyle =
    "h-[2.9375rem] w-[9.1875rem] lg:text-[1.1rem] xl:text-[1.22669rem] text-[#171717] ml-[0.05rem]";

  if (activeSideBar == "products" && displayAddProductSection === false) {
    return (
      <div className="flex flex-col items-center gap-[1rem] pt-[0.5rem] mx-[1rem]">
        {/* product top div */}
        <div className="w-[98%] flex flex-col gap-[1.5rem]">
          {/* Following div consist of product section title and button */}
          <div className="flex justify-between items-center">
            {/* Product Page title */}
            <div>
              <div className="text-[#171717] lg:text-[1.5rem] xl:text-[2rem] font-semibold">
                Products
              </div>
              <div className="text-[#8C8C8C] leading-[10px]">
                Manage your product inventory and listings
              </div>
            </div>

            {/* Add Product Button */}
            <button
              className={`lg:w-[10rem] lg:h-[3rem] xl:w-[12.4375rem] xl:h-[3.1875rem]  rounded-[0.625rem] flex items-center justify-center gap-[1rem] bg-[#56A430] animate-bg-bounce-in-2 ${sellerData.nurseryBio === null ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={sellerData.nurseryBio === null ? true : false}
              onClick={handelDisplayofAddProductSection}
            >
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5rem] xl:h-[1.5rem]">
                <Image
                  src="/assets/images/productSectionImages/addProductIcon.svg"
                  alt="addProductIcon"
                  fill
                />
              </div>
              <p className="text-white">Add Product</p>
            </button>
          </div>

          {/* following div consist of search bar, filter section, Newest Section */}
          <div className="text-[#CBD0D3] flex justify-between lg:gap-[1rem] xl:gap-0">

            {/* Search Input */}
            <div className="lg:w-[25rem] lg:h-[3rem] xl:w-[30rem] xl:h-[3rem] new-xl:w-[33rem] 2xl:w-[35.375rem] 2xl:h-[3.1875rem] bg-white border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center px-[1rem]">
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5rem] xl:h-[1.5rem]">
                <Image
                  src="/assets/images/productSectionImages/searchProductIcon.svg"
                  alt="searchProductIcon"
                  fill
                />
              </div>
              <input
                type="text"
                className="w-[90%] h-[100%] px-[1rem] border-none outline-none lg:text-[1.1rem] xl:text-[1.22669rem]"
                placeholder="Search products........"
              />
            </div>

            {/* Filter Section */}
            <div className="lg:w-[7rem] lg:h-[3rem] new-lg:w-[9rem] new-lg:h-[3rem] xl:w-[10rem] 2xl:w-[10rem] 2xl:h-[3.1875rem] bg-white border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center lg:justify-evenly xl:justify-start 2xl:justify-start xl:gap-[1rem] 2xl:gap-0 xl:px-[1rem] 2xl:p-0 lg:text-[1rem] 2xl:text-[1.22669rem]">
              <div className="lg:m-0 2xl:ml-[1rem] relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.5rem] 2xl:h-[1.5rem]">
                <Image
                  src="/assets/images/productSectionImages/filterIcon.svg"
                  alt="filterIcon"
                  fill
                />
              </div>
              <p className="lg:m-0 2xl:ml-[1.19rem]">Filter</p>
            </div>

            {/* Newest Section */}
            <div className="lg:w-[10rem] lg:h-[3rem] 2xl:w-[14.9375rem] 2xl:h-[3.1875rem] bg-white border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex justify-between items-center gap-[1rem] px-[1rem] lg:text-[1rem] 2xl:text-[1.22669rem]">
              <p className="">Newest</p>
              <div className="relative h-[0.40538rem] w-[0.6875rem]">
                <Image
                  src="/assets/images/productSectionImages/newestIcon.svg"
                  alt="newestIcon"
                  fill
                />
              </div>
            </div>

          </div>
        </div>

        {/* product middle div */}
        <div className="w-[98%] h-[2.9375rem] text-[1.22669rem]">
          <div className="lg:w-[90%] xl:w-[59%] flex justify-between h-[2.9375rem] text-[1.22669rem] text-[#697F75] font-medium">
            {ButtonType.map((buttonName) => {
              return (
                <button
                  className={`${activeButton == buttonName ? activeButtonStyle : normalStyle} `}
                  onClick={(e) => handleFilterProducts(e, buttonName)}
                  key={buttonName}
                >
                  {buttonName}
                </button>
              );
            })}
          </div>
        </div>

        {filterProducts.length === 0 ? (
          <div className="w-[100%] h-[15rem] flex justify-center items-center text-center my-auto text-[1.5rem] text-[#CBD0D3] uppercase font-medium">
            No Product to display
          </div>
        ) : (
          <>
            {/* Table start from here */}
            <div className="h-max w-[98%] rounded-[1.25rem] bg-[#FFF] flex flex-col overflow-hidden">
              {/* Row 1 Select all, delete, duplicate and total product count */}

              <div className="h-[4.16rem] flex items-center lg:gap-[9rem] xl:gap-[17rem] new-xl:gap-[20rem] 2xl:gap-[23.44rem] border-b-[2px] text-[1rem]">
                {/* Select all div */}
                <div className="ml-[1rem] flex items-center gap-[1rem]">
                  <input
                    className="w-[1.25rem] h-[1.25rem] accent-[#000] cursor-pointer outline-none"
                    type="checkbox"
                  />
                  <div className="text-[1rem] lg:w-max">Select all</div>
                </div>

                {/* Delete,Duplicate and total product count section */}
                <div className="flex justify-between gap-[1.44rem] items-center">
                  {/* Delete Product Button */}
                  <button className="lg:w-[8rem] xl:w-[8.375rem] h-[2.6875rem] border-[1.5px] rounded-[0.625rem] border-[#CBD0D3] flex justify-evenly items-center font-medium">
                    <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.375rem] xl:h-[1.375rem]">
                      <Image
                        src="/assets/images/productSectionImages/deleteIcon.svg"
                        alt="deleteIcon"
                        fill
                      />
                    </div>
                    Delete
                  </button>

                  {/* Duplicate Product Button */}
                  <button className="lg:w-[8rem] xl:w-[10.125rem] h-[2.6875rem] border-[1.5px] rounded-[0.625rem] border-[#CBD0D3] flex justify-evenly items-center font-medium">
                    <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.375rem] xl:h-[1.375rem]">
                      <Image
                        src="/assets/images/productSectionImages/duplicateIcon.svg"
                        alt="duplicateIcon"
                        fill
                      />
                    </div>
                    Duplicate
                  </button>

                  {/* Total Product Count */}
                  <div className="font-normal text-[#697F75]">
                    {`${filterProducts.length} Products`}
                  </div>
                </div>
              </div>

              {/* Actual Product data start from here */}
              <div className="grid grid-rows-4 text-center">
                {/* Table row 2 Header Section */}
                <div className="grid lg:grid-cols-[3rem_9rem_9rem_9rem_9em] new-lg:grid-cols-[3rem_10rem_10rem_10rem_10em] xl:grid-cols-[3rem_13rem_13rem_13rem_13em] new-xl:grid-cols-[3rem_14rem_14rem_14rem_14em] 2xl:grid-cols-[3rem_15rem_15rem_15rem_15rem] text-[#697F75] lg:text-[1rem] 2xl:text-[1.1rem]">
                  <div className="self-center"></div>
                  <div className="flex justify-start items-center pl-[1rem]">Products</div>
                  <div className="flex justify-center items-center">Collections</div>
                  <div className="flex justify-center items-center">Price</div>
                  <div className="flex justify-center items-center">Inventory</div>
                </div>

                {/* Product data start from here */}
                {filterProducts.map((product) => {
                  return (
                    <div
                      className="border-t-[2px] border-[#0000001A] grid lg:grid-cols-[3rem_9rem_9rem_9rem_9em] new-lg:grid-cols-[3rem_10rem_10rem_10rem_10em] xl:grid-cols-[3rem_13rem_13rem_13rem_13em] new-xl:grid-cols-[3rem_14rem_14rem_14rem_14em] 2xl:grid-cols-[3rem_15rem_15rem_15rem_15rem] lg:text-[1rem] 2xl:text-[1.1rem] font-medium text-[#171717]"
                      key={product.id}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          className="h-[1.25rem] w-[1.25rem] accent-[#000] cursor-pointer outline-none"
                          type="checkbox"
                        />
                      </div>

                      <div className="py-[0.5rem] flex flex-col justify-start ml-[1rem]">
                        {/* Product Name */}
                        <p className="self-start text-start">{product.name}</p>
                        {/* Product size if available */}
                        <p className="text-[0.9375rem] self-start text-[#697F75]">
                          {`${product.productSize}" Pot`}
                        </p>
                      </div>

                      <div className="self-center">{product.collection}</div>
                      <div className="self-center">
                        <p>{`₹ ${product.price}`}</p>
                        <p className="text-[0.9375rem] line-through text-[#697F75]">
                          {`₹${product.compareAt}`}
                        </p>
                      </div>
                      <div
                        className={`self-center ${Number(product.productQuantity) < 10 && "text-[#FF4B4B]"}`}
                      >{`${product.productQuantity} in stock`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
};
