export type ProductSizeVariant = {
  size: string;
  price: string;
  compareAt: string;
  quantity: number;
};

export type TProductData = {
  id: string;
  name: string;
  tags: string;
  imageURL: string;
  category: string;
  collection: string;
  productSizeVariant: ProductSizeVariant[];
};
