import React from 'react'
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { closeSidebar } from '../../store/reducers/UISlice'

function Sidenav() {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector(state => state.ui);

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    onClick={() => dispatch(closeSidebar())}
                    className='fixed inset-0 bg-black/50 z-[140] md:hidden' 
                />
            )}

            <div className={`fixed md:static top-0 left-0 z-[150] w-[70%] md:w-[20%] h-screen bg-[#1F1E24] border-zinc-400 border-r-2 flex flex-col flex-shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} >
                {/* Logo & Close Button */}
                <div className='px-8 pt-8 pb-4 flex justify-between items-center'>
                    <h1 className='text-2xl text-white font-black' >
                        <i className=" text-[#6556CD] ri-tv-fill text-2xl "></i>
                        <span className='text-2xl ml-2' >DSR MOVIES</span>
                    </h1>
                    {/* Close button - mobile only */}
                    <button 
                        onClick={() => dispatch(closeSidebar())}
                        className='md:hidden text-white text-3xl'
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                {/* Scrollable navigation area */}
                <div className='flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide'>
                    <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
                        <h1 className='text-white font-semibold text-xl mt-3 mb-3 ' >New Feeds</h1>
                        <Link onClick={() => dispatch(closeSidebar())} to='/trending' className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3 ' >   <i className="ri-fire-fill"></i> Trending</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' >     <i className="ri-heart-fill"></i> Popular</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' >   <i className="ri-movie-2-fill"></i> Movies</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/tv" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' >   <i className="ri-tv-2-fill"></i> Tv Shows</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/person" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' >     <i className="ri-user-fill"></i> Peoples</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/favorites" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' >     <i className="ri-bookmark-heart-fill"></i> Favorites</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/history" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3 mb-3' >     <i className="ri-history-fill"></i> History</Link>
                    </nav>

                    <hr className='border-1 border-zinc-600' />

                    <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
                        <h1 className='text-white font-semibold text-xl mt-5 mb-3' >Website Information</h1>
                        <Link onClick={() => dispatch(closeSidebar())} to="/about" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' ><i className="ri-information-fill"></i> About DSR</Link>
                        <Link onClick={() => dispatch(closeSidebar())} to="/contact" className='hover:bg-[#6556CD] hover:text-white duration-200 rounded-md p-3' ><i className="ri-mail-fill"></i> Contact Us</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidenav
