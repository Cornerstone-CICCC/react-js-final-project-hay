'use client';
import { useEffect, useState } from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import type { Availability, Category, Product } from '../../types/products.type';
import { product } from '../dummy';
import ItemCard from './ItemCard';
import FilterModal from './FilterModal';

export interface FilterQuery {
  availability: Availability[];
  category: Category[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<FilterQuery>(    {
      availability:["in-stock", "out-stock"],
      category:['necklaces' , 'earrings' , 'rings' , 'bracelets' , 'ankle-wear']
    });

  const handleSetQuery=(newQuery:FilterQuery)=>{
    setQuery(newQuery)
  }

  const onCloseModal = ()=>{
    setFilterModalOpen(false)
  }

  useEffect(() => {
    console.log(query)
    //setting up dummy data
    for (let i = 0; i < 20; i++) {
      const newProduct = {
        _id: `${i + 1}`,
        ...product,
      };
      setProducts((prev) => [...prev, newProduct]);
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
        {filterModalOpen&&
      <FilterModal
      setQuery={handleSetQuery}
      onClose={onCloseModal}/>}

        <div>
          <div>{products.length} products</div>

          <div></div>
        </div>
      </div>
      <div className="py-4 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 max-w-350 mx-auto">
          {products.map((item, i) => (
            <ItemCard product={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
