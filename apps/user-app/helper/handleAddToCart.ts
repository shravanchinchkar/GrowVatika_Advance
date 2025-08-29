import toast from "react-hot-toast";
import { TAddtoCartandWishList } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";

type HandleAddToCartProps = {
  e: any;
  transformProductData: TAddtoCartandWishList;
  setLoading: (newValue: boolean) => void;
  addNewProduct: (data: TAddtoCartandWishList) => void;
};

export const handleAddToCart = ({
  e,
  transformProductData,
  addNewProduct,
  setLoading,
}: HandleAddToCartProps) => {
  e.preventDefault();
  setLoading(true);
  addNewProduct(transformProductData);
  setTimeout(() => {
    setLoading(false);
    toast("Product added to cart!", {
      icon: "🛒",
      ...toastStyle,
    });
  }, 500);
};
