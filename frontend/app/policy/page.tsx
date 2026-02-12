import Image from 'next/image';
import Instruction from '../components/policy/Instruction';
import ShippingAndReturn from '../components/policy/ShippingAndReturn';
import { juliusSansOne } from '../layout';

const page = () => {
  return (
    <div>
      <div className="relative w-full h-[350px]">
        <Image
          src="/assets/policy/policy-pic.jpg"
          alt="ring"
          fill
          className="object-cover w-full"
        />
        <div
          className={`absolute top-[20%] right-[20%] ${juliusSansOne.className} text-4xl lg:text-6xl text-white`}
        >
          Our Policy
        </div>
      </div>
      <div className="py-12 px-6">
        <Instruction />
        <ShippingAndReturn />
      </div>
    </div>
  );
};

export default page;
