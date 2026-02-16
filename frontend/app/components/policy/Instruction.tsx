const Instruction = () => {
  const subtext = 'Care Instructions';
  const smalltext = [
    'To keep your jewelry looking its best and to ensure its longevity, follow these care instructions:',
    'By following these simple care tips, you can keep your jewelry looking beautiful for years to come!',
  ];
  const content: {
    order: number;
    headline: string;
    text: string;
  }[] = [
    {
      order: 1,
      headline: 'Store Properly',
      text: 'Keep your jewelry in a dry, cool place. Use a soft cloth or a jewelry box with compartments to prevent scratching and tangling.',
    },
    {
      order: 2,
      headline: 'Avoid Chemicals',
      text: 'Keep your jewelry away from harsh chemicals, including cleaning products, perfumes, and lotions. Apply these products before putting on your jewelry.',
    },
    {
      order: 3,
      headline: 'Limit Exposure',
      text: 'Remove jewelry before swimming, exercising, or engaging in activities that may cause it to get scratched or damaged.',
    },
    {
      order: 4,
      headline: 'Clean Gently',
      text: 'Clean your jewelry regularly using a soft cloth. For more thorough cleaning, use mild soap and warm water. Avoid abrasive materials that can scratch the surface.',
    },
    {
      order: 5,
      headline: 'Check for Damage',
      text: 'Regularly inspect your jewelry for any signs of wear or damage, such as loose stones or clasps. Address any issues promptly to avoid further damage.',
    },
    {
      order: 6,
      headline: 'Avoid Moisture',
      text: 'Keep jewelry away from moisture and humidity, which can cause tarnishing, especially with sterling silver.',
    },
  ];

  return (
    <div className="px-6 py-4 md:w-[95%] max-w-300 md:mx-auto">
      <h2 className="text-[#008FAB] font-bold text-[18px]">{subtext}</h2>

      <div className="text-sm md:text-[15px] px-8 py-4 flex flex-col gap-6">
        <div>{smalltext[0]}</div>

        <ol className="flex flex-col gap-2 list-decimal">
          {content.map((item) => (
            <li key={item.order}>
              <span className="font-semibold text-[16px]">{item.headline}: </span>
              {item.text}
            </li>
          ))}
        </ol>

        <div>{smalltext[1]}</div>
      </div>
    </div>
  );
};

export default Instruction;
