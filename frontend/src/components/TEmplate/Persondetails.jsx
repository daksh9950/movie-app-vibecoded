import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson, removeperson } from "../../store/actions/peopleactions";
import { asyncAddToFavorites, asyncRemoveFromFavorites } from '../../store/actions/authactions';
import Loader from "./Loader"
import HorizontalCards from './HorizontalCards';
import Dropdown from './Dropdown';

function Persondetails() {
    const {pathname} = useLocation()
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {info} = useSelector((state)=> state.person)
    const [category, setcategory] = useState("movie")
    const { isAuthenticated, favorites } = useSelector((state) => state.auth);

    // Check if current person is in favorites
    const isFavorite = favorites?.some((fav) => fav.tmdbId === id);

    const toggleFavorite = () => {
        if (!isAuthenticated) return navigate('/login');
        if (isFavorite) {
            dispatch(asyncRemoveFromFavorites(id));
        } else {
            const data = {
                tmdbId: id,
                title: info.detail.name,
                posterPath: info.detail.profile_path,
                mediaType: 'person'
            };
            dispatch(asyncAddToFavorites(data));
        }
    };

    useEffect(()=>{
        dispatch(asyncloadperson(id))
        return ()=>{
            dispatch(removeperson());
        }
    },[id])

    return info ? (
        <div className='w-full px-[5%] md:px-[10%] min-h-screen bg-white dark:bg-[#1F1E24] pb-10 transition-colors duration-300' >
            <nav className='w-full text-zinc-900 dark:text-zinc-300 flex items-center justify-between h-[10vh] transition-colors duration-300' >
                <Link 
                    onClick={()=>navigate(-1)}  
                    className="hover:text-[#6556CD] ri-arrow-left-fill text-2xl" >
                </Link>
                
                <button onClick={toggleFavorite} className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold duration-200 border text-sm md:text-base ${isFavorite ? 'bg-zinc-200 text-red-500 border-zinc-200' : 'border-[#6556CD] text-[#6556CD] hover:bg-[#6556CD] hover:text-white'}`}>
                    <i className={isFavorite ? "ri-heart-3-fill" : "ri-heart-add-fill"}></i>
                    <span>{isFavorite ? 'Saved' : 'Add to Favorites'}</span>
                </button>
             </nav>

            <div className='w-full flex flex-col md:flex-row gap-10' >
               {/* {part 2 left poster and details} */}
                <div className='w-full md:w-[25%] flex flex-col items-center md:items-start'  >
                     <img 
                      className='h-[40vh] md:h-auto w-full max-w-[300px] md:max-w-none rounded-lg object-cover shadow-2xl' 
                      src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} 
                      alt="" 
                     />
                      <hr className='w-full border-zinc-600 mt-8 mb-5'  />
                      
                      {/* {social media links} */}
                      <div className='text-zinc-600 dark:text-zinc-300 text-2xl gap-x-6 flex justify-center md:justify-start w-full transition-colors' >
                         <a target="_blank" className='hover:text-[#6556CD] duration-200' href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
                         <a target="_blank" className='hover:text-[#6556CD] duration-200' href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="ri-facebook-circle-fill"></i></a>
                         <a target="_blank" className='hover:text-[#6556CD] duration-200' href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className="ri-instagram-fill"></i></a>
                         <a target="_blank" className='hover:text-[#6556CD] duration-200' href={`https://www.twitter.com/${info.externalid.twitter_id}`}><i className="ri-twitter-x-fill"></i></a>
                      </div>

                      {/* {personal information} */}
                      <div className='w-full mt-8'>
                          <h1 className='text-2xl text-zinc-900 dark:text-zinc-100 font-bold mb-5 transition-colors' >Personal Info</h1>

                          <div className='mb-4'>
                            <h1 className='text-zinc-900 dark:text-zinc-100 font-semibold transition-colors'>Known For</h1>
                            <h1 className='text-zinc-600 dark:text-zinc-400 transition-colors'>{info.detail.known_for_department}</h1>
                          </div>

                          <div className='mb-4'>
                            <h1 className='text-zinc-900 dark:text-zinc-100 font-semibold transition-colors'>Gender</h1>
                            <h1 className='text-zinc-600 dark:text-zinc-400 transition-colors'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
                          </div>

                          <div className='mb-4'>
                            <h1 className='text-zinc-900 dark:text-zinc-100 font-semibold transition-colors'>Birthday</h1>
                            <h1 className='text-zinc-600 dark:text-zinc-400 transition-colors'>{info.detail.birthday || "N/A"}</h1>
                          </div>

                          <div className='mb-4'>
                            <h1 className='text-zinc-900 dark:text-zinc-100 font-semibold transition-colors'>Place Of Birth</h1>
                            <h1 className='text-zinc-600 dark:text-zinc-400 transition-colors'>{info.detail.place_of_birth || "N/A"}</h1>
                          </div>
                      </div>
                </div>  

                {/* {part 3 right details and information} */}
                <div className='w-full md:w-[75%]'>
                     <h1 className='text-4xl md:text-6xl text-zinc-900 dark:text-zinc-100 font-black mb-6 text-center md:text-left transition-colors' >{info.detail.name}</h1>

                      <div className='mb-8'>
                        <h1 className='text-xl text-zinc-900 dark:text-zinc-100 font-bold mb-3 transition-colors'>Biography</h1>
                        <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors' >{info.detail.biography || "No biography available."}</p>
                      </div>

                      <div className='mb-8'>
                        <h1 className='text-xl text-zinc-100 font-bold mb-4 uppercase'>Known For</h1>
                        <HorizontalCards data={info.combinedcredits.cast}  />
                      </div>

                      <div className='flex justify-between items-center mb-5'>
                        <h1 className='text-xl text-zinc-900 dark:text-zinc-100 font-bold uppercase transition-colors'>Acting History</h1>
                        <Dropdown 
                          title="Category" 
                          options={["tv", "movie"]} 
                          func={(e)=>setcategory(e.target.value)} 
                        />
                      </div>

                      <div className='w-full h-[50vh] overflow-y-auto border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 bg-zinc-50 dark:bg-[#1A1929] transition-colors'>
                        {info[category + "credits"].cast.map((c, i) => (
                           <li key={i} className='hover:text-[#6556CD] list-none duration-300 cursor-pointer p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-[#1F1E24] flex flex-col md:flex-row md:items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 last:border-0 transition-colors'>
                              <Link to={`/${category}/details/${c.id}`} className='flex-1'>
                                 <span className='text-zinc-900 dark:text-zinc-100 font-medium transition-colors'>{c.name || c.title || c.original_name || c.original_title}</span>
                                 {c.character && <span className='text-zinc-500 block text-sm'> as {c.character}</span>}
                              </Link>
                           </li>
                        ))}
                      </div>
                </div>
            </div>
        </div>
    ): (
        <Loader/>
    )
}

export default Persondetails
