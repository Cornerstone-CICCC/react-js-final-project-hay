import Image from 'next/image';
import Link from 'next/link';
import TrendingList from './components/TrendingList';
import { juliusSansOne } from './layout';

export default function Home() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/assets/home/mv.svg"
          alt=""
          width={100}
          height={400}
          className="w-full min-h-[200px] max-h-[450px] object-cover"
        />
        <div className="absolute top-[50%] -translate-y-[50%] left-[5%] w-[60%]">
          <h1 className={`text-2xl md:text-3xl ${juliusSansOne.className}`}>
            Designer Bracelet Collection
          </h1>
          <div className="hidden md:block md:border-t w-[80%] max-w-[580px] ms-2"></div>
          <div className="text-xs text-center max-w-[400px] hidden md:block pt-4">
            Our latest collection of designer bracelets, where artistry meets elegance. Each
            bracelet is a testament to exquisite craftsmanship, featuring unique designs that
            elevate any look. From bold statement pieces to delicate charms, our collection caters
            to every style and occasion.
          </div>
        </div>
      </div>
      <div className="pt-10 px-5 md:max-w-5xl md:mx-auto md:pt-22">
        <section className="mb-10 md:flex md:gap-7 md:items-center md:-mb-5">
          <div className="md:w-140">
            <h2 className="text-center font-bold text-[#008FAB] text-2xl mb-5 md:text-3xl md:mb-8">
              <span className="border-b-1 border-yellow-400 pb-1">Our Story</span>
            </h2>
            <p className="text-[#4D4C4C] text-sm mb-5 md:text-center">
              Our story is one of passion, where every diamond is handpicked, every metal is
              ethereally shaped, and every design tells a unique story. It’s not just jewelry; it’s
              an heirloom that carries the legacy of beauty across generations.
            </p>
          </div>
          <Image
            src="/assets/home/story.svg"
            alt="Our Story"
            width={530}
            height={450}
            className="min-w-[42%] mx-auto"
          />
        </section>
        <section className="mb-10 md:flex md:gap-7 md:items-center md:mb-25">
          <div className="md:w-140 md:order-2">
            <h2 className="text-center font-bold text-[#008FAB] text-2xl mb-5 md:text-3xl md:mb-8">
              <span className="border-b-1 border-yellow-400 pb-1">About Us</span>
            </h2>
            <p className="text-[#4D4C4C] text-sm mb-5 md:text-center">
              Amidst the sparkle and shimmer, our brand stands out with its commitment to capturing
              the essence of sophistication in every creation. Each piece is a testament to timeless
              beauty, meticulously crafted to adorn moments that matter.
            </p>
          </div>
          <Image
            src="/assets/home/about.png"
            alt="About Us"
            width={530}
            height={450}
            className="min-w-[42%] mx-auto"
          />
        </section>
      </div>
      <div className="mb-10 bg-[#F1F0F0] md:mb-22">
        <div className="px-5 md:max-w-5xl md:mx-auto">
          <ul className="py-7 flex flex-wrap gap-[16px] justify-center text-center">
            <li className="w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)]">
              <Image
                src="/assets/home/icon-jewelry.png"
                alt="jewelry"
                width={45}
                height={45}
                className="inline w-6 md:w-11"
              />
              <p className="mt-3 leading-5 text-sm md:text-lg md:leading-6 md:mt-4">
                2500+ Unique
                <br />
                Designs
              </p>
            </li>
            <li className="w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)]">
              <Image
                src="/assets/home/icon-quality.png"
                alt="quality"
                width={45}
                height={45}
                className="inline w-6 md:w-11"
              />
              <p className="mt-3 leading-5 text-sm md:text-lg md:leading-6 md:mt-4">
                Assured
                <br />
                Warranty
              </p>
            </li>
            <li className="w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)]">
              <Image
                src="/assets/home/icon-favorite.png"
                alt="celebrity"
                width={45}
                height={45}
                className="inline w-6 md:w-11"
              />
              <p className="mt-3 leading-5 text-sm md:text-lg md:leading-6 md:mt-4">
                Celebrity
                <br />
                Favorite
              </p>
            </li>
            <li className="w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)]">
              <Image
                src="/assets/home/icon-operator.png"
                alt="operator"
                width={45}
                height={45}
                className="inline w-6 md:w-11"
              />
              <p className="mt-3 leading-5 text-sm md:text-lg md:leading-6 md:mt-4">
                Video Calling
                <br />
                Assistance
              </p>
            </li>
            <li className="w-[calc((100%-32px)/3)] md:w-[calc((100%-64px)/5)]">
              <Image
                src="/assets/home/icon-transport.png"
                alt="transport"
                width={45}
                height={45}
                className="inline w-6 md:w-11"
              />
              <p className="mt-3 leading-5 text-sm md:text-lg md:leading-6 md:mt-4">
                Shipping
                <br />
                Worldwide
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-5 md:max-w-5xl md:mx-auto">
        <section className="mb-12 md:mb-22">
          <h2 className="text-center font-bold text-[#008FAB] text-2xl mb-5 md:text-3xl md:mb-10">
            Daily Trending Items
          </h2>
          <TrendingList />
        </section>
        <section className="mb-12 md:mb-22">
          <h2 className="text-center font-bold text-[#008FAB] text-2xl mb-5 md:text-3xl md:mb-10">
            Shop By Category
          </h2>
          <ul className="flex flex-wrap gap-[16px]">
            <li className="w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
              <Link href="/products/category/earrings" className="relative block">
                <Image
                  src="/assets/home/bnr-earrings.svg"
                  alt="Earrings"
                  width={390}
                  height={160}
                  className="w-full object-cover max-h-[160px] overflow-hidden rounded-xl"
                />
                <span className="absolute top-[50%] left-[50%] -translate-[50%] text-xl font-semibold text-white">
                  Earrings
                </span>
              </Link>
            </li>
            <li className="w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
              <Link href="/products/category/necklaces" className="relative block">
                <Image
                  src="/assets/home/bnr-necklaces.svg"
                  alt="Necklaces"
                  width={390}
                  height={160}
                  className="w-full object-cover max-h-[160px] overflow-hidden rounded-xl"
                />
                <span className="absolute top-[50%] left-[50%] -translate-[50%] text-xl font-semibold text-white">
                  Necklaces
                </span>
              </Link>
            </li>
            <li className="w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
              <Link href="/products/category/bracelets" className="relative block">
                <Image
                  src="/assets/home/bnr-bracelets.svg"
                  alt="Bracelets"
                  width={390}
                  height={160}
                  className="w-full object-cover max-h-[160px] overflow-hidden rounded-xl"
                />
                <span className="absolute top-[50%] left-[50%] -translate-[50%] text-xl font-semibold text-white">
                  Bracelets
                </span>
              </Link>
            </li>
            <li className="w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
              <Link href="/products/category/rings" className="relative block">
                <Image
                  src="/assets/home/bnr-rings.svg"
                  alt="Rings"
                  width={390}
                  height={160}
                  className="w-full object-cover max-h-[160px] overflow-hidden rounded-xl"
                />
                <span className="absolute top-[50%] left-[50%] -translate-[50%] text-xl font-semibold text-white">
                  Rings
                </span>
              </Link>
            </li>
            <li className="w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
              <Link href="/products/category/ankle-wear" className="relative block">
                <Image
                  src="/assets/home/bnr-anklewear.svg"
                  alt="Ankle Wear"
                  width={390}
                  height={160}
                  className="w-full object-cover max-h-[160px] overflow-hidden rounded-xl"
                />
                <span className="absolute top-[50%] left-[50%] -translate-[50%] text-xl font-semibold text-white">
                  Ankle Wear
                </span>
              </Link>
            </li>
          </ul>
        </section>
        <section className="mb-10 md:mb-22">
          <h2 className="text-center font-bold text-[#008FAB] text-2xl mb-6 md:text-3xl md:mb-12">
            Featured In
          </h2>
          <ul className="flex flex-wrap gap-7 justify-center max-w-4xl mx-auto sm:gap-9 md:gap-x-16 md:gap-y-12">
            <li>
              <Image
                src="/assets/home/logo-vogue.png"
                alt="VOGUE"
                width={207}
                height={54}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-studio.png"
                alt="STUDIO"
                width={173}
                height={54}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-people.png"
                alt="People"
                width={131}
                height={54}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-elle.png"
                alt="ELLE"
                width={134}
                height={54}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-jw.png"
                alt="JW"
                width={40}
                height={54}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-jck.png"
                alt="JCK"
                width={126}
                height={53}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
            <li>
              <Image
                src="/assets/home/logo-solitaire.png"
                alt="SOLITAIRE"
                width={299}
                height={53}
                className="w-auto h-[28px] sm:h-[38px] md:h-[48px]"
              />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
