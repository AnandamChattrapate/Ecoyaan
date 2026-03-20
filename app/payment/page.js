'use client'
import React, { useState } from 'react'
import { useStore } from '../../store/storeData.js'
import ProductCard from '@/components/ProductCard.jsx'
import { useRouter } from "next/navigation";
import StickyBottomBar from '@/components/StickyBottomBar';
import CartStages from '@/components/CartStages';

export default function PaymentPage() {
  const cartProducts = useStore(state => state.cartProducts)
  const shippingFee = useStore(state => state.shippingFee)
  const discountApplied = useStore(state => state.discountApplied)
  const addresses = useStore(state => state.addresses)
  const selectedAddressId = useStore(state => state.selectedAddressId)
  const selectAddress = useStore(state => state.selectAddress)
  const setCartState = useStore(state => state.setCartState)
  const [showAddresses, setShowAddresses] = useState(true)
  
  const router = useRouter()

  const subTotal = cartProducts?.reduce((acc, item) => acc + item.product_price * item.quantity, 0) || 0
  const total = subTotal + shippingFee - discountApplied

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId)

  const updateAndNavigate = () => {
    if (!selectedAddressId) {
      alert('Please select a shipping address')
      return
    }
    setCartState('Payment completed')
    router.push('/success')
  }

  if (!cartProducts || cartProducts.length == 0) 
    return <h1 className="text-4xl text-center m-3">No Items in Cart</h1>

  return (
    <>
      <CartStages />
      <div className="max-w-4xl mx-auto p-4 pb-28">
        <h1 className="text-2xl font-bold text-center mb-6">Payment / Order Confirmation</h1>

        {/* Cart Items Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cartProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
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
            {discountApplied > 0 && (
              <p className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-₹{discountApplied}</span>
              </p>
            )}
            <p className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
              <span>Total:</span>
              <span className="text-blue-600">₹{total}</span>
            </p>
          </div>
        </div>

        {/* Shipping Address Section - Shows all addresses */}
        <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-3 pb-2 border-b">
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <button 
              onClick={() => router.push('/shipping')}
              className="text-sm text-green-600 hover:text-green-700 font-medium">
              + Add New
            </button>
          </div>

          {/* If no addresses */}
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-3">No saved addresses</p>
              <button 
                onClick={() => router.push('/shipping')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                Add Your First Address
              </button>
            </div>
          ) : (
            <>
              {/* Address List - Radio button style */}
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all
                      ${selectedAddressId === addr.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => selectAddress(addr.id)}>
                    <div className="flex items-start gap-3">
                      {/* Radio Button */}
                      <div className="mt-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                          ${selectedAddressId === addr.id ? 'border-green-500' : 'border-gray-300'}`}>
                          {selectedAddressId === addr.id && (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Address Details */}
                      <div className="flex-1">
                        <p className="font-semibold">{addr.fullName}</p>
                        <p className="text-sm text-gray-600">{addr.phone}</p>
                        <p className="text-sm text-gray-600">{addr.email}</p>
                        <p className="text-sm mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                      
                      {/* Edit Button */}
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation()
                          router.push('/shipping')
                        }}
                        className="text-blue-500 text-sm px-2 py-1 hover:bg-blue-50 rounded">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show selected address summary */}
              {selectedAddress && (
                <div className="mt-4 pt-3 border-t text-sm text-green-600">
                  ✓ Selected: {selectedAddress.fullName}, {selectedAddress.city}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sticky Bottom Bar */}
        <StickyBottomBar 
          onBack={() => router.push('/shipping')}
          onNext={updateAndNavigate}
          nextText={`Pay Securely ₹${total}`}/>
      </div>
    </>
  )
}