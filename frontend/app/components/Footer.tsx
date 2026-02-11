import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t-5 border-[#B5EBE6] pb-4 text-sm">
      <div className="flex gap-8 justify-between flex-col px-5 py-6 md:flex-row md:max-w-5xl md:mx-auto md:pt-10 md:pb-8">
        <ul className="flex gap-3 flex-col md:flex-row md:gap-7">
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
          <p className="underline">We accept the following payment options.</p>
          <ul className="flex gap-3 items-center md:gap-4">
            <li className="w-[44] md:w-[66]">
              <Image src="/assets/footer/visa.png" alt="VISA" width={66} height={67} />
            </li>
            <li className="w-[32] md:w-[49]">
              <Image src="/assets/footer/master.png" alt="master" width={49} height={31} />
            </li>
            <li className="w-[62] md:w-[78]">
              <Image
                src="/assets/footer/american-express.png"
                alt="AMERICAN EXPRESS"
                width={78}
                height={78}
              />
            </li>
            <li className="w-[32] md:w-[49]">
              <Image src="/assets/footer/apple-pay.png" alt="Apply Pay" width={49} height={48} />
            </li>
          </ul>
        </div>
      </div>
      <small className="text-center block">&copy; Shine Studio. {new Date().getFullYear()}</small>
    </footer>
  );
};

export default Footer;
