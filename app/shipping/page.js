'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import { useStore } from '@/store/storeData';

export default function page() {

    const {handleSubmit,register,formState:{errors}}=useForm()

    const setAddressDetails = useStore(state => state.setAddressDetails)
    const setCartState = useStore(state => state.setCartState)
    const router=useRouter()

    const handleData=(data)=>{
        console.log("Form data : ",data)
        setAddressDetails(data)
        setCartState('Payment Confirmation')
        router.push('/payment')
    }

  return (
    <div>
        <form onSubmit={handleSubmit(handleData)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
            {/* Full Name, Email, Phone Number, PIN Code, City, and State. */}
            <input 
                type="text"  
                {...register('fullName',{minLength:4,maxLength:30,required:true})} 
                placeholder='Enter Full Name' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.fullName?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> Full Name Required !!</p>
            }
            {
                errors.fullName?.type=='minLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> minimum length should be 4 !!</p>
            }
            {
                errors.fullName?.type=='maxLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> maximum length should be 30 !!</p>
            }
            {/* email */}
            <input 
                type="email"  
                {...register('email',{required:true})} 
                placeholder='Enter email' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.email?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> Email Required !!</p>
            }
            {/* phone number */}
            <input 
                type="tel"  
                {...register('phone',{minLength:10,maxLength:10,required:true})} 
                placeholder='Enter mobile Number' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.phone?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> Mobile Number Required !!</p>
            }
            {
                errors.phone?.type=='minLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> minimum length should be 10 !!</p>
            }
            {
                errors.phone?.type=='maxLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> maximum length should be 10 !!</p>
            }
            {/* pincode */}
            <input 
                type="text"  
                {...register('pincode',{minLength:6,maxLength:6,required:true})} 
                placeholder='Enter Pincode' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.pincode?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> Pincode Required !!</p>
            }
            {
                errors.pincode?.type=='minLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> minimum length should be 6 !!</p>
            }
            {
                errors.pincode?.type=='maxLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> maximum length should be 6 !!</p>
            }
            {/* city */}
            <input 
                type="text"  
                {...register('city',{minLength:4,maxLength:16,required:true})} 
                placeholder='Enter City Name' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.city?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> City Name Required !!</p>
            }
            {
                errors.city?.type=='minLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> minimum length should be 4 !!</p>
            }
            {
                errors.city?.type=='maxLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> maximum length should be 16 !!</p>
            }
            {/* state */}
            <input 
                type="text"  
                {...register('state',{minLength:4,maxLength:10,required:true})} 
                placeholder='Enter Full Name' 
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text"
            />
            {
                errors.state?.type=='undefined' && <p className='bg-red-500 text-white text-sm p-1 rounded'> State Required !!</p>
            }
            {
                errors.state?.type=='minLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> minimum length should be 4 !!</p>
            }
            {
                errors.state?.type=='maxLength' && <p className='bg-red-500 text-white text-sm p-1 rounded'> maximum length should be 16 !!</p>
            }
            <button 
                type='submit' 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition type">Submit
            </button>
        </form>
    </div>
  )
}
