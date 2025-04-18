type SellerData = {
  nurseryName: string;
  email: string;
  phoneNumber: string;
};

export interface ApiResponseType {
  success: boolean;
  message?: string;
  error?: string;
  status?: string;
  sellerData?: SellerData;
}
