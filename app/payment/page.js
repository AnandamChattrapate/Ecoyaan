'use client'

import React from 'react'
import { useStore } from '../../store/storeData.js'
import ProductCard from '@/components/ProductCard.jsx'
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const cartProducts=useStore(state => state.cartProducts)
  const shippingFee=useStore(state => state.shippingFee)
  const discountApplied=useStore(state => state.discountApplied)
  const addressDetails=useStore(state => state.addressDetails)
  const setCartState=useStore(state => state.setCartState)
  const cartState=useStore(state => state.cartState)

  const subTotal=cartProducts?.reduce((acc,item) => acc+item.product_price*item.quantity,0)| 0
  const total=subTotal+shippingFee-discountApplied

  const router=useRouter()

  const updateAndNavigate = () => {
  if (!addressDetails) {
    setCartState('Shipping Address')
    router.push('/shipping')
  } else {
    setCartState('Payment completed')
    router.push('/success')
  }}

  if (!cartProducts||cartProducts.length==0) return <h1 className="text-4xl text-center m-3">No Items in Cart</h1>



  return (
    <div className="max-w-4xl mx-auto p-4">
  <h1 className="text-2xl font-bold text-center mb-6">Payment / Order Confirmation</h1>

  {/* cart items */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
    {cartProducts.map(product => (
      <ProductCard key={product.product_id} product={product} />
    ))}
  </div>

  {/* order summary */}
  <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
    <h2 className="font-semibold text-lg mb-3 pb-2 border-b">Order Summary</h2>
    <div className="space-y-2">
      <p className="flex justify-between">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">₹{subTotal}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-gray-600">Shipping Fee:</span>
        <span className="font-medium">₹{shippingFee}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-gray-600">Discount Applied:</span>
        <span className="font-medium text-green-600">-₹{discountApplied}</span>
      </p>
      <p className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
        <span>Total:</span>
        <span className="text-blue-600">₹{total}</span>
      </p>
    </div>
  </div>

  {/* shipping address */}
  {addressDetails && (
    <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
      <h2 className="font-semibold text-lg mb-3 pb-2 border-b">Shipping Address</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <p><span className="font-medium text-gray-600">Name:</span> {addressDetails.fullName}</p>
        <p><span className="font-medium text-gray-600">Email:</span> {addressDetails.email}</p>
        <p><span className="font-medium text-gray-600">Phone:</span> {addressDetails.phone}</p>
        <p><span className="font-medium text-gray-600">PIN:</span> {addressDetails.pincode}</p>
        <p><span className="font-medium text-gray-600">City:</span> {addressDetails.city}</p>
        <p><span className="font-medium text-gray-600">State:</span> {addressDetails.state}</p>
      </div>
    </div>
  )}

  {/* pay button */}
  <div className="text-center">
    <button 
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
      onClick={updateAndNavigate}>
      Pay Securely ₹{total}
    </button>
  </div>
</div>
  )
}