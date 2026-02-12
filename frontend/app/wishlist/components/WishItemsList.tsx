import { product } from '@/app/products/dummy';
import type { WishList } from '@/app/types/wishList.types';
import WishiItem from './WishiItem';

const WishItemsList = () => {
  //get userId from store

  //fetch wish list

  const data: WishList[] = [
    {
      _id: '12',
      userId: '22',
      productId: {
        _id: '1',
        ...product,
      },
    },
    {
      _id: '1',
      userId: '22',
      productId: {
        _id: '2',
        ...product,
      },
    },
    {
      _id: '1',
      userId: '212',
      productId: {
        _id: '3',
        ...product,
      },
    },
    {
      _id: '1',
      userId: '226',
      productId: {
        _id: '8',
        ...product,
      },
    },
  ];

  return (
    <div>
      <div className="mx-auto">
        <h2 className="text-3xl text-[#008FAB] font-bold pt-6 pb-3">
          Wishlist
          <span className="text-sm text-[#4D4C4C] ps-4">({data.length} products)</span>
        </h2>
        <div className="text-[10px] px-2">
          Welcome to your Wishlist! Here, you can curate all your favorite pieces, making it easy to
          find that perfect sparkle whenever you need it. From timeless classics to trendy designs,
          your dream jewelry is just a click away. Start adding today and keep your style shining
          bright!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-350 mx-auto py-8 md:py-4 gap-10 md:gap-4 px-6 ">
        {data.map((item) => (
          <WishiItem item={item} key={`wish-${item._id}`} />
        ))}
      </div>
    </div>
  );
};

export default WishItemsList;
