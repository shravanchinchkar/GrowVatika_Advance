import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { SellerProductData } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";
import { handleAddToCart } from "@/helper/handleAddToCart";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import {
  useAddToCardStore,
  useWishListStore,
  isLikeProductPresent,
} from "@repo/shared-store";

type WishListCardProps = {
  product: SellerProductData;
};

export const WishListCard = ({ product }: WishListCardProps) => {
  const { likeProductData, removeProductData } = useWishListStore();
  const { addNewProduct } = useAddToCardStore();

  const [loading, setLoading] = useState(false);

  return (
    <div
      key={product.id}
      className="new-sm:w-[100%] new-sm:h-[9.4rem] new-sm-2:h-[10rem] md:w-[95%] lg:w-[95%] md:h-[12.1875rem] bg-[#EDE7E4] rounded-[1.25rem] flex flex-col justify-center items-center md:gap-[0.5rem] new-sm:p-[0.2rem] md:p-[0.5rem]"
    >
      <div className="w-[95%] new-sm:h-[87%] md:h-[92%] flex flex-col justify-between">
        {/* Product Data */}
        <div className="w-[100%] flex justify-between gap-[1rem]">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            <div className="relative new-sm:w-[5.2rem] new-sm:h-[4.6rem] new-sm-1:w-[6.52188rem] new-sm-1:h-[5.26769rem] new-sm-2:w-[6.9rem] new-sm-2:h-[5.7rem] md:w-[8.125rem] md:h-[6.5625rem] rounded-[1.25rem] border-[1.6px] border-white overflow-hidden">
              <Image
                className="object-cover"
                src={product.imageURL}
                alt={product.name ? product.name : "Product"}
                fill
              />
            </div>
          </div>

          {/* product content */}
          <div className="flex w-[70%] flex-col justify-between ">
            <div>
              {/* Product Name */}
              <div className="new-sm:text-[0.8rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium leading-[20px]">
                {product.name}
              </div>
              {/* Product Size */}
              <div className="new-sm:text-[0.625rem] md:text-[0.9375rem] text-[#606060]">
                {`Pot - ${product.productSize || 'Strelitzia Nicolai - 10" Premium Pot'}" Premium Pot`}
              </div>
              {/* Product Collection */}
              <div className="new-sm:text-[0.75rem] md:text-[0.9375rem] leading-[20px]">
                {`${product.collection ? product.collection : "Indoor Plant"}`}
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              {/* Product Price */}
              <div className="new-sm:text-[0.9rem] new-sm-1:text-[1rem] md:text-[1.25rem] font-medium">
                ₹ {product.price}
              </div>
              <button
                className="new-sm:w-[1.5rem] new-sm:h-[1.5rem] new-sm-1:w-[1.70569rem] new-sm-1:h-[1.70569rem] md:w-[2.125rem] md:h-[2.125rem] bg-white rounded-[0.3125rem] flex justify-center items-center"
                onClick={(e) => {
                  e.preventDefault();
                  removeProductData(product);
                  const result = isLikeProductPresent(likeProductData, product);
                  if (result) {
                    setTimeout(() => {
                      toast("Product Removed!", {
                        icon: "💔",
                        ...toastStyle,
                      });
                    }, 500);
                  }
                }}
              >
                <div className="relative new-sm:w-[1.1rem] new-sm:h-[1.1rem] new-sm-1:w-[1.23431rem] new-sm-1:h-[1.23431rem] md:w-[1.25rem] md:h-[1.25rem]">
                  <Image
                    className="object-contain"
                    src="/assets/images/WishListImages/trashIcon.svg"
                    alt="trashIcon"
                    fill
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          className="new-sm:w-[100%] new-sm:h-[1.9375rem] md:w-[100%] md:h-[2.7rem]  bg-[#56A430] hover:bg-[#213E12]  new-sm:rounded-[0.37825rem] md:rounded-[0.625rem] flex justify-center items-center gap-[1.42rem] text-[#fff] new-sm:text-[0.74238rem] md:text-[1.22669rem] outline-none"
          onClick={(e) => {
            const productData = product;
            handleAddToCart({
              e,
              productData,
              addNewProduct,
              setLoading,
            });
          }}
        >
          {loading ? (
            <ButtonLoadingSign />
          ) : (
            <>
              <div className="relative new-sm:w-[0.9375rem] new-sm:h-[0.9375rem] md:w-[1.5rem] md:h-[1.5rem]">
                <Image
                  className="object-contain"
                  src="/assets/images/CommonImages/addToCartIcon.svg"
                  alt="addToCartIcon"
                  fill
                />
              </div>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
