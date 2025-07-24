export type TSingleProductData = {
  name: string;
  price: number;
  compareAt: number;
  description: string;
  imageURL: string;
  category: string;
  collection: string;
  productQuantity: number;
  productSize: number;
  tags: string;
  seller: {
    nurseryName: string;
    address: string;
    profilePictureURL: string;
  };
};
