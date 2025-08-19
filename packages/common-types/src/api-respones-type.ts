import { TProductData } from "./product-data-type.js";
import { TSingleProductData } from "./single-product-data-type.js";

type SellerData = {
  nurseryName: string;
  email: string;
  phoneNumber: string;
};

export interface ApiResponseType {
  success: boolean;
  message?: string;
  error?: any;
  status?: string;
  sellerData?: SellerData;
  responseData?: any;
  totalProductsCount?: number;
  totalPages?: number;
}

export type TApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
  totalPages?: number;
  totalProductsCount?: number;
  productsData?: TProductData[];
  filterProductsData?: TProductData[];
  singleProductData?: TSingleProductData;
  totalFilterProductsCount?: number;
};
