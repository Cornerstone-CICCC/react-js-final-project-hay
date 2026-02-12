import type { Product } from './products.type';

export interface WishList {
  _id: string;
  userId: string;
  productId: Product;
}
