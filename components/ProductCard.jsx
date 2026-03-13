import React from 'react'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="border-2 p-2 m-2">
      <div className="w-37.5 h-37.5 relative p-2.5">
        <Image
          src={product.image}
          alt={product.product_name} fill priority sizes="150px" style={{ objectFit: "cover" }}
        />
      </div>
      <h1>{product.product_name}</h1>
      <p>Price: {product.product_price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  )
}