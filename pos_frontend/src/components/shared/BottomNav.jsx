import React,{useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../Redux/Slices/customerSlice';
import Modal from './modal';
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdOutlineTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";

const BottomNav = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guestCount, setGuestCount] = useState(0)

  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const openModal = ()=> setIsModalOpen(true)
  const closeModal = ()=> setIsModalOpen(false)

  const increment = ()=> setGuestCount((prev) => prev + 1)
  const decrement = ()=> {
                           if(guestCount<=0) return;
                           setGuestCount((prev) => prev - 1)
                         }

  const isActive = (path) => location.pathname === path 
  
  const handleCreateOrder = ()=> {
    dispatch(setCustomer({name, phone, guests: guestCount}))
    navigate("/Tables")
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
        <button onClick={() => navigate('/')} className={`flex item-center justify-center pt-3 w-[200px] rounded-[20px] ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]":"text-[#ababab]"}`}>
          <FaHome className='inline mr-2 mt-0.5' size={20}/> <p>Home</p>
          </button>
        <button onClick={() => navigate('/Orders')} className={`flex item-center justify-center pt-3 w-[200px] rounded-[20px] ${isActive("/Orders") ? "text-[#f5f5f5] bg-[#343434]":"text-[#ababab]"}`}>
          <MdOutlineReorder className='inline mr-2 mt-0.5' size={20}/> <p>Orders</p>
          </button>
        <button onClick={() => navigate('/Tables')} className={`flex item-center justify-center pt-3 w-[200px] rounded-[20px] ${isActive("/Tables") ? "text-[#f5f5f5] bg-[#343434]":"text-[#ababab]"}`}>
          <MdOutlineTableBar className='inline mr-2 mt-0.5' size={20}/> <p>Tables</p>
          </button>
        <button className={`flex item-center justify-center pt-3 w-[200px] rounded-[20px] ${isActive("/More") ? "text-[#f5f5f5] bg-[#343434]":"text-[#ababab]"}`}>
          <CiCircleMore className='inline mr-2 mt-0.5' size={20}/> <p>More</p>
          </button>

          <button 
          disabled={isActive("/Tables") || isActive("/menu")}
          onClick={openModal} 
          className='absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3 item-center'>
            <BiSolidDish size={30} />
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">

            <div>

              <label className='block text-[#ababab] mb-2 text-sm font-medium'>Customer Name</label>

              <div className='flex item-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                <input value={name} onChange={(e) => setName(e.target.value)} className='bg-transparent flex-1 text-white focus:outline-none' type="text" placeholder='Enter Customer Name' />
              </div>

            </div>

            <div>

              <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Customer Phone</label>

              <div className='flex item-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className='bg-transparent flex-1 text-white focus:outline-none ' type="phone" placeholder='Enter Customer phone' />
              </div>

            </div>

            <div>

              <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Guest</label>

              <div className='flex justify-between item-center rounded-lg py-3 px-4 bg-[#1f1f1f]'>

                <button onClick={decrement} className='text-yellow-500 text-2xl'>&minus;</button>

                <span className='text-white'>{guestCount} Person</span>

                <button onClick={increment} className='text-yellow-500 text-2xl'>&#43;</button>

              </div>

            </div>

            <button onClick={handleCreateOrder} className='w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700'>Create Order</button>

          </Modal>

    </div>
  )
}

export default BottomNav