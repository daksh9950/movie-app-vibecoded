import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav'
import { Links, Link } from 'react-router-dom'
import axios from "../../utlis/axios"
import img from "../../assets/image.jpeg"
import { useSelector, useDispatch } from 'react-redux'
import { asyncLogoutUser } from '../../store/actions/authactions'
import { openSidebar } from '../../store/reducers/UISlice'
import { toggleTheme } from '../../store/reducers/themeSlice'

function Topnav() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { theme } = useSelector(state => state.theme);
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState(null );
  const GetServics = async ()=>{
        try {
            const d = await axios.get(`/search/multi?query=${query}`)
            // console.log(d);
            setsearches(d.data.results);
             
        } catch (error) {
            console.log("ERROR", error)
            
        }
    }

    useEffect(()=>{
      GetServics()
    },[query]);

    return (
       <div className='w-full px-[3%] md:px-[5%] h-[10vh] border-b border-zinc-200 dark:border-zinc-700/50 flex justify-between items-center bg-white dark:bg-[#1F1E24] transition-colors duration-300' >
          
          {/* Hamburger Menu - Mobile only */}
          <button 
            onClick={() => dispatch(openSidebar())}
            className='md:hidden text-zinc-800 dark:text-white text-3xl mr-4'
          >
            <i className="ri-menu-line"></i>
          </button>

          <div className='flex items-center flex-1 max-w-2xl relative justify-center'>
           <i className=" text-xl md:text-2xl text-zinc-400 ri-search-line"></i>
           <input 
            onChange={(e)=>setquery(e.target.value)}
            value={query}
            className='w-full md:w-[70%] text-zinc-800 dark:text-zinc-200 p-3 md:p-5 text-lg md:text-xl outline-none border-none bg-transparent'
            type="text"
             placeholder='Search anything...' />

            {query.length > 0 && ( <i onClick={()=>setquery('')} className="absolute text-xl md:text-2xl text-zinc-400 right-0 md:right-10 ri-close-large-line cursor-pointer"></i>)} 
          
           <div className='bg-zinc-100 absolute w-full md:w-[70%] max-h-[50vh] top-[100%] left-0 md:left-auto overflow-auto rounded z-[100] shadow-2xl' >
              {searches?.map((s,i)=>(
                <Link to={`/${s.media_type}/details/${s.id}`} key={i} className=' hover:text-black hover:bg-zinc-200 duraton-200  font-semibold  w-[100%] p-4 md:p-5 flex justify-start items-center border-b border-zinc-300 ' >
                 <img 
                 className='w-[8vh] h-[8vh] md:w-[10vh] md:h-[10vh] object-cover rounded-md mr-5 md:mr-10 shadow-lg '
                 src={s.poster_path || s.profile_path || s.backdrop_path ?`https://image.tmdb.org/t/p/original/${s.poster_path || s.profile_path || s.backdrop_path}`: img} alt="" />
                 <span className='text-sm md:text-base'>{s.name || s.title || s.original_name || s.original_title }</span>
              </Link>
              ))}
           </div>
          </div>

          <div className='hidden md:flex items-center gap-4 ml-4'>
            {isAuthenticated ? (
             <div className='flex items-center gap-4'>
                 <span className='text-zinc-200 font-semibold'>Hi, {user?.name || "User"}</span>
                 {user?.role === 'admin' && (
                   <Link to="/admin" className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 duration-200 text-black font-semibold rounded flex items-center gap-1'>
                     <i className="ri-shield-fill"></i> Admin
                   </Link>
                 )}
                 <button onClick={() => dispatch(asyncLogoutUser())} className='px-4 py-2 bg-red-600 hover:bg-red-700 duration-200 text-white rounded font-medium text-sm'>Logout</button>
               </div>
            ):(
               <div className='flex items-center gap-4'>
                 <Link to="/login" className='px-4 py-2 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white rounded font-medium text-sm'>Login</Link>
                 <Link to="/register" className='px-4 py-2 border border-[#6556CD] text-[#6556CD] hover:bg-[#6556CD] hover:text-white duration-200 rounded font-medium text-sm'>Register</Link>
               </div>
            )}

            {/* Theme Toggle Button */}
            <button 
              onClick={() => dispatch(toggleTheme())}
              className='p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200 text-zinc-800 dark:text-white'
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={theme === 'dark' ? "ri-sun-fill text-xl md:text-2xl" : "ri-moon-fill text-xl md:text-2xl"}></i>
            </button>
          </div>

          {/* User Icon - Mobile only */}
          {isAuthenticated && (
            <Link to="/favorites" className='md:hidden text-white text-2xl ml-4'>
              <div className='w-9 h-9 rounded-full bg-[#6556CD] flex items-center justify-center text-sm font-bold'>
                {user?.name?.[0].toUpperCase()}
              </div>
            </Link>
          )}

       </div>
    )
}

export default Topnav
