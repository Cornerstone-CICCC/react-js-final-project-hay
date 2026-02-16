'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { PiHeartFill } from 'react-icons/pi';
import useSocketStore from '../store/socket.store';

const TrendingList = () => {
  const trendingProducts = useSocketStore((s) => s.trendingProducts);
  const initializeSocket = useSocketStore((s) => s.initializeSocket);

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  if (!trendingProducts || trendingProducts.length === 0) {
    return <p>No Trending items right now.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-[16px]">
      {trendingProducts.map((p) => {
        const detail = p.productDetail;
        if (!detail) return null;

        return (
          <li key={p.productId} className="w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/4)]">
            <Link href={`/products/${p.productId}`}>
              <div>
                <Image
                  src={`/assets/shine_studio_images/${detail.image}`}
                  alt={detail.name}
                  width={300}
                  height={300}
                  className="w-full"
                />
              </div>
              <p className="mt-3 leading-4.5 text-sm">{detail.name}</p>
              <div className="flex justify-between mt-2">
                <p className="font-bold text-lg">${detail.price}</p>
                <div className="flex items-center">
                  <PiHeartFill className="text-[#008FAB]" />
                  <span className="text-sm ml-1 inline-block">{p.productNum}</span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TrendingList;
