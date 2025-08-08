export type TSingleProductData= {
  price: number;
  compareAt: number;
  productSize: number;
  productQuantity: number;
  name: string;
  description: string;
  imageURL: string;
  category: string;
  collection: string;
  tags: string;
  seller: {
    nurseryName: string;
    address: string;
    profilePictureURL: string;
  };
};
