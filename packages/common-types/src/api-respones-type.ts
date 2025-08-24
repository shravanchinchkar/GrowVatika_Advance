import { TProductData } from "./product-data-type.js";
import { TAdminDashboardNurseriesData } from "./admin.js";
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
  error?: string;
  success: boolean;
  message?: string;
  totalPages?: number;
  totalProductsCount?: number;
  totalNurseryCount?: number;
  productsData?: TProductData[];
  totalFilterProductsCount?: number;
  filterProductsData?: TProductData[];
  singleProductData?: TSingleProductData;
  adminNurseriesData?: TAdminDashboardNurseriesData[];
};
