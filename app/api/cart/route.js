import { NextResponse } from "next/server"
export async function GET() {
    
  try{
    const res={
            "cartItems": [
            {
            "product_id": 101,
            "product_name": "Bamboo Toothbrush (Pack of 4)",
            "product_price": 299,
            "quantity": 2,
            // Temporary hardcoded public images for UI demonstration
            // "image": "via.placeholder.com/150"
            "image": "/bamboo.jpg"
            },{
            "product_id": 102,
            "product_name": "Reusable Cotton Produce Bags",
            "product_price": 450,
            "quantity": 1,
            // Temporary hardcoded public images for UI demonstration
            "image": "/cottonBag.jpg"
            }],
            "shipping_fee": 50,
            "discount_applied": 0
            }
    
    return NextResponse.json(res)

  }catch(err){
    return NextResponse.json({
        error:'err in fetching data : '+err.message ,

    },{status:500})
  }
}