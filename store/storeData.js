// store/storeData.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      // cart state
      cartState: 'Cart Review',
      addresses: [], 
      selectedAddressId: null, 
      
      addressDetails: null,

      loading: false,
      error: null,
      cartProducts: null,

      // default
      discountApplied: 0,
      shippingFee: 0,

      setCartState: (updateState) => {
        set({ cartState: updateState })
      },
      
      addAddress: (details) => set((state) => ({ 
        addresses: [...state.addresses, { ...details, id: Date.now() }] 
      })),
      
      deleteAddress: (id) => set((state) => ({
        addresses: state.addresses.filter(addr => addr.id !== id)
      })),
      
      selectAddress: (id) => set({ selectedAddressId: id }),
      
      setAddressDetails: (details) => {
        set({ addressDetails: details })
        set((state) => ({ 
          addresses: [...state.addresses, { ...details, id: Date.now() }] 
        }))
      },

      setCartData: (data) => {
        set({
          cartProducts: data.cartProducts,
          shippingFee: data.shippingFee,
          discountApplied: data.discountApplied,
          loading: false
        })
      },
      
      cart: async () => {
        try {
          set({ loading: true })
          const res = await fetch('/api/cart')
          const data = await res.json()
          set({
            cartProducts: data.cartItems,
            shippingFee: data.shipping_fee,
            discountApplied: data.discount_applied,
            loading: false
          })
        } catch (err) {
          set({
            error: err.message,
            loading: false
          })
        }
      }
    }),
    {
      name: 'ecoyaan-storage', 
    }
  )
)