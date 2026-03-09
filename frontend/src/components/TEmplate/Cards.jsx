import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../assets/image.jpeg"

function Cards({data, title}) {
    return (
        <div className='bg-[#1F1E24] px-[3%] py-5'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10'>
                {data.map((c, i) => (
                    <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative flex flex-col' key={i} >
                        <div className='aspect-[2/3] w-full overflow-hidden rounded-lg shadow-2xl hover:scale-[1.03] duration-300'>
                            <img 
                                className='w-full h-full object-cover' 
                                src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}` : noimage} 
                                alt="" 
                            />
                        </div>
                        <h1 className='text-lg md:text-xl text-zinc-300 mt-3 font-semibold line-clamp-2' >
                            {c.name || c.title || c.original_name || c.original_title}
                        </h1>

                        {c.vote_average > 0 && (
                            <div className='absolute -right-2 top-[40%] md:top-[50%] rounded-full text-sm md:text-base font-bold bg-yellow-600 text-white w-10 h-10 md:w-12 md:h-12 flex justify-center items-center shadow-lg border-2 border-[#1F1E24]'>
                                {(c.vote_average * 10).toFixed()}<sup>%</sup>
                            </div>
                        )}
                    </Link>
                ))}
            </div> 
        </div>
    )
}

export default Cards
