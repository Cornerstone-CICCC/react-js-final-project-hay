'use client'

const OrderSummary = () => {

  return (
    <div className="p-4 flex flex-col gap-4 justify-center">
      <h2
      className="font-bold text-xl pb-2">
        Order Summary</h2>

      <div
      className="flex flex-col gap-4 pb-6 border-b border-[rgba(0,143,171,0.5)]">
        <div
        className="flex justify-between pb-2">
          <span
          className="font-bold">Subtotal</span>
          <span>$448</span>
        </div>
        <div
        className="flex justify-between">
          <span>Shipping</span>
          <span>Complementary</span>
        </div>
        <div
        className="flex justify-between">
          <span>Sales Tax</span>
          <span>Calculated at Checkout</span>
        </div>
      </div>

      <div
      className="font-bold py-6 flex justify-between">
        <span>Total</span>
        <span>$ </span>
      </div>

      <button
      className="bg-[#008FAB] text-white mt-3 px-6 py-2 rounded-xl">
        Proceed to Checkout
      </button>
      <div
      className="text-xs md:text-sm">
        *A complimentary Lillian shopping bag is included with every item.
      </div>

    </div>
  )
}

export default OrderSummary