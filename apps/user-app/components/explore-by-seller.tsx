import { Header } from "./header-section";
import { Navbar } from "./nav-section";
import { ProductPageButton } from "./product-page-button";
import { ExploreProductDropDown } from "./explore-product-dropdown";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const ExplorePlantsBySeller = () => {
  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-[#FFF6F4]">
      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex flex-col items-center gap-[1rem] pt-[2rem]">
        <Header />
        <div className="w-[100%] flex justify-between">
          <Navbar />
          <ExploreProductDropDown />
        </div>
      </div>

      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max mt-[3rem] flex flex-col gap-[3rem] items-center">
        <h1 className="w-[67.8125rem] uppercase text-center text-[#123524] font-[Unbounded] text-[2.25rem]">
          Explore by Sellers – Discover Nurseries Near You!
        </h1>

        <div className="w-[100%] flex items-center">
          <div className="w-[70%] flex gap-[1.5rem] justify-end">
            {productPageButton.map((b, index) => {
              return (
                <ProductPageButton
                  key={index}
                  uniqueId={index.toString()}
                  buttonName={b}
                />
              );
            })}
          </div>

          <div className="w-[30%] flex justify-end">
            <div className="w-[12.9375rem] h-[4.0625rem] shrink-0">
              <ProductSearchBar
                UseType={SearchBarWorkType.CITYSEARCH}
                placeholder="Find by city"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
