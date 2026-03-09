
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadtv, removetv } from '../../store/actions/tvactions';
import { 
    asyncAddToFavorites, 
    asyncRemoveFromFavorites, 
    asyncAddToHistory,
    asyncAddToWatchlist,
    asyncRemoveFromWatchlist,
    asyncAddRating
} from '../../store/actions/authactions';
import Loader from "./Loader"
import HorizontalCards from './HorizontalCards';
import Trailer from './Trailer';



function Tvdetails() {
      const {pathname} = useLocation()
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {info} = useSelector((state)=> state.tv)
    const { isAuthenticated, favorites, watchlist, ratings } = useSelector((state) => state.auth);
    
    // Check if current tv show is in favorites
    const isFavorite = favorites?.some((fav) => fav.tmdbId === id);
    const isInWatchlist = watchlist?.some((item) => item.tmdbId === id);
    const userRating = ratings?.find((r) => r.tmdbId === id)?.rating;

    const toggleFavorite = () => {
        if (!isAuthenticated) return navigate('/login');
        if (isFavorite) {
            dispatch(asyncRemoveFromFavorites(id));
        } else {
            const data = {
                tmdbId: id,
                title: info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title,
                posterPath: info.detail.poster_path || info.detail.backdrop_path || info.detail.profile_path,
                mediaType: 'tv'
            };
            dispatch(asyncAddToFavorites(data));
        }
    };

    const toggleWatchlist = () => {
        if (!isAuthenticated) return navigate('/login');
        if (isInWatchlist) {
            dispatch(asyncRemoveFromWatchlist(id));
        } else {
            const data = {
                tmdbId: id,
                title: info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title,
                posterPath: info.detail.poster_path || info.detail.backdrop_path || info.detail.profile_path,
                mediaType: 'tv'
            };
            dispatch(asyncAddToWatchlist(data));
        }
    };

    const handleRating = (rating) => {
        if (!isAuthenticated) return navigate('/login');
        dispatch(asyncAddRating({
            tmdbId: id,
            rating: rating,
            mediaType: 'tv'
        }));
    };
    useEffect(()=>{
        dispatch(asyncloadtv(id))
        return ()=>{
            dispatch(removetv());
        }
    },[id])

    // Track page open in history once info is loaded
    useEffect(() => {
        if (info && isAuthenticated) {
            dispatch(asyncAddToHistory({
                tmdbId: id,
                title: info.detail?.name || info.detail?.title || info.detail?.original_name || info.detail?.original_title || "Unknown",
                posterPath: info.detail?.poster_path || info.detail?.backdrop_path,
                mediaType: 'tv',
                action: 'open'
            }));
        }
    }, [info?.detail?.id]);
     return info ? (
        <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4 ),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.profile_path || info.detail.backdrop_path})`,
                     backgroundPosition:"center",
                     backgroundSize: "cover",
                     backgroundRepeat: 'no-repeat',   }} 
            className='relative min-h-screen w-full px-[5%] md:px-[10%] pb-10 overflow-x-hidden transition-colors duration-300' >

            {/*PART ! NAVIGATION  */}
            <nav className='w-full text-zinc-300 dark:text-zinc-100 flex items-center gap-5 md:gap-10 h-[10vh] text-lg md:text-xl transition-colors duration-300' >
                <Link 
                   onClick={()=>navigate(-1)}  
                   className="hover:text-[#6556CD] ri-arrow-left-fill" >
                </Link>
                <a target="_blank" href={info.detail.homepage} className='hover:text-[#6556CD]'><i className="ri-external-link-fill"></i></a>
                <a target="_blank" href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className='hover:text-[#6556CD]'><i className="ri-earth-fill"></i></a>
                <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className='hover:text-[#6556CD]'>imdb</a>
            </nav>

            {/*PART 2 POSTER AND DETAILS  */}
            <div className='flex flex-col md:flex-row gap-10 mt-5' >
              <img className='w-full md:w-auto md:h-[60vh] rounded-lg object-cover shadow-[8px_17px_38px_2px_rgba(0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path  || info.detail.backdrop_path|| info.detail.profile_path}`} alt="" />
              
              <div className='flex-1 text-white' >
                  <h1 className='text-3xl md:text-5xl font-black' >
                     {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                     <small className='text-xl md:text-2xl ml-2 font-bold text-zinc-400' >
                       ({info.detail.first_air_date?.split("-")[0] || "N/A"})
                     </small>
                  </h1>

                  <div className='mt-6 mb-6 flex flex-wrap items-center gap-5 md:gap-8' >
                      <div className='flex items-center gap-3'>
                        <span className='rounded-full text-lg md:text-xl font-bold bg-yellow-600 text-white w-12 h-12 md:w-14 md:h-14 flex justify-center items-center shadow-lg' >
                           {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
                        </span>
                        <h1 className='font-semibold text-sm md:text-base leading-tight' >User<br/>Score</h1>
                      </div>

                     <h1 className='text-zinc-300 font-medium' >{info.detail.first_air_date}</h1>
                     <h1 className='text-zinc-300 font-medium' >{info.detail.genres.map((g)=>g.name).join(", ")}</h1>
                  </div>
                   
                  <h1 className='text-lg md:text-xl font-medium italic text-zinc-300 mb-6' >{info.detail.tagline}</h1> 
                  
                  <div className='mb-6'>
                    <h1 className='text-xl md:text-2xl font-bold mb-2'>Overview</h1>
                    <p className='text-zinc-300 leading-relaxed text-sm md:text-base'>{info.detail.overview}</p>
                  </div>

                  <div className='mb-8'>
                    <h1 className='text-xl md:text-2xl font-bold mb-2'>TV Translated</h1>
                    <p className='text-zinc-400 text-xs md:text-sm line-clamp-2'>{info.translations.join(", ")}</p>
                  </div>

                  <div className='flex flex-wrap items-center gap-5 mt-5'>
                      <Link 
                        className='bg-[#6556CD] hover:bg-[#5244a3] duration-200 text-white px-6 py-3 rounded-lg font-bold shadow-xl flex items-center gap-2' 
                        to={`${pathname}/trailer`}
                      >
                        <i className="ri-play-large-fill"></i> Watch Trailer
                      </Link>
                      
                      <button 
                        onClick={toggleFavorite} 
                        className={`px-6 py-3 rounded-lg flex items-center gap-2 font-bold duration-200 border shadow-xl ${isFavorite ? 'bg-zinc-200 text-red-500 border-zinc-200' : 'border-[#6556CD] text-[#6556CD] hover:bg-[#6556CD] hover:text-white'}`}
                      >
                        <i className={isFavorite ? "ri-heart-3-fill text-xl" : "ri-heart-add-fill text-xl"}></i>
                        {isFavorite ? 'Saved' : 'Favorite'}
                      </button>

                      <button 
                        onClick={toggleWatchlist} 
                        className={`px-6 py-3 rounded-lg flex items-center gap-2 font-bold duration-200 border shadow-xl ${isInWatchlist ? 'bg-yellow-600 text-white border-yellow-600' : 'border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'}`}
                      >
                        <i className={isInWatchlist ? "ri-bookmark-fill text-xl" : "ri-bookmark-line text-xl"}></i>
                        {isInWatchlist ? 'Watchlist' : 'Add to Watchlist'}
                      </button>

                      {isAuthenticated && (
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-sm font-bold text-zinc-500 dark:text-zinc-400'>Your Rating</h3>
                          <div className='flex gap-1'>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                              <i 
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`ri-star-fill cursor-pointer text-xl transition-colors ${star <= (userRating || 0) ? 'text-yellow-400' : 'text-zinc-300 dark:text-zinc-600 hover:text-yellow-200'}`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
              </div>
            </div>



            {/*PART 3  PLATFORM */}
            <div className='w-[80%] flex flex-col gap-y-2 mt-10 ' >
                
               {info?.watchproviders &&
                  info?.watchproviders?.flatrate && (
                    <div className='flex gap-x-10 items-center text-white ' >
                        <h1>Available on Platfrom</h1>
                     {info?.watchproviders?.flatrate?.map((w,i) => (
                        <img  key={i}
                              title={w?.provider_name}
                              className='w-[5vh] h-[5vh] rounded-md  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,.5)]'
                              src={`https://image.tmdb.org/t/p/original/${w?.logo_path  }`} 
                              alt=""
                        />
                   ))}
                   </div>
                  )
                   
                }

                {info?.watchproviders &&
                  info?.watchproviders?.rent && (
                    <div className='flex gap-x-10 items-center text-white ' >
                        <h1>Available on rent</h1>
                     {info?.watchproviders?.rent.map((w,i) => (
                        <img  key={i}
                              title={w?.provider_name}
                              className='w-[5vh] h-[5vh] mr-8 rounded-md  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,.5)]'
                              src={`https://image.tmdb.org/t/p/original/${w?.logo_path  }`} 
                              alt=""
                        />
                   ))}
                   </div>
                  )
                   
                }

               {info.watchproviders &&
                  info.watchproviders.buy && (
                    <div className='flex gap-x-10  items-center text-white ' >
                        <h1>Available to Buy    </h1>
                     {info.watchproviders.buy.map((w,i) => (
                        <img  key={i}
                               title={w.provider_name}  
                              className='w-[5vh] h-[5vh] mr-9 rounded-md  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,.5)]'
                              src={`https://image.tmdb.org/t/p/original/${w.logo_path  }`} 
                              alt=""
                        />
                   ))}
                   </div>
                  )
                   
                }
                
            </div>


             {/*PART 4  SEASONS */}
            <hr className='border-[1px] border-white mt-5 border-zinc-400 '  />
            <h1 className='text-white text-2xl mt-10  ' > SEASONS </h1>
            <div className='w-full h-[40vh] rounded-md flex overflow-x-auto overflow-y-hidden p-5'  >
                {info.detail.seasons.map((s,i)=>(
                    <div key={i} className='min-w-[15%] bg-zinc-900 mr-5 rounded overflow-y-hidden h-[40vh] ' >
                         <img
                             className='w-full h-[100%] object-cover  '
                             src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt="" />

                           <h1 className='text-lg font-semibold mt-3   ' >
                                  {s.name}
                                </h1>   
                    </div>
                      
                ))}
            </div>
             

            {/*PART 5  RECOMMENDATIONS AND SIMILAR */}
            <hr className='border-[1px] border-white mt-5 border-zinc-400 '  />
            <h1 className='text-white text-2xl mt-10  ' > RECOMMENDATIONS AND SIMILAR TV SHOWS </h1>
            <HorizontalCards data= {info?.recommendations?.length > 0 ?  info?.recommendations : info.similar }/> 
             
            <Outlet/>


        </div>
    ): (
        <Loader/>
    )
    
    
}

export default Tvdetails
