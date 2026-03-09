import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Notfound from './Notfound';
import { asyncAddToHistory } from '../../store/actions/authactions';



function Trailer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const { id } = useParams();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo =  useSelector((state) => state[category].info?.videos || null );
    const info    =  useSelector((state) => state[category].info?.detail || null);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (ytvideo && info && isAuthenticated) {
            dispatch(asyncAddToHistory({
                tmdbId: id,
                title: info.name || info.title || info.original_name || info.original_title || "Unknown",
                posterPath: info.poster_path || info.backdrop_path,
                mediaType: category,
                action: 'trailer'
            }));
        }
    }, [ytvideo?.key]);

    // if (!ytvideo || !ytvideo.key) {
    // return <div className=" relative top-[10%] text-white flex items-center justify-center font-semibold bg-[#0E1218] "> <Notfound/> 
    //         </div>;
    // }
    return ytvideo? (
        <div className='w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0  ' >
            <Link 
                   onClick={()=>navigate(-1)}  
                   className="mr-2 text-xl hover:text-[#6001D2] ri-arrow-left-fill text-white right-[5%] top-[5%] absolute   " >
            </Link>
            {ytvideo.key.length >0  ? 
            
             <iframe
                height={600}
                width={1700} 
                controls
                 className=' relative top-[10%] '
             
              src={`https://www.youtube.com/embed/${ytvideo.key}`} />  :  <Notfound/> 
            
            }

           
        </div>
    ): (
        <h1 className='w-screen h-screen flex itmes-center justify-center bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 '>NO TRAILER AVALABLE</h1>
    )
}

export default Trailer
