import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Topnav from './TEmplate/Topnav';
import Sidenav from './TEmplate/Sidenav';
import { asyncFetchWatchlist } from '../store/actions/authactions';
import Cards from './TEmplate/Cards';
import Loader from './TEmplate/Loader';

function Watchlist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { watchlist, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "My Watchlist | DSR Movies";
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        dispatch(asyncFetchWatchlist());
    }, [isAuthenticated, navigate, dispatch]);

    return watchlist ? (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
            <Sidenav />
            <div className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
                <Topnav />
                <div className='px-[5%] py-5 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300'>
                    <h1 className='text-xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-300 flex items-center gap-3 transition-colors duration-300'>
                        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"></i>
                        My Watchlist
                    </h1>
                </div>

                <div className='w-full px-[5%] py-8'>
                    {watchlist.length > 0 ? (
                        <Cards data={watchlist} title="watchlist" />
                    ) : (
                        <div className='flex flex-col items-center justify-center min-h-[50vh] text-zinc-500 dark:text-zinc-400 text-center px-5 transition-colors duration-300'>
                            <div className='w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-[#2A2931] rounded-full flex items-center justify-center mb-6 shadow-inner transition-colors duration-300'>
                                <i className="ri-bookmark-fill text-5xl md:text-6xl text-yellow-600 opacity-40"></i>
                            </div>
                            <h1 className='text-xl md:text-2xl font-bold tracking-wide text-zinc-800 dark:text-zinc-200'>Your watchlist is empty</h1>
                            <p className='mt-2 max-w-sm text-sm md:text-base'>Found something interesting? Bookmark it and it will appear here for you to watch later.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className='mt-8 px-10 py-3 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-bold rounded-lg shadow-xl'
                            >
                                Browse Movies
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default Watchlist;
