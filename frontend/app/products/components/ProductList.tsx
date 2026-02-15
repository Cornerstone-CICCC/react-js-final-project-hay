'use client';
import { useEffect, useState } from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { useSearchTermStore } from '@/app/store/searchTerm.store';
import type { Availability, Category, Product } from '../../types/products.type';
import FilterModal from './FilterModal';
import ItemCard from './ItemCard';

export interface FilterQuery {
  availability: Availability[];
  category: Category[];
}

type Props = {
  data: Product[];
  categoryPage?:string
};

const ProductList = ({ data , categoryPage}: Props) => {
  const searchTeem = useSearchTermStore((state) => state.searchTerm);
  const [products, setProducts] = useState<Product[]>(data);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterQuery | null>(null);

  const handleSetQuery = (newQuery: FilterQuery) => {
    setQuery(newQuery);
  };

  const onCloseModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    setProducts(data);

    if (query) {
      setProducts((prev) =>
        prev.filter((item) => {
          const categoryMatch =
            query.category.length === 0 || query.category.includes(item.category);

          const availabilityMatch =
            query.availability.length === 0 ||
            (query.availability.includes('in-stock') && item.stock > 0) ||
            (query.availability.includes('out-stock') && item.stock === 0);

          return categoryMatch && availabilityMatch;
        }),
      );
    }

    //filter out with product name
    if (searchTeem) {
      setProducts((prev) =>
        prev.filter((item) => item.name.toLowerCase().includes(searchTeem.toLowerCase())),
      );
    }
  }, [query, searchTeem]);

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
        {filterModalOpen && <FilterModal setQuery={handleSetQuery} onClose={onCloseModal} categoryPage={categoryPage} />}

        <div>
          <div>{products.length} products</div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="w-full pt-20 text-2xl flex justify-center">No Matching Products Found</div>
      ) : (
        <div className="py-4 px-8">
          <div
          className='max-w-350 mx-auto'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
          {searchTeem && (
            <>
            <div className="font-bold my-4 text-lg md:text-xl w-62.5 justify-self-center">
              Showing "{searchTeem}" Result...</div>
            <div className='hidden sm:block'></div>
            <div className='hidden lg:block'></div>
            <div className='hidden lg:block'></div>
            </>
          )}
            {products.map((item, i) => (
              <ItemCard product={item} key={i} />
            ))}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
