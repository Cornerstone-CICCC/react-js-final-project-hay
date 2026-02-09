import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between">
        <ul className="flex gap-2">
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
        <div>
          <p>We accept the following payment options.</p>
          <ul className="flex gap-2 items-center">
            <li>
              <Image
                src="../assets/footer/visa.png"
                alt="VISA"
                width={66}
                height={67}
                unoptimized
              />
            </li>
            <li>
              <Image
                src="../assets/footer/master.png"
                alt="master"
                width={49}
                height={31}
                unoptimized
              />
            </li>
            <li>
              <Image
                src="../assets/footer/american-express.png"
                alt="AMERICAN EXPRESS"
                width={78}
                height={78}
                unoptimized
              />
            </li>
            <li>
              <Image
                src="../assets/footer/apple-pay.png"
                alt="Apply Pay"
                width={49}
                height={48}
                unoptimized
              />
            </li>
          </ul>
        </div>
      </div>
      <small className="text-center block">&copy; Shine Studio</small>
    </footer>
  );
};

export default Footer;
