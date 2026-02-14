import Image from 'next/image';
import { juliusSansOne } from '@/app/layout'; 
import ProductList from '../../components/ProductList';
import { Product } from '@/app/types/products.type'; 
import { redirect } from 'next/navigation';

type Props={
  params:{
    slug:string
  }
}

const page =async ({params}:Props) => {
  const {slug} = await params
  const image = '/assets/products/products_headPic.svg';
  const headtext = slug.toUpperCase()
  console.log(slug)

  const categories= ['necklaces', 'earrings', 'rings', 'bracelets', 'ankle-wear']

  if(!categories.includes(slug)){
    redirect("/products")
  }

  let data:Product[]

  const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`)
  
  if(!res.ok){
    console.log("Error fetching data")
    data=[]
  }
   data = await res.json()

   //filter data
   const filteredData = data.filter(item=>item.category===slug)
  
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
        </div>
      </div>

      <ProductList data={filteredData}/>
    </div>
  );
};

export default page;