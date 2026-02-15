'use client';

import { useRouter } from 'next/navigation';
import { type SubmitEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { useSearchTermStore } from '@/app/store/searchTerm.store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchModal = ({ isOpen, onClose }: Props) => {
  const [keywordInput, setKeywordInput] = useState<string>('');
  const setSearchTerm = useSearchTermStore((s) => s.setSearchTerm);
  const router = useRouter();

  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keywordInput.trim()) return;

    setSearchTerm(keywordInput);
    router.push('/products');

    onClose();
    setKeywordInput('');
  };

  return (
    <div
      className={
        isOpen
          ? 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(0)] bg-[#22222299] hidden md:block'
          : 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(100vw)] hidden md:block'
      }
    >
      <div className="max-w-5xl mx-auto w-full h-full relative">
        <div className="bg-white absolute top-[115px] right-0">
          <div className="w-[575] bg-[#E9F4F34D] px-13 pt-8 pb-13">
            <button
              type="button"
              className="text-[30px] cursor-pointer absolute top-[18px] right-[18px]"
              onClick={onClose}
            >
              <IoCloseOutline />
            </button>
            <p className="text-center font-semibold text-2xl">Search</p>
            <form className="mt-8" onSubmit={handleSearchSubmit}>
              <div className="flex border border-slate-500 bg-slate-100 rounded-xl">
                <input
                  type="text"
                  name="keyword"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  className="px-5 py-3 w-full outline-none"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="min-w-[48] flex justify-center items-center cursor-pointer text-[20px]"
                >
                  <FiSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
