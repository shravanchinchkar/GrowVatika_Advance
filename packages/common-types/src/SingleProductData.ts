export type TSingleProductData = {
  price: string;
  compareAt: string;
  productSize: string;
  productQuantity: string;
  name: string;
  description: string;
  imageURL: string;
  category: string;
  collection: string;
  tags: string;
  seller: {
    nurseryName: string;
    address: string | null;
    profilePictureURL: string | null;
  };
};
