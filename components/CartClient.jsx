'use client'
import Image from "next/image.js";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard.jsx";
import { useEffect } from "react";
import { useStore } from '../store/storeData.js'

export default function CartClient({ data }) {
    const cart = useStore(state => state.cart)
    const cartProducts = useStore(state => state.cartProducts)
    const loading = useStore(state => state.loading)
    const error = useStore(state => state.error)
    const discountApplied = useStore(state => state.discountApplied)
    const shippingFee = useStore(state => state.shippingFee)
    const addressDetails = useStore(state => state.addressDetails)
    const cartState = useStore(state => state.cartState)
    const setCartState = useStore(state => state.setCartState)
    const setCartData= useStore(state=>state.setCartData)
    const router=useRouter()

    useEffect(()=>{
        console.log("data from ssr ",data)
        if (data){
            setCartData({
            cartProducts: data.cartItems,
            shippingFee: data.shipping_fee,
            discountApplied: data.discount_applied
            });
        }
    },[data,setCartData]);

    const subTotal=cartProducts?.reduce((acc,item)=>{
    return acc+item.product_price * item.quantity;
    },0);
    const total = subTotal+shippingFee

    const updateAndNavigate = () => {
    if (!addressDetails) {
        setCartState('Shipping Address')
        router.push('/shipping')
    } else {
        setCartState('Payment Confirmation')
        router.push('/payment')
    }
    }

    if (!cartProducts || cartProducts.length==0) return <h1 className="text-4xl bg-amber-600"> No Items in Cart ...</h1>
    console.log(cartProducts)
  return (

    <div className="px-4 py-6 md:px-8 lg:px-16 ">
      <h1 className="text-3xl text-center font-bold mb-6">Cart Items</h1>
      
      {/* product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartProducts && cartProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
          ))}
      </div>

      {/* Cart Info */}
      {cartProducts && cartProducts.length>0 && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg text-center space-y-2">
              <h1 className="text-xl font-semibold mb-2">Cart Info</h1>
              <p className="text-gray-600 ">Cart State: <span className="font-medium bg-amber-200">{cartState}</span></p>
              <h1 className="text-gray-700">Subtotal: <span className="font-medium">{subTotal}</span></h1>
              <h1 className="text-gray-700">Shipping Fee: <span className="font-medium">{shippingFee}</span></h1>
              <h1 className="text-lg font-bold">Total: <span className="text-blue-600">{total}</span></h1>

              <button 
                  onClick={updateAndNavigate} 
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">Proceed to Checkout
              </button>
          </div>
      )}
  </div>
  )
}

