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
          ? 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(0)] bg-[#22222299] transition hidden md:block'
          : 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(100vw)] transition hidden md:block'
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
            <p className="text-center font-semibold text-2xl">
              Your Bag <span className="text-[#008FAB]">({totalCartNum})</span>
            </p>
            {user ? (
              totalCartNum === 0 ? (
                <p className="mt-8">Your Shopping Bag is empty.</p>
              ) : (
                <>
                  <ul>
                    {cartItems.map((i) => (
                      <li key={i.cartItemId} className="flex gap-5 py-8 border-b-[#008FAB]">
                        <div>
                          <Image
                            src={`/assets/shine_studio_images/${i.image}`}
                            alt={i.name}
                            width={154}
                            height={154}
                          />
                        </div>
                        <div>
                          <p>{i.name}</p>
                          <p className="mt-4">${i.price}</p>
                        </div>
                        <button
                          type="button"
                          className="text-[28px] cursor-pointer text-[#008FAB]"
                          onClick={() => handleRemove(i.cartItemId)}
                        >
                          <IoCloseOutline />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Link href="/shopping-bag" onClick={onClose} className="mt-8">
                    View Shopping Bag
                  </Link>
                </>
              )
            ) : (
              <>
                <p className="mt-8">You are not logged in.</p>
                <Link href="/login" onClick={onClose} className="mt-8">
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
