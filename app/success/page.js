'use client'

import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>
      <button 
        onClick={() => router.push('/')} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
        Back to Home
      </button>
    </div>
  )
}