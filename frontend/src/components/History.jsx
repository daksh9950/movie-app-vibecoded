import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Topnav from './TEmplate/Topnav';
import Sidenav from './TEmplate/Sidenav';
import { asyncFetchHistory } from '../store/actions/authactions';
import img from '../assets/image.jpeg';
import { Link } from 'react-router-dom';

function History() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { history, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "Watch History | DSR Movies";
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        dispatch(asyncFetchHistory());
    }, [isAuthenticated, navigate, dispatch]);

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    return (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
            <Sidenav />
            <div className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
                <Topnav />
                <div className='px-[5%] py-5 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300'>
                    <h1 className='text-xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-300 flex items-center gap-3 transition-colors duration-300'>
                        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"></i>
                        Watch History
                    </h1>
                </div>

                <div className='w-full px-[5%] py-6 pb-10'>
                    {history && history.length > 0 ? (
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            {history.slice().reverse().map((item, i) => (
                                <Link
                                    key={i}
                                    to={`/${item.mediaType}/details/${item.tmdbId}`}
                                    className='flex items-center gap-4 p-3 md:p-4 bg-zinc-50 dark:bg-[#2A2931] hover:bg-zinc-100 dark:hover:bg-[#32313a] rounded-xl duration-200 border border-zinc-200 dark:border-zinc-800 hover:border-[#6556CD]/50 group shadow-lg transition-all'
                                >
                                    <div className='relative flex-shrink-0'>
                                        <img
                                            className='w-[80px] h-[110px] md:w-[100px] md:h-[140px] object-cover rounded-lg shadow-md'
                                            src={item.posterPath
                                                ? `https://image.tmdb.org/t/p/w200/${item.posterPath}`
                                                : img}
                                            alt={item.title}
                                        />
                                        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.mediaType === 'movie' ? 'bg-blue-600' : 'bg-purple-600'} text-white shadow-lg`}>
                                            {item.mediaType}
                                        </div>
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <h2 className='text-zinc-900 dark:text-zinc-100 font-bold text-base md:text-xl truncate group-hover:text-[#6556CD] duration-200 transition-colors'>{item.title}</h2>
                                        
                                        <div className='flex flex-wrap items-center gap-2 mt-2 md:mt-3'>
                                            <span className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold uppercase flex items-center gap-1 ${item.action === 'trailer' ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-600/30' : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'}`}>
                                                {item.action === 'trailer' ? <><i className="ri-play-circle-fill"></i> Trailer</> : <><i className="ri-eye-fill"></i> Viewed</>}
                                            </span>
                                            
                                            {item.watchedAt && (
                                                <span className='text-[10px] md:text-xs text-zinc-600 dark:text-zinc-500 font-medium flex items-center gap-1 transition-colors'>
                                                    <i className="ri-time-line"></i> {getTimeAgo(item.watchedAt)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className='hidden md:block mt-4 text-[#6556CD] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1'>
                                            Continue Watching <i className="ri-arrow-right-line"></i>
                                        </div>
                                    </div>
                                    
                                    <div className='md:hidden'>
                                        <i className="ri-arrow-right-s-line text-zinc-500 text-2xl"></i>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center min-h-[50vh] text-zinc-500 dark:text-zinc-400 text-center px-5 transition-colors'>
                            <div className='w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-[#2A2931] rounded-full flex items-center justify-center mb-6 shadow-inner transition-colors'>
                                <i className="ri-history-fill text-5xl md:text-6xl text-[#6556CD] opacity-40"></i>
                            </div>
                            <h1 className='text-xl md:text-2xl font-bold tracking-wide text-zinc-800 dark:text-zinc-200 transition-colors'>No watch history yet</h1>
                            <p className='mt-2 max-w-sm text-sm md:text-base'>Your cinematic journey starts here. Explore movies and shows to see your history grow.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className='mt-8 px-10 py-3 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-bold rounded-lg shadow-xl'
                            >
                                Start Browsing
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
