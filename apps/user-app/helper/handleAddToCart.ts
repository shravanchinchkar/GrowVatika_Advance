import toast from "react-hot-toast";
import { SellerProductData } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";

type HandleAddToCartProps = {
  e: any;
  productData: SellerProductData | any;
  setLoading: (newValue: boolean) => void;
  addNewProduct: (data: SellerProductData) => void;
};

export const handleAddToCart = ({
  e,
  productData,
  addNewProduct,
  setLoading,
}: HandleAddToCartProps) => {
  e.preventDefault();
  setLoading(true);
  addNewProduct(productData);
  setTimeout(() => {
    setLoading(false);
    toast("Product added to cart!", {
      icon: "🛒",
      ...toastStyle,
    });
  }, 500);
};
