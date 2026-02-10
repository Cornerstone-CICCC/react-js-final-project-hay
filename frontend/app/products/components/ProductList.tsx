'use client'
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useEffect, useState } from "react"
import { Product } from "../../types/products.type"
import { product } from "../dummy"
import ItemCard from "./ItemCard"

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(()=>{
    //setting up dummy data
    for(let i=0; i<20; i++){
      const newProduct={
        _id:`${i+1}`,
        ...product
      }
      setProducts(prev=>[
        ...prev, newProduct
      ])
    }

  },[])
  return (
    <div className="pt-4">
      <div
      className="py-4 px-5 border-b w-full flex items-center flex-between">
        <div
        className="flex items-center gap-2">
          Filter
          <TbAdjustmentsHorizontal
          className="text-xl"/>
        </div>

      </div>
      <div
      className="py-4 px-8">
        <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((item, i)=>(
          <ItemCard product={item} key={i}/>
        ))}
      </div>

      </div>

    </div>
  )
}

export default ProductList