import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Topnav from './TEmplate/Topnav';
import Cards from './TEmplate/Cards';
import Loader from './TEmplate/Loader';
import { asyncFetchFavorites } from '../store/actions/authactions';
import Sidenav from './TEmplate/Sidenav';

function Favorites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites, isAuthenticated, status } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "Favorites | DSR Movies";
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        dispatch(asyncFetchFavorites());
    }, [isAuthenticated, navigate, dispatch]);

    // Format favorites to work with the generic Cards component
    const formattedFavorites = favorites?.map(fav => ({
        id: fav.tmdbId,
        media_type: fav.mediaType,
        title: fav.title,
        name: fav.title,
        original_title: fav.title,
        poster_path: fav.posterPath,
    })) || [];

    return (
      <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#1F1E24] transition-colors duration-300'>
        <Sidenav />
        <div className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden transition-colors duration-300'>
          <Topnav />
          <div className='px-[5%] py-5 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300'>
            <h1 className='text-xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-300 flex items-center gap-3 transition-colors duration-300'>
              <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"></i> 
              My Favorites
            </h1>
          </div>
          
          <div className='w-full pb-10'>
            {formattedFavorites.length > 0 ? (
                <Cards data={formattedFavorites} title="movie" />
            ) : status === 'loading' ? (
                <div className='flex items-center justify-center h-[50vh]'>
                    <Loader />
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center p-10 mt-10 text-zinc-400 text-center'>
                   <i className="ri-heart-add-fill text-6xl md:text-8xl mb-4 text-[#6556CD] opacity-50"></i>
                   <h1 className='text-xl md:text-2xl font-semibold tracking-wide'>No favorites yet</h1>
                   <p className='mt-2 max-w-xs'>Browse movies and click the heart icon to save them here.</p>
                   <button 
                     onClick={() => navigate('/')}
                     className='mt-8 px-8 py-3 bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white font-bold rounded-lg shadow-xl'
                   >
                     Go Exploring
                   </button>
                </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Favorites;
