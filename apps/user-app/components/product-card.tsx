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
        className="
            flex flex-col items-center flex-shrink-0 justify-self-end cursor-pointer
            rounded-[0.7565rem] bg-white 
            shadow-[0_0_15.13px_-6.657px_rgba(0,0,0,0.25)] font-[Poppins] overflow-hidden

            new-sm:w-[8.4rem] new-sm:h-[17rem]
            new-sm-1:w-[9.325rem] new-sm-1:h-[17rem]
            new-sm-2:w-[11.42325rem] new-sm-2:h-[17.4375rem]
            new-sm-3:w-[11.42325rem] new-sm-3:h-[17.4375rem]
            sm:w-[12rem] sm:h-[19rem]
            md:w-[14rem] md:h-[22rem]
            lg:w-[16rem] lg:h-[26rem]
            2xl:w-[18rem] 2xl:h-[29rem] 2xl:shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)]
          "
      >
        {/* Product Image */}
        <div
          className="
    flex flex-shrink-0 bg-cover bg-center bg-no-repeat
    new-sm:w-full new-sm:h-[9.22938rem] new-sm:rounded-t-[0.7565rem]
    new-sm-1:w-full new-sm-1:h-[9.22938rem] new-sm-1:rounded-t-[0.7565rem]
    new-sm-2:w-full new-sm-2:h-[9.22938rem] new-sm-2:rounded-t-[0.7565rem]
    new-sm-3:w-full new-sm-3:h-[9.22938rem] new-sm-3:rounded-t-[0.7565rem]

    sm:w-full sm:h-[10rem] sm:rounded-t-[0.9rem]
    md:w-[14rem] md:h-[11rem] md:rounded-t-[1rem]
    lg:w-[16rem] lg:h-[13rem] lg:rounded-t-[1.1rem]
    2xl:w-[100%] 2xl:h-[55%] 2xl:rounded-t-[1.25rem]
  "
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
        >
          {/* Tag Container */}
          <div className="w-[50%] flex items-end">
            <div
              className={`
        new-sm-1:ml-[0.5rem] new-sm:ml-[0.5rem] mb-[0.5rem] text-white font-semibold capitalize rounded-full flex items-center justify-center

        new-sm:min-w-[3.22519rem] new-sm:h-[1.13831rem] new-sm:text-[0.39388rem] new-sm:rounded-[3.78256rem]
        new-sm-1:min-w-[3.70519rem] new-sm-1:text-[0.45388rem] new-sm-1:rounded-[3.78256rem]
        new-sm-2:min-w-[3.90519rem] new-sm-2:h-[1.13831rem] new-sm-2:text-[0.45388rem] new-sm-2:rounded-[3.78256rem]
        new-sm-3:min-w-[3.90519rem] new-sm-3:h-[1.13831rem] new-sm-3:text-[0.45388rem] new-sm-3:rounded-[3.78256rem]

        sm:min-w-[4.5rem] sm:h-[1.25rem] sm:text-[0.5rem]
        md:min-w-[4.5rem] md:h-[1.4rem] md:text-[0.65rem]
        lg:min-w-[5rem] lg:h-[1.6rem] lg:text-[0.7rem]
        2xl:min-w-[5.32906rem] 2xl:h-[1.88088rem] 2xl:text-[0.75rem]

        ${tags === "Best Seller" ? "bg-[#FFC400]" : "bg-[#1A9AEF]"}
      `}
            >
              {tags}
            </div>
          </div>

          {/* Heart Icon */}
          <div className="w-[50%] flex justify-end">
            <button
              className="
        flex justify-center items-center bg-white rounded-full 
        mt-[0.5rem] new-sm-1:mr-[0.5rem] new-sm:mr-[0.5rem]

        new-sm:w-[1.13475rem] new-sm:h-[1.13475rem]
        new-sm-1:w-[1.13475rem] new-sm-1:h-[1.13475rem]
        new-sm-2:w-[1.13475rem] new-sm-2:h-[1.13475rem]
        new-sm-3:w-[1.13475rem] new-sm-3:h-[1.13475rem]

        sm:w-[1.4rem] sm:h-[1.4rem]
        md:w-[1.6rem] md:h-[1.6rem]
        lg:w-[1.75rem] lg:h-[1.75rem]
        2xl:w-[1.875rem] 2xl:h-[1.875rem]
      "
              onClick={handleLikeProduct}
            >
              <div
                className="
        relative 
        new-sm:w-[0.9rem] new-sm:h-[0.9rem]
        new-sm-1:w-[0.9rem] new-sm-1:h-[0.9rem]
        new-sm-2:w-[0.9rem] new-sm-2:h-[0.9rem]
        new-sm-3:w-[0.9rem] new-sm-3:h-[0.9rem]

        sm:w-[1.1rem] sm:h-[1.1rem]
        md:w-[1.3rem] md:h-[1.3rem]
        lg:w-[1.4rem] lg:h-[1.4rem]
        2xl:w-[1.5rem] 2xl:h-[1.5rem]
      "
              >
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
              <p
                className="
          text-[#697F75] font-medium

          new-sm:text-[0.3rem]
          new-sm-1:text-[0.3rem]
          new-sm-2:text-[0.4rem]
          new-sm-3:text-[0.45rem]

          sm:text-[0.45rem]
          md:text-[0.75rem]
          lg:text-[0.85rem]
          2xl:text-[0.9375rem]
        "
              >
                {collection}
              </p>

              {/* Rating Section */}
              <div className="flex justify-center items-center new-sm-1:gap-[0.2rem] new-sm:gap-[0.1rem]">
                <div
                  className="
            relative flex-shrink-0

            new-sm:w-[0.3rem] new-sm:h-[0.91063rem]
            new-sm-1:w-[0.3rem] new-sm-1:h-[0.91063rem]
            new-sm-2:w-[0.4rem] new-sm-2:h-[0.91063rem]
            new-sm-3:w-[0.45rem] new-sm-3:h-[0.91063rem]

            sm:w-[1rem] sm:h-[1rem]
            md:w-[1.2rem] md:h-[1.2rem]
            lg:w-[1.4rem] lg:h-[1.4rem]
            2xl:w-[1.50469rem] 2xl:h-[1.50469rem]
          "
                >
                  <Image
                    src="/assets/images/ExploreImages/star.svg"
                    alt="rating"
                    fill
                  />
                </div>
                <span
                  className="
            text-[#697F75] font-medium flex items-center

            new-sm:text-[0.3rem]
            new-sm-1:text-[0.3rem]
            new-sm-2:text-[0.4rem]
            new-sm-3:text-[0.45rem]

            sm:text-[0.45rem]
            md:text-[0.75rem]
            lg:text-[0.85rem]
            2xl:text-[0.9375rem]
          "
                >
                  4.8 <span className="text-[#B0B0B0]">&nbsp;(81)</span>
                </span>
              </div>
            </div>

            {/* Product Name */}
            <p
              className="
        text-[#000] text-start font-semibold leading-[130%] w-full

        new-sm:text-[0.6rem]
        new-sm-1:text-[0.6rem]
        new-sm-2:text-[0.7rem]
        new-sm-3:text-[0.75rem]

        sm:text-[0.75rem]
        md:text-[1.15rem]
        lg:text-[1.25rem]
        2xl:text-[1.4rem]
      "
            >
              {name}
            </p>
          </div>

          {/* Product Size */}
          <p
            className="
      text-start text-[#697F75] font-medium

      new-sm:text-[0.3rem]
      new-sm-1:text-[0.3rem]
      new-sm-2:text-[0.4rem]
      new-sm-3:text-[0.45rem]

      sm:text-[0.45rem]
      md:text-[0.75rem]
      lg:text-[0.85rem]
      2xl:text-[0.9375rem]
    "
          >
            {`Product Size - ${productSize}" Pot`}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <p
              className="
        text-[#56A430] font-semibold leading-[130%]

        new-sm:text-[0.6rem]
        new-sm-1:text-[0.6rem]
        new-sm-2:text-[0.7rem]
        new-sm-3:text-[0.75rem]

        sm:text-[0.75rem]
        md:text-[1.15rem]
        lg:text-[1.25rem]
        2xl:text-[1.4rem]
      "
            >
              ₹ {price}
            </p>
            <p
              className="
        text-[#CBD0D3] font-semibold leading-[130%] line-through

        new-sm:text-[0.4rem]
        new-sm-1:text-[0.4rem]
        new-sm-2:text-[0.5rem]
        new-sm-3:text-[0.55rem]

        sm:text-[0.55rem]
        md:text-[1rem]
        lg:text-[1.15rem]
        2xl:text-[1.25rem]
      "
            >
              ₹ {compareAt}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="
      flex items-center justify-center gap-2 bg-[#56A430] hover:bg-[#213E12] rounded-[0.37825rem]

      new-sm:w-[7.43444rem] new-sm:h-[1.73513rem]
      new-sm-1:w-[8.43444rem] new-sm-1:h-[1.93513rem]
      new-sm-2:w-[10.43444rem] new-sm-2:h-[1.93513rem]
      new-sm-3:w-[10.43444rem] new-sm-3:h-[1.93513rem]

      sm:w-[11rem] sm:h-[2.2rem]
      md:w-[13.5rem] md:h-[2.6rem]
      lg:w-[15rem] lg:h-[3rem]
      2xl:w-[16.5rem] 2xl:h-[3.19744rem] 2xl:rounded-[0.625rem]
    "
          >
            <div
              className="
        relative flex-shrink-0

        new-sm:w-[0.8375rem] new-sm:h-[0.9375rem]
        new-sm-1:w-[0.9075rem] new-sm-1:h-[0.9375rem]
        new-sm-2:w-[0.9375rem] new-sm-2:h-[0.9375rem]
        new-sm-3:w-[0.9375rem] new-sm-3:h-[0.9375rem]

        sm:w-[1.1rem] sm:h-[1.1rem]
        md:w-[1.3rem] md:h-[1.3rem]
        lg:w-[1.45rem] lg:h-[1.45rem]
        2xl:w-[1.53806rem] 2xl:h-[1.50469rem]
      "
            >
              <Image
                src="/assets/images/ExploreImages/shopping-cart.svg"
                alt="cart icon"
                fill
              />
            </div>
            <span
              className="
        text-white text-center font-medium

      new-sm:text-[0.5rem]
      new-sm-1:text-[0.5rem]
      new-sm-2:text-[0.6rem]
      new-sm-3:text-[0.65rem]

      sm:text-[0.65rem]
      md:text-[0.95rem]
      lg:text-[0.85rem]
      2xl:text-[0.9375rem]
      "
            >
              Add to Cart
            </span>
          </button>
        </div>
      </Link>
    );
  }
);
