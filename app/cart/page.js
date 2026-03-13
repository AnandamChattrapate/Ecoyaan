// Server Component
import { useStore } from '../../store/storeData.js'
import CartClient from '@/components/CartClient.jsx';
import CartStages from '@/components/CartStages.jsx';
async function getCartData(){
  const baseUrl=process.env.BASE_URL || "http://loacalhost:3000"
  try{

    const res=await fetch("http://localhost:3000/api/cart",{
    cache:'no-store'
    })
    if (!res.ok){
      throw new Error("error in fetching cart data ")
    }
    return res.json();

  }catch(err){
      return {message:err.message}
  }
  
}

export default async function CarctPage() {
  const cartData=await getCartData();
  console.log("cart data ",cartData)
  return (
    <>
    <CartStages/>
    <CartClient data={cartData}/>
    </>
    
  )
}
