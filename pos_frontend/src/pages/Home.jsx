// import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import Greetings from '../components/Home/greetings'
import MiniCard from '../components/Home/MiniCard'
import RecentOrders from '../components/Home/RecentOrders';
import PopularDishes from '../components/Home/PopularDishes';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">

      <div className="flex-[3] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden"> {/*left*/}

        <Greetings/>

        <div className='flex item-center w-full gap-3 px-8 mt-8'>
          <MiniCard title='Total Earnings' icon={<BsCashCoin />} number={512} footerNum={1.6}/>
          <MiniCard title='in progress' icon={<GrInProgress />} number={512} footerNum={1.6}/>
        </div>

        <RecentOrders/>

      </div>

      <div className="flex-[2] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden"> {/*right*/}

        <PopularDishes/>

      </div>

      <BottomNav/>
      
    </section>
  )
}

export default Home

// left