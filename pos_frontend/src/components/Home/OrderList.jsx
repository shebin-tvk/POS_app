import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils/index";

const OrderList = ({ id, order }) => {
  return (
    <div key={id} className='flex item-center ml-4  gap-5 mb-2'>
        <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg'>{getAvatarName(order.customerDetails.name)}</button>
        <div className='flex item-center justify-between w-[86%]'>
            <div className='flex flex-col item-start gap-1'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{order.customerDetails.name}</h1>
                <p className='text-[#ababab] text-sm'>{order.items.length} items</p>
            </div>

            <div>
                <h1 className='text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1'>
                    Table<FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
                    {order.table.tableNo}
                </h1>
            </div>

            <div className='flex flex-col item-start gap-2'>
                 {order.orderStatus === "Ready" ? (
                   <>
                     <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                       <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                     </p>
                   </>
                    ) : (
                   <>
                     <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                       <FaCircle className="inline mr-2" /> {order.orderStatus}
                     </p>
                   </>
                  )}
            </div>
        </div>
    </div>
  )
}

export default OrderList