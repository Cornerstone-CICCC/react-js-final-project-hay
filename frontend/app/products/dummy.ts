import type { Product } from '../types/products.type';

export const product: Omit<Product, '_id'> = {
  name: 'Rosy Refresh - Set of 2 Couple Wedding 24K Rose Gold Ring',
  price: 1199,
  stock: 10,
  description:
    'Discover timeless elegance with our Rose Gold Ring. Crafted from Pure Gold, this stunning piece features a delicate infinity symbol, representing eternal love and connection. Its sleek design and polished finish make it a perfect accessory for wedding, adding a touch of sophistication to your everyday look. Embrace the beauty of infinity with this exquisite piece that promises to become a cherished.',
  image: '/assets/products/dummy_ring.svg',
  category: 'rings',
};
