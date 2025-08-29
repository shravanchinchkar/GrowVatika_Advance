import toast from "react-hot-toast";
import { toastStyle } from "@repo/shared/utilfunctions";
import { TAddtoCartandWishList } from "@repo/common-types";

type handleLikeProductProps = {
  e: any;
  transformProductData: TAddtoCartandWishList | any;
  likeProductData: TAddtoCartandWishList[];
  toggleLikeProductData: (data: TAddtoCartandWishList) => void;
  isLikeProductPresent: (
    likeProductData: TAddtoCartandWishList[],
    data: TAddtoCartandWishList
  ) => boolean;
};

export const handleLikeProduct = ({
  e,
  transformProductData,
  likeProductData,
  toggleLikeProductData,
  isLikeProductPresent,
}: handleLikeProductProps) => {
  e.preventDefault();
  toggleLikeProductData(transformProductData);
  const result = isLikeProductPresent(likeProductData, transformProductData);
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
