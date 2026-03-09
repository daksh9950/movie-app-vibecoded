import React from 'react'
import { Link } from 'react-router-dom'


function Header({data}) {
   
    
   
    
    return (
        <div  
         style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4 ),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${data.poster_path || data.profile_path || data.backdrop_path})`,
                 backgroundPosition:"center ",
                 backgroundSize: "cover",
                  backgroundRepeat: 'no-repeat',   }}
               
        className='w-full h-[50vh] flex flex-col justify-end items-start p-[7%]  ' > 
        <h1 className='text-3xl w-[70%] font-semibold text-white  ' >
            {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className='w-[70%] text-white ' >{data?.overview?.slice(0,200) }...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-200' >more</Link></p>
        <p className='w-[70%] text-white '>
            <i className=" text-yellow-300  ri-megaphone-fill"></i>{data.first_air_date || "no infromation"}
            <i className=" ml-5 text-yellow-300 ri-album-fill"></i>{data?.media_type?.toUpperCase()}
        </p>
        <Link  to={`/${data.media_type}/details/${data.id}/trailer`} className='text-white bg-[#6556CD] rounded text font-semibold mt-5 px-4 py-2 ' >Watch Trailer</Link>
       

        </div>
    )
}

export default Header
