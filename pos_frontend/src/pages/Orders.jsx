import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";
import { enqueueSnackbar } from "notistack"

const Orders = () => {

  const [status, setStatus] = useState("all");

    useEffect(() => {
      document.title = "POS | Orders"
    }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData
  })

  if(isError) {
    enqueueSnackbar("Something went wrong!", {variant: "error"})
  }

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden">

      <div className="flex item-center justify-between px-10 py-4 mt-2 ">

        <div className="flex item-center gap-4">
          <BackButton/>
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">Orders</h1>
        </div>

        <div className="flex item-center justify-around gap-4">
          <button onClick={()=> setStatus("all")} className={`text-[#ababab] text-lg  font-semibold ${status==='all'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            All
          </button>
          <button onClick={()=> setStatus("progress")} className={`text-[#ababab] text-lg  font-semibold ${status==='progress'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            In Progress
          </button>
          <button onClick={()=> setStatus("ready")} className={`text-[#ababab] text-lg  font-semibold ${status==='ready'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            Ready
          </button>
          <button onClick={()=> setStatus("completed")} className={`text-[#ababab] text-lg  font-semibold ${status==='completed'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            Completed
          </button>
        </div>

      </div>

      <div className="flex flex-wrap gap-6 px-16 py-4 mb-22">
        {
          resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderCard id={order._id} order={order} />
            })
          ) : <p className="col-span-3 text-gray-500">No orders available</p>
        }
      </div>

      <BottomNav/>

    </section>
  )
}

export default Orders