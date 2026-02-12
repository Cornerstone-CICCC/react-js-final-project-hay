const ShippingAndReturn = () => {
  const subtext = 'Shipping and Return';
  const smalltext =
    "For any further questions or assistance, feel free to contact our customer service team. We're here to help!";

  const shippingTitle = 'Shipping Policy:';
  const shippingContents: {
    headline: string;
    text: string;
  }[] = [
    {
      headline: 'Processing Time',
      text: 'All orders are processed within 1-3 business days. You will receive a confirmation email once your order has shipped.',
    },
    {
      headline: 'Shipping Options',
      text: 'We offer a variety of shipping methods, including standard, expedited, and express options. Shipping costs will be calculated at checkout based on your selected method.',
    },
    {
      headline: 'Domestic Shipping',
      text: 'Free standard shipping on all orders. Typical delivery time is 3-7 business days.',
    },
    {
      headline: 'International Shipping',
      text: 'We ship worldwide! International delivery times vary by destination. Please note that customs duties and taxes may apply.',
    },
  ];

  const returnTitle = 'Return Policy:';
  const returnContents: {
    headline: string;
    text: string;
  }[] = [
    {
      headline: '30-Day Satisfaction Guarantee',
      text: 'If you are not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund or exchange.',
    },
    {
      headline: 'Condition',
      text: 'Items must be in their original condition, unworn, and include all packaging. Personalized or custom items are non-returnable.',
    },
    {
      headline: 'Return Process',
      text: 'To initiate a return, please contact our customer service team at care@lillianjewelers.com for a return authorization. We will provide instructions on how to return your item.',
    },
    {
      headline: 'Refunds',
      text: 'Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Refunds will be processed to your original payment method within 5-10 business days.',
    },
    {
      headline: 'Exchanges',
      text: 'If you would like to exchange an item, please follow the return process and place a new order for the desired item.',
    },
  ];
  return (
    <div className="px-6 py-4 md:px-10 md:w-[95%] max-w-300 md:mx-auto">
      <h2 className="text-[#008FAB] font-bold text-[18px]">{subtext}</h2>

      <div className="px-8 py-4 flex flex-col gap-2">
        <div className="font-semibold underline text-md">{shippingTitle}</div>

        <ol className="flex flex-col gap-2 list-disc py-4 text-sm md:text-[15px]">
          {shippingContents.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-[16px]">{item.headline}: </span>
              {item.text}
            </li>
          ))}
        </ol>
      </div>

      <div className="px-8 py-4 flex flex-col gap-2">
        <div className="font-semibold underline text-md">{returnTitle}</div>

        <ol className="flex flex-col gap-2 list-disc py-4 text-sm md:text-[15px]">
          {returnContents.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-[16px]">{item.headline}: </span>
              {item.text}
            </li>
          ))}
        </ol>
      </div>
      <div className="text-sm md:text-[15px]">{smalltext}</div>
    </div>
  );
};

export default ShippingAndReturn;
