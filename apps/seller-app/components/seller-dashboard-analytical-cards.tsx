"use client";

import Image from "next/image";
import { useSellerProductDataStore } from "@repo/shared-store";

export const AnaylticalCards = () => {
  const sellerProductData = useSellerProductDataStore(
    (state) => state.productData
  );
  const totalProductCount = sellerProductData.length;

  const totalProductsLowInStock = sellerProductData.filter((product) => {
    return product.productQuantity < 10;
  }).length;

  const AnalyticsData = [
    {
      title: "total Sales",
      cardImageName: "totalSalesIcon.svg",
      mainContent: "₹0",
      summaryImageName: "growthIcon.svg",
      summaryContent: "+0% from last month",
    },
    {
      title: "Total Orders",
      cardImageName: "totalOrderIcon.svg",
      mainContent: "0",
      summaryImageName: "growthIcon.svg",
      summaryContent: "+0% from last month",
    },
    {
      title: "total Products",
      cardImageName: "totalProductIcon.svg",
      mainContent: totalProductCount.toString(),
      summaryImageName: "totalProductsIcon2.svg",
      summaryContent: `${totalProductsLowInStock} low in stock`,
    },
    {
      title: "total Visitors",
      cardImageName: "storeVisitorIcon.svg",
      mainContent: "0",
      summaryImageName: "storeVisitorsIcon2.svg",
      summaryContent: "+0% from last month",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {AnalyticsData.map((item, index) => {
        return (
          <div
            className="md:w-[13rem] lg:w-[13rem] md:h-[8rem] 2xl:w-[14.88544rem] 2xl:h-[9.1875rem] p-4 bg-white rounded-[1.25rem] shadow flex flex-col justify-between border-[1px] border-[#0000001A]"
            key={index}
          >
            <div className="md:text-[1rem] 2xl:text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-[#00000066] flex md:items-center 2xl:items-end justify-between capitalize">
              <h1>{item.title}</h1>
              <div className="md:w-[2.5rem] md:h-[2.5rem] 2xl:w-[2.93875rem] 2xl:h-[2.93875rem] rounded-[1.25rem] bg-[#DDE6CD] flex justify-center items-center">
                <div className="md:w-[1.2rem] md:h-[1.2rem] 2xl:w-[1.53325rem] 2xl:h-[1.5em] relative">
                  <Image
                    src={`/assets/images/SellerDashboardMainImages/${item.cardImageName}`}
                    className="object-contain"
                    fill
                    alt="rupeeimage"
                  />
                </div>
              </div>
            </div>

            <div className="md:text-[1.5rem] 2xl:text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
              {item.mainContent}
            </div>

            <div className="md:text-[0.7rem] 2xl:text-[0.8rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430] flex items-center gap-[0.2rem]">
              <div className="w-[1rem] h-[1rem] relative">
                <Image
                  src={`/assets/images/SellerDashboardMainImages/${item.summaryImageName}`}
                  alt="growthIcon"
                  fill
                  className="object-contain"
                />
              </div>
              <p>{`${item.summaryContent}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
