'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { PiHeartFill, PiHeartThin } from 'react-icons/pi';
import useSocketStore from '@/app/store/socket.store';
import type { Product } from '@/app/types/products.type';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';
import { useAuthStore } from '@/app/store/auth.store';
import toast from 'react-hot-toast';

type Props = {
  product: Product;
};
interface CartItemReturn{
  _id:string,
  cartId:string,
  productId:Product,
  quantity:number
}

const ItemDetail = ({ product }: Props) => {
  const user = useAuthStore(state=>state.user)
  const joinItem = useSocketStore(state=>state.joinItem);
  const leaveItem = useSocketStore(state=>state.leaveItem)
  const shopperCounter = useSocketStore(state=>state.shopperCounter)
  const setCart = useCartStore(state=>state.setCart) 
  const cartId = useCartStore(state=>state.cartId)
  const cartItems = useCartStore(state=>state.cartItems)
  const {setWishlist,wishItems, removeWishItem } = useWishlistStore(state=>state)

  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleWishList =()=>{
  }

  const addToCart = async()=>{
    //api request
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/update`,{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        cartId,
        productId:product._id,
        quantity
      })
    })

    if(!res.ok){
      console.log("Error adding items")
      return
    }

    const data :CartItemReturn= await res.json()

    //updating store
    let updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find((i) => i.cartItemId === data._id);

    if (existingItem) {
      existingItem.quantity = data.quantity;
    }else{
      updatedCartItems = [...updatedCartItems, 
        {
          cartItemId: data._id,
          productId: data.productId._id,
          image: data.productId.image,
          name: data.productId.name,
          price: data.productId.price,
          stock: data.productId.stock,
          cartId: data.cartId,
          quantity: data.quantity
      }]
    }
    setCart(updatedCartItems)
    setQuantity(1)
    toast("Item added to your cart")
  }

  useEffect(() => {
    if(!user) return
    //set liked and in bag
    const find = wishItems.find(i=>i.productId === product._id)
    setIsLiked(find?true:false)

    //socket
    const socketData = {
      productId: product._id,
      userId: user.id,
    };

    joinItem(socketData);

    const handleChange = () => {
      if (document.hidden) {
        leaveItem(socketData);
      } else {
        joinItem(socketData);
      }
    };

    const handleBeforeUnload = () => {
      leaveItem(socketData);
    };
    toast(`${shopperCounter} people are interested in this item!`)
    document.addEventListener('handleChange', handleChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      leaveItem(socketData);
      document.removeEventListener('handleChange', handleChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="md:flex gap-8 p-6 justify-center">
        <Image
        src={`/assets/shine_studio_images/${product.image}`}
          width={350}
          height={350}
          alt={`${product.name.slice(0, 10)}`}
          className="justify-self-center lg:w-[350px] aspect-square"
        />

        <div className="flex flex-col gap-4 pt-4 lg:w-[45%]">
          <div className="flex items-center justify-end gap-4">
            {!isLiked?
            (
            <>
            <PiHeartThin className="text-[18px]" />
            Add to Wishlist
            </>):(<>
            <PiHeartFill className='text-[18px] text-[#008FAB]'/>
            Item In Wishlist
            </>)}
          </div>

          <div className="text-xl lg:text-[30px] ">{product.name}</div>
          <div>Free Size</div>
          <div className="flex justify-between">
            <div className="font-bold text-2xl lg:text-[40px] flex flex-col">
              $ {product.price}
              <span className="text-xs font-medium">(Incl. taxes and charges)</span>
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <IoIosCheckmarkCircleOutline className="text-[#2DC84A] text-[18px]" />
                In stock - ready to ship
              </div>
            ) : (
              <div>Out of Stock</div>
            )}
          </div>

          <div className="text-[#008FAB] flex gap-4 text-[16px] font-semibold">
            <div className="flex items-center border border-[#008FAB]">
              <button
                type="button"
                className="px-6 py-2 cursor-pointer"
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev === 1) return 1;
                    return prev - 1;
                  })
                }
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                type="button"
                className="px-6 py-2 cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div 
            onClick={addToCart}
            className="w-full text-center border border-[#008FAB] self-center py-2 hover:bg-[#008FAB] hover:text-white">
              Add to Bag
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 py-6 px-4 border-t border-b border-[rgba(0,143,171,0.5)] text-sm">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-[#008FAB] text-lg md:text-[20px] pb-4 ps-4">Description</h2>
          {product.description}
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
