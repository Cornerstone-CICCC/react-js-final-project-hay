import Image from 'next/image';
import { juliusSansOne } from '../layout';
import type { Product } from '../types/products.type';
import ProductList from './components/ProductList';

const page = async () => {
  const image = '/assets/products/products_headPic.svg';
  const headtext = 'Designer Bracelet Collection';
  const subtext = `Our latest collection of designer bracelets, 
  where artistry meets elegance. Each bracelet is a testament to exquisite craftsmanship, featuring unique designs that elevate any look. From bold statement pieces to delicate charms, 
  our collection caters to every style and occasion.`;
  let data: Product[];

  const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`);

  if (!res.ok) {
    console.log('Error fetching data');
    data = [];
  }
  data = await res.json();

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="relative">
        <Image
          src={image}
          width={100}
          height={400}
          alt="header picture"
          className="w-full max-h-[450px]"
        />
        <div className="absolute top-[50%] -translate-y-[50%] left-[5%] w-[60%]">
          <h2 className={`text-2xl md:text-4xl ${juliusSansOne.className}`}>
            {headtext.toUpperCase()}
          </h2>
          <div className="hidden md:block md:border-t w-[80%] max-w-[580px] ms-2"></div>
          <div className="text-xs text-center max-w-[400px] hidden md:block pt-4">{subtext}</div>
        </div>
      </div>

      <ProductList data={data} />
    </div>
  );
};

export default page;
