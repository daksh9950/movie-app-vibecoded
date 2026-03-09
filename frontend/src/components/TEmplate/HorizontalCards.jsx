import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../assets/image.jpeg"

function HorizontalCards({data, title}) {
    return (
           <div className='w-full h-[40vh] rounded-md flex overflow-x-auto overflow-y-hidden p-5 ' >
              {data.length > 0 ? data.map((d, i) => {
                  // TMDB Similar/Recommendations don't include media_type — fallback to parent page type
                  const mediaType = d.media_type || title || 'movie';
                  return (
                    <Link to={`/${mediaType}/details/${d.id}`} key={i} className='min-w-[15%] bg-zinc-900 mr-5 rounded overflow-y-hidden h-[40vh]'>
                      <img
                         className='w-full h-[55%] object-cover'
                         src={d.poster_path || d.profile_path || d.backdrop_path
                           ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path || d.backdrop_path}`
                           : noimage}
                         alt="" />
                      <div className='text-white h-[45%] overflow-y-auto p-2'>
                          <h1 className='text-lg font-semibold mt-1'>
                            {d.name || d.title || d.original_name || d.original_title}
                          </h1>
                          <p className='text-sm font-semibold'>{d?.overview?.slice(0,50)}...<span className='text-blue-200 font-semibold'>more</span></p>
                      </div>
                    </Link>
                  );
              }) : (
               <h1 className='text-white text-3xl font-black text-center mt-5'>Nothing To Show</h1>
              )}
           </div>
    )
}

export default HorizontalCards
