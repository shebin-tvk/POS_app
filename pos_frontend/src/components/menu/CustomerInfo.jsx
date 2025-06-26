import React from 'react'
import { useSelector } from 'react-redux'
import { getAvatarName, DateAndMonth } from '../../utils'

const CustomerInfo = () => {

  const customerData = useSelector(state => state.customer)

  return (
    <div className='flex item-center justify-between px-4 py-2'>

        <div className='flex flex-col item-start'>

            <h1 className='text-md text-[#f5f5f5] font-semibold tracking-wide'>{customerData.customerName || "Customer Name"}</h1>
            <p className='text-xs text-[#ababab] font-medium mt-1'>#{customerData.orderId || "N/A"} / Dine in</p>
            <p className='text-xs text-[#ababab] font-medium mt-1'>{DateAndMonth()}</p>

        </div>

            <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg h-12.5 mt-3'>{getAvatarName(customerData.customerName) || "CN"}</button>

    </div>
  )
}

export default CustomerInfo