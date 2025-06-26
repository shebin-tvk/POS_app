import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }  

  return (
    <div className='px-8 mt-6'>

        <div className='bg-[#1a1a1a] w-full  rounded-lg mb-22'>

            <div className='flex justify-between item-center px-6 py-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>Recent Orders</h1>
                <a href="" className='text-[#025cca] text-sm font-semibold'>Viwe all</a>
            </div>

            <div className='flex item-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6'>
               <FaSearch className= 'text-[#f5f5f5] mt-1 '/>
                <input 
                 type="text"
                 placeholder='Search recent orders'
                 className='bg-[#1f1f1f] outline-none text-[#f5f5f5] ' 
                />
            </div>

            {/* order list */}

            <div className='mt-4 py-6 overflow-auto scrollbar-hide'>
              {resData?.data.data.length > 0 ? (
                 resData.data.data.map((order) => {
                    return <OrderList id={order._id} order={order} />;
               })
                 ) : (
                <p className="col-span-3 text-gray-500">No orders available</p>
               )}
            </div>

        </div>

    </div>
  )
}

export default RecentOrders