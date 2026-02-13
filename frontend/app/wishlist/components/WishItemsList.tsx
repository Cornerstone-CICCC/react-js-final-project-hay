"use client"
import type { WishList } from '@/app/types/wishList.types';
import WishiItem from './WishiItem';
import { useAuthStore } from '@/app/store/auth.store';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWishlistStore } from '@/app/store/wishlist.store';


export type WishLists ={
  wishlistId:string,
  productId:string,
  image:string,
  name:string,
  price:number
}

const WishItemsList = () => {
  const user= useAuthStore(state=>state.user)
  const wishItems = useWishlistStore(state=>state.wishItems)
  const removeWishItem = useWishlistStore(state=>state.removeWishItem)
  const [data, setData] = useState<WishLists[]>([])
  if(!user){
    redirect("/login")
  }
  //get userId from store
  const userId = user.id

  useEffect(()=>{
    const fetchData = async()=>{
      //fetch wish list
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${userId}`)
      const data = await res.json() as WishLists[]
      console.log(data)
      setData(data??[])
    }
    console.log("fetching")

    fetchData()
  },[wishItems])

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
          <WishiItem item={item} key={`wish-${item.wishlistId}`} />
        ))}
      </div>
    </div>
  );
};

export default WishItemsList;
