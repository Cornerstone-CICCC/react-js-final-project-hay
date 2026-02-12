'use client';
import { useEffect, useState } from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import type { Availability, Category, Product } from '../../types/products.type';
import { product } from '../dummy';
import FilterModal from './FilterModal';
import ItemCard from './ItemCard';

export interface FilterQuery {
  availability: Availability[];
  category: Category[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterQuery | null>(null);

  const handleSetQuery = (newQuery: FilterQuery) => {
    setQuery(newQuery);
  };

  const onCloseModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    console.log(query);
    //setting up dummy data
    for (let i = 0; i < 20; i++) {
      const newProduct = {
        _id: `${i + 1}`,
        ...product,
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    if (query) {
      setProducts((prev) =>
        prev.filter(
          (item) =>
            query.category.includes(item.category) &&
            query.availability.includes('in-stock') &&
            item.stock > 0 &&
            query.availability.includes('out-stock') &&
            item.stock === 0,
        ),
      );
    }
  }, [query]);

  return (
    <div className="pt-4">
      <div className="relative py-4 px-5 border-b w-full flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setFilterModalOpen((prev) => !prev)}
        >
          Filter
          <TbAdjustmentsHorizontal className="text-xl text-[#008FAB]" />
        </div>
        {filterModalOpen && <FilterModal setQuery={handleSetQuery} onClose={onCloseModal} />}

        <div>
          <div>{products.length} products</div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="w-full pt-20 text-2xl flex justify-center">No Matching Products Found</div>
      ) : (
        <div className="py-4 px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 max-w-350 mx-auto">
            {products.map((item, i) => (
              <ItemCard product={item} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
