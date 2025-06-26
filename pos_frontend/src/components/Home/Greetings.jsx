import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

const Greetings = () => {

  const userData = useSelector(state => state.user);
const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const formattedTime = currentDateTime.toLocaleTimeString();


  return (

    <div className='flex justify-between item-center px-8 mt-5'>

        <div>
            <h1 className='text-[#f5f5f5] text-2xl font-semibold tracking-wide'>Good Morning, {userData.name || "TEST USER"}</h1>
            <p className='text-[#ababab] text-sm '>Give your best services for customers 😊</p>
        </div>

        <div>
            <h1 className='text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]'>{formattedTime}</h1>
            <p className='text-[#ababab] text-sm'>{formattedDate}</p>
        </div>

    </div>
  )
}

export default Greetings