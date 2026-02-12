export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  stock: number;
  category: Category;
}

export type Availability = 'in-stock' | 'out-stock'
export type Category = 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'ankle-wear';
