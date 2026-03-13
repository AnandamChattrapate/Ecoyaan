import {create} from'zustand'
export const useStore=create((set)=>({
    // cart state
    cartState:'Cart Review',
    // address Details
    addressDetails:null,

    loading:false,
    error:null,
    cartProducts:null,

    // default
    discountApplied:0,
    shippingFee:0,

    setCartState:(updateState)=>{
        
        set({cartState:updateState})

    },
    
    setAddressDetails:(details)=>{

        set({addressDetails:details})

    },

    setCartData: (data) => {
    set({
      cartProducts: data.cartProducts,
      shippingFee: data.shippingFee,
      discountApplied: data.discountApplied,
      loading: false
    })
    },
    cart:async()=>{
        try{

            set({loading:true})

            const res=await fetch('/api/cart')
            const data=await res.json()

            set({
                cartProducts:data.cartItems,
                shippingFee:data.shipping_fee,
                discountApplied:data.discount_applied,
                
                loading:false

            })

        }catch(err){
            set({
                error:err.message,
                loading:false
            })
        }
    }
}))