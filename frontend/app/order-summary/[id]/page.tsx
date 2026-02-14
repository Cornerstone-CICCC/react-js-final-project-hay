import { Product } from '@/app/types/products.type';
import OrderList, { OrderItem } from './components/OrderList';
import { redirect } from 'next/navigation';
import { product } from '@/app/products/dummy';

type Props = {
  params: Promise<{ id: string }>;
};

export type CartItemReturnTye={
  _id:string,
  cartId:string
  productId:Product
  quantity:number
}
const page = async ({ params }: Props) => {
  const { id } = await params; //old cartId
  const cartId = id
  //fetch cart items from id
  const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/${cartId}`)

  if(!res.ok){
    console.log("Error fetching data")
    redirect("/")
  }
  const data = await res.json() as CartItemReturnTye[]

  const mappedData :OrderItem[]= data.map(item=>({
    _id: item.productId._id,
    image: item.productId.image,
    name: item.productId.name,
    price: item.productId.price,
    description: item.productId.description,
    stock: item.productId.stock,
    category: item.productId.category,
    quantity:item.quantity
  }))

  return (
    <div className="p-6">
      <OrderList data={mappedData} />
    </div>
  );
};

export default page;
