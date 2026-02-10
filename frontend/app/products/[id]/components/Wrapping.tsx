import { italiana } from "@/app/layout"
import Image from "next/image"

const Wrapping = () => {
    const contents:{img:string, title:string, text:string}[]=[
        {
            img:"/assets/products/detail/white-box.svg",
            title:"Unwrap Elegance",
            text:"At Lillian, we believe that the presentation of your jewelry is just as important as the piece itself. That’s why every order comes in our exquisite premium packaging, designed to impress."
        },
        {
            img:"/assets/products/detail/black-box.svg",
            title:"Brilliance in Bloom",
            text:"This festive season, elevate your celebrations with the gift of exquisite jewelry. Each piece tells a story of love and joy, making it the perfect way to express your heartfelt wishes."
        }
    ]
  return (
    <div
    className="py-16 px-5 flex flex-col gap-12 max-w-[1100px] mx-auto">
        {contents.map((item,i)=>
        <div
        key={i}
            className={`flex items-center gap-6 justify-center ${i%2===0?"flex-row":"flex-row-reverse"}`}>
                <Image
                src={item.img}
                width={380}
                height={500}
                alt={item.text}
                className="hidden md:block rounded-br-3xl rounded-tr-3xl"/>

                <div
                className="h-full flex flex-col md:w-[50%]">
                    <div
                    className={`text-lg md:text-3xl text-[#008FAB] border-b border-[rgba(0,143,171,0.5)] ${italiana.className}`}>
                        {item.title}</div>
                    <div
                    className="text-xs pt-6">
                        {item.text}
                    </div>
                </div>
        </div>)}

    </div>
  )
}

export default Wrapping