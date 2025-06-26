import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate} from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import {FaSearch, FaUserCircle, FaBell} from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";
import { removeUser } from '../../Redux/Slices/userSlice'
import { IoLogOut } from "react-icons/io5";
import { logout } from '../../https';

const Header = () => {

  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser())
      navigate("/auth")
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  return (
    <header className="flex justify-between item-center py-4 px-8 bg-[#1a1a1a]">

        <div onClick={() => navigate("/")}  className="flex item-center gap-2 cursor-pointer">
            <img src={Logo} className='h-8 w-8 ' alt='resto logo'></img>
            <h1 className='text-lg font-semibold text-[#f5f5f5]'>Restro</h1>
        </div>

        <div className='flex item-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]'>
          <FaSearch className= 'text-[#f5f5f5] mt-2 '/>
          <input 
          type="text"
          placeholder='Search'
          className='bg-[#1f1f1f] outline-none text-[#f5f5f5] ' 
          />
        </div>

        <div className='flex item-center gap-4 '>

          {
            userData.role === "Admin" && (
              <div onClick={() => navigate("/dashboard")} className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>

                <MdDashboard className='text-[#f5f5f5] text-2xl'/>

              </div>
            )
          }

          <div className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>

            <FaBell className='text-[#f5f5f5] text-2xl'/>

          </div>          

          <div className='flex item-center gap-3 cursor-pointer'>

            <FaUserCircle className='text-[#f5f5f5] text-4xl'/>

            <div className='flex flex-col items-start'>

              <h1 className='text-md text-[#f5f5f5] font-semibold'>{userData.name || "TEST USER"}</h1>
              <p className='text-sm text-[#ababab] font-medium'>{userData.role || "Role"}</p>

            </div>

            <IoLogOut onClick={handleLogout} className="text-[#f5f5f5] ml-2 " size={40} />

          </div>

        </div>
    </header>
  )
}

export default Header