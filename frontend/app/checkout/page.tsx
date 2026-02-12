import { stripe } from "../lib/stripe";
import CheckoutForm from "./components/CheckoutForm";


const page = async() => {

  const calculateOrderAmount = ()=>{
    return 1400
  }

    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'cad',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  })
  
    return (
    <div id="checkout"
    className="p-6 md:px-15 ">
      <CheckoutForm clientSecret={clientSecret} />
    </div>
  )
};

export default page;
