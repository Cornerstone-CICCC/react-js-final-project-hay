import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import Instruction from '@/app/components/policy/Instruction';
import ShippingAndReturn from '@/app/components/policy/ShippingAndReturn';
import { product } from '../dummy';
import ItemDetail from './components/ItemDetail';
import Wrapping from './components/Wrapping';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/products/`);

  //dummy -> change to fetch by id
  const item = {
    _id: id,
    ...product,
  };
  return (
    <div className="px-6 py-8">
      <div className="md:px-12">
        <Link href="/products" className="flex gap-2 items-center">
          <MdOutlineKeyboardArrowLeft className="text-lg" />
          <span className="underline">Continue Shopping</span>
        </Link>
      </div>

      <ItemDetail product={item} />
      <Instruction />
      <ShippingAndReturn />
      <Wrapping />
    </div>
  );
};

export default page;
