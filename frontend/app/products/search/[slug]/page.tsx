
const page =async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/products`)
    const data = await res.json()
    
  return (
    <div>page</div>
  )
}

export default page