import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: Props) => {
  const cartItems = useCartStore((s) => s.cartItems);
  const removeCartItem = useCartStore((s) => s.removeCartItem);
  const totalCartNum = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useAuthStore((s) => s.user);

  const handleRemove = async (cartItemId: string) => {
    removeCartItem(cartItemId);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to remove item from shopping bag.');
      }
    } catch (err) {
      console.error(err);
    }
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
          <div className="w-[575] max-h-[calc(100vh-115px)] bg-[#E9F4F34D] px-13 pt-8 pb-10 relative">
            <button
              type="button"
              className="text-[30px] cursor-pointer absolute top-[18px] right-[18px]"
              onClick={onClose}
            >
              <IoCloseOutline />
            </button>
            <p className="text-center font-semibold text-2xl mb-1">
              Your Bag <span className="text-[#008FAB]">({totalCartNum})</span>
            </p>
            {user ? (
              totalCartNum === 0 ? (
                <>
                  <p className="mt-7">Your Shopping Bag is empty.</p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="mt-5 text-center block bg-[#008FAB] text-white font-bold px-5 py-4 w-full outline-none rounded-xl cursor-pointer transition hover:opacity-86"
                  >
                    Shop products
                  </Link>
                </>
              ) : (
                <>
                  <ul className="max-h-[calc(100vh-307px)] overflow-y-auto">
                    {cartItems.map((i) => (
                      <li
                        key={`h_cart_${i.cartItemId}`}
                        className="flex gap-5 pb-7 mt-7 border-b-1 border-b-[#008FAB80]"
                      >
                        <Image
                          src={`/assets/shine_studio_images/${i.image}`}
                          alt={i.name}
                          width={154}
                          height={154}
                          className="w-[140px] h-[140px]"
                        />
                        <div className="py-3">
                          <p className="text-sm">{i.name}</p>
                          <p className="mt-4 font-bold">${i.price}</p>
                        </div>
                        <div className="py-3">
                          <button
                            type="button"
                            className="text-[20px] cursor-pointer text-[#008FAB]"
                            onClick={() => handleRemove(i.cartItemId)}
                          >
                            <IoCloseOutline />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/shopping-bag"
                    onClick={onClose}
                    className="mt-7 text-center block bg-[#008FAB] text-white font-bold px-5 py-4 w-full outline-none rounded-xl cursor-pointer transition hover:opacity-86"
                  >
                    View Shopping Bag
                  </Link>
                </>
              )
            ) : (
              <>
                <p className="mt-7">You are not logged in.</p>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="mt-5 text-center block bg-[#008FAB] text-white font-bold px-5 py-4 w-full outline-none rounded-xl cursor-pointer transition hover:opacity-86"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
