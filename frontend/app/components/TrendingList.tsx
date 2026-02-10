'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type Product = {
  id: string;
  title: string;
  price: number;
  imagePath: string;
};

const TrendingList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // connect Socket.IO server
    const socket = io('http://localhost:3000');
    // receive trending items
    socket.on('trendingItems', (data: Product[]) => {
      setProducts(data);
      setLoading(false);
    });
    return () => {
      // clean up
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <p>Loading trending items...</p>;
  }
  if (products.length === 0) {
    return <p>No Trending items right now.</p>;
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Image src={`/assets/products/${p.imagePath}`} alt={p.title} width={200} height={200} />
          <p>{p.title}</p>
          <p>{p.price.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  );
};

export default TrendingList;
