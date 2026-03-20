'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard.jsx";
import StickyBottomBar from "@/components/StickyBottomBar";
import { useStore } from '@/store/storeData'; // ✅ fixed path

export default function CartClient({ data }) {

    // ✅ Select only what you need (better performance)
    const cartProducts = useStore(state => state.cartProducts)
    const shippingFee = useStore(state => state.shippingFee)
    const discountApplied = useStore(state => state.discountApplied)
    const addresses = useStore(state => state.addresses)
    const cartState = useStore(state => state.cartState)

    const setCartState = useStore(state => state.setCartState)
    const setCartData = useStore(state => state.setCartData)

    const router = useRouter()

    useEffect(() => {
        if (data && data.cartItems) {
            setCartData({
                cartProducts: data.cartItems || [],
                shippingFee: data.shipping_fee || 0,
                discountApplied: data.discount_applied || 0
            });
        }
    }, [data, setCartData]);

    const subTotal = cartProducts?.reduce((acc, item) => {
        return acc + (item.product_price || 0) * (item.quantity || 0);
    }, 0) || 0;

    const total = subTotal + shippingFee - discountApplied;

    const updateAndNavigate = () => {
        if (!addresses || addresses.length === 0) {
            setCartState('Shipping Address')
            router.push('/shipping')
        } else {
            setCartState('Payment Confirmation')
            router.push('/payment')
        }
    }

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <h1 className="text-4xl text-center mt-10">
                No Items in Cart 🛒
            </h1>
        )
    }

    return (
        <div className="px-4 py-6 md:px-8 lg:px-16 pb-28">

            <h1 className="text-3xl text-center font-bold mb-6">
                Cart Items
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cartProducts.map(product => (
                    <ProductCard 
                        key={product.product_id} 
                        product={product} 
                    />
                ))}
            </div>

            {/* Cart Summary */}
            <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg text-center space-y-2">
                <h2 className="text-xl font-semibold mb-2">Cart Info</h2>

                <p className="text-gray-600">
                    Cart State: 
                    <span className="ml-2 font-medium bg-amber-200 px-2 py-1 rounded">
                        {cartState}
                    </span>
                </p>

                <p className="text-gray-700">
                    Subtotal: <span className="font-medium">₹{subTotal}</span>
                </p>

                <p className="text-gray-700">
                    Shipping Fee: <span className="font-medium">₹{shippingFee}</span>
                </p>

                <p className="text-gray-700">
                    Discount: <span className="font-medium text-green-600">-₹{discountApplied}</span>
                </p>

                <p className="text-lg font-bold">
                    Total: <span className="text-blue-600">₹{total}</span>
                </p>
            </div>

            {/* Sticky Bottom Bar */}
            <StickyBottomBar 
                onBack={() => router.push('/')}
                onNext={updateAndNavigate}
                nextText="Proceed to Checkout"
                showBack={false}
            />
        </div>
    )
}