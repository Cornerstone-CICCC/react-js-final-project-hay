import OrderSummary from "./components/OrderSummary"
import ShoppingBagList from "./components/ShoppingBagList"

const page = () => {
  return (
    <div
    className="py-6 px-6 md:px-20 flex flex-col flex-col lg:flex-row w-full gap-8">
        <ShoppingBagList/>
        <OrderSummary/>
    </div>
  )
}

export default page