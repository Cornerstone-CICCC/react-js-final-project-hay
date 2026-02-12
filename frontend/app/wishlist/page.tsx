import Link from "next/link"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import WishItemsList from "./components/WishItemsList"

const page = () => {
  return (
    <div
    className="p-6 max-w-500 mx-auto">
      <div>
        <Link href="/products" className="flex gap-2 items-center">
          <MdOutlineKeyboardArrowLeft className="text-lg" />
          <span className="underline">Continue Shopping</span>
        </Link>
      </div>

      <WishItemsList/>

    </div>
  )
}

export default page