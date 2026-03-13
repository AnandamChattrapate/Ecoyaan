'use client'
import { useStore } from '@/store/storeData'

export default function CartStages() {
  const cartState = useStore(state => state.cartState)

  const stages=[
    { name:'Cart',state:'Cart Review' },
    { name:'Shipping',state:'Shipping Address' },
    { name:'Payment',state:'Payment Confirmation' },
    { name:'Success',state:'Payment completed' }
  ]

  const currentIndex = stages.findIndex(s => s.state === cartState)

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center">
        {stages.map((stage, index) => {
          const isActive=index<=currentIndex
          const isLast=index==stages.length-1

          return (
            <div key={stage.name} className="flex items-center flex-1">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${isActive?'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                  ${index==currentIndex ? 'ring-2 ring-blue-300' : ''}`}>
                  {index+1}
                </div>
                <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                  {stage.name}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-200">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: index < currentIndex ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="text-center mt-8 text-sm text-gray-500">
        Current:<span className="font-medium text-blue-600">{cartState}</span>
      </div>
    </div>
  )
}