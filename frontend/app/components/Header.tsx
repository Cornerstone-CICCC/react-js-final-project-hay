import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="flex justify-between">
        <Link href="/">
          <Image
            src="../assets/header/logo.png"
            alt="Shine Studio"
            width={80}
            height={91}
            unoptimized
          />
        </Link>
        <ul className="flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/policy">Our Policy</Link>
          </li>
        </ul>
        <nav>
          <menu className="flex gap-1">
            <li>
              <button type="button">
                <Image
                  src="../assets/header/icon-search.svg"
                  alt="search"
                  width={24}
                  height={24}
                  unoptimized
                />
              </button>
            </li>
            <li>
              <Link href="/login">
                <Image
                  src="../assets/header/icon-user.svg"
                  alt="user"
                  width={24}
                  height={24}
                  unoptimized
                />
              </Link>
            </li>
            <li>
              <Link href="/wishlist">
                <Image
                  src="../assets/header/icon-wish.svg"
                  alt="wishlist"
                  width={24}
                  height={24}
                  unoptimized
                />
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <Image
                  src="../assets/header/icon-cart.svg"
                  alt="cart"
                  width={24}
                  height={24}
                  unoptimized
                />
              </Link>
            </li>
          </menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
