import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './Topnav';
import Dropdown from './Dropdown';
import axios from "../../utlis/axios"
import Cards from './Cards';
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component"
import Sidenav from './Sidenav';

function Movies() {
    document.title = "DSR | MOVIES"
    const navigate = useNavigate();
    const [movie, setmovies] = useState([])
    const [category, setcategory] = useState("now_playing")
    const [pages, setpages] = useState(1);
    const [hasmore, sethasmore] = useState(true)

    const getmovies = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${pages}`)
            if (data.results.length > 0) {
                setpages(pages + 1)
                setmovies((prev) => [...prev, ...data.results])
            } else {
                sethasmore(false);
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const refreshhandler = async () => {
        setpages(1)
        setmovies([])
        sethasmore(true)
    }

    useEffect(() => {
        refreshhandler();
    }, [category])

    useEffect(() => {
        if (movie.length === 0) {
            getmovies();
        }
    }, [movie])

    return movie.length > 0 ? (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden bg-[#1F1E24]'>
            <Sidenav />
            <div className='w-full md:w-[80%] h-full overflow-auto overflow-x-hidden'>
                <div className='w-full flex flex-col md:flex-row items-center justify-between px-[3%] py-5 border-b border-zinc-700/50' >
                    <h1 className='text-xl md:text-2xl font-semibold text-zinc-400 flex items-center mb-4 md:mb-0' >
                        <i onClick={() => navigate(-1)} className="mr-3 hover:text-[#6556CD] ri-arrow-left-fill cursor-pointer"></i> 
                        Movies
                    </h1> 

                    <div className='flex items-center gap-2 w-full md:w-[70%]' >
                        <Topnav />
                        <div className='hidden md:flex items-center gap-2 ml-4'>
                            <Dropdown
                                title="Category"
                                options={["popular", "top_rated", "upcoming", "now_playing"]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>
                    </div> 

                    {/* Mobile Filters */}
                    <div className='flex md:hidden items-center justify-start w-full mt-4'>
                        <Dropdown
                            title="Category"
                            options={["popular", "top_rated", "upcoming", "now_playing"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>
                </div>

                <div className='pb-10'>
                    <InfiniteScroll
                        dataLength={movie.length}
                        next={getmovies}
                        hasMore={hasmore}
                        loader={<h4 className='text-center text-zinc-500 py-5'>Loading...</h4>}
                    >
                        <Cards data={movie} title="movie" />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default Movies
