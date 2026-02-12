import OrderList from "./components/OrderList";


type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params; //old cartId
  //fetch cart items from id
  return (
    <div
    className="p-6">
      <OrderList />
    </div>
  ) 
}

export default page