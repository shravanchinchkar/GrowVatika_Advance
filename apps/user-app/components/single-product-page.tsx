import Image from "next/image";
import { Header } from "./header-section";
import { Navbar } from "./nav-section";
import { UserAuthButton } from "./user-auth-button";

const BreadCrumb = () => {
  const crumbs = [
    "Home",
    "Plants",
    "Indoor Plants",
    "Lush Green Bird of Paradise",
  ];
  return (
    <div className="flex items-center gap-2 font-[Poppins] text-[1.25rem] leading-[1.625rem] font-normal border-b border-[rgba(0,0,0,0.20)] p-2">
      {crumbs.map((text, i) => (
        <span
          key={i}
          className={`text-[${i === crumbs.length - 1 ? "#171717" : "#697F75"}]`}
        >
          {text}
          {i !== crumbs.length - 1 && (
            <Image
              src="/assets/images/SingleProductImage/rightArrowIcon.svg"
              alt=">"
              width={11}
              height={6}
              className="shrink-0 mx-2 inline-block"
            />
          )}
        </span>
      ))}
    </div>
  );
};

const StarRating = () => (
  <div className="flex items-center gap-2 mt-[0.625rem]">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[1.5rem] h-[1.5rem] relative shrink-0">
          <Image
            src={`/assets/images/SingleProductImage/${i < 4 ? "ratingIcon" : "whiteStarIcon"}.svg`}
            alt="Star"
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
    <span className="text-[#171717] text-[1.22669rem] font-[Poppins]">4.9</span>
    <span className="text-[#CBD0D3] text-[1.22669rem] font-[Poppins] font-medium">
      (87 reviews)
    </span>
  </div>
);

const SizeOption = ({ selected, size, price, height, tag }: any) => (
  <div
    className={`w-[14.1875rem] h-[5.9375rem] rounded-[0.625rem] border ${selected ? "border-[#56A430] bg-[#DEFFE0]" : "border-[#D9D9D9]"} px-4 py-3 flex flex-col`}
  >
    <div className="text-[#171717] text-[1.25rem] font-[Poppins] font-medium leading-[1.625rem]">
      {size} - ₹ {price}
    </div>
    <div className="text-[#697F75] text-[0.8rem] font-[Poppins]">{height}</div>
    {tag && (
      <div className="w-[7.125rem] h-[1.625rem] bg-[#7FB819] rounded-[5.25rem] flex items-center justify-center mt-1">
        <span className="text-white text-[0.875rem] font-[Poppins] font-semibold">
          {tag}
        </span>
      </div>
    )}
  </div>
);

const IconButton = ({ src, alt }: any) => (
  <button className="w-[3.1875rem] h-[3.1875rem] border border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-center">
    <img src={src} alt={alt} className="w-[1.8rem] h-[1.8rem]" />
  </button>
);

const Thumbnail = ({ src, selected }: any) => (
  <div
    className={`w-[11.875rem] h-[11.875rem] rounded-[0.625rem] border-[1.6px] ${selected ? "border-[#56A430]" : "border-white"} overflow-hidden relative`}
  >
    <Image
      src={src}
      alt="Thumbnail"
      fill
      className="object-cover rounded-[0.625rem]"
    />
  </div>
);

export const SingleProductPage = () => {
  return (
    <div className="flex flex-col items-center bg-[#FFF6F4] gap-[2rem] min-h-screen font-[Poppins] pb-[2rem]">
      {/* Header & Nav */}
      <div className="flex flex-col gap-[1rem] pt-[2rem]">
        <Header />
        <div className="flex justify-between">
          <Navbar />
          <UserAuthButton />
        </div>
      </div>

      {/* Search Input, Search & Sort Button */}
      <div className="flex items-start justify-between gap-4 w-[82.1875rem]">
        {/* Search Input */}
        <div className="flex items-center w-[60rem] h-[3.0625rem] rounded-full border border-[#56A430] bg-white px-4">
          <div className="relative w-[1.8rem] h-[1.8rem] flex-shrink-0 mr-3">
            <Image
              src="/assets/images/ExploreImages/searchBarSearchIcon.svg"
              alt="search icon"
              className="w-full h-full"
              fill
            />
          </div>
          <input
            type="text"
            placeholder="Find your Plants, Pots, Tools..."
            className="w-full bg-transparent text-[#CBD0D3] placeholder-[#CBD0D3] text-[1.22669rem] font-normal outline-none font-poppins"
          />
        </div>

        {/* Consist of Search and sort Button */}
        <div className="flex justify-between w-[20rem]">
          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 w-[10.1875rem] h-[3.0625rem] rounded-full bg-[#56A430] text-white text-[1.22669rem] font-poppins capitalize">
            <div className="relative w-[1.5rem] h-[1.5rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/searchButtonSearchIcon.svg"
                alt="search icon"
                className="w-full h-full"
                fill
              />
            </div>
            Search
          </button>
          {/* Sort Button */}
          <button className="flex items-center justify-center gap-2 w-[8.375rem] h-[3.0625rem] rounded-full border border-[#56A430] text-[#171717] text-[1.22669rem] font-poppins capitalize">
            <div className="relative w-[1.5rem] h-[1.5rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/sortButtonIcon.svg"
                alt="sort icon"
                className="w-full h-full"
                fill
              />
            </div>
            Sort
          </button>
        </div>
      </div>

      <div className="w-[82rem] h-[78.8125rem] rounded-[0.9375rem] bg-white border-2">
        <BreadCrumb />
        <div className="w-full flex flex-col items-center p-6">
          <div className="w-[90%] flex gap-[2.5rem]">
            {/* Left Product Image */}
            <div className="w-[37.8rem] h-[37.8rem] bg-[#FFF6F4] flex justify-center items-center rounded-[1rem]">
              <div className="relative w-[37.5rem] h-[37.5rem] rounded-[0.625rem] overflow-hidden">
                <Image
                  src="/assets/images/SingleProductImage/productImage.png"
                  alt="Product"
                  fill
                  className="object-content"
                />
              </div>
            </div>

            {/* Right Product Info */}
            <div className="mt-2">
              <h1 className="text-[#000] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
                Lush Green Bird of Paradise
              </h1>
              <h2 className="text-[#697F75] text-[1.5rem] font-[Poppins] font-medium leading-[1.95rem]">
                Strelitzia Nicolai - 10&quot; Premium Pot
              </h2>
              <StarRating />
              <div className="flex gap-4 mt-4">
                <div className="text-[#56A430] text-[2rem] font-[Poppins] font-semibold">
                  ₹1499
                </div>
                <div className="text-[#697F75] text-[1.25rem] font-[Poppins] line-through">
                  ₹1999
                </div>
                <div className="w-[7.1875rem] h-[2.4375rem] bg-[#DBD5A4] flex items-center justify-center rounded-[5.25rem]">
                  <span className="text-[#56A430] text-[1rem] font-[Poppins] font-semibold">
                    Save 25%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-[#697F75] text-[0.9375rem] font-[Poppins]">
                <div className="w-[1.375rem] h-[1.375rem] relative">
                  <Image
                    src="/assets/images/SingleProductImage/truckIcon.svg"
                    alt="Truck"
                    fill
                    className="object-contain"
                  />
                </div>
                Free shipping on this item
              </div>

              {/* Sizes */}
              <div className="mt-8 mb-6">
                <h3 className="text-[#171717] text-[1.25rem] font-[Poppins] font-medium mb-3">
                  Choose size:
                </h3>
                <div className="flex gap-3">
                  <SizeOption size='8"' price="969" height="2-3 feet tall" />
                  <SizeOption
                    selected
                    size='10"'
                    price="1499"
                    height="3-4 feet tall (Most Popular)"
                    tag="Best Value"
                  />
                </div>
                <div className="flex items-center mt-10 gap-2 text-[1.25rem] font-[Poppins]">
                  <label>Quantity:</label>
                  <div className="flex items-center space-x-1">
                    <button className="w-[2.125rem] h-[2.125rem] bg-[#FFF6F4] rounded-l flex items-center justify-center">
                      <img
                        src="/assets/images/SingleProductImage/minusIcon.svg"
                        alt="-"
                        className="w-4 h-4"
                      />
                    </button>
                    <div className="w-[2.5rem] h-[2.125rem] flex items-center justify-center bg-white text-[1.22669rem] text-black">
                      2
                    </div>
                    <button className="w-[2.125rem] h-[2.125rem] bg-[#FFF6F4] rounded-r flex items-center justify-center">
                      <img
                        src="/assets/images/SingleProductImage/plusIcon.svg"
                        alt="+"
                        className="w-4 h-4"
                      />
                    </button>
                    <span className="ml-2 text-[#CBD0D3] text-[1.22669rem] font-medium">
                      (8 available)
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-6 mb-4">
                  <button className="w-[20.3125rem] h-[3.1875rem] bg-[#56A430] rounded-[0.625rem] flex items-center justify-center gap-2">
                    <img
                      src="/assets/images/ExploreImages/shopping-cart.svg"
                      alt="cart"
                      className="w-[1.53806rem] h-[1.50469rem]"
                    />
                    <span className="text-white text-[1.22669rem] font-[Poppins]">
                      Add to Cart
                    </span>
                  </button>
                  <IconButton
                    src="/assets/images/SingleProductImage/heartIcon.svg"
                    alt="heart"
                  />
                  <IconButton
                    src="/assets/images/SingleProductImage/shareIcon.svg"
                    alt="share"
                  />
                </div>

                <button className="w-[28.6875rem] h-[3.1875rem] border border-[#56A430] bg-white rounded-[0.625rem]">
                  <span className="text-[#56A430] font-[Poppins] text-[1.22669rem] font-medium">
                    Buy Now - Express Checkout
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex flex-col items-start">
            <div className="flex gap-2 mt-2 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 relative">
                  <Image
                    src={`/assets/images/SingleProductImage/${i === 2 ? "selectCircle" : "nonSelectedCircle"}.svg`}
                    alt="Dot"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="w-[40rem] h-[14.3125rem] rounded-[0.9375rem] bg-[#FFF6F4] flex items-center justify-between px-4 relative my-8">
              <div className="w-[6.75rem] h-[6.75rem] bg-[#56A430] rounded-full absolute left-[-3.375rem] top-1/2 -translate-y-1/2 rotate-90 flex items-center justify-center">
                <div className="relative w-6 h-6 rotate-90">
                  <Image
                    src="/assets/images/SingleProductImage/rightSlideIcon.svg"
                    alt="left"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex gap-4 mx-auto z-10">
                <Thumbnail src="/assets/images/SingleProductImage/leafImage.png" />
                <Thumbnail
                  src="/assets/images/SingleProductImage/productImage.png"
                  selected
                />
                <Thumbnail src="/assets/images/SingleProductImage/rootImage.png" />
              </div>

              <div className="w-[6.75rem] h-[6.75rem] bg-[#213E12] rounded-full absolute right-[-3.375rem] top-1/2 -translate-y-1/2 -rotate-90 flex items-center justify-center">
                <div className="relative w-6 h-6 -rotate-90">
                  <Image
                    src="/assets/images/SingleProductImage/leftSlideIcon.svg"
                    alt="right"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8">
            <div className="text-[#000] text-center font-[Poppins] text-[2rem] not-italic font-semibold leading-[130%]">
              About Product
            </div>
            <div className="text-[#171717] text-center font-[Poppins] text-[1.25rem] not-italic font-normal leading-[130%] mt-4">
              The Lush Green Bird of Paradise (Strelitzia reginae) is a striking
              ornamental plant known for its large, banana-like leaves and bold,
              upright presence. Ideal for bright indoor corners, balconies, or
              patios, it adds a tropical elegance to any space while naturally
              purifying the air. Easy to care for with moderate watering and
              indirect sunlight, this fast-growing plant makes a stunning focal
              point in home or office décor.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
