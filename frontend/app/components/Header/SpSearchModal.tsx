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

const SpSearchModal = ({ isOpen, onClose }: Props) => {
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
          ? 'fixed top-0 left-0 z-2 w-full h-full transform-[translateX(0)] bg-[#22222299] transition'
          : 'fixed top-0 left-0 z-2 w-full h-full transform-[translateX(-100vw)] transition'
      }
    >
      <div className="bg-white w-[90%] h-full px-4 py-5">
        <button type="button" onClick={onClose} className="text-[28px] cursor-pointer">
          <IoCloseOutline />
        </button>
        <form className="px-1 mt-4" onSubmit={handleSearchSubmit}>
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
  );
};

export default SpSearchModal;
