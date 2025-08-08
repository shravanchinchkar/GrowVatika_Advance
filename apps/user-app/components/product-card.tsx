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
        className="new-sm:w-[90%] new-sm:h-[10rem] new-sm-2:w-[12.5rem] new-sm-2:h-[20rem]  new-sm-3:w-[15rem] new-sm-3:h-[25rem] new-md:w-[17rem] lg:w-[18rem] new-md:h-[28rem] flex  new-sm:flex-row new-sm-2:flex-col items-center flex-shrink-0 rounded-[1.25rem] bg-white font-[Poppins] overflow-hidden new-sm:justify-self-center xl:justify-self-start 2xl:justify-self-center cursor-pointer shadow-productcard-custom-boxShadow"
      >
        {/* Product Image */}
        <div
          className="new-sm:w-[50%] new-sm:h-[100%] new-sm-2:w-[100%] new-sm-2:h-[55%] flex flex-shrink-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
        >
          {/* Following div consist of tag of the product */}
          {/* Product Tag */}
          <div className="w-1/2 flex items-end">
            <div
              className={`new-sm:min-w-[4.22519rem] new-sm-1:min-w-[6rem] new-sm-3:min-w-[5.32906rem] max-w-max new-sm:h-[1.13831rem] new-sm-1:h-[1.5rem] new-sm-3:h-[1.88088rem] rounded-full  flex items-center justify-center ml-[0.5rem] mb-[0.5rem] px-[0.5rem] text-white new-sm:text-[0.45388rem] new-sm-1:text-[0.65rem] new-sm-3:text-[0.75rem] font-semibold capitalize ${tags === "Best Seller" ? "bg-[#FFC400]" : "bg-[#1A9AEF]"}`}
            >
              {tags}
            </div>
          </div>

          {/* Following div consist of heart icon */}
          <div className="w-1/2 flex justify-end">
            <button
              className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] md:w-[1.875rem] md:h-[1.875rem] flex justify-center items-center rounded-full  new-sm:mt-[0.5rem] new-sm:mr-[0.5rem] md:mt-[1rem] md:mr-[1rem] bg-[#fff]"
              onClick={handleLikeProduct}
            >
              <div className="relative new-sm:w-[1.13475rem] new-sm:h-[1.13475rem] md:w-[1.5rem] md:h-[1.5rem]">
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
        <div className="new-sm:w-[50%] new-sm:h-[100%] new-sm-2:w-[100%] new-sm-2:h-[45%] flex flex-col justify-between px-[0.7rem] pt-[0.5rem] new-sm:pb-[0.5rem] md:pb-[1rem]">
          {/* Following div consist of category,Rating and product name Section */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {/* Collection */}

              <p className="text-[#697F75] new-sm:text-[0.56738rem] new-sm-1:text-[0.7rem] new-sm-3:text-[0.8rem] new-md:text-[0.9375rem] font-medium">
                {collection}
              </p>
              {/* Rating Section */}

              <div className="flex justify-center items-center gap-[0.2rem]">
                <div className="relative new-sm:w-[0.91063rem] new-sm:h-[0.91063rem] md:w-[1.2rem] md:h-[1.2rem] new-md:w-[1.50469rem] new-md:h-[1.50469rem]">
                  <Image
                    src="/assets/images/ExploreImages/star.svg"
                    alt="rating"
                    fill
                  />
                </div>

                <span className="text-[#697F75] new-sm:text-[0.56738rem] new-sm-1:text-[0.7rem] new-sm-3:text-[0.8rem] new-md:text-[0.9375rem] font-medium flex items-center">
                  4.8 <span className="text-[#B0B0B0]">(81)</span>
                </span>
              </div>
            </div>
            {/* Product Name */}

            <p className="w-[100%] text-[#000] text-start new-sm:text-[0.90781rem] new-sm-1:text-[1rem] new-sm-3:text-[1.2rem] new-md:text-[1.4rem] font-semibold new-sm:leading-[1rem] md:leading-[1.3rem]">
              {name}
            </p>
          </div>

          {/* Product Size */}

          <p className="text-start text-[#697F75] new-sm:text-[0.56738rem] new-sm-1:text-[0.76738rem] new-sm-3:text-[0.8rem] new-md:text-[0.9375rem] leading-[1.5rem] font-medium">
            {`Product Size - ${productSize}" Pot`}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <p className="text-[#56A430] new-sm:text-[0.90781rem] new-sm-1:text-[0.95rem] new-sm-3:text-[1.2rem] new-md:text-[1.4rem] font-semibold leading-[130%]">
              ₹ {price}
            </p>
            <p className="text-[#CBD0D3] new-sm:text-[0.7565rem] new-sm-3:text-[1rem] new-md:text-[1.25rem] font-semibold leading-[130%] line-through">
              ₹ {compareAt}
            </p>
          </div>

          {/* Add to Cart Button */}

          <button className="new-sm:w-[100%] new-sm:h-[2rem] new-sm-1:h-[2.3rem] new-sm-3:h-[2.8rem] new-md:h-[3.19744rem] bg-[#56A430] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#213E12] text-white new-sm:text-[0.74238rem] new-sm-1:text-[0.9rem] new-sm-3:text-[1.1rem] new-md:text-[1.22669rem] font-medium text-center">
            <div className="relative new-sm:w-[0.9375rem] new-sm:h-[0.9375rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] new-sm-3:w-[1.53806rem] new-sm-3:h-[1.50469rem] flex-shrink-0">
              <Image
                src="/assets/images/CommonImages/addToCartIcon.svg"
                alt="cart icon"
                fill
              />
            </div>
            Add to Cart
          </button>
        </div>
      </Link>
    );
  }
);
