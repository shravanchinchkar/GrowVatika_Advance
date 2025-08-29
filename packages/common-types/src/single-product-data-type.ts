import { ProductSizeVariant } from "./product-data-type";

export type TSingleProductData = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  category: string;
  collection: string;
  tags: string;
  productSizeVariant: ProductSizeVariant[];
  seller: {
    nurseryName: string;
    address: string | null;
    profilePictureURL: string | null;
  };
};
