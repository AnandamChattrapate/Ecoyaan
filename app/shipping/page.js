'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useStore } from '@/store/storeData';
import StickyBottomBar from '@/components/StickyBottomBar';

export default function ShippingPage() {
    const addresses = useStore(state => state.addresses)
    const selectedAddressId = useStore(state => state.selectedAddressId)
    const addAddress = useStore(state => state.addAddress)
    const deleteAddress = useStore(state => state.deleteAddress)
    const selectAddress = useStore(state => state.selectAddress)
    const setCartState = useStore(state => state.setCartState) // ✅ FIXED

    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', pincode: '', city: '', state: ''
    })

    const router = useRouter()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Optional: add simple validation
        if (!formData.fullName || !formData.phone) {
            alert('Please fill required fields')
            return
        }

        addAddress({ ...formData, id: Date.now() }) // ✅ ensure unique id
        setShowForm(false)

        setFormData({
            fullName: '', email: '', phone: '', pincode: '', city: '', state: ''
        })
    }

    const handleNext = () => {
        if (selectedAddressId) {
            setCartState('Payment Confirmation') // ✅ FIXED
            router.push('/payment')
        } else {
            alert('Please select a shipping address')
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 pb-28">
            <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>

            {/* Address List */}
            <div className="space-y-3 mb-6">
                {addresses.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 border-2 border-dashed rounded-lg">
                        No addresses saved yet. Add one below.
                    </p>
                ) : (
                    addresses.map((addr) => (
                        <div 
                            key={addr.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all
                                ${selectedAddressId === addr.id 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-gray-200'}`}
                            onClick={() => selectAddress(addr.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{addr.fullName}</p>
                                    <p className="text-sm text-gray-600">{addr.phone}</p>
                                    <p className="text-sm mt-1">
                                        {addr.city}, {addr.state} - {addr.pincode}
                                    </p>
                                </div>

                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        deleteAddress(addr.id);
                                    }}
                                    className="text-red-500 text-sm px-2 py-1 hover:bg-red-50 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add New Address Button */}
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors mb-4"
                >
                    + Add New Address
                </button>
            )}

            {/* Add Address Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="border rounded-lg p-4 bg-gray-50 mb-4">
                    <h2 className="font-semibold mb-3">New Address</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['fullName','email','phone','pincode','city','state'].map((field) => (
                            <input
                                key={field}
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                className="border p-2 rounded w-full"
                                value={formData[field]}
                                onChange={handleInputChange}
                                required
                            />
                        ))}
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button 
                            type="submit" 
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Save Address
                        </button>

                        <button 
                            type="button" 
                            onClick={() => setShowForm(false)} 
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Sticky Bottom Bar */}
            <StickyBottomBar 
                onBack={() => router.push('/cart')}
                onNext={handleNext}
                nextText="Continue to Payment"
            />
        </div>
    )
}