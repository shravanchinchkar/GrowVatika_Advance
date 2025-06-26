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
  responseData?:any
}
