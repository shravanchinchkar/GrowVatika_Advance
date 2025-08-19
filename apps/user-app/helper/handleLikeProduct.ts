import toast from "react-hot-toast";
import { TProductData } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";
import { isLikeProductPresent, useWishListStore } from "@repo/shared-store";

type handleLikeProductProps = {
  e: any;
  productData: TProductData | any;
  likeProductData: TProductData[];
  toggleLikeProductData: (data: TProductData) => void;
  isLikeProductPresent: (
    likeProductData: TProductData[],
    data: TProductData
  ) => boolean;
};

export const handleLikeProduct = ({
  e,
  productData,
  likeProductData,
  toggleLikeProductData,
  isLikeProductPresent,
}: handleLikeProductProps) => {
  e.preventDefault();
  toggleLikeProductData(productData);
  const result = isLikeProductPresent(likeProductData, productData);
  if (result) {
    setTimeout(() => {
      toast("Product UnLiked!", {
        icon: "💔",
        ...toastStyle,
      });
    }, 500);
  } else {
    setTimeout(() => {
      toast("Product Liked!", {
        icon: "❤️",
        ...toastStyle,
      });
    }, 500);
  }
};
