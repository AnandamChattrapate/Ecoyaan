import { create } from 'zustand'
import { persist } from 'zustand/middleware'  

export const useStore = create(
  persist(  
    (set) => ({
      addresses: [],
      selectedAddressId: null,
    }),
    {
      name: 'ecoyaan-storage', 
    }
  )
)