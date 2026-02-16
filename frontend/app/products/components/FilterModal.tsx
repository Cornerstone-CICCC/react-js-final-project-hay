'use client';
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from 'react';
import type { Availability, Category } from '@/app/types/products.type';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FilterQuery } from './ProductList';

type Props = {
  setQuery: (newQuery: FilterQuery) => void;
  onClose: () => void;
  categoryPage?: string;
};

const FilterModal = ({ setQuery, onClose, categoryPage }: Props) => {
  const [formData, setFormData] = useState<FilterQuery>({
    availability: ['in-stock', 'out-stock'],
    category: ['necklaces', 'earrings', 'rings', 'bracelets', 'ankle-wear'],
  });
  const availability = [
    {
      dataType: 'availability',
      label: 'In Stock',
      name: 'in-stock',
    },
    {
      dataType: 'availability',
      label: 'Out of Stock',
      name: 'out-stock',
    },
  ];
  const categories: {
    dataType: 'category';
    label: string;
    name: Category;
  }[] = [
    {
      dataType: 'category',
      label: 'Necklaces',
      name: 'necklaces',
    },
    {
      dataType: 'category',
      label: 'Earrings',
      name: 'earrings',
    },
    {
      dataType: 'category',
      label: 'Rings',
      name: 'rings',
    },
    {
      dataType: 'category',
      label: 'Bracelets',
      name: 'bracelets',
    },
    {
      dataType: 'category',
      label: 'Ankle Wear',
      name: 'ankle-wear',
    },
  ];

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    console.log(target.getAttribute('data-type'));

    if (target.getAttribute('data-type') === 'availability') {
      const value = target.name as Availability;
      setFormData((prev) => ({
        ...prev,
        availability: prev.availability.includes(value)
          ? prev.availability.filter((item) => item !== value)
          : [...prev.availability, value],
      }));
    } else if (target.getAttribute('data-type') === 'category') {
      const value = target.name as Category;
      setFormData((prev) => ({
        ...prev,
        category: prev.category.includes(value)
          ? prev.category.filter((item) => item !== value)
          : [...prev.category, value],
      }));
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(formData);
    onClose();
  };

  useEffect(() => {
    if (!categoryPage) return;

    setFormData({
      availability: ['in-stock', 'out-stock'],
      category: [categoryPage as Category],
    });
  }, [categoryPage]);

  return (
    <div className="absolute z-10 top-[100%] left-0 w-full h-screen bg-black/30">
      <div className="bg-white max-w-[97vw] py-4 md:w-[30%] md:max-w-[350px] md:p-6">
        <form onSubmit={handleSubmit}>
          <Accordion
            type="multiple"
            className="max-w-[90vw] mx-auto"
            defaultValue={['notifications']}
          >
            <AccordionItem key="availability" value="availability">
              <AccordionTrigger className="font-bold">Availability</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {availability.map((item) => (
                    <div key={item.name} className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        data-type={item.dataType}
                        name={item.name}
                        checked={formData.availability.includes(item.name as Availability)}
                        onChange={(e) => handleOnChange(e)}
                      />
                      <label>{item.label}</label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {!categoryPage && (
              <AccordionItem key="category" value="category">
                <AccordionTrigger className="font-bold">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {categories.map((item) => (
                      <div key={item.name} className="flex gap-4">
                        <input
                          type="checkbox"
                          name={item.name}
                          data-type={item.dataType}
                          checked={formData.category.includes(item.name)}
                          onChange={(e) => handleOnChange(e)}
                        />
                        <label>{item.label}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          <div className="w-full my-4 flex justify-center">
            <button
              className="w-fit px-10 py-2 bg-[#008FAB] text-white rounded-xl shadow-xl cursor-pointer"
              type="submit"
            >
              View Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
