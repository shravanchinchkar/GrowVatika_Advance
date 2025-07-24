import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  tags: string;
  price: number;
  imageURL: string;
  compareAt: number;
  collection: string;
  productSize: number;
  likeProduct: boolean;
  handleLikeProduct: React.MouseEventHandler<HTMLButtonElement>;
}

export const ProductCard = memo(
  ({
    id,
    imageURL,
    collection,
    compareAt,
    handleLikeProduct,
    name,
    price,
    productSize,
    tags,
    likeProduct,
  }: ProductCardProps) => {
    const router = useRouter();

    const handleProductData = (id: string) => {
      router.push(`/product?id=${id}`);
    };

    return (
      <div
        key={id}
        className="
    border-[2px] border-red-500
    flex flex-col items-center flex-shrink-0 
    rounded-[1.25rem] bg-white shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] 
    font-[Poppins] overflow-hidden justify-self-end cursor-pointer
    w-[18rem] h-[29rem]
    lg:w-[18rem] lg:h-[29rem]
    md:w-[18rem] md:h-[29rem]
    new-sm:w-[11.42325rem] new-sm:h-[20rem]
    new-sm-1:w-[11.42325rem] new-sm-1:h-[20rem]
  "
        onClick={() => handleProductData(id)}
      >
        {/* Product Image */}
        <div
          className="
      border-[2px] border-red-500
      flex flex-shrink-0 bg-cover bg-center bg-no-repeat
      w-full h-[55%] 
      lg:w-full lg:h-[55%] md:w-full md:h-[55%]
      new-sm:w-[11.42325rem] new-sm:h-[9.22938rem] new-sm:rounded-t-[0.7565rem]
      new-sm-1:w-[11.42325rem] new-sm-1:h-[9.22938rem] new-sm-1:rounded-t-[0.7565rem] 
    "
          style={{ backgroundImage: `url(${imageURL})` }}
        >
          {/* Following div consist of tag of the product */}
          {/* Product Tag */}
          <div className="w-1/2 flex items-end">
            <div
              className={`
        flex items-center justify-center ml-[0.5rem] mb-[0.5rem] px-[0.5rem] text-white font-semibold capitalize
        min-w-[5.32906rem] max-w-max h-[1.88088rem] rounded-full text-[0.75rem]
        lg:min-w-[5.32906rem] lg:h-[1.88088rem] lg:rounded-full lg:text-[0.75rem]
        md:min-w-[5.32906rem] md:h-[1.88088rem] md:rounded-full md:text-[0.75rem]
        new-sm:min-w-[3.72856rem] new-sm:h-[1.12988rem] new-sm:rounded-[3.76619rem] new-sm:text-[0.45194rem]
        new-sm-1:min-w-[3.72856rem] new-sm-1:h-[1.12988rem] new-sm-1:rounded-[3.76619rem] new-sm-1:text-[0.45194rem]
        ${tags === "Best Seller" ? "bg-[#FFC400]" : "bg-[#1A9AEF]"}
      `}
            >
              {tags}
            </div>
          </div>

          {/* Following div consist of heart icon */}
          <div className="w-1/2 flex justify-end">
            <button
              className="w-[1.875rem] h-[1.875rem] flex justify-center items-center rounded-full mt-[1rem] mr-[1rem] bg-[#fff]"
              onClick={handleLikeProduct}
            >
              <div className="relative lg:w-[1.5rem] lg:h-[1.5rem] md:w-[1.5rem] md:h-[1.5rem] new-sm:w-[1.13475rem] new-sm:h-[1.13475rem] new-sm-1:w-[1.13475rem] new-sm-1:h-[1.13475rem]">
                {likeProduct ? (
                  <Image
                    src="/assets/images/ExploreImages/likeheart.svg"
                    alt="heart"
                    fill
                  />
                ) : (
                  <Image
                    src="/assets/images/ExploreImages/unlikeheart.svg"
                    alt="heart"
                    fill
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Product Content */}
        <div className="h-[45%] flex flex-col justify-between px-[0.7rem] pt-[0.5rem] pb-[1rem]">
          {/* Following div consist of category,Rating and product name Section */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {/* Collection */}
              <p className="text-[#697F75] font-medium lg:text-[0.9375rem] md:text-[0.9375rem] new-sm:text-[0.56738rem] new-sm-1:text-[0.56738rem]">
                {collection}
              </p>
              {/* Rating Section */}
              <div className="flex justify-center items-center gap-[0.2rem]">
                <div className="relative lg:w-[1.50469rem] lg:h-[1.50469rem] md:w-[1.50469rem] md:h-[1.50469rem] new-sm:w-[0.91063rem] new-sm:h-[0.91063rem] new-sm-1:w-[0.91063rem] new-sm-1:h-[0.91063rem]">
                  <Image
                    src="/assets/images/ExploreImages/star.svg"
                    alt="rating"
                    fill
                  />
                </div>
                <span className="text-[#697F75] font-medium flex items-center lg:text-[0.9375rem] md:text-[0.9375rem] new-sm:text-[0.56738rem] new-sm-1:text-[0.56738rem]">
                  4.8 <span className="text-[#B0B0B0]">(81)</span>
                </span>
              </div>
            </div>
            {/* Product Name */}
            <p className="w-full text-[#000] text-start font-semibold lg:text-[1.4rem] md:text-[1.4rem] lg:leading-[1.3rem] md:leading-[1.3rem] new-sm:text-[0.90781rem] new-sm-1:text-[0.90781rem] new-sm:leading-[1.18013rem] new-sm-1:leading-[1.18013rem]">
              {name}
            </p>
          </div>

          {/* Product Size */}
          <p className="text-start text-[#697F75] font-medium lg:text-[0.9375rem] md:text-[0.9375rem] new-sm:text-[0.56738rem] new-sm-1:text-[0.56738rem]">
            {`Product Size - ${productSize}" Pot`}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <p className="text-[#56A430] font-semibold lg:text-[1.4rem] md:text-[1.4rem] lg:leading-[130%] md:leading-[130%] new-sm:text-[0.90781rem] new-sm-1:text-[0.90781rem] new-sm:leading-[1.18013rem] new-sm-1:leading-[1.18013rem]">
              ₹ {price}
            </p>
            <p className="text-[#CBD0D3] font-semibold line-through lg:text-[1.25rem] md:text-[1.25rem] lg:leading-[130%] md:leading-[130%] new-sm:text-[0.7565rem] new-sm-1:text-[0.7565rem] new-sm:leading-[0.98344rem] new-sm-1:leading-[0.98344rem]">
              ₹ {compareAt}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button className="border-[2px] border-red-500 flex items-center justify-center gap-2 bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] lg:w-[16.5rem] lg:h-[3.19744rem] md:w-[16.5rem] md:h-[3.19744rem] new-sm:w-[10.43444rem] new-sm:h-[1.93513rem] new-sm-1:w-[10.43444rem] new-sm-1:h-[1.93513rem] new-sm:rounded-[0.37825rem] new-sm-1:rounded-[0.37825rem]">
            <div className="relative flex-shrink-0 lg:w-[1.53806rem] lg:h-[1.50469rem] md:w-[1.53806rem] md:h-[1.50469rem] new-sm:w-[0.9375rem] new-sm:h-[0.9375rem] new-sm-1:w-[0.9375rem] new-sm-1:h-[0.9375rem]">
              <Image
                src="/assets/images/ExploreImages/shopping-cart.svg"
                alt="cart icon"
                fill
              />
            </div>
            <span className="text-white text-center font-medium lg:text-[1.22669rem] md:text-[1.22669rem] new-sm:text-[0.74238rem] new-sm-1:text-[0.74238rem]">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    );
  }
);
