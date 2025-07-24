import Link from "next/link";
import { memo } from "react";
import Image from "next/image";
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


    return (
      <Link
        href={`/product?id=${id}`}
        key={id}
        className="w-[18rem] h-[29rem] flex flex-col items-center flex-shrink-0 rounded-[1.25rem] bg-white shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] font-[Poppins] overflow-hidden justify-self-end cursor-pointer"
      >
        {/* Product Image */}
        <div
          className="w-[100%] h-[55%] flex flex-shrink-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
        >
          {/* Following div consist of tag of the product */}
          {/* Product Tag */}
          <div className="w-[50%] flex items-end">
            <div
              className={`min-w-[5.32906rem] max-w-max h-[1.88088rem] rounded-full  flex items-center justify-center ml-[0.5rem] mb-[0.5rem] px-[0.5rem] text-white text-[0.75rem] font-semibold capitalize ${tags === "Best Seller" ? "bg-[#FFC400]" : "bg-[#1A9AEF]"}`}
            >
              {tags}
            </div>
          </div>

          {/* Following div consist of heart icon */}
          <div className="w-[50%] flex justify-end">
            <button
              className="w-[1.875rem] h-[1.875rem] flex justify-center items-center rounded-full mt-[1rem] mr-[1rem] bg-[#fff]"
              onClick={handleLikeProduct}
            >
              <div className="relative w-[1.5rem] h-[1.5rem]">
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

        <div className="h-[45%] flex flex-col justify-between px-[0.7rem] pt-[0.5rem] pb-[1rem]">
          {/* Following div consist of category,Rating and product name Section */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {/* Collection */}
              <p className="text-[#697F75] text-[0.9375rem] font-medium">
                {collection}
              </p>

              {/* Rating Section */}
              <div className="flex justify-center items-center gap-[0.2rem]">
                <div className="relative w-[1.50469rem] h-[1.50469rem]">
                  <Image
                    src="/assets/images/ExploreImages/star.svg"
                    alt="rating"
                    fill
                  />
                </div>
                <span className="text-[#697F75] text-[0.9375rem] font-medium flex items-center">
                  4.8 <span className="text-[#B0B0B0]">(81)</span>
                </span>
              </div>
            </div>

            {/* Product Name */}
            <p className="w-[100%] text-[#000] text-start text-[1.4rem] font-semibold leading-[1.3rem]">
              {name}
            </p>
          </div>

          {/* Product Size */}
          <p className="text-start text-[#697F75] text-[0.9375rem] leading-[1.5rem] font-medium">
            {`Product Size - ${productSize}" Pot`}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <p className="text-[#56A430] text-[1.4rem] font-semibold leading-[130%]">
              ₹ {price}
            </p>
            <p className="text-[#CBD0D3] text-[1.25rem] font-semibold leading-[130%] line-through">
              ₹ {compareAt}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button className="w-[16.5rem] h-[3.19744rem] bg-[#56A430] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#213E12]">
            <div className="relative w-[1.53806rem] h-[1.50469rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/shopping-cart.svg"
                alt="cart icon"
                fill
              />
            </div>
            <span className="text-white text-[1.22669rem] font-medium text-center">
              Add to Cart
            </span>
          </button>
        </div>
      </Link>
    );
  }
);
