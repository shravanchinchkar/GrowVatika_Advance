import Image from "next/image";
import { Navbar } from "./nav-section";
import { Footer } from "./footer-section";
import { Header } from "./header-section";
import { ShoppingCartIcon } from "./cart-icon";
import { CustomSelectTag } from "./custom-select-tag";
import { UserProfileIcon } from "./user-profile-icon";
import { ProductPageButton } from "./product-page-button";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";
import plantImage1 from "../public/assets/images/ProductImages/explore-by-seller-img1.jpg";
import plantImage2 from "../public/assets/images/ProductImages/explore-by-seller-img2.jpg";

export const ExplorePlantsBySeller = () => {
  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];
  const availableProducts = ["Indoor Plants", "Gardening tools", "Rare Plants"];
  return (
    <div className="w-screen h-max flex flex-col items-center bg-[#FFF6F4] font-[Poppins]">
      {/* Heder and Navbar */}
      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex flex-col items-center gap-[1rem] pt-[2rem]">
        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex justify-between">
          <Header />
          <div className="w-[12rem] flex justify-between items-center">
            <UserProfileIcon />
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="w-[100%] flex justify-between">
          <Navbar />
          <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
            <CustomSelectTag
              activeValue="Explore by seller"
              values={["Explore", "Explore by seller"]}
              explore={false}
            />
          </div>
        </div>
      </div>

      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max mt-[3rem] flex flex-col gap-[3rem] items-center">
        {/* Heading of  Eplore by seller */}
        <h1 className="w-[67.8125rem] uppercase text-center text-[#123524] font-[Unbounded] text-[2.25rem]">
          Explore by Sellers – Discover Nurseries Near You!
        </h1>

        {/* Button and Search Bar */}
        <div className="w-[100%] flex items-center ">
          {/* Buttons of the product pages */}
          <div className="w-[70%] flex gap-[1.5rem] justify-end">
            {productPageButton.map((b, index) => {
              return (
                <div className="w-[12.09619rem] h-[4.0625rem]" key={index}>
                  <ProductPageButton
                    uniqueId={index.toString()}
                    buttonName={b}
                  />
                </div>
              );
            })}
          </div>
          {/* Search bar*/}
          <div className="w-[30%] flex justify-end">
            <div className="w-[12.9375rem] h-[4.0625rem] shrink-0">
              <ProductSearchBar
                UseType={SearchBarWorkType.CITYSEARCH}
                placeholder="Find by city"
              />
            </div>
          </div>
        </div>

        {/* Seller Cards Starts from below */}
        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max grid grid-cols-2">
          <div className="justify-self-center flex justify-center w-[100%] mb-[2rem]">
            <div className="w-[39.375rem] h-[58.1875rem] flex flex-col items-center gap-[1rem] shrink-0 bg-[#fff] rounded-[1.8rem]">
              {/* Following div consist of images */}

              <div className="w-[90%]  h-max grid grid-cols-[60%_40%] rounded-[1.8rem] overflow-hidden cursor-pointer mt-[1.5rem]">
                <div className="relative rounded-[1.8rem] overflow-hidden border-[3px] border-[#56A430]">
                  <Image
                    className="object-cover"
                    alt="plant-img-1"
                    src={plantImage1}
                    fill
                    placeholder="blur"
                  />
                </div>

                <div className="justify-self-end flex flex-col justify-between gap-[1rem] items-end">
                  <div className="relative overflow-hidden w-[11.8125rem] h-[11.8125rem] border-[3px] rounded-[1.5625rem] border-[#56A430]">
                    <Image
                      className="object-cover"
                      alt="plant-img-2"
                      src={plantImage2}
                      fill
                      placeholder="blur"
                    />
                  </div>
                  <div className="relative overflow-hidden w-[11.8125rem] h-[11.8125rem] border-[3px] rounded-[1.5625rem] border-[#56A430] ">
                    <Image
                      className="object-cover"
                      alt="plant-img-2"
                      src={plantImage2}
                      fill
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>

              {/* Following div consist of Nursery Name, Distance, Location */}
              <div className="w-[90%] flex flex-col px-[1rem]">
                {/* Nursery Name */}
                <h2 className="w-max text-[#123524] text-[2.25rem] uppercase font-medium">
                  Evergreen Gardens
                </h2>
                <div className="w-max flex gap-[1.5rem] items-center text-[1.1875rem] font-medium text-[#123524A1] text-center">
                  {/* Distance */}
                  <div className="flex gap-[0.5rem] items-center">
                    <div className="relative w-[1.5rem] h-[1.5rem]">
                      <Image
                        className="object-cover"
                        alt="location"
                        src="/assets/images/ProductImages/location-one.svg"
                        fill
                      />
                    </div>
                    <div>2.5 Km away</div>
                  </div>
                  {/* Location */}
                  <div className="w-[15rem] flex items-center gap-[10px]">
                    <div className="w-[8px] h-[8px] bg-[#123524A1] rounded-full"></div>
                    <span>Shivajinagar, Pune</span>
                  </div>
                </div>
              </div>

              {/* Nursery Description */}
              <div className="w-[90%] text-[#606060] text-[1.22669rem] text-justify font-medium px-[1rem] mt-[0.5rem]">
                Family-owned nursery specializing in rare indoor plants,
                succulents, and gardening supplies with expert advice.
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-[1rem] px-[1rem] mt-[1.5rem]">
                {availableProducts.map((item, index) => {
                  return (
                    <div
                      className={`${index === 1 ? "w-[12rem]" : "w-[10.46094rem]"} h-[3.0625rem]`}
                      key={index}
                    >
                      <button className="w-[100%] h-[100%] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#fff] text-[#56A430] text-[1.22669rem] font-medium">
                        {item}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* hr tag for line */}
              <hr className="w-[29.1875rem] h-[2px] text-[1rem] bg-[#00000033]  mx-auto" />

              {/* Opening-closing time and Phone number */}
              <div className="w-[90%] mt-[0.5rem] flex  gap-[2rem] px-[1rem] text-[#606060] text-[1.22669rem] font-normal">
                <div className="flex items-center gap-[0.5rem]">
                  <div className="relative w-[1.5rem] h-[1.5rem]">
                    <Image
                      className="object-cover"
                      src="/assets/images/ProductImages/explore-by-seller-clock.svg"
                      alt="clock"
                      fill
                    />
                  </div>
                  <p>Open: 9AM-6PM</p>
                </div>

                <div className="flex gap-[0.5rem]">
                  <div className="relative w-[1.5rem] h-[1.5rem]">
                    <Image
                      className="object-cover"
                      src="/assets/images/ProductImages/explore-by-seller-phone.svg"
                      alt="clock"
                      fill
                    />
                  </div>
                  <p>(989) 555-1234</p>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="w-[90%] flex justify-between font-[Poppins] mt-[2rem]">
                {/* Button one */}
                <div className="w-[9.25rem] h-[4.0625rem] rounded-[5.25rem] bg-[#123524] text-[#fff] text-[1.22669rem] font-medium uppercase flex justify-center items-center gap-[0.5rem]">
                  <div className="relative w-[1.375rem] h-[1.375rem]">
                    <Image
                      alt="rating"
                      src="/assets/images/ProductImages/rating.svg"
                      fill
                    />
                  </div>
                  <p className="mt-[0.2rem]">4.5</p>
                </div>

                {/* Button two */}
                <button className="w-[11.6875rem] h-[4.0625rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#fff] flex justify-center items-center gap-[0.5rem] text-[#56A430] uppercase font-medium">
                  <div className="relative w-[1.5rem] h-[1.5rem]">
                    <Image
                      alt="location"
                      src="/assets/images/ProductImages/location-two.svg"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>View Map</p>
                </button>

                {/* Buttom Three */}
                <button className="w-[11.6875rem] h-[4.0625rem] rounded-[5.25rem] border-[1.6px] border-[#56A430] bg-[#56A430] flex justify-center items-center gap-[0.5rem] text-[#fff] uppercase font-medium shadow-lg">
                  <p>Visit Store</p>
                  <div className="relative w-[0.6875rem] h-[0.6875rem]">
                    <Image
                      src="/assets/images/ProductImages/right-arrow.svg"
                      alt="right-arrow"
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="justify-self-center flex justify-center w-[100%]"></div>
        </div>
      </div>

      <div className="w-[100%]">
        <Footer />
      </div>
    </div>
  );
};
