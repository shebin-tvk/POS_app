import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
// import { tables } from "../constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack"

const Tables = () => {

    const [status, setStatus] = useState("all");

    useEffect(() => {
      document.title = "POS | Tables"
    }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if(isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  console.log(resData);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden'>

      <div className="flex item-center justify-between px-10 py-4 mt-2 ">

        <div className="flex item-center gap-4">
          <BackButton/>
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">Tables</h1>
        </div>

        <div className="flex item-center justify-around gap-4">
          <button onClick={()=> setStatus("all")} className={`text-[#ababab] text-lg  font-semibold ${status==='all'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            All
          </button>
          <button onClick={()=> setStatus("booked")} className={`text-[#ababab] text-lg  font-semibold ${status==='booked'&&"bg-[#383838] rounded-lg px-5 py-2"}`}>
            Booked
          </button>
        </div>

      </div>

      <div className='flex flex-wrap gap-6 px-16 py-4 mb-22 '>

        {resData?.data.data.map((table) => {
          return (
            <TableCard
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
        
      </div>

      <BottomNav/>

    </section>
  )
}

export default Tables